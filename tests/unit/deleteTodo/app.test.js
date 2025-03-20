const lambda = require('../../../src/deleteTodo/app');
const event = {
  pathParameters: {
    id: 'test-id',
  },
};

test('deleteTodo function', async () => {
  const result = await lambda.handler(event);
  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body).message).toBe('Todo deleted successfully');
});
