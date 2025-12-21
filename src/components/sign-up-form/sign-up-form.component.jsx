import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-up-container.styles.scss";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

/**
 * DEFAULT FORM FIELDS
 */
const defualtFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(
    defualtFormFields
  );

  const {
    displayName,
    email,
    password,
    confirmPassword,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  const handleChange = (event) => {
    /*  Use the input's name attribute to update the corresponding 
        property in formFields with its new value.

        1) event.target gives you the input element that triggered the change
        2) estructure name (the input's name attribute) and value (what the user typed)
        3) Use [name] as a computed property key to dynamically update the correct field 
        in your state object
        4)The spread operator ...formFields preserves all other fields while updating 
        just the one that changed


     */

    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });

    console.log(formFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } =
        await createAuthUserWithEmailAndPassword(
          email,
          password
        );

      await createUserDocumentFromAuth(user, {
        displayName,
      });
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>
        Sign up with your email and password
      </span>
      <form onSubmit={handleSubmit}>
        {/* Display Name */}
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        {/* Confirm Password */}
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="inverted">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
