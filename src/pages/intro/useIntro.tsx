import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';

export const useIntro = () => {
  const { selectedLanguage, switchLanguage } = useSwitchLanguage();

  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + '/oauth/socious');
    if (error) return;
    else if (data) window.location.href = data.url;
  };

  const onSelectLanguage = option => {
    if (option) {
      switchLanguage(option.value);
    }
  };

  return { data: { selectedLanguage }, operations: { onSelectLanguage, onContinue } };
};
