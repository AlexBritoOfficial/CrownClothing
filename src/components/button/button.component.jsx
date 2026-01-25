import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  google: GoogleSignInButton,
  inverted: InvertedButton,
};

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = BUTTON_TYPE_CLASSES[buttonType] || BaseButton;

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
