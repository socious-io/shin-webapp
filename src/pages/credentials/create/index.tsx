import { Divider } from '@mui/material';
import PreviewCredential from 'src/modules/Credential/containers/PreviewCredential';
import SchemaCredentialList from 'src/modules/Credential/containers/SchemaCredentialList';
import SelectSchema from 'src/modules/Credential/containers/SelectSchema';
import Button from 'src/modules/General/components/Button';
import PaginationDotGroup from 'src/modules/General/components/PaginationDotGroup';
import PaginationNumbers from 'src/modules/General/components/PaginationNumbers';

import css from './index.module.scss';
import { useCreate } from './useCreate';

export const Create = () => {
  const {
    data: {
      translate,
      step,
      totalPage,
      page,
      schemaRadioItems,
      selectedSchema,
      selectedSchemaDetail,
      schemaCredentialList,
      disabledButton,
      formRef,
      schemaCredentialDetail,
    },
    operations: {
      onBackCreate,
      handleContinue,
      onChangePage,
      setSelectedSchema,
      onUpdateSchemaCredentialList,
      onSendCredential,
    },
  } = useCreate();

  const content = {
    1: (
      <SelectSchema
        schemaRadioItems={schemaRadioItems}
        selectedSchema={selectedSchema}
        onSelectSchema={setSelectedSchema}
      />
    ),
    2: selectedSchemaDetail && (
      <SchemaCredentialList
        selectedSchema={selectedSchemaDetail}
        schemaCredentialList={schemaCredentialList}
        onUpdateSchemaCredentialList={onUpdateSchemaCredentialList}
      />
    ),
    3: (
      <PreviewCredential ref={formRef} credentialDetail={schemaCredentialDetail} onSendCredential={onSendCredential} />
    ),
  };

  return (
    <div className={css['container']}>
      <PaginationDotGroup
        shape="oval"
        titles={[
          translate('credential-step1-title'),
          translate('credential-step2-title'),
          translate('credential-step3-title'),
        ]}
        count={3}
        active={step - 1}
        size="xs"
        transparent
        highlightPrevSteps
        containerClassName="flex-col md:flex-row"
        customStyle={css['pagination']}
      />
      <div className={css['content']}>{content[step]}</div>
      {step === 1 && <PaginationNumbers count={totalPage} page={page} onChange={(_, p) => onChangePage(p)} />}
      <Divider />
      <div className={css['buttons']}>
        <Button color="primary" variant="outlined" onClick={onBackCreate}>
          {translate('credential-back-button')}
        </Button>
        <Button color="primary" onClick={handleContinue} disabled={disabledButton}>
          {step === 1 ? translate('credential-continue-button') : translate('credential-send-button')}
        </Button>
      </div>
    </div>
  );
};
