import { useDispatch } from "react-redux";
import { authActions } from "../../store/authStore";
import { useEffect, useRef, useState } from "react";
import authFn from "../../appWrite/authFn";

const SignUp = () => {
  const dispatch = useDispatch();
  const firstRef = useRef();
  const [error, setError] = useState(null);
  const [btn, setBtn] = useState(null);
  useEffect(() => firstRef.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setBtn("Creating account...");
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());
    authFn
      .signUp(
        formData.usn.toUpperCase(),
        formData.email,
        formData.password,
        formData.name
      )
      .then((data) => {
        // window.location.reload();
        authFn
          .getCurrentUser()
          .then((userData) => dispatch(authActions.login({ userData })))
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message))
      .finally(() => setBtn(null));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input ref={firstRef} type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" name="phone" maxLength={15} required />

        <label htmlFor="usn">USN:</label>
        <input
          type="text"
          id="usn"
          name="usn"
          minLength={10}
          maxLength={10}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={8}
          required
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={btn}>
          {btn ? btn : "SignUp"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
