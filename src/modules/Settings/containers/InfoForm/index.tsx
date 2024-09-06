import { Divider } from '@mui/material';
import Avatar from 'src/modules/General/components/Avatar';
import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useInfoForm } from './useInfoForm';

const InfoForm = () => {
  const {
    data: { translate, register, avatarImg, nameErrors, email },
    operations: { handleSubmit, onSubmit, setAttachment },
  } = useInfoForm();

  return (
    <form className={css['container']} onSubmit={handleSubmit(onSubmit)}>
      <div className={css['section']}>
        <span className={css['section__title']}>{translate('settings-info.section1-title')}</span>
        {translate('settings-info.section1-subtitle')}
      </div>
      <div className={css['upload']}>
        <Avatar img={avatarImg} type="users" size="4rem" />
        <FileUploader
          fileTypes={['PNG', 'JPG', 'GIF']}
          maxFileNumbers={1}
          maxFileSize={2}
          setAttachments={setAttachment}
        />
      </div>
      <div className={css['section2']}>
        <span className={css['section2__title']}>{translate('settings-info.section2-title')}</span>
        {translate('settings-info.section2-subtitle')}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-6">
          <Input
            register={register}
            id="firstName"
            name="firstName"
            label={`${translate('settings-info.first-name')}*`}
            placeholder={translate('settings-info.first-name')}
            containerClassName="flex-1"
          />
          <Input
            register={register}
            id="lastName"
            name="lastName"
            label={`${translate('settings-info.last-name')}*`}
            placeholder={translate('settings-info.last-name')}
            containerClassName="flex-1"
          />
        </div>
        {nameErrors && <div className="text-Error-500 text-sm mt-[6px]">{nameErrors?.toString()}</div>}
      </div>
      <Input
        id="email"
        name="email"
        label={`${translate('settings-info.email-address')}*`}
        startIcon={<Icon name="mail-01" fontSize={20} color={variables.color_grey_500} />}
        value={email}
        disabled
      />
      <Input
        register={register}
        id="jobTitle"
        name="jobTitle"
        label={`${translate('settings-info.job-title')} (${translate('settings-info.optional')})`}
        placeholder={translate('settings-info.job-title')}
      />
      <Divider className="mx-[-1.5rem]" />
      <Button color="primary" type="submit" customStyle="self-end">
        {translate('settings-info.save-button')}
      </Button>
    </form>
  );
};

export default InfoForm;
