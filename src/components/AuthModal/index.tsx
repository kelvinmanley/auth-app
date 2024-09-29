import { useEffect, useMemo, useState } from "react";
import { FormInputs } from "./interfaces";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../regex-patterns";
import { createUser, signIn } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { authViewTypes } from "../../redux/authViewSlice";
import { setToCreate, setToLogIn } from "../../redux/authViewSlice";
import "../../styles/modal.scss";

const AuthModal: React.FC = () => {
  const authView = useSelector((state: RootState) => state.authView.value);

  // isLoginType used for hiding 'Repeat your password' field and validation and toggling modal text
  const isLoginType = authView === authViewTypes.LOGIN;

  const modalTitle = isLoginType
    ? "Log into your account"
    : "Create an account";

  const buttonText = isLoginType ? "Log in" : "Sign up";
  const switchModalText = isLoginType
    ? "Don't have an account? Sign up"
    : "Already have an account? Log in";

  const signingErrorText = isLoginType ? "logging in" : "signing up";

  const [inputs, setInputs] = useState<FormInputs>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form validation checks

  const validEmail = useMemo(
    () => EMAIL_REGEX.test(inputs.email),
    [inputs.email]
  );

  const validPassword = useMemo(
    () => PASSWORD_REGEX.test(inputs.password) || isLoginType,
    [inputs.password]
  );

  const validRepeatPassword = useMemo(
    () => inputs.repeatPassword === inputs.password || isLoginType,
    [inputs.repeatPassword, inputs.password, isLoginType]
  );

  const validInputs = useMemo(
    () =>
      validEmail &&
      validPassword &&
      inputs.password.length > 0 &&
      validRepeatPassword,
    [validEmail, validPassword, inputs.password, validRepeatPassword]
  );

  const disabledSubmit = useMemo(
    () => !validInputs || !!authError || loading,
    [validInputs, authError, loading]
  );

  // Interaction handlers

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);

    const authAction = isLoginType ? signIn : createUser;

    try {
      await authAction(inputs.email, inputs.password);
      navigate("/welcome");
    } catch (e: any) {
      const errorMessage =
        e.code === "auth/invalid-credential"
          ? "Email or password is incorrect"
          : `An error occurred while ${signingErrorText}`;
      setAuthError(errorMessage);
    }
    setLoading(false);
  };

  const handleModalSwitch = () => {
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
    });
    if (isLoginType) {
      dispatch(setToCreate());
    } else {
      dispatch(setToLogIn());
    }
  };

  // Clear auth error on field change
  useEffect(() => {
    if (authError) {
      setAuthError("");
    }
  }, [inputs.email, inputs.password, inputs.repeatPassword]);

  return (
    <div className="container">
      <div className="title">
        <h1>{modalTitle}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input
            type="text"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          {!validEmail && inputs.email.length > 0 && (
            <p className="validation-prompt">
              Invalid email i.e. yourname@company.com
            </p>
          )}
        </label>

        <label>
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
          {!validPassword && inputs.password.length > 0 && (
            <p className="validation-prompt">
              Password must contain at least one character and one special, and
              be at least 6 characters long.
            </p>
          )}
        </label>

        {!isLoginType && (
          <label>
            <p>Repeat your password:</p>
            <input
              type="password"
              name="repeatPassword"
              value={inputs.repeatPassword}
              onChange={handleChange}
            />
            {!validRepeatPassword && inputs.repeatPassword.length > 0 && (
              <p className="validation-prompt">Passwords do not match.</p>
            )}
          </label>
        )}

        <input
          className="submit-button"
          disabled={disabledSubmit}
          type="submit"
          value={buttonText}
        />
        {authError && (
          <p className="validation-prompt centered-text">{authError}</p>
        )}
        <p className="centered-text clickable-text" onClick={handleModalSwitch}>
          {switchModalText}
        </p>
      </form>
    </div>
  );
};

export default AuthModal;
