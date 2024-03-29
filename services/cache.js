const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient({
  url: keys.redisUrl,
});

const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  // establish redis connection
  await client.connect();
  client.on('error', (err) => console.log('Redis Client Error', err));

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  //   console.log(key);
  //   console.log(this.hashKey);
  // See if we have a value for 'key' in redis
  const cacheValue = await client.hGet(this.hashKey, key);
  // If we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    await client.quit();
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  // result = return value from the query after await.
  await client.hSet(this.hashKey, key, JSON.stringify(result));
  await client.expire(this.hashKey, 36060);
  await client.quit();
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
