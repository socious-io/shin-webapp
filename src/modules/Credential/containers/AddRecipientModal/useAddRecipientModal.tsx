import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { addOrUpdateRecipientAdaptor, Recipient, RecipientReq } from 'src/core/adaptors';
import { emailPattern } from 'src/core/helpers/regexs';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email()
      .matches(emailPattern, 'This field must be a valid Email')
      .required('This field is required'),
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
  })
  .required();

export const useAddRecipientModal = (onAddRecipient: () => void, recipient?: Recipient) => {
  const { t: translate } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RecipientReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const disabledSubmit = !isValid;

  const initializeValues = () => {
    const initialVal = {
      email: recipient?.email || '',
      firstName: recipient?.firstName || '',
      lastName: recipient?.lastName || '',
    };
    reset(initialVal);
  };

  useEffect(() => initializeValues(), [recipient]);

  const onSubmit = async (formData: RecipientReq) => {
    const { error } = await addOrUpdateRecipientAdaptor(formData, recipient?.id || '');
    if (error) return;
    onAddRecipient();
    reset();
  };

  return {
    data: { translate, register, errors, disabledSubmit },
    operations: { handleSubmit, onSubmit },
  };
};
