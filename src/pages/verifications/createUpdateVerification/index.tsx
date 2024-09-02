import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import appStore from 'src/assets/images/download-appstore.svg';
import googlePlay from 'src/assets/images/download-googleplay.svg';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import Modal from 'src/modules/General/components/Modal';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useCreateUpdateVerification } from './useCreateUpdateVerification';

export const CreateUpdateVerification = () => {
  const {
    verification,
    register,
    errors,
    onSelectSchema,
    schemaList,
    schema,
    onCancel,
    onSubmit,
    handleSubmit,
    openPreview,
    setOpenPreview,
    name,
    description,
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
        Cancel
      </Button>
      <Button variant="outlined" color="primary" customStyle={css['btn']} onClick={() => setOpenPreview(true)}>
        <Icon name="eye" fontSize={20} color={variables.color_grey_700} />
        Preview
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
        {verification ? 'Edit' : 'Create'}
      </Button>
    </div>
  );

  return (
    <>
      <div className={css['container']}>
        <div className={css['header']}>
          <div className={css['header__title']}>Create a verification request</div>
          {actionButtons}
        </div>
        <div className={css['section']}>
          <div className={css['section__row']}>
            {renderRowTitle('Name', 'This will be used for reference only by yourself and the credential holder.')}
            <Input
              id="name"
              label=""
              name="name"
              register={register}
              placeholder="Add a name"
              containerClassName="w-full md:w-[32rem]"
              errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
            />
          </div>
          <div className={css['section__row']}>
            {renderRowTitle(
              'Description',
              'Describe the purpose of the credential request for both the requester and the credential holder.',
            )}
            <Input
              id="description"
              label=""
              name="description"
              register={register}
              placeholder="Enter a description..."
              errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
              multiline
              customHeight="180px"
              maxRows={7}
              containerClassName="w-full"
            />
          </div>
          <div className={css['section__row']}>
            {renderRowTitle(
              'Credential requests',
              'A verification can return as either valid or invalid.Define what constitutes a valid verification. Fields must match the credential schema exactly.',
            )}
            <SearchDropdown
              id="schema"
              name="schema"
              value={schema}
              label="Schema is equal to"
              placeholder="Enter or select a schema"
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
      <Modal
        open={openPreview}
        handleClose={() => setOpenPreview(false)}
        title={name}
        subTitle={description}
        mobileFullHeight
        headerDivider={false}
        contentClassName=""
      >
        <div className={css['modal']}>
          <div className={css['modal__content']}>
            <div className={css['modal__medium']}>Scan the QR Code with your Socious Wallet</div>
            <div className={css['modal__qr']}>
              {/* TODO: fix value for QRCode */}
              <QRCodeSVG value="https://app.socious.io/intro" size={200} />
            </div>
            <Button variant="contained" color="primary" fullWidth>
              Open in Socious Wallet
            </Button>
          </div>
        </div>
        <div className={css['modal__footer']}>
          <div className="flex flex-col gap-2">
            <div className={css['modal__semibold']}>Download the app</div>
            <div className={css['modal__regular']}>
              Get the most of Socious Wallet by installing our new mobile app.
            </div>
          </div>
          <div className={css['modal__download']}>
            {/* TODO: Link to ??? */}
            <Link to="https://wallet.socious.io/ios" target="_blank">
              <img src={appStore} alt="app-store" height={40} width={135} className="cursor-pointer" />
            </Link>
            {/* TODO: Link to ??? */}
            <Link to="https://wallet.socious.io/android" target="_blank">
              <img src={googlePlay} alt="google-play" height={40} width={135} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};
