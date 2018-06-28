// process.env.NODE_ENV = 'test';
require( 'isomorphic-fetch' );
// This file isn't transpiled, so must use CommonJS and ES5
// Register babel to transpile before our tests run.
require( 'babel-register' )();
require( 'babel-polyfill' );
// Disable webpack features that Mocha doesn't understand.
require( 'jsdom-global' )( '', { url: 'http://localhost:3001/' });
require.extensions['.css'] = function() {};

global.stringify = function( obj ){
  var cache = [];
  let value = JSON.stringify( obj, function( key, value ) {
    if ( typeof value === 'object' && value !== null ) {
      if ( cache.indexOf( value ) !== -1 ) {
        // Duplicate reference found
        try {
          // If this value does not reference a parent it can be deduped
          return JSON.parse( JSON.stringify( value ));
        } catch ( error ) {
          // discard key if value cannot be deduped
          return;
        }
      }
      // Store value in our collection
      cache.push( value );
    }
    return value;
  });
  cache = null;
  return value;
};