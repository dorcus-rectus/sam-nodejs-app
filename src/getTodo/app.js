import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: 'Todos',
        Key: { id }
    };

    try {
        const result = await dynamo.send(new GetCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve todo' })
        };
    }
};
