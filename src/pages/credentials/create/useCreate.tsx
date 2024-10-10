import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { createCredentialAdaptor, SchemaRes } from 'src/core/adaptors';
import { CredentialClaims } from 'src/core/api';

export const useCreate = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const schemas = schemaList?.items || [];
  const [step, setStep] = useState(0);
  const [claims, setClaims] = useState<CredentialClaims[]>([]);
  const [selectedSchema, setSelectedSchema] = useState(schemas[0]?.id || '');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const selectedSchemaDetail = schemas.find(schema => schema.id === selectedSchema);
  const formRef = useRef<{ submitForm: () => void }>(null);

  const schemaRadioItems = schemas.map(schema => ({
    title: schema.name,
    description: schema?.description || '',
    value: schema.id,
    disabled: schema.disabled,
  }));
  const schemaAttributes = selectedSchemaDetail?.attributes || [];
  const schemaInfo = { title: selectedSchemaDetail?.name || '', description: selectedSchemaDetail?.description || '' };
  const disabledButton = step === 2 ? !selectedRecipient : false;

  const onCancelCreate = () => navigate('/credentials');

  const handleContinue = () => {
    if (step === 1 && formRef.current) {
      formRef.current.submitForm();
    } else if (step === 2) {
      onSendCredential();
    } else {
      setStep(step + 1);
    }
  };

  const onSubmitClaims = (claims: CredentialClaims[]) => {
    setClaims(claims);
    setStep(step + 1);
  };

  const onSelectRecipient = (id: string) => {
    //FIXME: for now because bulk action is out of scope of this PR
    if (selectedRecipient === id) {
      setSelectedRecipient('');
    } else {
      setSelectedRecipient(id);
    }
  };

  const onSendCredential = async () => {
    const { error } = await createCredentialAdaptor({
      name: selectedSchemaDetail?.name || '',
      description: selectedSchemaDetail?.description || '',
      selectedSchema,
      selectedRecipient,
      claims,
    });
    if (error) return;
    navigate('/credentials');
  };

  return {
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
  };
};
