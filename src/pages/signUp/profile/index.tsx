import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from 'src/modules/General/components/Avatar';
import FileUploader from 'src/modules/General/components/FileUploader';
import Input from 'src/modules/General/components/Input';
import FormHeader from 'src/modules/SignUp/components/FormHeader';
import StepperLayout from 'src/modules/SignUp/components/StepperLayout';
import { useProfile } from 'src/pages/signUp/profile/useProfile';

import css from './index.module.scss';

export const Profile = () => {
  const { t: translate } = useTranslation();
  const { register, errors, img, setAttachment, descInputHeight, handleSubmit, onSubmit, length } = useProfile();
  return (
    <StepperLayout activeStep={1}>
      <div className={css['container']}>
        <FormHeader title={translate('prof-h1')} subtitle={translate('prof-h2')} />
        <div className={css['container__uploader']}>
          <Avatar type="organizations" size="4rem" img={img} iconName="image-up" iconSize={32} />
          <FileUploader
            fileTypes={['SVG', 'PNG', 'JPG', 'JPEG', 'GIF']}
            maxFileNumbers={1}
            maxFileSize={2}
            setAttachments={setAttachment}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Input
            id="orgName"
            label={translate('prof-name')}
            name="orgName"
            register={register}
            placeholder={translate('prof-name-placeholder')}
            errors={errors['orgName']?.message ? [errors['orgName']?.message.toString()] : undefined}
          />
          <Input
            id="description"
            label={translate('prof-desc')}
            name="description"
            register={register}
            placeholder={translate('prof-desc-placeholder')}
            errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
            multiline
            customHeight={descInputHeight}
            maxRows={7}
            hints={[{ hint: `${length}/160`, hide: false }]}
            hintCustomClass="!text-right"
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          {translate('prof-btn-label')}
        </Button>
      </div>
    </StepperLayout>
  );
};
