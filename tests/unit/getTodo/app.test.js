const lambda = require('../../../src/getTodo/app');
const event = {
    pathParameters: {
        id: 'test-id'
    }
};

test('Get Todo', async () => {
    const result = await lambda.handler(event);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toHaveProperty('id', 'test-id');
});
