export default {
  type: "object",
  properties: {
    name: {
      type: 'object',
      properties: {
        first: { type: 'string' },
        last: { type: 'string' },
      },
      required: ['first', 'last']
     },
    mobile: { type: 'string' }
  },
  required: ['name']
} as const;
