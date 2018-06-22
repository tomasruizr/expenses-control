import { assert } from 'chai';
import Socket from '../socket';
import { createNew } from 'trutils';

let socket;
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
describe.only( 'socket of some resource', function() {
  before(( done ) => {
    socket = createNew( Socket, { baseUrl:'http://localhost:1337/', url:'/operation/' });
    socket.io.on( 'connect', done );
  });
  after(() => {
    socket.io.disconnect();
  });
  describe.only( 'socket properties and methods', function() {
    it( 'contains the http methods as functions', function() {
      assert.exists( socket.get );
      assert.exists( socket.post );
      assert.exists( socket.put );
      assert.exists( socket.patch );
      assert.exists( socket.delete );
    });
    it( 'contains headers, and url properties to exist', function() {
      assert.exists( socket.io.url );
      assert.exists( socket.options.headers );
    });
    it( 'contains default values for headers', function() {
      assert.deepEqual( socket.options.headers, { 'Content-Type': 'application/json' });
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
    // before(() => {

    // });
    // after();

    describe.only( 'methods call', function() {
      [
        'get',
        // 'post',
        // 'put',
        // 'patch',
        // 'delete'
      ].forEach( method => {
        it( `call the method ${method} for the socket`, function( done ) {
          socket[method]( ...params[method]).then(( response ) => {
            assert.equal( response.statusCode, 200 );
            assert.exists( response.headers );
            assert.isTrue( response.body.length > 1 );
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
        socket[method]( '?name=tomas' ).then(() => {
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
        socket[method]({
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
        socket[method]( 12 ).then(() => {
          done();
        }).catch(( err ) => {
          done( err );
        });
      });
    });
  });
});
