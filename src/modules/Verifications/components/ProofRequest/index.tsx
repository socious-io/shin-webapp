import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import appStore from 'src/assets/images/download-appstore.svg';
import googlePlay from 'src/assets/images/download-googleplay.svg';
import qrCode from 'src/assets/images/qrcode.png';
import Button from 'src/modules/General/components/Button';
import Modal from 'src/modules/General/components/Modal';

import css from './index.module.scss';
import { ProofRequestProps } from './index.types';

const ProofRequest: React.FC<ProofRequestProps> = ({ open, handleClose, title, subtitle, shortLink }) => {
  const { t: translate } = useTranslation();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      subTitle={subtitle}
      mobileFullHeight
      headerDivider={false}
      contentClassName=""
    >
      <div className={css['modal']}>
        <div className={css['modal__content']}>
          <div className={css['modal__medium']}>{translate('proof-title')}</div>
          <div className={css['modal__qr']}>
            {shortLink ? (
              <QRCodeSVG value={shortLink} size={240} />
            ) : (
              <img src={qrCode} alt="QR Code" height={240} width={240} />
            )}
          </div>
          <Button variant="contained" color="primary" fullWidth>
            {translate('proof-btn')}
          </Button>
        </div>
      </div>
      <div className={css['modal__footer']}>
        <div className="flex flex-col gap-2">
          <div className={css['modal__semibold']}>{translate('proof-download-app')}</div>
          <div className={css['modal__regular']}>{translate('proof-download-app-desc')}</div>
        </div>
        <div className={css['modal__download']}>
          <Link to="https://wallet.socious.io/ios" target="_blank">
            <img src={appStore} alt="app-store" height={40} width={135} className="cursor-pointer" />
          </Link>
          <Link to="https://wallet.socious.io/android" target="_blank">
            <img src={googlePlay} alt="google-play" height={40} width={135} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ProofRequest;
