import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { title, description } = JSON.parse(event.body);
    const id = uuidv4();
    const params = {
        TableName: 'Todos',
        Item: { id, title, description }
    };

    try {
        await dynamo.send(new PutCommand(params));
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Todo created successfully', id })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create todo' })
        };
    }
};
