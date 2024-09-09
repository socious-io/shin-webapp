import fileUploader from './fileUploader.json';
import forgetPassword from './forgetPassword.json';
import orgProfile from './organizations/organizations.json';
import schema from './schemas/schema.json';
import schemaCreate from './schemas/schemaCreate.json';
import settings from './settings/settings.json';
import signIn from './signIn.json';
import detail from './singUp/detail.json';
import profile from './singUp/profile.json';
import stepper from './singUp/stepper.json';
import verification from './singUp/verification.json';
import verificationCreate from './verifications/create.json';
import verificationList from './verifications/list.json';
import proofRequest from './verifications/proofRequest.json';

export function generateTranslationFile() {
  return Object.assign(
    {},
    signIn,
    verification,
    detail,
    stepper,
    profile,
    fileUploader,
    forgetPassword,
    schema,
    schemaCreate,
    orgProfile,
    settings,
    verificationList,
    verificationCreate,
    proofRequest,
  );
}
