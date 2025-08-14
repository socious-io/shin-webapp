import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import {
  CredentialsRes,
  getCredentialsAdaptor,
  getSchemaAdaptor,
  getSchemasAdaptor,
  Schema,
  SchemaRes,
  sendCredentialsAdaptors,
} from 'src/core/adaptors';

export const useCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const formRef = useRef<{ submitForm: () => void }>(null);
  const defaultStep = Number(searchParams.get('step') || 1);
  const [step, setStep] = useState(defaultStep);
  const [currentSchemaList, setCurrentSchemaList] = useState(schemaList);
  const [page, setPage] = useState(1);
  const currentList = currentSchemaList?.items || [];
  const totalPage = Math.ceil((currentSchemaList?.total || 1) / (currentSchemaList?.limit || 10));
  const defaultSchemaId =
    searchParams.get('schema') || (currentList[0]?.disabled ? currentList[1]?.id : currentList[0]?.id) || '';
  const [selectedSchemaId, setSelectedSchemaId] = useState(defaultSchemaId);
  const [selectedSchemaDetail, setSelectedSchemaDetail] = useState<Schema>();
  const [schemaCredentialList, setSchemaCredentialList] = useState<CredentialsRes | null>(null);
  const schemaRadioItems = currentList.map(schema => ({
    id: schema.id,
    title: schema.name,
    description: schema?.description || '',
    value: schema.id,
    disabled: schema.disabled,
  }));
  const schemaCredentialDetail = {
    name: selectedSchemaDetail?.name || '',
    issuer: schemaCredentialList?.items[0]?.issuer || '',
  };
  const disabledButton = step == 2 && !(schemaCredentialList?.items || []).length;

  useEffect(() => {
    if (step === 2) {
      getSelectedSchemaDetail(selectedSchemaId);
      onUpdateSchemaCredentialList(1);
    }
  }, [step]);

  const navigateToStep = (newStep: number) => {
    setStep(newStep);
    const path = newStep === 1 ? '/credentials/create' : `?schema=${selectedSchemaId}&step=${newStep}`;
    navigate(path);
  };

  const onBackCreate = () => navigateToStep(step - 1);

  const handleContinue = () => {
    if (step === 3 && formRef.current) {
      formRef.current.submitForm();
      return;
    }
    navigateToStep(step + 1);
  };

  const getSelectedSchemaDetail = async (schemaId: string) => {
    const { data, error } = await getSchemaAdaptor(schemaId);
    if (error) return;
    data && setSelectedSchemaDetail(data);
  };

  const onUpdateSchemaCredentialList = async (newPage: number) => {
    const { data } = await getCredentialsAdaptor(newPage, 10, {
      schema_id: selectedSchemaId,
    });
    data && setSchemaCredentialList(data);
  };

  const onSendCredential = async (message?: string) => {
    const payload = {
      schema_id: selectedSchemaId,
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
      step,
      totalPage,
      page,
      schemaRadioItems,
      selectedSchemaId,
      selectedSchemaDetail,
      schemaCredentialList,
      formRef,
      schemaCredentialDetail,
      disabledButton,
    },
    operations: {
      onBackCreate,
      handleContinue,
      onChangePage,
      setSelectedSchemaId,
      onUpdateSchemaCredentialList,
      onSendCredential,
    },
  };
};
