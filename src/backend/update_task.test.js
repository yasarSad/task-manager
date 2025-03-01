const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const { handler } = require('./update-task');

jest.mock('@aws-sdk/client-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/client-dynamodb');
    return {
        ...originalModule,
        DynamoDBClient: jest.fn(() => ({
            send: jest.fn(),
        })),
        UpdateItemCommand: originalModule.UpdateItemCommand,
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

describe('update_task Function', () => {
    let dynamoDbClientSendMock;
    let snsClientSendMock;

    beforeAll(() => {
        process.env.SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:992382647468:Task_Updates_and_Notifications';
    });

    beforeEach(() => {
        dynamoDbClientSendMock = new DynamoDBClient().send;
        snsClientSendMock = new SNSClient().send;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should update a task successfully", async () => {
        const mockData = {
            Attributes: {
                TaskId: { S: '1' },
                Title: { S: 'Updated Task' },
                Description: { S: 'Updated Description' },
                Priority_Status: { S: 'High' },
                Status: { S: 'Completed' },
            }
        };
        dynamoDbClientSendMock.mockResolvedValue(mockData);
        snsClientSendMock.mockResolvedValue({});

        const event = {
            body: JSON.stringify({
                TaskId: '1',
                Title: 'Updated Task',
                Description: 'Updated Description',
                Priority_Status: 'High',
                Status: 'Completed'
            }),
        };
        const response = await handler(event);

        console.log('Response:', response);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toMatch('Update completed');
        expect(JSON.parse(response.body).updatedTask).toEqual(mockData.Attributes);
    });

    it("should return an error message if it fails to update the task", async () => {
        dynamoDbClientSendMock.mockRejectedValueOnce(new Error('DynamoDB Error'));

        const event = {
            body: JSON.stringify({
                TaskId: '2',
                Title: 'Failed Update',
                Description: 'This will fail',
                Priority_Status: 'Low',
                Status: 'Pending'
            }),
        };
        const response = await handler(event);

        console.log('Response:', response);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).message).toMatch('Update failed');
    });
});