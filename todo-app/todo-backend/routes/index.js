const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const redisResult = await redis.getAsync('added');
  const count = Number(redisResult) ?? 0;
  res.json({ "added_todos": count })
})

module.exports = router;
