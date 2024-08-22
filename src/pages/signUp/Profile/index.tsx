import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'src/modules/General/components/Avatar';
import { FileUploader } from 'src/modules/General/components/FileUploader';
import { Input } from 'src/modules/General/components/Input';
import FormHeader from 'src/modules/SignUp/FormHeader';
import StepperLayout from 'src/modules/SignUp/StepperLayout';
import { useProfile } from 'src/pages/signUp/profile/useProfile';

import css from './index.module.scss';

export const Profile = () => {
  const { t } = useTranslation();
  const { register, errors, img, setAttachment, descInputHeight } = useProfile();
  return (
    <StepperLayout activeStep={1}>
      <div className={css['container']}>
        <FormHeader title={t('prof-h1')} subtitle={t('prof-h2')} />
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
            label={t('prof-name')}
            name="orgName"
            register={register}
            placeholder={t('prof-name-placeholder')}
            errors={errors['orgName']?.message ? [errors['orgName']?.message.toString()] : undefined}
          />
          <Input
            id="description"
            label={t('prof-desc')}
            name="description"
            register={register}
            placeholder={t('prof-desc-placeholder')}
            errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
            multiline
            customHeight={descInputHeight}
            maxRows={7}
          />
        </div>
        <Button variant="contained" color="primary">
          {t('prof-btn-label')}
        </Button>
      </div>
    </StepperLayout>
  );
};
