import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SchemaRes } from 'src/core/adaptors';

export const useSchemas = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const { items: list } = schemaList || [];
  const [currentList, setCurrentList] = useState(list);

  const onCreateSchema = () => navigate('create');

  return {
    data: { translate, currentList },
    operations: {
      onCreateSchema,
      setCurrentList,
    },
  };
};
