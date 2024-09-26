import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  AdaptorRes,
  createVerificationAdaptor,
  getSchemasAdaptor,
  OptionType,
  Schema,
  SuccessRes,
  updateVerificationAdaptor,
  UpdateVerificationReq,
  Verification,
  VerificationReqAdaptor,
} from 'src/core/adaptors';
import { VerificationOperatorType } from 'src/core/api';
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
    attributes: yup
      .array()
      .min(1, 'Add at least one attribute')
      .of(
        yup.object().shape({
          id: yup.string().required('Required'),
          name: yup.string().required('Required'),
          operator: yup
            .mixed<VerificationOperatorType>()
            .oneOf(['EQUAL', 'NOT', 'BIGGER', 'SMALLER'])
            .required('Required'),
          value: yup.string().required('Required'),
        }),
      )
      .required('Required'),
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
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

  const setFormValue = (schemaList: Schema[]) => {
    if (!verification) return;
    const selectedSchema = schemaList.find(item => item.id === verification.schema.id);
    selectedSchema?.attributes &&
      setAttributes(
        selectedSchema.attributes.map(item => {
          return {
            value: item.id,
            label: item.description || item.name,
          };
        }),
      );
    const initialVal = {
      name: verification.name,
      description: verification.description,
      schema: { value: selectedSchema?.id, label: selectedSchema?.name },
      attributes: verification.attributes?.map(item => {
        return { ...item, name: selectedSchema?.attributes.find(atr => atr.id === item.id)?.name };
      }),
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
      setFormValue(res.data.items);
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
    setValue('attributes', [], { shouldValidate: true });
  };

  const onCancel = () => {
    navigate('/verifications');
  };

  const onSubmit = async () => {
    const { name, description, schema, attributes } = getValues();
    let res: AdaptorRes<SuccessRes> | null = null;
    if (verification?.id) {
      const param: UpdateVerificationReq = {
        id: verification.id,
        name,
        description,
        schemaId: schema.value,
        attributes: attributes,
      };
      res = await updateVerificationAdaptor(param);
    } else {
      const param: VerificationReqAdaptor = {
        name,
        description,
        schemaId: schema.value,
        attributes,
      };

      res = await createVerificationAdaptor(param);
    }

    setOpenSnackbar(true);
    if (!res?.error) {
      navigate('/verifications');
    }
  };

  const name = watch('name');
  const description = watch('description');

  const onChangeAttribute = (index: number, attribute?: OptionType, operator?: OptionType, value?: string) => {
    const newAttributes = getValues().attributes;
    if (attribute !== undefined) {
      newAttributes[index].id = attribute.value;
      newAttributes[index].name = attribute.label;
    }
    if (operator !== undefined) newAttributes[index].operator = operator.value as VerificationOperatorType;
    if (value !== undefined) newAttributes[index].value = value;
    setValue('attributes', newAttributes, { shouldValidate: true });
  };
  const onDeleteAttribute = (index: number) => {
    const newAttributes = getValues().attributes.filter((_, i) => i !== index);
    setValue('attributes', newAttributes, { shouldValidate: true });
  };

  const handleClickAddAttribute = () => {
    const newAttributes = [
      ...(getValues().attributes || []),
      {
        id: '',
        name: '',
        operator: 'EQUAL' as VerificationOperatorType,
        value: '',
      },
    ];
    setValue('attributes', newAttributes, { shouldValidate: true });
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
      verificationAttributes: getValues().attributes,
      openSnackbar,
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
      setOpenSnackbar,
    },
  };
};
