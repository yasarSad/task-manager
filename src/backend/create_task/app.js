const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const dynamoDBClient = new DynamoDBClient();
const snsClient = new SNSClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const tableName = process.env.TABLE_NAME;
    const params = {
        TableName: tableName,
        Item: {
            TaskID: { S: body.TaskID },
            Title: { S: body.Title },
            Description: { S: body.Description },
            Priority_Level: { S: body.Priority_Level },
            Status: { S: body.Status || 'pending' },
            CreatedAt: { S: new Date().toISOString() },
        },
    };

    try {
        console.log('Sending PutItemCommand to DynamoDB with params:', params);
        await dynamoDBClient.send(new PutItemCommand(params));
        console.log('Successfully added task to DynamoDB');

        const snsParams = {
            Message: JSON.stringify({ TaskID: body.TaskID, Title: body.Title }),
            TopicArn: process.env.SNS_TOPIC_ARN,
        };
        console.log('Sending PublishCommand to SNS with params:', snsParams);
        await snsClient.send(new PublishCommand(snsParams));
        console.log('Successfully published message to SNS');

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Task Sucessfully added' }),
        };
    } catch (error) {
        console.error('Error adding task:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to add task' }),
        };
    }
};