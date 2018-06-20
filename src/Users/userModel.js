import model from '../Api/model';
import { createNew } from 'trutils';

const userModel = createNew( model, { url: 'user/' });
export default userModel;