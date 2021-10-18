import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
const { dynamoDB } = require('../../../src');
import schema from './schema';

const getSingleRecord: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
	async (event) => {
		const params = {
			TableName: 'Customer2',
			Key: {
				CustomerName: JSON.parse(<any>event.body).CustomerName,
			},
		};

		try {
			const result = await dynamoDB.get(params).promise();
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

export const main = middyfy(getSingleRecord);
