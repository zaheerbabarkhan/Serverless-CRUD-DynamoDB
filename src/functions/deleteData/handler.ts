import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
const { dynamoDB } = require('../../../src');
import schema from './schema';

const deleteRecord: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
	event
) => {
	console.log(event.body);
	const params = {
		TableName: 'Customer2',
		Key: {
			CustomerName: event.body.CustomerName,
		},
	};

	try {
		const result = await dynamoDB.delete(params).promise();
		return formatJSONResponse({
			message: result,
		});
	} catch (error) {
		console.log('error');
		return formatJSONResponse({
			message: error,
		});
	}
};

export const main = middyfy(deleteRecord);
