import { LANGUAGES } from 'src/constants/LANGUAGES';

import SearchDropdown from '../SearchDropdown';
import { SelectProps } from '../SearchDropdown/index.types';

const LanguageSwitcher: React.FC<SelectProps> = ({ placeholder = 'English (US)', ...props }) => {
  return (
    <SearchDropdown
      id="language-switcher"
      placeholder={placeholder}
      isSearchable={false}
      options={LANGUAGES}
      {...props}
    />
  );
};

export default LanguageSwitcher;
