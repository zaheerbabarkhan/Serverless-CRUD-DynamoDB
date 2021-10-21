import { deleteRecord } from '@functions/deleteData/handler';

describe('cehcking the delete method', () => {
	it('this will cehk if the data is delete or not', async () => {
		const event = {
			body: {
				CustomerName: ' Abdul Malaik Wahab ',
			},
		};
		const result = await deleteRecord(event, null, null);
		expect(result).toEqual({
			statusCode: 200,
			body: JSON.stringify({
				message: 'success',
			}),
		});
	});
});
