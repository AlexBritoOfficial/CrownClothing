import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } =
      await signInWithGooglePopUp();

    const userDocRef =
      await createUserDocumentFromAuth(user);

    console.log(user);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Google Sign In
      </button>
    </div>
  );
};

export default SignIn;
