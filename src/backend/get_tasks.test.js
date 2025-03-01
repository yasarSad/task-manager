const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const { handler } = require('./get_tasks/app');

jest.mock('@aws-sdk/client-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/client-dynamodb');
    return {
        ...originalModule,
        DynamoDBClient: jest.fn(() => ({
            send: jest.fn(),
        })),
        ScanCommand: originalModule.ScanCommand,
    };
});

jest.mock('@aws-sdk/client-sns', () => {
    const originalModule = jest.requireActual('@aws-sdk/client-sns');
    return {
        ...originalModule,
        SNSClient: jest.fn(() => ({
            send: jest.fn(),
        })),
        PublishCommand: originalModule.PublishCommand,
    };
});

describe('get_tasks Function', () => {
    let dynamoDbClientSendMock;
    let snsClientSendMock;

    beforeAll(() => {
        process.env.TABLE_NAME = 'Tasks-Collection';
        process.env.SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:992382647468:Task_Updates_and_Notifications';
    });

    beforeEach(() => {
        dynamoDbClientSendMock = new DynamoDBClient().send;
        snsClientSendMock = new SNSClient().send;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should get tasks successfully", async () => {
        const mockData = { Items: [{ TaskID: { S: '1' }, Title: { S: 'Test Task' } }] };
        dynamoDbClientSendMock.mockResolvedValue(mockData);
        snsClientSendMock.mockResolvedValue({});

        const event = {
            queryStringParameters: {
                priority_level: 'High',
                completion: 'true',
            },
        };
        const response = await handler(event);

        console.log('Response:', response);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toMatch('Tasks successfully received');
        expect(JSON.parse(response.body).tasks).toEqual(mockData.Items);
    });

    it("should return an error message if it fails to get tasks from DynamoDB", async () => {
        dynamoDbClientSendMock.mockRejectedValueOnce(new Error('DynamoDB Error'));

        const event = {
            queryStringParameters: {
                priority_level: 'Low',
                completion: 'false',
            },
        };
        const response = await handler(event);

        console.log('Response:', response);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).error).toMatch('Failed to get items');
    });
});