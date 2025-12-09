import { useEffect } from "react";

import { getRedirectResult } from "firebase/auth";

import {
  firebaseAuth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  /*
    Responsible for logging Google user in.
  */
  const logGoogleUser = async () => {
    const { user } =
      await signInWithGooglePopUp();

    const userDocRef =
      await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Google Sign In
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
