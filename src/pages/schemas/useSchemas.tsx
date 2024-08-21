import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SchemaRes } from 'src/core/adaptors';

export const useSchemas = () => {
  const navigate = useNavigate();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const { items: list } = schemaList || [];
  const [currentList, setCurrentList] = useState(list);

  const onCreateSchema = () => navigate('create');

  return {
    data: { currentList },
    operations: {
      onCreateSchema,
      setCurrentList,
    },
  };
};
