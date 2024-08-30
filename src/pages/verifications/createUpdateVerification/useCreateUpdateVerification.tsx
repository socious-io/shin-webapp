import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { VerificationRes } from 'src/core/adaptors/verifications';
import { useVerification } from 'src/pages/signUp/verification/useVerification';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Required'),
    description: yup.string(),
    schema: yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required('Required'),
    }),
  })
  .required();

export const useCreateUpdateVerification = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as VerificationRes;
  const data = loaderData?.data;
  // TODO: get schema in loader data
  // const schemaList = loaderData.schemas.map(item => ({ label: item.name, value: item.id }));
  const schemaList = [
    { value: '1', label: 'schema 1' },
    { value: '2', label: 'schema 2' },
    { value: '3', label: 'schema 3' },
  ];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSelectSchema = schema => {
    setValue('schema', schema, { shouldValidate: true });
  };

  const onCancel = () => {
    navigate('/verifications');
  };

  return {
    register,
    errors,
    onSelectSchema,
    schemaList,
    schema: getValues().schema,
    onCancel,
  };
};
