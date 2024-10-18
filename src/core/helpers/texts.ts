export const beautifyText = (str: string) => {
  if (!str) return str;
  return (str.charAt(0).toUpperCase() + str.slice(1)).replaceAll('_', ' ');
};

export const areEqual = (str1: string, str2: string) => {
  return (
    str1.replaceAll('_', '').replaceAll(' ', '').toUpperCase() ===
    str2.replaceAll('_', '').replaceAll(' ', '').toUpperCase()
  );
};
