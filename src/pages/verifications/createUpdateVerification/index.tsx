import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import ProofRequest from 'src/modules/Verifications/components/ProofRequest';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useCreateUpdateVerification } from './useCreateUpdateVerification';

export const CreateUpdateVerification = () => {
  const {
    data: { errors, schemaList, schema, verification, openPreview, name, description },
    operation: { register, onSelectSchema, onCancel, onSubmit, handleSubmit, setOpenPreview, translate },
  } = useCreateUpdateVerification();
  const renderRowTitle = (title, subtitle) => {
    return (
      <div className={css['section__label']}>
        <div className={css['section__title']}>{title}</div>
        <div className={css['section__subtitle']}>{subtitle}</div>
      </div>
    );
  };

  const actionButtons = (
    <div className={css['header__action']}>
      <Button variant="outlined" color="primary" onClick={onCancel}>
        {translate('ver-create-cancel')}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        customStyle={css['btn']}
        disabled={!name}
        onClick={() => setOpenPreview(true)}
      >
        <Icon name="eye" fontSize={20} color={variables.color_grey_700} />
        {translate('ver-create-preview')}
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
        {verification ? translate('ver-edit-btn') : translate('ver-create-btn')}
      </Button>
    </div>
  );

  return (
    <>
      <div className={css['container']}>
        <div className={css['header']}>
          <div className={css['header__title']}>{translate('ver-create-title')}</div>
          {actionButtons}
        </div>
        <div className={css['section']}>
          <div className={css['section__row']}>
            {renderRowTitle(translate('ver-create-name'), translate('ver-create-name-desc'))}
            <Input
              id="name"
              label=""
              name="name"
              register={register}
              placeholder={translate('ver-create-name-placeholder')}
              containerClassName="w-full md:w-[32rem]"
              errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
            />
          </div>
          <div className={css['section__row']}>
            {renderRowTitle(translate('ver-create-description'), translate('ver-create-description-desc'))}
            <Input
              id="description"
              label=""
              name="description"
              register={register}
              placeholder={translate('ver-create-description-placeholder')}
              errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
              multiline
              customHeight="180px"
              maxRows={7}
              containerClassName="w-full"
            />
          </div>
          <div className={css['section__row']}>
            {renderRowTitle(translate('ver-create-credential'), translate('ver-create-credential-desc'))}
            <SearchDropdown
              id="schema"
              name="schema"
              value={schema}
              label={translate('ver-create-schema-lbl')}
              placeholder={translate('ver-create-schema-placeholder')}
              options={schemaList}
              isSearchable
              onChange={onSelectSchema}
              errors={errors['schema']?.value?.message ? [errors['schema']?.value?.message.toString()] : undefined}
              containerClassName="w-full md:w-[20rem]"
            />
          </div>
          <div className={css['section__row']}>{actionButtons}</div>
        </div>
      </div>
      <ProofRequest
        open={openPreview}
        handleClose={() => setOpenPreview(false)}
        title={name}
        subtitle={description || ''}
      />
    </>
  );
};