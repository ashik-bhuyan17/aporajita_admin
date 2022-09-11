import { toast } from 'react-toastify';

export function errorToast(message) {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'error-toast',
    hideProgressBar: true,
    theme: 'colored',
    autoClose: 4000,
  });
}

export function successToast(message) {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'success-toast',
    hideProgressBar: true,
    theme: 'colored',
    autoClose: 4000,
  });
}
