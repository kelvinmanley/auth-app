import { useMemo, useState } from "react";
import "./style.scss";
import { IProps, FormInputs } from "./interfaces";

const AuthModal: React.FC<IProps> = ({ isLoginType = false }) => {
  const [inputs, setInputs] = useState<FormInputs>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const EMAIL_REGEX = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[\W]).{4,}$/;

  const validEmail = useMemo(
    () => EMAIL_REGEX.test(inputs.email),
    [inputs.email]
  );

  const validPassword = useMemo(
    () => PASSWORD_REGEX.test(inputs.password),
    [inputs.password]
  );

  const validRepeatPassword = useMemo(
    () => inputs.repeatPassword === inputs.password,
    [inputs.repeatPassword, inputs.password]
  );

  const validInputs = validEmail && validPassword && validRepeatPassword;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(inputs);
    console.log(inputs);
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Create an account</h1>
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

        <input
          className="submit-button"
          disabled={!validInputs}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AuthModal;
