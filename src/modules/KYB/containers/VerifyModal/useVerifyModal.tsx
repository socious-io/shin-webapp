import { translate } from 'src/core/helpers/utils';

export const useVerifyModal = () => {
  const steps = [
    {
      title: translate('kyb-verify-step-1-title'),
      subtitle: translate('kyb-verify-step-1-subtitle'),
      iconName: 'mail-01',
      displayDivider: true,
    },
    {
      title: translate('kyb-verify-step-2-title'),
      subtitle: translate('kyb-verify-step-2-subtitle'),
      iconName: 'hourglass-03',
      displayDivider: true,
    },
    {
      title: translate('kyb-verify-step-3-title'),
      subtitle: translate('kyb-verify-step-3-subtitle'),
      iconName: 'stars-02',
      displayDivider: false,
    },
  ];

  return {
    data: {
      steps,
    },
    operations: {
      translate,
    },
  };
};
