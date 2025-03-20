import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { id, title, description } = JSON.parse(event.body);
    const params = {
        TableName: 'Todos',
        Key: { id },
        UpdateExpression: 'set title = :title, description = :description',
        ExpressionAttributeValues: {
            ':title': title,
            ':description': description
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const result = await dynamo.send(new UpdateCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update todo' })
        };
    }
};
