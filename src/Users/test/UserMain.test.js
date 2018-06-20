import { mount } from '@vue/test-utils';
import { assert } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
// import cheerio from 'cheerio';

fetchMock.getOnce( '*', []);
import user from '../userModel';
import UserMain from '../UserMain.vue';
let get, del;
describe( 'UserMain.vue', function() {
  before(() => {
    get = sinon.stub( user, 'get' ).callsFake(() => {
      return new Promise(( resolve ) => {
        resolve([{ id: 1,firstName:'Bob',lastName:'Smith',email:'bob@gmail.com' }]);
      });
    });
    del = sinon.stub( user, 'delete' ).callsFake(() => {
      return new Promise(( resolve ) => {
        resolve({ id: 1,firstName:'Bob',lastName:'Smith',email:'bob@gmail.com' });
      });
    });
  });
  after(() => {
    get.restore();
    del.restore();
  });
  
  
  describe( 'mounted', function() {
    it( 'init method', function ( done ) {
      const wrapper = mount( UserMain );
      wrapper.vm.init().then(() => {
        assert.deepEqual( wrapper.vm.$data.users, [{ id: 1,firstName:'Bob',lastName:'Smith',email:'bob@gmail.com' }]);
        done();
      });
    });
  });
  describe( 'listDelete', function() {
    it( 'should call user.delete', function () {
      const wrapper = mount( UserMain );
      wrapper.vm.listDelete( 1 );
      assert.equal( del.callCount, 1 );
    });
  });
  describe( 'listEdit', function() {
    it( 'sets isNew to False', function () {
      const wrapper = mount( UserMain );
      wrapper.vm.listEdit({ firtName:'asdf', lastName:'asdf', email:'asdf' });
      assert.equal( wrapper.vm.isNew, false );
    });
    it( 'sets editUser to the user parameter', function () {
      const wrapper = mount( UserMain );
      let user = { firtName:'asdf', lastName:'asdf', email:'asdf' };
      wrapper.vm.listEdit( user );
      assert.deepEqual( wrapper.vm.editUser, user );
    });
  });
  describe( 'editSaves', function() {
    const vm = mount( UserMain ).vm;
    // let user = { firtName:'asdf', lastName:'asdf', email:'asdf' };
    it( 'sets editUser to {}', function() {
      assert.deepEqual( vm.editUser, {});
    });
    it( 'calls user.post if this.isNew == true' );
  });
});
  
fetchMock.restore();