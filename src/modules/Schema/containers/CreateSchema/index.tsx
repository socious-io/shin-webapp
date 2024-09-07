import { Divider } from '@mui/material';
import { forwardRef } from 'react';
import { SCHEMA_ATTRIBUTES } from 'src/constants/SCHEMA';
import { AttributeOption } from 'src/core/adaptors';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import IconButton from 'src/modules/General/components/IconButton';
import Input from 'src/modules/General/components/Input';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useCreateSchema } from './useCreateSchema';

const CreateSchema = forwardRef((_, ref) => {
  const {
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
  } = useCreateSchema(ref);

  return (
    <>
      <form className={css['container']} onSubmit={handleSubmit(onPublish)}>
        <div className={css['row']}>
          <div className={css['row__left']}>
            {translate('schema-form.name')}
            <span className={css['row__subtitle']}>{translate('schema-form.name-explanation')}</span>
          </div>
          <div className={css['row__right']}>
            <Input
              register={register}
              id="name"
              name="name"
              placeholder={translate('schema-form.name-placeholder')}
              containerClassName={css['name__input']}
              errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <Divider />
        <div className={css['row']}>
          <div className={css['row__left']}>
            <p>
              {translate('schema-form.description')}{' '}
              <span className="font-normal">({translate('schema-form.description-optional')})</span>
            </p>
            <span className={css['row__subtitle']}>{translate('schema-form.description-explanation')}</span>
          </div>
          <div className={css['row__right']}>
            <Input
              register={register}
              id="description"
              name="description"
              placeholder={translate('schema-form.description-placeholder')}
              customHeight="180px"
              multiline
              containerClassName="w-full"
            />
          </div>
        </div>
        <Divider />
        <div className={css['row']}>
          <div className={css['row__left']}>
            {translate('schema-form.attribute')}
            <span className={css['row__subtitle']}>{translate('schema-form.attribute-explanation')}</span>
          </div>
          <div className={css['row__right']}>
            <div className="w-full flex flex-col gap-12">
              {fields.map((field, index) => (
                <div key={field.id} className="w-full flex gap-4">
                  <div className="flex flex-col w-full">
                    <div className={css['attribute']}>
                      <Input
                        register={register}
                        id={`attributes.${index}.name`}
                        name={`attributes.${index}.name`}
                        placeholder={translate('schema-form.attribute-name')}
                        containerClassName={`flex-1 ${css['attribute__input']}`}
                      />
                      <SearchDropdown
                        id={`attributes.${index}.option`}
                        containerClassName={`flex min-w-[152px] ${css['attribute__input']}`}
                        placeholder={translate('schema-form.attribute-option')}
                        className="w-full"
                        options={SCHEMA_ATTRIBUTES}
                        value={attributes[index].option.value && attributes[index].option}
                        onChange={newOption => onSelectAttributeOption(index, newOption as AttributeOption)}
                      />
                    </div>
                    {(errors['attributes']?.[index]?.name?.message ||
                      errors['attributes']?.[index]?.option?.value?.message) && (
                      <div className="text-Error-500 text-sm mt-[6px]">
                        {errors['attributes']?.[index]?.name?.message?.toString() ||
                          errors['attributes']?.[index]?.option?.value?.message?.toString()}
                      </div>
                    )}
                    <Input
                      register={register}
                      id={`attributes.${index}.description`}
                      name={`attributes.${index}.description`}
                      placeholder={translate('schema-form.attribute-description')}
                      customHeight="180px"
                      multiline
                      containerClassName="mt-4"
                    />
                  </div>
                  {fields.length > 1 && (
                    <IconButton
                      iconName="trash-03"
                      iconSize={20}
                      iconColor={variables.color_grey_600}
                      size="large"
                      onClick={() => removeField(index)}
                    />
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="text"
              color="secondary"
              startIcon={<Icon name="plus" color={variables.color_grey_600} />}
              onClick={addField}
            >
              {translate('schema-form.add-field')}
            </Button>
          </div>
        </div>
        <Divider />
        <div className={css['buttons']}>
          <Button color="primary" variant="outlined" onClick={backToSchemasPage}>
            {translate('schema-cancel-button')}
          </Button>
          <Button color="primary" type="submit">
            {translate('schema-publish-button')}
          </Button>
        </div>
      </form>
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openPublishModal}
        handleClose={() => setOpenPublishModal(false)}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader={translate('schema-confirm-title')}
        confirmSubheader={translate('schema-confirm-subtitle')}
        buttons={[
          {
            color: 'primary',
            variant: 'outlined',
            fullWidth: true,
            onClick: () => setOpenPublishModal(false),
            children: translate('schema-cancel-button'),
          },
          {
            color: 'primary',
            variant: 'contained',
            fullWidth: true,
            onClick: handleSubmit(onSubmit),
            children: translate('schema-publish-button'),
          },
        ]}
      />
    </>
  );
});

CreateSchema.displayName = 'CreateSchema';
export default CreateSchema;
