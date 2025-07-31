import credential from './credentials/credential.json';
import credentialCreate from './credentials/credentialCreate.json';
import credentialEmpty from './credentials/credentialEmpty.json';
import layout from './general/layout.json';
import pagination from './general/pagination.json';
import uploader from './general/uploader.json';
import integration from './integrations/integration.json';
import intro from './intro/intro.json';
import kyb from './kyb/kyb.json';
import orgProfile from './organizations/organizations.json';
import schema from './schemas/schema.json';
import schemaCreate from './schemas/schemaCreate.json';
import settings from './settings/settings.json';
import verificationCreate from './verifications/create.json';
import verificationList from './verifications/list.json';
import proofRequest from './verifications/proofRequest.json';

export function generateTranslationFile() {
  return Object.assign(
    {},
    layout,
    pagination,
    uploader,
    intro,
    schema,
    schemaCreate,
    orgProfile,
    settings,
    verificationList,
    verificationCreate,
    proofRequest,
    credential,
    credentialCreate,
    credentialEmpty,
    kyb,
    integration,
  );
}
