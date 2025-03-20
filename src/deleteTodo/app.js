import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: 'Todos',
        Key: { id }
    };

    try {
        await dynamo.send(new DeleteCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Todo deleted successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete todo' })
        };
    }
};
