import { Divider } from '@mui/material';
import { LANGUAGES } from 'src/constants/LANGUAGES';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';

import css from './index.module.scss';
import { LanguageOption } from './index.types';
import { useLanguageForm } from './useLanguageForm';

// const FlagGenerator = ({ value }) => <img src={`/images/countries/${value}.svg`} width={20} height={20} alt={value} />;

const LanguageForm = () => {
  const {
    data: { unsavedValue },
    operations: { setUnsavedValue, onSave },
  } = useLanguageForm();

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
          options={LANGUAGES}
          formatOptionLabel={data => customFormatOptionLabel(data as LanguageOption)}
          value={LANGUAGES.find(option => option.value === unsavedValue.value)}
          onChange={value => setUnsavedValue(value as { label: string; value: string })}
        />
        <span className={css['section__subtitle']}>{translate('settings-language.dropdown-subtitle')}</span>
      </div>
      <Divider className="mx-[-1.5rem]" />
      <Button color="primary" type="button" customStyle="self-end" onClick={onSave}>
        {translate('settings-language.save-button')}
      </Button>
    </div>
  );
};

export default LanguageForm;
