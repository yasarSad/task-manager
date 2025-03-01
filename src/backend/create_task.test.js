const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const { handler } = require('./create_task');

jest.mock('@aws-sdk/client-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/client-dynamodb');
    return {
        ...originalModule,
        DynamoDBClient: jest.fn(() => ({
            send: jest.fn(),
        })),
        PutItemCommand: originalModule.PutItemCommand,
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

describe('create_task Function', () => {
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

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should create a task successfully', async () => {
        dynamoDbClientSendMock.mockResolvedValue({});
        snsClientSendMock.mockResolvedValue({});

        const event = {
            body: JSON.stringify({
                TaskID: '1',
                Title: 'Test Task',
                Description: 'A sample do it now',
                Priority_Level: 'High'
            }),
        };

        const response = await handler(event);

        console.log('Response:', response);

        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body).message).toMatch('Task Sucessfully added');
    });

    it('should return an error message if it fails to send to DynamoDB', async () => {
        dynamoDbClientSendMock.mockRejectedValueOnce(new Error('DynamoDB Error'));

        const event = {
            body: JSON.stringify({
                TaskID: '2',
                Title: 'Test Task',
                Description: 'Another sample task',
                Priority_Level: 'Low',
            }),
        };

        const response = await handler(event);

        console.log('Response:', response);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).message).toMatch('Task Successfully Deleted');
    });
});