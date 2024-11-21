import css from './index.module.scss';
import { LoadingSpinnerProps } from './index.types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  barCount = 8,
  containerClassName = '',
  barClassName = '',
}) => {
  return (
    <div className={`${css['container']} ${containerClassName}`}>
      {Array.from({ length: barCount }).map((_, index) => (
        <div key={index} className={`${css['bar']} ${barClassName} ${css[`bar-${index + 1}`]}`} />
      ))}
    </div>
  );
};

export default LoadingSpinner;
