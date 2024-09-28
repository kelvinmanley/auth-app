import { useMemo, useState } from "react";
import { IProps, FormInputs } from "./interfaces";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../regex-patterns";
import "../../styles/modal.scss";

/**
 * @param isLoginType
 * @returns Log in instead of create account modal
 */

const AuthModal: React.FC<IProps> = ({ isLoginType = false }) => {
  /**
   * isLoginType used for
   * • toggling off Repeat your password field and validation
   * • changing the modal text
   */
  const modalTitle = isLoginType
    ? "Log into your account"
    : "Create an account";

  const buttonText = isLoginType ? "Log in" : "Sign up";

  const [inputs, setInputs] = useState<FormInputs>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validEmail = useMemo(
    () => EMAIL_REGEX.test(inputs.email),
    [inputs.email]
  );

  // Log in modal doesn't display password rules
  const validPassword = useMemo(
    () => PASSWORD_REGEX.test(inputs.password) || isLoginType,
    [inputs.password]
  );

  // Log in modal doesn't require repeat password validation
  const validRepeatPassword = useMemo(
    () => inputs.repeatPassword === inputs.password || isLoginType,
    [inputs.repeatPassword, inputs.password, isLoginType]
  );

  const validInputs =
    validEmail &&
    validPassword &&
    inputs.password.length > 0 &&
    validRepeatPassword;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isLoginType) {
      alert(inputs);
      console.log(inputs);
    } else {
      alert(inputs);
      console.log(inputs);
    }
  };

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
              be at least 4 characters long.
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
          disabled={!validInputs}
          type="submit"
          value={buttonText}
        />
      </form>
    </div>
  );
};

export default AuthModal;
