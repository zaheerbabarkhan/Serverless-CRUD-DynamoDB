export default {
  type: "object",
  properties: {
    CustomerName: {type: 'string'},
    CustomerAddress: {type: 'string'}
  },
  required: ['CustomerName', 'CustomerAddress']
} as const;
