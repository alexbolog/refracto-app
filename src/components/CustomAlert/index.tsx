import React from 'react';

const CustomAlert = ({
  type,
  isDismissable,
  icon,
  messageComponent,
  actionMessage,
  action
}: {
  type:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'dark'
    | 'light';
  isDismissable: boolean;
  icon?: React.ReactNode;
  messageComponent: React.ReactNode;
  actionMessage?: string;
  action?: () => Promise<void>;
}) => {
  return (
    <div
      className={`alert alert-${type} ${
        isDismissable ? 'alert-dismissible' : ''
      } fade show`}
    >
      {icon && icon}
      {messageComponent}
      {actionMessage && (
        <strong onClick={action} className='ml-2' style={{ cursor: 'pointer' }}>
          {actionMessage}
        </strong>
      )}
      <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-label='btn-close'
      ></button>
    </div>
  );
};

export default CustomAlert;
