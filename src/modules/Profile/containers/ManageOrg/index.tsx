import { Divider, Typography } from '@mui/material';
import Avatar from 'src/modules/General/components/Avatar';
import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import CustomSnackbar from 'src/modules/General/components/Snackbar';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useManageOrg } from './useManageOrg';

const ManageOrg = () => {
  const {
    data: { translate, letterCount, register, errors, avatarImg, did, openSnackbar },
    operations: { handleSubmit, onSubmit, onChangeDescription, setAttachment, onCopy, setOpenSnackbar },
  } = useManageOrg();

  return (
    <>
      <form className={css['container']} onSubmit={handleSubmit(onSubmit)}>
        <div className={css['upload']}>
          <Avatar img={avatarImg} type="organizations" size="4rem" />
          <FileUploader
            fileTypes={['PNG', 'JPG', 'GIF']}
            maxFileNumbers={1}
            maxFileSize={2}
            setAttachments={setAttachment}
          />
        </div>
        <Input
          id="did"
          label="Your organization DID"
          value={did}
          disabled
          postfix={
            <div className={css['copy']} onClick={onCopy}>
              <Icon name="copy-01" fontSize={20} color={variables.color_grey_700} />
              Copy
            </div>
          }
        />
        <Input
          register={register}
          id="name"
          name="name"
          label="Public name*"
          placeholder="Name"
          errors={errors['name']?.message ? [errors['name'].message.toString()] : undefined}
        />
        <div className="flex flex-col gap-1">
          <Input
            register={register}
            id="description"
            name="description"
            label="Public description (optional)"
            multiline
            customHeight="144px"
            placeholder="Enter a description..."
            onChange={e => onChangeDescription(e.target.value)}
            errors={errors['description']?.message ? [errors['description'].message.toString()] : undefined}
          />
          <Typography variant="caption" className="text-Gray-light-mode-600 self-end">
            {`${letterCount}/160`}
          </Typography>
        </div>
        <Divider className="mx-[-1.5rem]" />
        <Button color="primary" type="submit" customStyle="self-end">
          Save changes
        </Button>
      </form>
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        containerClassName={css['snackbar']}
        autoHideDuration={5000}
      >
        <div className={css['snackbar__content']}>
          <Icon name="tick" color={variables.color_primary_700} />
          {translate('schema-copy-snackbar')}
        </div>
      </CustomSnackbar>
    </>
  );
};

export default ManageOrg;
