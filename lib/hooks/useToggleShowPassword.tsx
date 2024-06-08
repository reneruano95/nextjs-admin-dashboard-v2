import { useState } from "react";

export function useToggleShowPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPasswordHandler = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    setShowPassword(!showPassword);
  };

  return { showPassword, showPasswordHandler };
}

export function useToggleShowConfirmPassword() {
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const showConfirmPasswordHandler = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return { showConfirmPassword, showConfirmPasswordHandler };
}
