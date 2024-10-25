import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { createCredentialAdaptor, getSchemasAdaptor, SchemaRes } from 'src/core/adaptors';
import { CredentialClaims } from 'src/core/api';

export const useCreate = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const [step, setStep] = useState(0);
  const [currentSchemaList, setCurrentSchemaList] = useState(schemaList);
  const currentList = currentSchemaList?.items || [];
  const totalPage = Math.ceil((currentSchemaList?.total || 1) / (currentSchemaList?.limit || 10));
  const [page, setPage] = useState(1);
  const [claims, setClaims] = useState<CredentialClaims[]>([]);
  const [selectedSchema, setSelectedSchema] = useState(
    (currentList[0]?.disabled ? currentList[1]?.id : currentList[0]?.id) || '',
  );
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const selectedSchemaDetail = currentList.find(schema => schema.id === selectedSchema);
  const formRef = useRef<{ submitForm: () => void }>(null);

  const schemaRadioItems = currentList.map(schema => ({
    id: schema.id,
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

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getSchemasAdaptor(newPage);
    data && setCurrentSchemaList(data);
  };

  return {
    data: {
      translate,
      step,
      schemaRadioItems,
      selectedSchema,
      totalPage,
      page,
      schemaAttributes,
      schemaInfo,
      formRef,
      selectedRecipient,
      disabledButton,
    },
    operations: { onCancelCreate, setSelectedSchema, onChangePage, handleContinue, onSubmitClaims, onSelectRecipient },
  };
};
