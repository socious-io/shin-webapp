import { useTranslation } from 'react-i18next';

export const useStepperLayout = () => {
  const { t } = useTranslation();
  const steps = [
    { title: t('step-0-title'), desc: t('step-0-desc'), icon: 'user-01' },
    { title: t('step-1-title'), desc: t('step-1-desc'), icon: 'flag-05' },
    { title: t('step-2-title'), desc: t('step-2-desc'), icon: 'stars-02' },
  ];

  return { steps };
};
