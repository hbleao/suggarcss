import './styles.scss';

import type { NotificationProps } from './types';

export const Notification = ({
  title,
  icon,
  variant = "default",
  description,
  className = "",
  link,
  ...restProps
}: NotificationProps) => {
  return (
    <div
      className={`notification__root --${variant}${className ? ` ${className}` : ''}`}
      {...restProps}
    >
      <div className="notification__content">
        <div className="notification__icon">{icon}</div>
        <div>
          <p className="notification__title">{title}</p>
          <p className="notification__description">{description}</p>
        </div>
      </div>
      {link?.label && (
        <a href={link?.href} className="notification__link" target='_blank'>
          {link?.label}
        </a>
      )}
    </div>
  );
};
