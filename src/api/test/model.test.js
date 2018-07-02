import { assert } from 'chai';
import Model from '../model';
import fetchMock from 'fetch-mock';
import { createNew } from 'trutils';
import { emit } from 'cluster';

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
describe( 'model of some resource', function() {
  before(() => {
    fetchMock.mock( '*', {});
    this.jsdom = require( 'jsdom-global' )();
    model = createNew( Model, { url:'resources/' });
  });
  after(() => {
    fetchMock.restore();
    this.jsdom();
  });
  it( 'contains the http methods as functions', function() {
    assert.exists( model.get );
    assert.exists( model.post );
    assert.exists( model.put );
    assert.exists( model.patch );
    assert.exists( model.delete );
  });
  it( 'contains headers, credentials, baseUrl, and url properties to exist', function() {
    assert.exists( model.options.headers );
    assert.exists( model.options.credentials );
    assert.exists( model.options.baseUrl );
    assert.exists( model.options.url );
  });
  it( 'contains default values for headers and credentials', function() {
    assert.deepEqual( model.options.headers, { 'Content-Type': 'application/json' });
    assert.equal( model.options.credentials, 'same-origin' );
  });
  describe( 'onSuccess', function() {
    it( 'should throw the error of the response if it reaches success function', function() {
      let onSuccess = global.moduleTests.modeljs.onSuccess;
      let response = {
        statusCode: 400,
        error: 'There was a problem'
      };
      try{
        onSuccess( response );
        assert( false, 'you should not be here, throw fail.' );
      } catch ( e ){
        assert.equal( e.message, 'There was a problem' );
      }
    });
  });
  describe( 'onError', function() {
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
  describe( 'methods', function() {
    before(() => {
      fetchMock.catch({});
      model.options.baseUrl = '/';
      model.options.url = 'resources/';
    });
    after( fetchMock.restore );

    [
      'get',
      'post',
      'put',
      'patch',
      'delete'
    ].forEach( method => {
      it( `call the method ${method} for the model`, function( done ) {
        model[method]( ...params[method]).then(() => {
          let call = fetchMock.lastCall( routeCalled[method], method.toUpperCase());
          assert( call, 'no call done for the method' );
          assert.equal( call[0], routeCalled[method]);
          assert.equal( call[1].method, method.toUpperCase());
          done();
        })
          .catch(( err ) => {
            done( err );
          });
      });
    });

    describe( 'Not contains body', () => {
      [
        'get',
        'delete'
      ].forEach( method => {
        it( method, function( done ) {
          model[method]( ...params[method]).then(() => {
            let call = fetchMock.lastCall( routeCalled[method], method.toUpperCase());
            assert( call, 'no call done for the method' );
            assert.equal( call[0], routeCalled[method]);
            assert.notExists( call[1].body );
            done();
          }).catch(( err ) => {
            done( err );
          });
        });
      });
    });

    describe( 'post, put, patch', function() {
      [
        'post',
        'put',
        'patch',
      ].forEach( method => {
        it( `${method } contains body`, function ( done ) {
          model[method]( ...params[method]).then(() => {
            let call = fetchMock.lastCall( routeCalled[method], method.toUpperCase());
            assert( call, 'no call done for the method' );
            assert.equal( call[0], routeCalled[method]);
            assert.exists( call[1].body );
            if ( method === 'post' )
              assert.equal( call[1].body, JSON.stringify({ name: 'some name' }));
            else
              assert.equal( call[1].body, JSON.stringify({ id:12, name: 'some name' }));
            done();
          }).catch(( err ) => {
            done( err );
          });
        });
      });
    });
  });
  describe( 'delete and get with query', function() {
    before(() => {
      fetchMock.mock( '/resources/', {}, {
        query: {
          name: 'tomas'
        }
      });
    });
    after( fetchMock.restore );
    [
      'get',
      'delete'
    ].forEach( method => {
      it( `call the ${method} api with query params`, function( done ) {
        model[method]( '?name=tomas' ).then(() => {
          let call = fetchMock.lastCall( '/resources/', method.toUpperCase());
          assert( call, 'no call done for the method' );
          assert.equal( call[0], '/resources/?name=tomas' );
          assert.notExists( call[1].body );
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
  describe( 'delete and get with an object as query', function() {
    before(() => {
      fetchMock.mock( '/resources/', {}, {
        query: {
          //   where: '%7B%22name%22%3A%7B%22contains%22%3A%22theodore%22%7D%7D'
          where: '{"name":{"contains":"theodore"}}'
        }
      });
    });
    after( fetchMock.restore );
    [
      'get',
      'delete'
    ].forEach( method => {
      it( `call the ${method} api with query params`, function( done ) {
        model[method]({
          where: '{"name":{"contains":"theodore"}}'
        }).then(() => {
          let call = fetchMock.lastCall( '/resources/', method.toUpperCase());
          assert( call, 'no call done for the method' );
          assert.equal( call[0], '/resources/?where=%7B%22name%22%3A%7B%22contains%22%3A%22theodore%22%7D%7D' );
          assert.notExists( call[1].body );
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
  describe( 'delete and get with id', function() {
    before(() => {
      fetchMock.mock( '/resources/12', {});
    });
    after( fetchMock.restore );
    [
      'get',
      'delete'
    ].forEach( method => {
      it( `call the ${method} api with id`, function( done ) {
        model[method]( 12 ).then(() => {
          let call = fetchMock.lastCall( '/resources/12', method.toUpperCase());
          assert( call, 'no call done for the method' );
          assert.equal( call[0], '/resources/12' );
          assert.notExists( call[1].body );
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
  describe( 'delete exceptions', function() {
    it( 'throws an error if no id provided', () => {
      try{
        model.delete();
      } catch ( e ){
        assert.equal( e.message, 'Should specify an id for deleting a record' );
      }
    });
  });
  describe( 'post, put and patch exceptions', function() {
    it( 'throws an error if no data is passed', () => {
      try{
        model.post();
      } catch ( e ){
        assert.equal( e.message, 'Should include data for the POST, PUT and PATCH operations' );
      }
      try{
        model.put();
      } catch ( e ){
        assert.equal( e.message, 'Should include data for the POST, PUT and PATCH operations' );
      }
      try{
        model.patch();
      } catch ( e ){
        assert.equal( e.message, 'Should include data for the POST, PUT and PATCH operations' );
      }
    });
    it( 'Put and Patch throws an error in data has no id property',() => {
      try{
        model.patch({ name: 'someName' });
      } catch ( e ){
        assert.equal( e.message, 'You have to privide an ID and some data to update a document.' );
      }
    });
  });
});
