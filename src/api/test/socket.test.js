import { assert } from 'chai';
import Socket from '../socket';
import { createNew } from 'trutils';
import env from '../../../config/env';

let socket; 
describe( 'socket of some resource', function() {
  before(( done ) => {
    socket = createNew( Socket, { baseUrl: env.api , url:'/test', useCORSRouteToGetCookie:false });
    socket.io.on( 'connect', done );
  });
  after(() => {
    socket.io.disconnect();
  });
  describe( 'socket properties and methods', function() {
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
        assert.equal( e.status,400 );
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
  describe( 'http methods', function() {
    describe( 'methods call', function() {
      describe( 'get', function() {
        before(( done ) => {
          Promise.all([
            new Promise(( resolve ) => {
              socket.io.post( '/test', { id:123, name:'test1' }, () => {
                resolve();
              });
            }),
            new Promise(( resolve ) => {
              socket.io.post( '/test', { id:124, name:'test2' }, () => {
                resolve();
              });
            })
          ]).then(() => {
            done();
          });
        });
        after(( done ) => {
          Promise.all([
            new Promise(( resolve ) => {
              socket.io.delete( '/test/123', () => {
                resolve();
              });
            }),
            new Promise(( resolve ) => {
              socket.io.delete( '/test/124', () => {
                resolve();
              });
            })
          ]).then(() => {
            done();
          });
        });
        
        it( `call the method get for the socket with no params`, function( done ) {
          socket.get().then(( response ) => {
            assert.equal( response.status, 200 );
            assert.equal( response.body.length, 2 );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
        it( `call the method get for the socket with id`, function( done ) {
          socket.get( 123 ).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.equal( response.body.id, 123 );
            assert.equal( response.body.name, 'test1' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
        it( `call the method get for the socket with params`, function( done ) {
          socket.get({ name:'test1' }).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.equal( response.body[0].id, 123 );
            assert.equal( response.body[0].name, 'test1' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
      });

      describe( 'post', function() {
        after(( done ) => {
          socket.io.delete( '/test/123', () => {
            done();
          });
        });
        
        it( `call the method post for the socket`, function( done ) {
          socket.post({ id: 123, name:'asdf' }).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.equal( response.body.id, 123 );
            assert.equal( response.body.name, 'asdf' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
      });

      describe( 'put and patch', function() {
        before(( done ) => {
          Promise.all([
            new Promise(( resolve ) => {
              socket.io.post( '/test', { id:123, name:'test1' }, () => {
                resolve();
              });
            }),
            new Promise(( resolve ) => {
              socket.io.post( '/test', { id:124, name:'test2' }, () => {
                resolve();
              });
            })
          ]).then(() => {
            done();
          });
        });
        after(( done ) => {
          Promise.all([
            new Promise(( resolve ) => {
              socket.io.delete( '/test/123', () => {
                resolve();
              });
            }),
            new Promise(( resolve ) => {
              socket.io.delete( '/test/124', () => {
                resolve();
              });
            })
          ]).then(() => {
            done();
          });
        });
        
        it( `call the method put for the socket`, function( done ) {
          socket.put({ id: 123, name:'changed' }).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.equal( response.body.id, 123 );
            assert.equal( response.body.name, 'changed' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
        it( `call the method patch for the socket`, function( done ) {
          socket.patch({ id: 124, name:'changed' }).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.equal( response.body.id, 124 );
            assert.equal( response.body.name, 'changed' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
      });

      describe( 'delete', function() {
        before(( done ) => {
          Promise.all([
            new Promise(( resolve ) => {
              socket.io.post( '/test', { id:123, name:'test1' }, () => {
                resolve();
              });
            }),
            new Promise(( resolve ) => {
              socket.io.post( '/test', { id:124, name:'test2' }, () => {
                resolve();
              });
            })
          ]).then(() => {
            done();
          });
        });
        it( `call the method delete for the socket with integer as id`, function( done ) {
          socket.delete( 123 ).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.typeOf( response.body , 'object' );
            assert.equal( response.body.id , '123' );
            assert.equal( response.body.name , 'test1' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
        it( `call the method delete eor the socket with object param`, function( done ) {
          socket.delete({ id:124 }).then(( response ) => {
            assert.equal( response.status, 200 );
            assert.typeOf( response.body , 'object' );
            assert.equal( response.body.id , '124' );
            assert.equal( response.body.name , 'test2' );
            done();
          })
            .catch(( err ) => {
              done( err );
            });
        });
      });
    });
  });
});
describe( 'on event', function() {
  before(( done ) => {
    socket = createNew( Socket, { baseUrl: env.api, url:'/test' });
    socket.io.on( 'connect', () => {
      socket.io.get( '/test', () => {
        done();
      });
    });
  });
  after(() => {
    socket.io.disconnect();
  });
  it( 'subscribe to a model', ( done ) => {
    socket.on( 'test', ( data ) => {
      assert.exists( data );
      assert.equal( data.verb, 'created' );
      assert.equal( data.id, 34 );
      assert.equal( data.data.id, 34 );
      assert.equal( data.data.name, 'onEvent' );
      socket.io.delete( `/test/${data.data.id}`, () => {
        done();
      });
    });
    fetch( `${env.api}/test?name=onEvent&id=34`,{ method:'POST' });
  });
});
