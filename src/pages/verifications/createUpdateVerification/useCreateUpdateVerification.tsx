import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  AdaptorRes,
  Attribute,
  createVerificationAdaptor,
  getSchemasAdaptor,
  OperatorValue,
  OptionType,
  Schema,
  SuccessRes,
  updateVerificationAdaptor,
  UpdateVerificationReq,
  Verification,
  VerificationAttribute,
  VerificationReqAdaptor,
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
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as AdaptorRes<Verification>;
  const verification = loaderData?.data;
  const [schemaRes, setSchemaRes] = useState<Schema[]>([]);
  const [schemaList, setSchemaList] = useState<{ label: string; value: string }[]>([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [attributes, setAttributes] = useState<OptionType[]>([]);
  const [addedAttributes, setAddedAttributes] = useState<VerificationAttribute[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
    reset,
    watch,
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
      setSchemaRes(res.data.items);
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
    const selectedSchema = schemaRes.find(item => item.id === schema.value);
    selectedSchema?.attributes &&
      setAttributes(
        selectedSchema.attributes.map(item => {
          return {
            value: item.id,
            label: item.description || item.name,
          };
        }),
      );
    setAddedAttributes([]);
  };

  const onCancel = () => {
    navigate('/verifications');
  };

  const onSubmit = async () => {
    if (addedAttributes.filter(item => item.errors && Object.keys(item.errors).map(e => e)).length) return;
    const { name, description, schema } = getValues();
    let res: AdaptorRes<SuccessRes> | null = null;
    if (verification?.id) {
      const param: UpdateVerificationReq = {
        id: verification.id,
        name,
        description,
        schemaId: schema.value,
      };
      res = await updateVerificationAdaptor(param);
    } else {
      const param: VerificationReqAdaptor = {
        name,
        description,
        schemaId: schema.value,
      };
      res = await createVerificationAdaptor(param);
    }

    if (!res?.error) navigate('/verifications');
  };

  const name = watch('name');
  const description = watch('description');

  const onChangeAttribute = (index: number, attribute?: OptionType, operator?: OptionType, value?: string | number) => {
    setAddedAttributes(prevAttributes =>
      prevAttributes.map((atr, i) => {
        if (i !== index) return atr;

        const errors = {
          attribute: atr.errors?.attribute || '',
          operator: atr.errors?.operator || '',
          value: atr.errors?.value || '',
        };

        if (!atr.id) errors['attribute'] = 'Required';
        if (attribute && prevAttributes.some(item => item.id === attribute.value))
          errors['attribute'] = 'This attribute is duplicate';
        if (!atr.operator) errors['operator'] = 'Required';
        if (!atr.value) errors['value'] = 'Required';

        return {
          ...atr,
          ...(attribute && { id: attribute.value, name: attribute.label }),
          ...(operator && { operator: operator.value as OperatorValue }),
          ...(value !== undefined && { value }),
          errors,
        };
      }),
    );
  };
  const onDeleteAttribute = (index: number) => setAddedAttributes(prev => prev.filter((_, i) => i !== index));

  const handleClickAddAttribute = () => {
    setAddedAttributes([
      ...addedAttributes,
      {
        id: '',
        name: '',
        operator: 'EQUAL',
        value: '',
      },
    ]);
  };

  return {
    data: {
      errors,
      schemaList,
      schema: getValues().schema,
      verification,
      openPreview,
      name,
      description,
      attributes,
      addedAttributes,
    },
    operation: {
      register,
      onSelectSchema,
      onCancel,
      onSubmit,
      handleSubmit,
      setOpenPreview,
      translate,
      onChangeAttribute,
      handleClickAddAttribute,
      onDeleteAttribute,
    },
  };
};
