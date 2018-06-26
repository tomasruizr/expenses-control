/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

/* eslint-disable no-console */

const jsf = require( 'json-schema-faker' );
const schema = require( './mockDataSchema' );
const chalk = require( 'chalk' );

const json = jsf( schema );

async function mock( sails ) {
  Object.getOwnPropertyNames( json ).forEach( async ( model ) => {
    json[model].forEach( async ( record ) => {
      await sails.models[model].create( record );
    });
  });
  console.log( chalk.green( 'Mock data generated.' ));
}

module.exports = {
  mock
};

