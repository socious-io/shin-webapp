import { useState } from 'react';
import { LANGUAGES } from 'src/constants/LANGUAGES';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';

export const useLanguageForm = () => {
  const { switchLanguage, selectedLanguage: initialLanguage } = useSwitchLanguage();
  const getLanguageOption = lang => {
    const languageMap = LANGUAGES.reduce((map, { value, label }) => {
      map[value] = { label, value };
      return map;
    }, {});
    return languageMap[lang] || { label: 'English (US)', value: 'en' };
  };
  const [unsavedValue, setUnsavedValue] = useState(getLanguageOption(initialLanguage));

  const onSave = () => switchLanguage(unsavedValue.value);

  return {
    data: { unsavedValue },
    operations: { setUnsavedValue, onSave },
  };
};
