import { verificationType } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';

export const useTypeRadioGroup = () => {
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
