import React, { HTMLAttributes } from 'react';

import './styles.scss';

export const Root = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="tooltip" {...props} />;
};
