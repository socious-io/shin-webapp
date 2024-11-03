import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  CredentialsRes,
  getCredentialsAdaptor,
  getSchemasAdaptor,
  SchemaRes,
  sendCredentialsAdaptors,
} from 'src/core/adaptors';

export const useCreate = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const [step, setStep] = useState(0);
  const [currentSchemaList, setCurrentSchemaList] = useState(schemaList);
  const currentList = currentSchemaList?.items || [];
  const totalPage = Math.ceil((currentSchemaList?.total || 1) / (currentSchemaList?.limit || 10));
  const [page, setPage] = useState(1);
  const [selectedSchema, setSelectedSchema] = useState(
    (currentList[0]?.disabled ? currentList[1]?.id : currentList[0]?.id) || '',
  );
  const [schemaCredentialList, setSchemaCredentialList] = useState<CredentialsRes | null>(null);
  const schemaRadioItems = currentList.map(schema => ({
    id: schema.id,
    title: schema.name,
    description: schema?.description || '',
    value: schema.id,
    disabled: schema.disabled,
  }));
  const selectedSchemaDetail = currentList.find(schema => schema.id === selectedSchema);
  const formRef = useRef<{ submitForm: () => void }>(null);
  const schemaCredentialDetail = {
    name: selectedSchemaDetail?.name || '',
    issuer: schemaCredentialList?.items[0]?.issuer || '',
  };
  const disabledButton = step == 1 && !(schemaCredentialList?.items || []).length;

  useEffect(() => {
    if (step === 1) onUpdateSchemaCredentialList(1);
  }, [step]);

  const onCancelCreate = () => navigate('/credentials');

  const handleContinue = () => {
    if (step === 0) {
      setStep(step + 1);
      navigate(`?schema=${selectedSchema}`);
    } else if (step === 2 && formRef.current) {
      formRef.current.submitForm();
    } else {
      setStep(step + 1);
    }
  };

  const onUpdateSchemaCredentialList = async (newPage: number) => {
    const { data } = await getCredentialsAdaptor(newPage, 10, {
      schema_id: selectedSchemaDetail?.id || '',
      sent: false,
    });
    data && setSchemaCredentialList(data);
  };

  const onSendCredential = async (message?: string) => {
    const payload = {
      schema_id: selectedSchemaDetail?.id || '',
      message,
    };
    const { error } = await sendCredentialsAdaptors(payload);
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
      totalPage,
      page,
      schemaRadioItems,
      selectedSchema,
      selectedSchemaDetail,
      schemaCredentialList,
      formRef,
      schemaCredentialDetail,
      disabledButton,
    },
    operations: {
      onCancelCreate,
      handleContinue,
      onChangePage,
      setSelectedSchema,
      onUpdateSchemaCredentialList,
      onSendCredential,
    },
  };
};
