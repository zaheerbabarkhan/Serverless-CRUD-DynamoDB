// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
const { dynamoDB } = require('../../../src');

export const deleteRecord: Handler = async (event) => {
	console.log(event.body);
	const params = {
		TableName: 'Customer2',
		Key: {
			CustomerName: event.body.CustomerName,
		},
	};

	try {
		await dynamoDB.delete(params).promise();
		return formatJSONResponse({
			message: 'success',
		});
	} catch (error) {
		console.log('error');
		return formatJSONResponse({
			message: error,
		});
	}
};

export const main = middyfy(deleteRecord);
