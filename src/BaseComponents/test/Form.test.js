describe( 'Form Prototype', function() {
  describe( 'reset', ()=>{
    it ( 'empties the fields' );
    it( 'clear the errors' );
  });
  describe( 'post', function() {
    it( 'calls the submit method with POST and the URL' );
  });
  describe( 'put', function() {
    it( 'calls the submit method with PUT and the URL' );
  });
  describe( 'patch', function() {
    it( 'calls the submit method with PATCH and the URL' );
  });
  describe( 'delete', function() {
    it( 'calls the submit method with DELETE and the URL' );
  });
  describe( 'submit', function() {
    it( 'calls onSuccess when operation successful' );
    it( 'returns a promise with the data of the operation in resolve' );
    it( 'calls onError when operation Fails' );
    it( 'returns a promise with the error data of the operation in reject' );
  });
  describe( 'onSuccess', function() {
    it( 'calls the reset method' );
  });
  describe( 'onError', function() {
    it( 'Adds the error to the errors array in data' );
  });
  
  
});
