import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { LangState, setLanguage } from 'src/store/reducers/language.reducer';

export const useLanguageSwitcher = () => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { language: defaultLanguage } = useSelector<RootState, LangState>(state => state.language);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const onSelectLanguage = option => setSelectedLanguage(option.value);

  const onSwitchLanguage = () => dispatch(setLanguage(selectedLanguage));

  return {
    data: { translate, selectedLanguage },
    operations: { onSelectLanguage, onSwitchLanguage },
  };
};
