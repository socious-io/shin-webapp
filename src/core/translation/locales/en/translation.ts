import fileUploader from './fileUploader.json';
import orgProfile from './orgProfile/orgProfile.json';
import schema from './schema/schema.json';
import schemaCreate from './schema/schemaCreate.json';
import settings from './settings/settings.json';
import signIn from './signIn.json';
import detail from './signUp/detail.json';
import profile from './signUp/profile.json';
import stepper from './signUp/stepper.json';
import verification from './signUp/verification.json';

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
    settings,
  );
}
