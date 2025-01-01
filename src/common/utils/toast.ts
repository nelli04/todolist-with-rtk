import { toast } from "react-toastify";

export const successToast = (message: string) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: 6000,
    theme: "colored",
  });
};
