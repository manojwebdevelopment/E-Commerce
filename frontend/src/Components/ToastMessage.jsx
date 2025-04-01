import { toast } from "react-toastify";

// Function to show success toast
function successMessage(msg) {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000, // Auto close after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// Function to show error toast
function errorMessage(msg) {
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000, // Auto close after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export { successMessage, errorMessage };
