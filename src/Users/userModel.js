// import model from '../Api/model';
import { createNew } from 'trutils';
let instance;
let userModel = function( modelInstance ){
  if ( !instance ){
    instance = createNew( modelInstance );// || model, { url: 'user/' });
  }
  return instance;
};
export default userModel;