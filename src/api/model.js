/**
 * Module that represent the prototype for the models.
 * Exposes methods 'get', 'post', 'put', 'patch', 'delete' based on fetch.
 * In case you want to implement with some other library like axios, make the change here.
 */
import 'whatwg-fetch';
import getBaseUrl from './baseUrl';
import { stringify } from 'querystring';

let model = function( options = {}){
  this.headers = options.headers || { 'Content-Type': 'application/json' };
  this.credentials = options.credentials || 'same-origin';
  this.baseUrl = options.baseUrl || getBaseUrl();
  this.url = options.url || '';
};
[
  'get',
  'post',
  'put',
  'patch',
  'delete'
].forEach( method => {
  model.prototype[method] = function( id, data, options = {}){
    let query = '';
    if ( method === 'post' ){
      options = data;
      data = id;
      if ( !data ){
        throw new Error( 'Should include data for the POST operation' );
      }
    }
    else if ( method === 'get' || method === 'delete' ){
      if ( method === 'delete' && !id ){
        throw new Error( 'Should specify an id for deleting a record' );
      }
      if ( typeof id === 'object' ) {
        query = `?${ stringify( id )}`;
      } else {
        if ( typeof id === 'string' ){
          id = ( id ).replace( /^\?/mig, '' );
          id = `?${ id}`;
        }
        query = id || '';
      }
      options = data;
    } else {
      if ( !id && !data ){
        throw new Error( 'You have to privide an ID and some data to update a document.' );
      }
      query = id;
    }
    options = Object.assign({
      method: method.toUpperCase(),
      body: JSON.stringify( data ),
      headers: this.headers,
      credentials: this.credentials
    }, options );
    if ( method === 'get' || method === 'delete' ){
      delete options.body;
    }

    return fetch( this.baseUrl + this.url + query, options )
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
