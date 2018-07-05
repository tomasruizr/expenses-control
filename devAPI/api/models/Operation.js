/**
 * Operation.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: 'number',
      unique: true,
      autoIncrement: true
    },
    kind: 'number',
    name: 'string',
    description: 'string',
    amount: 'number',
    tags: 'string',
    budget:{
      model:'budget'
    },
    account:{
      model: 'account'
    },
  },

};
