const lambda = require('../../../src/updateTodo/app');
const event = {
  body: JSON.stringify({
    id: 'test-id',
    title: 'Updated Todo',
  }),
};

test('updateTodo function', async () => {
  const result = await lambda.handler(event);
  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body).message).toBe('Todo updated successfully');
});
