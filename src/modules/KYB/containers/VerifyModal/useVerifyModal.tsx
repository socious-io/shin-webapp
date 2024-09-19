export const useVerifyModal = () => {
  const steps = [
    {
      title: 'Send your organization details',
      subtitle:
        'Send a company registration document such as a company certificate/equivalent along with your organization name',
      iconName: 'mail-01',
      displayDivider: true,
    },
    {
      title: 'Wait for processing',
      subtitle: 'Our verification team will take 1-3 days to process your verification request.',
      iconName: 'hourglass-03',
      displayDivider: true,
    },
    {
      title: 'Verification complete',
      subtitle:
        'An email and notification will be sent to you upon successful verification and you will then be able to issue credentials.',
      iconName: 'stars-02',
      displayDivider: false,
    },
  ];

  return { data: { steps } };
};
