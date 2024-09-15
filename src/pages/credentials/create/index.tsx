import { Divider } from '@mui/material';
import RecipientList from 'src/modules/Credential/containers/RecipientList';
import SchemaAttributesForm from 'src/modules/Credential/containers/SchemaAttributesForm';
import SelectSchema from 'src/modules/Credential/containers/SelectSchema';
import Button from 'src/modules/General/components/Button';
import PaginationDotGroup from 'src/modules/General/components/PaginationDotGroup';

import css from './index.module.scss';
import { useCreate } from './useCreate';

export const Create = () => {
  const {
    data: {
      translate,
      step,
      schemaRadioItems,
      selectedSchema,
      schemaAttributes,
      schemaInfo,
      formRef,
      selectedRecipient,
      disabledButton,
    },
    operations: { onCancelCreate, setSelectedSchema, handleContinue, onSubmitClaims, onSelectRecipient },
  } = useCreate();

  const content = {
    0: (
      <SelectSchema
        schemaRadioItems={schemaRadioItems}
        selectedSchema={selectedSchema}
        onSelectSchema={setSelectedSchema}
      />
    ),
    1: selectedSchema && (
      <SchemaAttributesForm
        ref={formRef}
        schemaAttributes={schemaAttributes}
        schemaInfo={schemaInfo}
        onSubmitClaims={onSubmitClaims}
      />
    ),
    2: <RecipientList selectedRecipient={selectedRecipient} onSelectRecipient={onSelectRecipient} />,
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
        active={step}
        size="xs"
        transparent
        customStyle={css['pagination']}
      />
      <div className={css['content']}>{content[step]}</div>
      <Divider />
      <div className={css['buttons']}>
        <Button color="primary" variant="outlined" onClick={onCancelCreate}>
          {translate('credential-cancel-button')}
        </Button>
        <Button color="primary" onClick={handleContinue} disabled={disabledButton}>
          {step !== 2 ? translate('credential-continue-button') : translate('credential-send-button')}
        </Button>
      </div>
    </div>
  );
};
