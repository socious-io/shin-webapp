import { yupResolver } from '@hookform/resolvers/yup';
import { useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AttributeOption, createSchemaAdaptor, SchemaReq } from 'src/core/adaptors';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('This field is required'),
    description: yup.string(),
    attributes: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required('This field is required'),
          option: yup
            .object()
            .shape({
              label: yup.string(),
              value: yup.string().required('This field is required'),
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
  const { t: translate } = useTranslation();
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<SchemaReq>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
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

  return {
    data: { translate, register, errors, fields, attributes, openPublishModal },
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
