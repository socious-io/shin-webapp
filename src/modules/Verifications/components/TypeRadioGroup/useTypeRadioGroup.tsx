import { useTranslation } from 'react-i18next';
import { verificationType } from 'src/core/adaptors';

export const useTypeRadioGroup = () => {
  const { t: translate } = useTranslation();
  const cardItems = [
    {
      value: 'reusable' as verificationType,
      title: translate('ver-create-reusable'),
      subtitle: translate('ver-create-reusable-subtitle'),
      items: [
        translate('ver-create-reusable-item1'),
        translate('ver-create-reusable-item2'),
        translate('ver-create-reusable-item3'),
      ],
    },
    {
      value: 'singleUse' as verificationType,
      title: translate('ver-create-single-use'),
      subtitle: translate('ver-create-single-use-subtitle'),
      items: [
        translate('ver-create-single-use-item1'),
        translate('ver-create-single-use-item2'),
        translate('ver-create-single-use-item3'),
      ],
    },
  ];

  return { cardItems };
};
