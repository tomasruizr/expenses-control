import { assert } from 'chai';
import user from '../userModel';
import fetchMock from 'fetch-mock';
let params = {
  get:[],
  post:[{ name: 'some name' }],
  put:[{ id:12, name: 'some name' }],
  patch:[{ id:12, name: 'some name' }],
  delete: [12]
};
let routeCalled = {
  get: '/user/',
  post:'/user/',
  put:`/user/${ params.put[0].id}`,
  patch:`/user/${ params.patch[0].id}`,
  delete: `/user/${ params.delete[0]}`
};
describe( 'user model', function() {
  before(() => {
    fetchMock.mock( '*', {});
    user.options.baseUrl = '/';
  });
  after( fetchMock.restore );
  it( 'contains the http methods as functions in the model', function() {
    assert.exists( user.get );
    assert.exists( user.post );
    assert.exists( user.put );
    assert.exists( user.patch );
    assert.exists( user.delete );
  });
  [ 
    'get',
    'post',
    'put',
    'patch',
    'delete'
  ].forEach( method => {
    it( `maps correctly the function ${method} and the http method ${method.toUpperCase()}`, ( done ) => {
      user[method]( ...params[method]).then(() => {
        let call = fetchMock.lastCall( routeCalled[method], method.toUpperCase());
        assert( call, 'No calls made for method' );
        assert.equal( call[0], routeCalled[method]);
        assert.equal( call[1].method, method.toUpperCase());
        done();
      })
        .catch(( err ) => {
          done( err );
        });
    });
  });
});

