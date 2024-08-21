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
    data: { register, errors, fields, attributes, openPublishModal },
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
            Schema name
            <span className={css['row__subtitle']}>
              The schema name is define your credential “type”. It is visible to everyone who views the credential.
            </span>
          </div>
          <div className={css['row__right']}>
            <Input
              register={register}
              id="name"
              name="name"
              placeholder="ie. University degree, Drivers License, etc..."
              containerClassName={css['name__input']}
              errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <Divider />
        <div className={css['row']}>
          <div className={css['row__left']}>
            <p>
              Schema description <span className="font-normal">(optional)</span>
            </p>
            <span className={css['row__subtitle']}>
              Describe the schema&apos;s purpose. This is optional but recommended.
            </span>
          </div>
          <div className={css['row__right']}>
            <Input
              register={register}
              id="description"
              name="description"
              placeholder="Enter a description..."
              customHeight="180px"
              multiline
              containerClassName="w-full"
            />
          </div>
        </div>
        <Divider />
        <div className={css['row']}>
          <div className={css['row__left']}>
            Credential attributes
            <span className={css['row__subtitle']}>Define the attributes you want on the credential.</span>
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
                        placeholder="Attribute name"
                        containerClassName={`flex-1 ${css['attribute__input']}`}
                      />
                      <SearchDropdown
                        id={`attributes.${index}.option`}
                        containerClassName={`flex min-w-[152px] ${css['attribute__input']}`}
                        placeholder="Select..."
                        className="w-full"
                        options={SCHEMA_ATTRIBUTES}
                        value={attributes[index].option}
                        onChange={newOption => onSelectAttributeOption(index, newOption as AttributeOption)}
                      />
                    </div>
                    {errors['attributes']?.[index]?.name?.message && (
                      <div className="text-Error-500 text-sm mt-[6px]">
                        {errors['attributes']?.[index]?.name?.message?.toString()}
                      </div>
                    )}
                    <Input
                      register={register}
                      id={`attributes.${index}.description`}
                      name={`attributes.${index}.description`}
                      placeholder="Attribute description..."
                      customHeight="180px"
                      multiline
                      containerClassName="mt-4"
                    />
                  </div>
                  <IconButton
                    iconName="trash-03"
                    iconSize={20}
                    iconColor={variables.color_grey_600}
                    size="large"
                    onClick={() => removeField(index)}
                  />
                </div>
              ))}
            </div>
            <Button
              variant="text"
              color="secondary"
              startIcon={<Icon name="plus" color={variables.color_grey_600} />}
              onClick={addField}
            >
              Add field
            </Button>
          </div>
        </div>
        <Divider />
        <div className={css['buttons']}>
          <Button color="primary" variant="outlined" onClick={backToSchemasPage}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Publish
          </Button>
        </div>
      </form>
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openPublishModal}
        handleClose={() => setOpenPublishModal(false)}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader="Confirmation"
        confirmSubheader="Please review your schema before publishing. Once published, it cannot be edited. However, you will be able to duplicate the schema to make changes to a copy."
        buttons={[
          {
            color: 'primary',
            variant: 'outlined',
            fullWidth: true,
            onClick: () => setOpenPublishModal(false),
            children: 'Cancel',
          },
          {
            color: 'primary',
            variant: 'contained',
            fullWidth: true,
            onClick: handleSubmit(onSubmit),
            children: 'Publish',
          },
        ]}
      />
    </>
  );
});

CreateSchema.displayName = 'CreateSchema';
export default CreateSchema;
