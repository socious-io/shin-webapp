import { Divider } from '@mui/material';
import { forwardRef } from 'react';
import logo from 'src/assets/logo/logo.svg';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';

import css from './index.module.scss';
import { FormHandles, PreviewCredentialProps } from './index.types';
import { usePreviewCredential } from './usePreviewCredential';

const PreviewCredential = forwardRef<FormHandles, PreviewCredentialProps>(
  ({ credentialDetail, onSendCredential }, ref) => {
    const {
      data: { translate, register, formRef, message },
    } = usePreviewCredential(onSendCredential, ref);
    const { name = '', issuer = '' } = credentialDetail || {};

    return (
      <form className={css['container']} ref={formRef}>
        <h1 className={css['header']}>{translate('credential-step3.header')}</h1>
        <Divider />
        <div className={css['row']}>
          <div className={css['row__left']}>
            {translate('credential-step3.message')}
            <span className={css['row__subtitle']}>{translate('credential-step3.message-explanation')}</span>
          </div>
          <div className={css['row__right']}>
            <Input
              register={register}
              id="message"
              name="message"
              placeholder={translate('credential-step3.message-placeholder')}
              customHeight="180px"
              multiline
              containerClassName="w-full"
            />
          </div>
          <div className={css['row__left']} />
        </div>
        <Divider />
        <div className={css['row']}>
          <div className={css['row__left']}>{translate('credential-step3.preview')}</div>
          <div className={`${css['row__right']} ${css['preview']}`}>
            <div className={css['preview__content']}>
              <div className={css['preview__logo']}>
                <img src={logo} alt="Shin-Logo" />
              </div>
              <span className={css['preview__header']}>
                {translate('credential-step3.preview-header', { name, issuer })}
              </span>
              <div className={css['preview__message']}>{message}</div>
              <div className={css['preview__table']}>
                <div className={css['preview__detail']}>
                  {translate('credential-step3.preview-issuer')}
                  <span className={css['preview__detail--lighter']}>{issuer}</span>
                </div>
                <div className={css['preview__detail']}>
                  {translate('credential-step3.preview-title')}
                  <span className={css['preview__detail--lighter']}>{name}</span>
                </div>
              </div>
              <div className={css['preview__claim']}>
                {translate('credential-step3.preview-claim-text')}
                <Button color="primary" customStyle={css['preview__button']}>
                  {translate('credential-step3.preview-claim-button')}
                </Button>
              </div>
              <p className={css['preview__subtitle']}>{translate('credential-step3.preview-security-text')}</p>
            </div>
          </div>
          <div className={css['row__left']} />
        </div>
      </form>
    );
  },
);

PreviewCredential.displayName = 'PreviewCredential';
export default PreviewCredential;
