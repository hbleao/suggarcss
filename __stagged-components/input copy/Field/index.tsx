import { forwardRef } from 'react';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';

import { FieldProps } from './types';

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className = '', children, ...restProps }, ref) => {
    return (
      <input 
        ref={ref}
        className={joinClasses(['input__field', className])}
        {...restProps}
      />
    );
  }
);