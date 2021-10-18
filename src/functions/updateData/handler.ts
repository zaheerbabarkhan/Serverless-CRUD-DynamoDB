import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
const { dynamoDB } = require('../../../src');
import schema from './schema';

const updateData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
	event
) => {
	const params = {
		TableName: 'Customer2',
		Item: {
			CustomerName: event.body.CustomerName,
			CustomerAddress: event.body.CustomerAddress,
			CustomerPhone: event.body.CustomerPhone,
		},
	};
	const result = await save(params);
	return formatJSONResponse({
		message: result,
	});
	// const result = await save(params);
	// return formatJSONResponse({
	// 	message: result,
	// });
};

const save = async (params) => {
	return new Promise((resolve, reject) => {
		dynamoDB
			.put(params)
			.promise()
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const main = middyfy(updateData);
