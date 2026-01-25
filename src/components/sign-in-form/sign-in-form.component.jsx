import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignInContainer, ButtonsContainer } from "./sign-in-container.styles";

import { signInWithGooglePopUp, signInAuthUserWithEmailAndPasswordForm } from "../../utils/firebase.utils";

/**
 * DEFAULT FORM FIELDS
 */
const defualtFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);

  const { email, password } = formFields;

  /***
   *
   * Responsible for resetting fields to default formar
   */
  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  /***
   *
   * This function is responsible for handling changes within the input tags
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  /*
    Responsible for logging Google user in.
  */
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();
  };

  /**
   *
   * This function handles the sign in event
   *
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signInAuthUserWithEmailAndPasswordForm(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;

        case "auth/user-not-found":
          alert("No user associated with this email");
          break;

        default:
          console.log(error);
      }
    }
  };

  /**
   *
   * The return renders the HTML
   */

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        {/* Password*/}
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
