# Task Manager App

## Introduction

Task Manager is an app that runs serverless that provides support with managing a workers task throughout each day.

## Features
- create, delete, and view
- Responsive UI using Material UI library


### Architecture

- **Frontend**: React
- **Backend**: AWS Lambda, API Gateway
- **Database**: DynamoDB
- **Storage**: S3
- **Notifications**: SNS

## Setup Instructions
1. Clone the repository:`git clone <repo-url>`.
2. Install dependencies: `npm install`.
3. Start the frontend: `npm start`

## Deployment
- **Frontend**: Deployed with AWS Amplify.
- **Backend**: Deployed with AWS SAM.

## API References
- `POST /tasks`: Create a task
- `GET /tasks`: Retrieve tasks.
- `Delete /tasks/{id}`: Delete a task.

## Tech Stack
- React
- AWS Lambda
- DynamoDB
- SNS
- CloudWatch
