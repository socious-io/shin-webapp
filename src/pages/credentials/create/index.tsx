import { Divider } from '@mui/material';
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
      selectedCredential,
      disabledButton,
      formRef,
    },
    operations: { onCancelCreate, handleContinue, onChangePage, setSelectedSchema, onSelectCredential },
  } = useCreate();

  const content = {
    0: (
      <SelectSchema
        schemaRadioItems={schemaRadioItems}
        selectedSchema={selectedSchema}
        onSelectSchema={setSelectedSchema}
      />
    ),
    1: selectedSchemaDetail && (
      <SchemaCredentialList
        selectedSchema={selectedSchemaDetail}
        selectedCredential={selectedCredential}
        onSelectCredential={onSelectCredential}
      />
    ),
    2: <p>Not developed yet</p>,
  };

  return (
    <div className={css['container']}>
      <PaginationDotGroup
        shape="oval"
        titles={[translate('credential-step1-title'), translate('credential-step2-title')]}
        count={2}
        active={step}
        size="xs"
        transparent
        highlightPrevSteps
        containerClassName="flex-col md:flex-row"
        customStyle={css['pagination']}
      />
      <div className={css['content']}>{content[step]}</div>
      {step === 0 && <PaginationNumbers count={totalPage} page={page} onChange={(_, p) => onChangePage(p)} />}
      <Divider />
      <div className={css['buttons']}>
        <Button color="primary" variant="outlined" onClick={onCancelCreate}>
          {translate('credential-cancel-button')}
        </Button>
        <Button color="primary" onClick={handleContinue} disabled={disabledButton}>
          {step === 0 ? translate('credential-continue-button') : translate('credential-send-button')}
        </Button>
      </div>
    </div>
  );
};
