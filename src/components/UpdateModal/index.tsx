import { useEffect, useMemo, useState } from "react";
import { FormInputs } from "./interfaces";
import { PASSWORD_REGEX } from "../../regex-patterns";
import { auth } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changePassword } from "../../firebase/auth";

const UpdateModal: React.FC = () => {
  const email = useSelector((state: RootState) => state.user.value);

  const [inputs, setInputs] = useState<FormInputs>({
    newPassword: "",
    repeatPassword: "",
  });
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Form validation checks

  const validNewPassword = useMemo(
    () => PASSWORD_REGEX.test(inputs.newPassword),
    [inputs.newPassword]
  );

  const validRepeatPassword = useMemo(
    () => inputs.repeatPassword === inputs.newPassword,
    [inputs.repeatPassword, inputs.newPassword]
  );

  const validInputs = useMemo(
    () => validNewPassword && validRepeatPassword,
    [validNewPassword, validRepeatPassword]
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

    try {
      if (auth.currentUser !== null) {
        await changePassword(auth.currentUser, inputs.newPassword);
        setInputs({
          newPassword: "",
          repeatPassword: "",
        });

        // Add interval so password clearing doesn't clear success message
        setTimeout(() => {
          setSuccessMessage("Password updated successfully!");
        }, 350);
      }
    } catch (e: any) {
      if (e.code === "auth/invalid-credential") {
        setAuthError("Email or password is incorrect");
      } else if (e.code === "auth/requires-recent-login") {
        setAuthError("You require a recent login to update your password");
      } else {
        setAuthError("An error occurred while updating");
      }
    }

    setLoading(false);
  };

  // Clear auth error and success message on field change
  useEffect(() => {
    if (authError) setAuthError("");
    if (successMessage) setSuccessMessage("");
  }, [inputs.newPassword, inputs.repeatPassword]);

  return (
    <div className="container borderless">
      <div className="title">
        <h1>Profile page</h1>
      </div>
      <p>Update your password below</p>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input disabled type="text" name="email" value={email as string} />
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
              be at least 6 characters long.
            </p>
          )}
        </label>

        <label>
          <p>Confirm password:</p>
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
          disabled={disabledSubmit}
          type="submit"
          value="Update password"
        />
        {authError && (
          <p className="validation-prompt centered-text">{authError}</p>
        )}
        {successMessage && (
          <p className="validation-prompt centered-text success">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateModal;
