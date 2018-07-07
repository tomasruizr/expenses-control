module.exports = {
  type: 'object',
  properties: {
    user: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            unique: true,
            minimum: 1,
            maximum: 1000
          },
          firstName: {
            type: 'string',
            faker: 'name.firstName'
          },
          lastName: {
            type: 'string',
            faker: 'name.lastName'
          },
          email: {
            type: 'string',
            format: 'email',
            faker: 'internet.email'
          }
        },
        required: [ 'id', 'firstName', 'lastName', 'email' ]
      }
    },
    account: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            unique: true,
            minimum: 1,
            maximum: 1000
          },
          name: {
            type: 'string',
            faker: 'finance.accountName'
          },
          balance: {
            type: 'integer',
            faker: 'finance.amount'
          }
        },
        required: [ 'id', 'name', 'balance' ]
      }
    },
    budget: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            unique: true,
            minimum: 1,
            maximum: 1000
          },
          name: {
            type: 'string',
            faker: 'finance.accountName'
          },
          amount: {
            type: 'integer',
            minimum: 1,
            maximum: 100
          },
          isPercentage: {
            type: 'boolean',
            faker: 'random.boolean'
          }
        },
        required: [ 'id', 'name', 'amount', 'isPercentage' ]
      }
    }
  },
  required: [ 'user', 'account', 'budget' ]
};
