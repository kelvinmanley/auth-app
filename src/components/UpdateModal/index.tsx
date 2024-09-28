import { useMemo, useState } from "react";
import { FormInputs } from "./interfaces";
import { PASSWORD_REGEX } from "../../regex-patterns";

const UpdateModal: React.FC = () => {
  const email = "test@email.com";
  const [inputs, setInputs] = useState<FormInputs>({
    password: "",
    newPassword: "",
    repeatPassword: "",
  });

  const validNewPassword = useMemo(
    () => PASSWORD_REGEX.test(inputs.newPassword),
    [inputs.newPassword]
  );

  const validRepeatPassword = useMemo(
    () => inputs.repeatPassword === inputs.newPassword,
    [inputs.repeatPassword, inputs.newPassword]
  );

  const validInputs =
    validNewPassword && inputs.password.length > 0 && validRepeatPassword;

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
    <div className="container borderless">
      <div className="title">
        <h1>Profile page</h1>
      </div>
      <p>Update your password below</p>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input disabled type="text" name="email" value={email} />
        </label>

        <label>
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <label>
          <p>New password:</p>
          <input
            type="password"
            name="newPassword"
            value={inputs.newPassword}
            onChange={handleChange}
          />
          {!validNewPassword && inputs.newPassword.length > 0 && (
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
          value="Update password"
        />
      </form>
    </div>
  );
};

export default UpdateModal;
