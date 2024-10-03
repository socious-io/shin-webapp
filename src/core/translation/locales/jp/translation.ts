import credential from './credentials/credential.json';
import credentialCreate from './credentials/credentialCreate.json';
import fileUploader from './fileUploader.json';
import forgetPassword from './forgetPassword.json';
import layout from './general/layout.json';
import pagination from './general/pagination.json';
import kyb from './kyb/kyb.json';
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
    pagination,
    layout,
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
    credential,
    credentialCreate,
    kyb,
  );
}
