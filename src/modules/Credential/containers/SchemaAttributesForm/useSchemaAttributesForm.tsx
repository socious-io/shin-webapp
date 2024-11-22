import { yupResolver } from '@hookform/resolvers/yup';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Attribute } from 'src/core/adaptors';
import { CredentialClaims } from 'src/core/api';
import { emailPattern, urlPattern } from 'src/core/helpers/regexs';
import * as yup from 'yup';

const createValidationSchema = (schemaAttributes: Attribute[]) => {
  const shape: { [key: string]: any } = {};
  const validations = {
    TEXT: yup.string().required('This field is required'),
    NUMBER: yup.number().typeError('This field must be a number').required('This field is required'),
    BOOLEAN: yup.boolean().default(false),
    URL: yup.string().matches(urlPattern, 'This field must be a valid URL').required('This field is required'),
    EMAIL: yup
      .string()
      .email()
      .matches(emailPattern, 'This field must be a valid Email')
      .required('This field is required'),
    DATETIME: yup.date().typeError('This field must be a valid date').required('This field is required'),
  };

  schemaAttributes.forEach(attribute => {
    shape[attribute.name] = validations[attribute.option.value];
  });
  return yup.object().shape(shape).required();
};

export const useSchemaAttributesForm = (
  schemaAttributes: Attribute[],
  onSubmitClaims: (claims: CredentialClaims[]) => void,
  ref,
) => {
  const validationSchema = createValidationSchema(schemaAttributes);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)(),
  }));

  const onSubmit = formData => {
    const claims: CredentialClaims[] =
      Object.keys(formData).map(key => ({
        name: key,
        value: formData[key],
      })) || [];

    onSubmitClaims(claims);
  };

  const areEqual = (str1: string, str2: string) => {
    return (
      str1.replaceAll('_', '').replaceAll(' ', '').toUpperCase() ===
      str2.replaceAll('_', '').replaceAll(' ', '').toUpperCase()
    );
  };
  return {
    data: { register, control, errors, formRef },
    operations: { areEqual },
  };
};
