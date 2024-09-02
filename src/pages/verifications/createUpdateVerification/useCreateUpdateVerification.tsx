import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  AdaptorRes,
  createVerification,
  getSchemasAdaptor,
  SuccessRes,
  updateVerification,
  UpdateVerificationReq,
  Verification,
  VerificationReq,
} from 'src/core/adaptors';
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
  const loaderData = useLoaderData() as AdaptorRes<Verification>;
  const verification = loaderData?.data;
  const [schemaList, setSchemaList] = useState<{ label: string; value: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const setFormValue = () => {
    if (!verification) return;
    const initialVal = {
      name: verification.name,
      description: verification.description,
      schema: { value: verification.schema.id, label: verification.schema.name },
    };
    reset(initialVal);
  };

  const initializeValues = async () => {
    const res = await getSchemasAdaptor(1, 10);
    if (res.error)
      setError('schema', {
        type: 'manual',
        message: res.error,
      });
    else if (res.data) {
      const options = res.data.items.map(item => {
        return { value: item.id, label: item.name };
      });
      setSchemaList(options);
      setFormValue();
    }
  };

  useEffect(() => {
    initializeValues();
  }, [verification]);

  const onSelectSchema = schema => {
    setValue('schema', schema, { shouldValidate: true });
  };

  const onCancel = () => {
    navigate('/verifications');
  };

  const onSubmit = async () => {
    const { name, description, schema } = getValues();
    let res: AdaptorRes<SuccessRes> | null = null;
    if (verification?.id) {
      const param: UpdateVerificationReq = {
        id: verification.id,
        name,
        description,
        schemaId: schema.value,
      };
      res = await updateVerification(param);
    } else {
      const param: VerificationReq = {
        name,
        description,
        schemaId: schema.value,
      };
      res = await createVerification(param);
    }

    if (!res?.error) navigate('/verifications');
  };

  return {
    register,
    errors,
    onSelectSchema,
    schemaList,
    schema: getValues().schema,
    onCancel,
    onSubmit,
    handleSubmit,
    verification,
  };
};
