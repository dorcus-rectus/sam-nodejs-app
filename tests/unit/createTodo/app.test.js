const lambda = require('../../../src/createTodo/app');
const event = {
  body: JSON.stringify({
    title: 'New Todo',
  }),
};

test('createTodo function', async () => {
  const result = await lambda.handler(event);
  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body).message).toBe('Todo created successfully');
});
