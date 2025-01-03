import credential from './credentials/credential.json';
import credentialCreate from './credentials/credentialCreate.json';
import credentialEmpty from './credentials/credentialEmpty.json';
import forgetPassword from './forgetPassword.json';
import layout from './general/layout.json';
import pagination from './general/pagination.json';
import uploader from './general/uploader.json';
import integration from './integrations/integration.json';
import kyb from './kyb/kyb.json';
import orgProfile from './organizations/organizations.json';
import schema from './schemas/schema.json';
import schemaCreate from './schemas/schemaCreate.json';
import settings from './settings/settings.json';
import signIn from './signIn.json';
import detail from './signUp/detail.json';
import signUp from './signUp/email.json';
import profile from './signUp/profile.json';
import stepper from './signUp/stepper.json';
import verification from './signUp/verification.json';
import verificationCreate from './verifications/create.json';
import verificationList from './verifications/list.json';
import proofRequest from './verifications/proofRequest.json';

export function generateTranslationFile() {
  return Object.assign(
    {},
    layout,
    pagination,
    uploader,
    signIn,
    verification,
    detail,
    stepper,
    profile,
    forgetPassword,
    schema,
    schemaCreate,
    orgProfile,
    settings,
    verificationList,
    verificationCreate,
    proofRequest,
    signUp,
    credential,
    credentialCreate,
    credentialEmpty,
    kyb,
    integration,
  );
}
