import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
const { dynamoDB } = require('../../../src');
import schema from './schema';

const getData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
	event
) => {
	const params = {
		TableName: 'Customer2',
	};

	try {
		const result = await dynamoDB.scan(params).promise();
		return formatJSONResponse({
			message: result,
		});
	} catch (error) {
		return formatJSONResponse({
			message: error,
		});
	}
};

export const main = middyfy(getData);
