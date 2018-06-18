import model from '../Api/model';
import { createNew } from 'trutils';

const userModel = createNew( model );
userModel.url = 'user/';
export default userModel;