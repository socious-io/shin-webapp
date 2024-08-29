import { useTranslation } from 'react-i18next';

export const useStepperLayout = () => {
  const { t: translate } = useTranslation();
  const steps = [
    { title: translate('step-0-title'), desc: translate('step-0-desc'), icon: 'user-01' },
    { title: translate('step-1-title'), desc: translate('step-1-desc'), icon: 'flag-05' },
    { title: translate('step-2-title'), desc: translate('step-2-desc'), icon: 'stars-02' },
  ];

  return { steps };
};
