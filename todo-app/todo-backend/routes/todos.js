const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')




/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  console.log('created todo:', todo)
  const redisResult = await redis.getAsync('added');
  console.log('redis raw result: ', redisResult)
  const count = Number(redisResult) ?? 0;
  console.log('Redis count', count)
  redis.setAsync('added', count+1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (req.body && req.body.text && req.body.done) {
    const newTodo = req.body;
    req.todo.set(newTodo);
    await req.todo.save();
    return res.send(req.todo);
  }
  res.sendStatus(400);

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
