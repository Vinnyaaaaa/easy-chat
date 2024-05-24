import Snackbar from "@mui/material/Snackbar";
import { useStore } from "../../store";

export const ErrorTips = () => {
  const { errorInfo, resetErrorInfo } = useStore((state) => ({
    errorInfo: state.errorInfo,
    resetErrorInfo: state.resetErrorInfo,
  }));

  return (
    <Snackbar
      open={errorInfo.hasError}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={errorInfo.info}
      onClose={resetErrorInfo}
    />
  );
};
