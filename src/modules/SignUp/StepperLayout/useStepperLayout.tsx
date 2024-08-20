export const useStepperLayout = () => {
  const steps = [
    { title: 'Your details', desc: 'Help us customize your experience.', icon: 'user-01' },
    { title: 'Your organization profile', desc: 'A few details about your organization', icon: 'flag-05' },
    { title: 'Get started', desc: 'Start issuing credentials', icon: 'stars-02' },
  ];

  return { steps };
};
