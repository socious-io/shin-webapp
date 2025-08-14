import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addCredentialRecipientAdaptor, Schema, Attribute } from 'src/core/adaptors';
import { CredentialClaims } from 'src/core/api';
import { emailPattern, urlPattern } from 'src/core/helpers/regexs';
import { translate } from 'src/core/helpers/utils';
import * as yup from 'yup';

const createValidationSchema = (schemaAttributes: Attribute[], translate: any) => {
  const recipientSchema = yup
    .object()
    .shape({
      recipient_email: yup
        .string()
        .email(translate('credential-step2.add.email-valid'))
        .matches(emailPattern, translate('credential-step2.add.email-valid'))
        .required(translate('credential-step2.add.required')),
      recipient_firstName: yup.string().required(translate('credential-step2.add.required')),
      recipient_lastName: yup.string().required(translate('credential-step2.add.required')),
    })
    .required();
  const validations = {
    TEXT: yup.string(),
    NUMBER: yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
      .typeError(translate('credential-step2.add.number-valid')),
    BOOLEAN: yup.boolean().default(false),
    URL: yup
      .string()
      .nullable()
      .matches(urlPattern, { message: translate('credential-step2.add.url-valid'), excludeEmptyString: true }),
    EMAIL: yup
      .string()
      .email(translate('credential-step2.add.email-valid'))
      .nullable()
      .matches(emailPattern, { message: translate('credential-step2.add.email-valid'), excludeEmptyString: true }),
    DATETIME: yup.date().typeError(translate('credential-step2.add.date-valid')),
  };
  const shape: { [key: string]: any } = {};
  schemaAttributes.forEach(attribute => {
    shape[attribute.name] = validations[attribute.option.value];
  });
  const dynamicSchema = yup.object().shape(shape);
  return dynamicSchema.concat(recipientSchema);
};

export const useCredentialRecipientModal = (selectedSchema: Schema, onAddCredentialRecipient: () => void) => {
  const schemaAttributes = selectedSchema?.attributes || [];

  const validationSchema = createValidationSchema(schemaAttributes, translate);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const disabledSubmit = !isValid;

  const areEqual = (str1: string, str2: string) => {
    return (
      str1.replaceAll('_', '').replaceAll(' ', '').toUpperCase() ===
      str2.replaceAll('_', '').replaceAll(' ', '').toUpperCase()
    );
  };

  const onSubmit = async formData => {
    const {
      recipient_email: email,
      recipient_firstName: firstName,
      recipient_lastName: lastName,
      ...rest
    } = formData || {};
    const claims: CredentialClaims[] =
      Object.keys(rest).map(key => ({
        name: key,
        value: formData[key],
      })) || [];
    const { error } = await addCredentialRecipientAdaptor({
      name: selectedSchema?.name || '',
      description: selectedSchema?.description || '',
      selectedSchema: selectedSchema.id,
      claims,
      email,
      firstName,
      lastName,
    });
    if (error) return;
    onAddCredentialRecipient();
    reset();
  };

  return {
    data: { translate, control, register, errors, disabledSubmit, schemaAttributes },
    operations: { areEqual, handleSubmit, onSubmit },
  };
};
