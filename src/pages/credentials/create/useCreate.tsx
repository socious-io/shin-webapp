import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { createCredentialAdaptor, getSchemasAdaptor, SchemaRes } from 'src/core/adaptors';

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
  const [selectedCredential, setSelectedCredential] = useState('');
  const selectedSchemaDetail = currentList.find(schema => schema.id === selectedSchema);
  const formRef = useRef<{ submitForm: () => void }>(null);
  const disabledButton = step === 1 && !selectedCredential;

  const schemaRadioItems = currentList.map(schema => ({
    id: schema.id,
    title: schema.name,
    description: schema?.description || '',
    value: schema.id,
    disabled: schema.disabled,
  }));

  const onCancelCreate = () => navigate('/credentials');

  const handleContinue = () => {
    if (step === 0) {
      setStep(step + 1);
      navigate(`?schema=${selectedSchema}`);
    } else if (step === 2) {
      onSendCredential();
    } else {
      setStep(step + 1);
    }
  };

  const onSelectCredential = (id: string) => {
    //FIXME: for now because bulk action is out of scope of this PR
    if (selectedCredential === id) {
      setSelectedCredential('');
    } else {
      setSelectedCredential(id);
    }
  };

  const onSendCredential = async () => {
    //TODO: send credential on step 3
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
      selectedCredential,
      disabledButton,
      formRef,
    },
    operations: { onCancelCreate, handleContinue, onChangePage, setSelectedSchema, onSelectCredential },
  };
};
