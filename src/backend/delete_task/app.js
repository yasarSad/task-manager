const { DynamoDBClient, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const dynamoDBClient = new DynamoDBClient();
const snsClient = new SNSClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const tableName = process.env.TABLE_NAME;
    const params = {
        TableName: tableName,
        Key: {
            TaskID: { S: body.TaskID },
        },
    };

    try {
        console.log('Deleting item from DynamoDB with params:', params);
        await dynamoDBClient.send(new DeleteItemCommand(params));
        console.log("Successfully deleted item from DynamoDB");

        const snsParams = {
            Message: JSON.stringify({ TaskID: body.TaskID, Title: body.Title }),
            TopicArn: process.env.SNS_TOPIC_ARN,
        };

        console.log("Sending PublishCommand to SNS with Params:", snsParams);
        await snsClient.send(new PublishCommand(snsParams));
        console.log("Successfully published message to SNS");

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Task Successfully Deleted' }),
        };

    } catch (error) {
        console.error('Error deleting task:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to Delete' }),
        };
    }
};