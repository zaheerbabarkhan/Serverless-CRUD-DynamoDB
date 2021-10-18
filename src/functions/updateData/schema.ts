export default {
	type: 'object',
	properties: {
		CustomerName: { type: 'string' },
		CustomerAddress: { type: 'string' },
		CustomerPhone: { type: 'string' },
	},
	required: ['CustomerName', 'CustomerAddress', 'CustomerPhone'],
} as const;
