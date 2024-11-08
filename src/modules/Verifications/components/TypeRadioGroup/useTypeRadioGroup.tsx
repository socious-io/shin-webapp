import { verificationType } from 'src/core/adaptors';

export const useTypeRadioGroup = () => {
  const cardItems = [
    {
      value: 'reusable' as verificationType,
      title: 'Reusable Verification',
      subtitle: 'Create a verification link that can be used multiple times by different users',
      items: [
        'Track all verifications in history',
        'Same link can be shared with multiple users',
        'Ideal for public verifications',
      ],
    },
    {
      value: 'singleUse' as verificationType,
      title: 'Single-use Verification',
      subtitle: 'Generate unique single-use verification links',
      items: [
        'Create unique links anytime',
        'Each link can only be used once',
        'Ideal for sharing links with specific individuals',
      ],
    },
  ];

  return { cardItems };
};
