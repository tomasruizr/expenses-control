/**
 * Module that represent the prototype for the models.
 * Exposes methods 'get', 'post', 'put', 'patch', 'delete' based on fetch.
 * In case you want to implement with some other library like axios, make the change here.
 */
import 'whatwg-fetch';
import getBaseUrl from './baseUrl';
import { stringify } from 'querystring';

let model = function( options = {}){
  this.options = Object.assign({},{
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    baseUrl: getBaseUrl(),
    url: ''
  }, options );
};

[
  'get',
  'delete'
].forEach( method => {
  model.prototype[method] = function( query, options = {}){
    if ( method === 'delete' && !query ){
      throw new Error( 'Should specify an id for deleting a record' );
    }
    if ( typeof query === 'object' ) {
      query = `?${ stringify( query )}`;
    } else {
      if ( typeof query === 'string' && /\?/mig.test( query )){
        query = ( query ).replace( /^\?/mig, '' );
        query = `?${ query}`;
      }
    }
    query = query || '';
    options.method = method.toUpperCase();
    return fetch( this.options.baseUrl + this.options.url + query, Object.assign({}, this.options, options ))
      .then( onSuccess, onError );
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
