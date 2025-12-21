import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../components/contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } =
    useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link
          className="logo-container"
          to="/">
          <CrwnLogo className="crown-logo" />
        </Link>
        <div className="nav-links-container">
          <Link
            className="nav-link"
            to="/shop">
            Shop
          </Link>
          <Link
            className="nav-link"
            to="/contact">
            Contact
          </Link>

          {currentUser ? (
            <span
              className="nav-link"
              onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link
              className="nav-link"
              to="/auth">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
