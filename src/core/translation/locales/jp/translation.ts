import fileUploader from './fileUploader.json';
import orgProfile from './orgProfile/orgProfile.json';
import schema from './schema/schema.json';
import schemaCreate from './schema/schemaCreate.json';
import signIn from './signIn.json';
import detail from './singUp/detail.json';
import profile from './singUp/profile.json';
import stepper from './singUp/stepper.json';
import verification from './singUp/verification.json';

export function generateTranslationFile() {
  return Object.assign(
    {},
    signIn,
    verification,
    detail,
    stepper,
    profile,
    fileUploader,
    schema,
    schemaCreate,
    orgProfile,
  );
}
