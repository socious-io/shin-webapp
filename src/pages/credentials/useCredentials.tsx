import IssuedList from 'src/modules/Credential/containers/IssuedList';

export const useCredentials = () => {
  const tabs = [{ label: 'Issued', content: <IssuedList /> }];

  return {
    data: { tabs },
  };
};
