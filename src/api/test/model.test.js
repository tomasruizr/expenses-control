import { assert } from 'chai';
import Model from '../model';
import { createNew } from 'trutils';

let model;
let params = {
  get:[],
  post:[{ name: 'some name' }],
  put:[{ id:12, name: 'some name' }],
  patch:[{ id:12, name: 'some name' }],
  delete: [12]
};
let routeCalled = {
  get: '/resources/',
  post:'/resources/',
  put:'/resources/12',
  patch:'/resources/12',
  delete: `/resources/${ params.delete[0]}`
};
describe.only( 'model of some resource', function() {
  before(() => {
    model = createNew( Model );
  });
  describe.only( 'model properties and methods', function() {
    it( 'contains the http methods as functions', function() {
      assert.exists( model.get );
      assert.exists( model.post );
      assert.exists( model.put );
      assert.exists( model.patch );
      assert.exists( model.delete );
    });
    it( 'contains headers, and url properties to exist', function() {
      assert.exists( model.url );
      assert.exists( model.headers );
    });
    it( 'contains default values for headers', function() {
      assert.deepEqual( model.headers, { 'Content-Type': 'application/json' });
    });
  });
  
  describe.only( 'onSuccess', function() {
    it( 'should throw the error of the response if it reaches success function', function() {
      let onSuccess = global.moduleTests.modeljs.onSuccess;
      let response = {
        status: 400,
        statusText: 'There was a problem'
      };
      try{
        onSuccess( response );
        assert( false, 'you should not be here, throw fail.' );
      } catch ( e ){
        assert.equal( e.message, 'There was a problem' );
      }
    });
  });
  describe.only( 'onError', function() {
    it( 'should throw the error of the response', function() {
      let onError = global.moduleTests.modeljs.onError;
      try{
        onError( new Error( 'the error' ));
        assert( false, 'you should not be here, throw fail.' );
      } catch ( e ){
        assert.equal( e.message, 'the error' );
      }
    });
  });
  describe.only( 'methods', function() {
    before(() => {
      
    });
    after();

    describe.only( 'methods call', function() {
      [
        'get',
        // 'post',
        // 'put',
        // 'patch',
        // 'delete'
      ].forEach( method => {
        it( `call the method ${method} for the model`, function( done ) {
          model[method]( ...params[method]).then(() => {
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
      });
    });
  });
  describe( 'delete and get with query', function() {
    before(() => {
      
    });
    after();
    [
      'get',
      'delete'
    ].forEach( method => {
      it( `call the ${method} api with query params`, function( done ) {
        model[method]( '?name=tomas' ).then(() => {
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
  describe( 'delete and get with an object as query', function() {
    before(() => {
      
    });
    after();
    [
      'get',
      'delete'
    ].forEach( method => {
      it( `call the ${method} api with query params`, function( done ) {
        model[method]({
          where: '{"name":{"contains":"theodore"}}'
        }).then(() => {
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
  describe( 'delete and get with id', function() {
    before(() => {
      
    });
    after();
    [
      'get',
      'delete'
    ].forEach( method => {
      it( `call the ${method} api with id`, function( done ) {
        model[method]( 12 ).then(() => {
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
});
