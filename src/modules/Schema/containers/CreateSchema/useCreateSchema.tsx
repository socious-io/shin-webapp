import { yupResolver } from '@hookform/resolvers/yup';
import { useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SCHEMA_ATTRIBUTES } from 'src/constants/SCHEMA';
import { AdaptorRes, AttributeOption, createSchemaAdaptor, Schema, SchemaReq } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(translate('schema-required-error')),
    description: yup.string(),
    attributes: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(translate('schema-required-error')),
          option: yup
            .object()
            .shape({
              label: yup.string(),
              value: yup.string().required(translate('schema-required-error')),
            })
            .required(),
          description: yup.string(),
        }),
      )
      .required(),
  })
  .required();

export const useCreateSchema = ref => {
  const navigate = useNavigate();
  const defaultSchema = (useLoaderData() as AdaptorRes<Schema>)?.data;
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: defaultSchema
      ? {
          ...defaultSchema,
          attributes: defaultSchema.attributes.map(item => {
            return {
              name: item.name,
              description: item.description,
              option: { value: item.option.value, label: translate(`schema-attribute.${item.option.value}`) },
            };
          }),
        }
      : {
          attributes: [{ name: '', option: { value: '' }, description: '' }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const attributes = watch('attributes');
  const backToSchemasPage = () => navigate('/schemas');

  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onPublish)(),
  }));

  const onPublish = () => {
    if (!Object.keys(errors).length) setOpenPublishModal(true);
  };

  const onSubmit = async (formData: SchemaReq) => {
    const { error } = await createSchemaAdaptor(formData);
    if (error) return;
    setOpenPublishModal(false);
    backToSchemasPage();
  };

  const onSelectAttributeOption = (index: number, newOption: AttributeOption) => {
    setValue(`attributes.${index}.option`, newOption);
  };

  const addField = () => {
    append({ name: '', option: { value: '' }, description: '' });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const schemaAttributeOptions = SCHEMA_ATTRIBUTES.map(item => {
    return { value: item.value, label: translate(`schema-attribute.${item.value}`) };
  });

  return {
    data: { translate, register, errors, fields, attributes, openPublishModal, schemaAttributeOptions },
    operations: {
      handleSubmit,
      onPublish,
      onSubmit,
      onSelectAttributeOption,
      setOpenPublishModal,
      backToSchemasPage,
      addField,
      removeField,
    },
  };
};
