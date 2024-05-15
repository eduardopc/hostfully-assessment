import { toast, TypeOptions } from "react-toastify";

type ShowToastMessage = {
  message: string;
  type: TypeOptions;
  onOpen?: () => void;
};

export const showToastMessage = ({
  message,
  type,
  onOpen,
}: ShowToastMessage) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
    onOpen: () => {
      onOpen?.();
    },
  });
};
