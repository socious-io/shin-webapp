import { yupResolver } from '@hookform/resolvers/yup';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { Form } from './index.types';

const schema = yup
  .object()
  .shape({
    message: yup.string().optional(),
  })
  .required();

export const usePreviewCredential = (onSendCredential: (message: string) => void, ref) => {
  const { t: translate } = useTranslation();
  const { register, watch, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      message: '',
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)(),
  }));
  const message = watch('message');

  const onSubmit = (formData: Form) => {
    const { message = '' } = formData || {};
    onSendCredential(message);
  };

  return {
    data: { translate, register, formRef, message },
  };
};
