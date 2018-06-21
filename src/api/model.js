/**
 * Module that represent the prototype for the models.
 * Exposes methods 'get', 'post', 'put', 'patch', 'delete' based on fetch.
 * In case you want to implement with some other library like axios, make the change here.
 */
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import getBaseUrl from './baseUrl';

let io; 
try{
  io = sailsIOClient( socketIOClient );
} catch ( error ){
  if ( !/has already been augmented/mig.test( error.message ))
    throw error;
  io = socketIOClient;
}
let model = function( options = {}){
  assignOptions( options );
  this.options = {};
  this.url = options.url || '';
};

model.prototype.__defineGetter__( 'url', () => {
  return io.sails.url;
});
model.prototype.__defineSetter__( 'url', ( newUrl ) => {
  io.sails.url = newUrl;
});
model.prototype.__defineGetter__( 'headers', () => {
  return io.sails.headers;
});
model.prototype.__defineSetter__( 'headers', ( newHeader ) => {
  io.sails.headers = newHeader;
});

function assignOptions( options ) {
  io.sails.url = options.baseUrl || io.sails.url || getBaseUrl();
  io.sails.autoConnect = options.autoConnect || io.sails.autoConnect || 'true';
  io.sails.environment = options.environment || io.sails.environment || process.env.NODE_ENV;
  io.sails.headers = options.headers || io.sails.headers || { 'Content-Type': 'application/json' };
  // io.sails.headers='{ "x-csrf-token": "<%= typeof _csrf !== 'undefined' ? _csrf : '' %>" }'
}

model.prototype.assignOptions = function( options ) {
  return assignOptions( options );
};


[
  'get',
  'delete'
].forEach( method => {
  model.prototype[method] = function( query, options = {}){
    let data;
    if ( method === 'delete' && !query ){
      throw new Error( 'Should specify an id for deleting a record' );
    }
    if ( typeof query === 'object' ) {
      data = query;
    } else {
      if ( typeof query === 'string' && /\?/mig.test( query )){
        query = ( query ).replace( /^\?/mig, '' );
        query = `?${ query}`;
      }
    }
    options.url += ( query || '' );
    options.method = method.toUpperCase();
    
    return new Promise(( resolve ) => {
      io.socket.request( Object.assign({}, this.options, options ), resolve );
    });
  };
});

[
  'post',
  'put',
  'patch',
].forEach( method => {
  model.prototype[method] = function( data, options = {}){
    if ( !data ){
      throw new Error( 'Should include data for the POST operation' );
    }
    if ([ 'put', 'patch' ].includes( method ) && !data.id ){
      throw new Error( 'You have to privide an ID and some data to update a document.' );
    }
    let id = data.id || '';
    options.method = method.toUpperCase();
    options.body = JSON.stringify( data );
    return fetch( this.options.baseUrl + this.options.url + id, Object.assign({}, this.options, options ))
      .then( onSuccess, onError );
  };
});


function onSuccess( response ) {
  if ( response.status >= 200 && response.status < 300 ) {
    return response.json();
  } else {
    var error = new Error( response.statusText );
    error.response = response;
    throw error;
  }
}

function onError( error ) {
  throw error;
}

export default model;

//*******************************************
// Expose for testing
//*******************************************
if ( process.env.NODE_ENV === 'test' ) {
  global.moduleTests = global.moduleTests || {};
  global.moduleTests['modeljs'] = {
    onSuccess,
    onError
  };
}
