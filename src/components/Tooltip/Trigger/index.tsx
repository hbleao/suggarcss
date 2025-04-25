import type { HTMLAttributes } from 'react';
import React from 'react';

import './styles.scss';

export const Trigger = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className="tooltip__trigger" {...props} />
);
