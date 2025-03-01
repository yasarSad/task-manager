const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const dynamoDBClient = new DynamoDBClient();
const snsClient = new SNSClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const params = {
        TableName: 'Tasks',
        Key: {
            TaskId: { S: body.TaskId }
        },
        UpdateExpression: 'set #title = :title, #desc = :desc, #prior = :prior, #status = :status',
        ExpressionAttributeNames: {
            '#title': 'Title',
            '#desc': 'Description',
            '#prior': 'Priority_Status',
            '#status': 'Status',
        },
        ExpressionAttributeValues: {
            ':title': { S: body.Title },
            ':desc': { S: body.Description },
            ':prior': { S: body.Priority_Status },
            ':status': { S: body.Status },
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDBClient.send(new UpdateItemCommand(params));

        const snsParams = {
            Message: JSON.stringify({ TaskId: body.TaskId, Title: body.Title }),
            TopicArn: process.env.SNS_TOPIC_ARN,
        };

        await snsClient.send(new PublishCommand(snsParams));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Update completed', updatedTask: result.Attributes }),
        };
    } catch (error) {
        console.error('Error updating task:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Update failed' }),
        };
    }
};