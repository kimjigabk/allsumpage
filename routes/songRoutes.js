const mongoose = require('mongoose');
const Song = mongoose.model('songs');
const requireLogin = require('../middlewares/requireLogin');
const cleanCache = require('../middlewares/cleanCache');

module.exports = (app) => {
  app.get('/api/songs', async (req, res) => {
    try {
      const songs = await Song.find({}, '-_id -__v -authorId').cache({
        key: 'allsongs',
      });
      res.send(songs);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  app.get('/api/songs/:id', (req, res) => {
    Song.findOne(
      { id: req.params.id },
      '-_id -__v -authorId',
      function (err, song) {
        if (err) {
          res.status(422).send(err);
        } else {
          res.send(song);
        }
      }
    );
  });

  app.post('/api/songs', requireLogin, cleanCache, async (req, res) => {
    const { title, artist, description, youtubeUrl, authorId } = req.body;
    let imageUrl;
    if (!req.body.imageUrl) {
      imageUrl =
        'https://musicmeta-phinf.pstatic.net/album/000/466/466579.jpg?type=r360Fll&v=20141128120110';
    } else {
      imageUrl = req.body.imageUrl;
    }
    const song = new Song({
      title,
      artist,
      description,
      youtubeUrl,
      imageUrl,
      authorId,
      id: Date.now(),
    });
    try {
      await song.save();
      res.send(song);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.patch('/api/songs/:id', requireLogin, cleanCache, async (req, res) => {
    const { title, artist, description, youtubeUrl, imageUrl } = req.body;

    try {
      song = await Song.findOneAndUpdate(
        { id: req.params.id },
        { title, artist, description, youtubeUrl, imageUrl }
      ).select('-_id -__v -authorId');
      res.send(song);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete('/api/songs/:id', requireLogin, cleanCache, (req, res) => {
    Song.findOneAndDelete({ id: req.params.id }, function (err, song) {
      if (err) {
        res.status(422).send(err);
      } else {
        res.send(song);
      }
    });
  });
};
