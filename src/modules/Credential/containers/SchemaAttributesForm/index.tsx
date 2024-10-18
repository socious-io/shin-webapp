import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { Attribute } from 'src/core/adaptors';
import { areEqual, beautifyText } from 'src/core/helpers/texts';
import Checkbox from 'src/modules/General/components/Checkbox';
import DatePicker from 'src/modules/General/components/DatePicker';
import DateTimePicker from 'src/modules/General/components/DateTimePicker';
import Input from 'src/modules/General/components/Input';

import css from './index.module.scss';
import { FormHandles, SchemaAttributesFormProps } from './index.types';
import { useSchemaAttributesForm } from './useSchemaAttributesForm';

const SchemaAttributesForm = forwardRef<FormHandles, SchemaAttributesFormProps>(
  ({ schemaAttributes, schemaInfo, onSubmitClaims }, ref) => {
    const {
      data: { register, control, errors, formRef },
    } = useSchemaAttributesForm(schemaAttributes, onSubmitClaims, ref);

    const generateOptionJSX = (attribute: Attribute) => ({
      DATETIME: (
        <Controller
          key={attribute.name}
          name={attribute.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              id={attribute.name}
              label={beautifyText(attribute.name)}
              value={value}
              onChange={onChange}
              errorMessage={errors[attribute.name]?.message?.toString() || ''}
            />
          )}
        />
      ),
      BOOLEAN: (
        <Checkbox
          key={attribute.name}
          id={attribute.name}
          name={attribute.name}
          control={control}
          label={beautifyText(attribute.name)}
          required
          errors={errors[attribute.name]?.message ? [errors[attribute.name]?.message?.toString() || ''] : undefined}
        />
      ),
    });

    return (
      <form className={css['container']} ref={formRef}>
        <div className={css['section']}>
          <span className={css['section__title']}>{schemaInfo.title}</span>
          {schemaInfo.description}
        </div>
        {schemaAttributes.map(
          attribute =>
            generateOptionJSX(attribute)[attribute.option.value] || (
              <Input
                key={attribute.name}
                id={attribute.name}
                name={attribute.name}
                register={register}
                label={beautifyText(attribute.name)}
                placeholder={beautifyText(attribute.name)}
                hints={
                  attribute?.description && !areEqual(attribute.description, attribute.name)
                    ? [{ hint: attribute.description, hide: false }]
                    : undefined
                }
                errors={
                  errors[attribute.name]?.message ? [errors[attribute.name]?.message?.toString() || ''] : undefined
                }
              />
            ),
        )}
      </form>
    );
  },
);

SchemaAttributesForm.displayName = 'SchemaAttributesForm';
export default SchemaAttributesForm;
