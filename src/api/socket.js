/**
 * Module that represent the prototype for the models.
 * Exposes methods 'get', 'post', 'put', 'patch', 'delete' based on fetch.
 * In case you want to implement with some other library like axios, make the change here.
 */
// import socketIO from 'socket.io-client';
// import sailsIO from 'sails.io.js';
const socketIO = require( 'socket.io-client' );
const sailsIO = require( 'sails.io.js' );

// import getBaseUrl from './baseUrl';
// import { stringify } from 'querystring';
let io;
if ( !io || !socketIO.sails ){
  io = sailsIO( socketIO );
} else {
  io = io || socketIO;
}
let ios = {};
let socket = function( options = {}){
  io.sails.transports = options.transports || ['websocket'];
  io.sails.useCORSRouteToGetCookie = options.useCORSRouteToGetCookie === false ? false : true;
  io.sails.reconnection = options.reconnection || false;
  io.sails.autoConnect = options.autoConnect || false;
  let baseUrl = options.baseUrl;
  this.io = ios[baseUrl] = ios[baseUrl] || Object.assign( io.sails.connect( baseUrl ));
  delete options.baseUrl;
  this.options = Object.assign({},{
    headers: { 'Content-Type': 'application/json' },
    url: ''
  }, options );
};
// socket.prototype.connect = function( server ) {
//   this.io.sails.connect( server );
// };

socket.prototype.on = function() {
  return this.io.on.apply( this.io, arguments );
};
socket.prototype.off = function() {
  return this.io.off.apply( this.io, arguments );
};
socket.prototype.connect = function() {
  return this.io.connect.apply( this.io, arguments );
};
socket.prototype.disconnect = function() {
  return this.io.disconnect.apply( this.io, arguments );
};

[
  'get',
  'post',
  'delete'
].forEach( method => {
  socket.prototype[method] = function( data, options = {}){
    var self = this;
    options = Object.assign({}, this.options, options );
    options.method = method.toUpperCase();
    if ( data && typeof data !== 'object' ){
      options.url += `/${ data}`;
    }else {
      options.data = data; //stringify( data ) || undefined;
    }
    return new Promise(( resolve, reject ) => {
      self.io.request( options, ( body, response ) => {
        if ( response.statusCode >= 200 && response.statusCode < 300 ) {
          return resolve({ body : response.body, status: response.statusCode });
        } else {
          return reject( response.body.code );
        }
      });
    });
  };
});

[
  'put',
  'patch',
].forEach( method => {
  socket.prototype[method] = function( data, options = {}){
    let self = this;
    if ( !data || typeof data !== 'object' ){
      throw new Error( 'Should include an object with the model as parameter' );
    }
    if ( !data.id ){
      throw new Error( 'You have to privide an ID and some data to update a document.' );
    }
    options = Object.assign({}, this.options, options );
    options.url += `/${ data.id}`;
    options.method = method.toUpperCase();
    options.data = data;
    return new Promise(( resolve, reject ) => {
      self.io.request( options, ( body, response ) => {
        if ( response.statusCode >= 200 && response.statusCode < 300 ) {
          return resolve({ body : response.body, status: response.statusCode });
        } else {
          return reject( response.body.code );
        }
      });
    });
  };
});

export default socket;

// //*******************************************
// // Expose for testing
// //*******************************************
// if ( process.env.NODE_ENV === 'test' ) {
//   global.moduleTests = global.moduleTests || {};
//   global.moduleTests['modeljs'] = {
//     onSuccess,
//     onError
//   };
// }
