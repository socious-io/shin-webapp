import fileUploader from './fileUploader.json';
import signIn from './signIn.json';
import detail from './signUp/detail.json';
import profile from './signUp/profile.json';
import stepper from './signUp/stepper.json';
import verification from './signUp/verification.json';

export function generateTranslationFile() {
  return Object.assign({}, signIn, verification, detail, stepper, profile, fileUploader);
}
