import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import saveData from '@functions/saveData';

const serverlessConfiguration: AWS = {
	service: 'serverless-dynamoDB-Zaheer-dev',
	frameworkVersion: '2',
	custom: {
		dynamodb: {
			stages: ['dev'],
			region: 'eu-west-2',
			start: {
				port: 8000,
				migrate: true,
				inMemory: true,
				heapInitial: '200m',
				seed: true,
				convertEmptyValues: true,
				heapMax: '1g',
			},
		},
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
		},
	},
	plugins: [
		'serverless-esbuild',
		'serverless-dynamodb-local',
		'serverless-offline',
	],
	provider: {
		name: 'aws',
    stage: 'test',
		runtime: 'nodejs14.x',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
		},
		lambdaHashingVersion: '20201221',
    iamRoleStatements: [{
       
        "Effect": "Allow",
        "Action": [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        "Resource": "arn:aws:dynamodb:us-west-2:218767131295:table/Customer"
      }
    ]
	},
	// import the function via paths
	functions: { hello, saveData },

	resources: {
		Resources: {
			customer: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: 'Customer',
					AttributeDefinitions: [
						{
							AttributeName: 'CustomerName',
							AttributeType: 'S',
						},
					],
					KeySchema: [
						{
							AttributeName: 'CustomerName',
							KeyType: 'HASH',
						},
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
