/**
 * Module that represent the prototype for the models.
 * Exposes methods 'get', 'post', 'put', 'patch', 'delete' based on fetch.
 * In case you want to implement with some other library like axios, make the change here.
 */
// import socketIO from 'socket.io-client';
// import sailsIO from 'sails.io.js';
const socketIO = require( 'socket.io-client' );
const sailsIO = require( 'sails.io.js' );

import getBaseUrl from './baseUrl';
import { stringify } from 'querystring';

let socket = function( options = {}){
  let io; 
  if ( socketIO.sails ) {
    io = socketIO;
  } else {
    io = sailsIO( socketIO );
  }
  io.sails.transports = ['websocket'];
  io.sails.useCORSRouteToGetCookie = true;
  io.sails.reconnection = false;
  io.sails.autoConnect = false;
  this.io = io.sails.connect( options.baseUrl || getBaseUrl());
  delete options.baseUrl;
  this.options = Object.assign({},{
    headers: { 'Content-Type': 'application/json' },
    url: ''
  }, options );
};

// socket.prototype.__defineGetter__( 'url', function() {
//   return this.io.sails.url;
// });
// socket.prototype.__defineSetter__( 'url', function( newUrl ) {
//   this.io.sails.url = newUrl;
// });

// function assignOptions( options ) {
//   io.sails.url = options.baseUrl || io.sails.url || getBaseUrl();
//   io.sails.autoConnect = options.autoConnect || io.sails.autoConnect || 'true';
//   io.sails.environment = options.environment || io.sails.environment || process.env.NODE_ENV;
//   io.sails.headers = options.headers || io.sails.headers || { 'Content-Type': 'application/json' };
//   // io.sails.headers='{ "x-csrf-token": "<%= typeof _csrf !== 'undefined' ? _csrf : '' %>" }'
// }

// socket.prototype.assignOptions = function( options ) {
//   return assignOptions( options );
// };

socket.prototype.connect = function( server ) {
  this.io.sails.connect( server );
};


[
  'get',
  'delete'
].forEach( method => {
  socket.prototype[method] = function( data, options = {}){
    var self = this;
    // if ( method === 'delete' && !data ){
    //   throw new Error( 'Should specify an id for deleting a record' );
    // }
    options.method = method.toUpperCase();
    if ( data && typeof data !== 'object' ){
      options.url += data;
    }else {
      options.data = stringify( data ) || undefined;
    }
    options = Object.assign({}, this.options, options );
    return new Promise(( resolve ) => {
      self.io.request( options, ( body, JWR ) => {
        resolve ( JWR );
      });
    });
  };
});

[
  'post',
  'put',
  'patch',
].forEach( method => {
  socket.prototype[method] = function( data, options = {}){
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

export default socket;

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
