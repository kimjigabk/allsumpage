const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
const Song = mongoose.model('songs');

module.exports = (app) => {
  app.get('/api/isadmin/:id', (req, res) => {
    if (req.params.id === keys.adminId) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
  //유저 추가, returns a user model as response
  app.post('/api/user', async (req, res) => {
    const existingUser = await User.findOne(
      { googleId: req.body.userId },
      '-_id -__v'
    );
    if (existingUser) {
      res.send(existingUser);
    } else {
      const user = await new User({
        googleId: req.body.userId,
        displayName: req.body.displayName,
      }).save();
      res.send(user);
    }
  });

  //유저 정보 수정 (+별표눌렀을때 발동)
  //returns user (user.array is not updated.)
  app.patch('/api/user', async (req, res) => {
    const user = await User.findOneAndUpdate(
      { googleId: req.body.userId },
      { $addToSet: { favoritedSongsIds: req.body.songId } }
    );
    res.send(user);
  });

  // app.get('/api/oauth2callback', async (req, res) => {
  //   // res.send(req);
  //   res.redirect('/songs');
  // });
};
