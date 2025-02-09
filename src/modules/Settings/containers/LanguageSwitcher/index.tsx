import { Divider } from '@mui/material';
import Button from 'src/modules/General/components/Button';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';

import css from './index.module.scss';
import { LanguageOption } from './index.types';
import { useLanguageSwitcher } from './useLanguageSwitcher';

const FlagGenerator = ({ value }) => <img src={`/images/countries/${value}.svg`} width={20} height={20} alt={value} />;

const LanguageSwitcher = () => {
  const {
    data: { translate, selectedLanguage },
    operations: { onSelectLanguage, onSwitchLanguage },
  } = useLanguageSwitcher();

  const languageOptions: LanguageOption[] = [
    {
      value: 'en',
      label: translate('settings-language.english'),
      // icon: <FlagGenerator value="en" />,
    },
    {
      value: 'jp',
      label: translate('settings-language.japanese'),
      // icon: <FlagGenerator value="jp" />,
    },
    {
      value: 'es',
      label: translate('settings-language.spanish'),
      // icon: <FlagGenerator value="jp" />,
    },
    {
      value: 'kr',
      label: translate('settings-language.korean'),
      // icon: <FlagGenerator value="jp" />,
    },
  ];

  const customFormatOptionLabel = (option: LanguageOption) => (
    <div className="flex items-center">
      {option.icon}
      <span className="ml-2">{option.label}</span>
    </div>
  );

  return (
    <div className={css['container']}>
      <span className={css['title']}>{translate('settings-language.title')}</span>
      <div className={css['section']}>
        <span className={css['section__title']}>{translate('settings-language.dropdown-title')}</span>
        <SearchDropdown
          options={languageOptions}
          formatOptionLabel={data => customFormatOptionLabel(data as LanguageOption)}
          value={languageOptions.find(option => option.value === selectedLanguage)}
          onChange={onSelectLanguage}
        />
        <span className={css['section__subtitle']}>{translate('settings-language.dropdown-subtitle')}</span>
      </div>
      <Divider className="mx-[-1.5rem]" />
      <Button color="primary" type="button" customStyle="self-end" onClick={onSwitchLanguage}>
        {translate('settings-language.save-button')}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
