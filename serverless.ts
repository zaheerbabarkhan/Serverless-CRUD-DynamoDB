import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import saveData from '@functions/saveData';
import getData from '@functions/getData';
import getSingleRecord from '@functions/getSIngleRecord';
import updateData from '@functions/updateData';
import deleteData from '@functions/deleteData';
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
		iamRoleStatements: [
			{
				'Effect': 'Allow',
				'Action': ['dynamodb:*'],
				'Resource': '*',
			},
		],
	},
	// import the function via paths
	functions: {
		hello,
		saveData,
		getData,
		getSingleRecord,
		updateData,
		deleteData,
	},

	resources: {
		Resources: {
			customer: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: 'Customer2',
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
