export default {
	type: 'object',
	properties: {
		CustomerName: { type: 'string' },
	},
	required: ['CustomerName'],
} as const;
