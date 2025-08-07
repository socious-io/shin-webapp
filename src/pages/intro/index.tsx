import logo from 'src/assets/logo/logo.svg';
import { LANGUAGES } from 'src/constants/LANGUAGES';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import LanguageSwitcher from 'src/modules/General/components/LanguageSwitcher';
import Link from 'src/modules/General/components/Link';

import css from './index.module.scss';
import { useIntro } from './useIntro';

export const Intro = () => {
  const {
    data: { selectedLanguage },
    operations: { onSelectLanguage, onContinue },
  } = useIntro();

  return (
    <div className={css['container']}>
      <div className={css['left']}>
        <div className="hidden md:block">
          <LanguageSwitcher
            value={LANGUAGES.find(option => option.value === selectedLanguage)}
            onChange={onSelectLanguage}
            border={false}
            containerClassName="w-48"
          />
        </div>
        <div className={css['intro']}>
          <div className={css['intro__content']}>
            <img src={logo} alt="Socious-Verify-Logo" width={175} height={36} className="self-center" />
            <div className={css['intro__header']}>
              <span className={css['intro__header--bold']}>{translate('intro-header')}</span>
              {translate('intro-subheader')}
            </div>
            <Button color="primary" onClick={onContinue}>
              {translate('intro-continue-btn')}
            </Button>
            <div className={css['intro__terms']}>
              {translate('intro-accept')}
              <Link
                href="https://app.socious.io/terms-conditions/"
                label={translate('intro-terms-of-use')}
                target="_blank"
              />
              {translate('intro-and')}
              <Link
                href="https://app.socious.io/privacy-policy/"
                label={translate('intro-privacy-policy')}
                target="_blank"
              />
            </div>
            <div className="self-center md:hidden">
              <LanguageSwitcher
                value={LANGUAGES.find(option => option.value === selectedLanguage)}
                onChange={onSelectLanguage}
                border={false}
                containerClassName="w-48"
              />
            </div>
          </div>
        </div>
        <div className={css['left__footer']}>
          {'@ Socious Global Inc. 2024'}
          <span className={`flex gap-2`}>
            <Icon name="mail-01" fontSize={16} className="text-Gray-light-mode-600" />
            {'help@socious.io'}
          </span>
        </div>
      </div>
      <div className={css['right']}>
        <div className="pr-16">
          <div className={css['right__title']}>{translate('intro-picture-desc')}</div>
          <div className={css['right__stars']}>
            {[...Array(5)].map((_, i) => (
              <Icon key={`index-${i}`} name="star-filled" fontSize={20} className="text-Gray-light-mode-900" />
            ))}
          </div>
        </div>
        <div className={css['right__image']} />
      </div>
    </div>
  );
};
