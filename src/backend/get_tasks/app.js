const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const dynamoDBClient = new DynamoDBClient();
const snsClient = new SNSClient();

exports.handler = async (event) => {

    const {priority_level, completion} = event.queryStringParameter || {};
    const tableName = process.env.TABLE_NAME;


    let param = {
        
    }
    let filterExpressions = [];
    let attributeValues = {};

    if(priority_level){
        filterExpressions.push("priority_level = :priority_level");
        attributeValues[":priority_level"] = priority_level;
    }
    if(completion){
        filterExpressions.push("completion = :completion");
        attributeValues[":completion"] = completion === "true";
    }
    if (filterExpressions.length > 0){
        param.FilterExpressions = filterExpressions.join('AND');
        param.AttributeValues = attributeValues;
    }

    try{
        console.log("Recieving Tasks", param);
        await dynamoDBClient.GetItemCommand(param);

        const snsParams = {
            Message: JSON.stringify({TaskID: body.TaskID, Title: body.Title}),
            TopicArn: process.env.SNS_TOPIC_ARN,
        }

        await snsClient.PublishCommand(snsParams);
        
        return{
            statusCode: 201,
            body: JSON.stringify({message:"Tasks Successfully recieved"}),
        };

        

    }catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed to get items'}),
        };
    }
};

