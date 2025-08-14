import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import css from './index.module.scss';

const RequestLoading = () => {
  const isLoading = useSelector<RootState, boolean>(state => state.loading);

  return (
    <div className={`${css['container']} ${isLoading && css['container--visible']}`}>
      <LinearProgress color="primary" />
    </div>
  );
};

export default RequestLoading;
