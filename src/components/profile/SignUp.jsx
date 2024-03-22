import { useDispatch } from "react-redux";
import { authActions } from "../../store/authStore";
import { useEffect, useRef, useState } from "react";
import authFn from "../../utils/authFn";

const SignUp = () => {
  const [comp, setComp] = useState("nopov");
  console.log(comp);
  return (
    <div className="simp">
      <input
        type="radio"
        name="up"
        value="pov"
        id="pov"
        onChange={(e) => setComp(e.target.value)}
        checked={comp === "pov"}
      />
      <label htmlFor="pov">Job Provider</label>
      <input
        type="radio"
        name="up"
        value="nopov"
        id="nopov"
        onChange={(e) => setComp(e.target.value)}
        checked={comp === "nopov"}
      />
      <label htmlFor="nopov">Job Seeker</label>
      {comp === "pov" ? <Comp /> : <NonComp />}
    </div>
  );
};

function Comp() {
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
      .signUp({ ...formData, company: true })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        authFn
          .login(formData.email, formData.password)
          .then((data) => {
            console.log(data);
            return data.json();
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem("auth", data.token);
            dispatch(authActions.login({ userData: authFn.getCurrentUser() }));
          });
      })
      .catch((error) => setError(error.message))
      .finally(() => setBtn(null));
  };
  return (
    <div className="form-container">
      {" "}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input ref={firstRef} type="text" id="name" name="name" required />

        <label htmlFor="companyname">Company Name:</label>
        <input type="text" id="companyname" name="companyname" required />

        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" required />

        <label htmlFor="descr">Dercription:</label>
        <input type="textbox" id="descr" name="descr" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={btn}>
          {btn ? btn : "SignUp"}
        </button>
      </form>
    </div>
  );
}

function NonComp() {
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
      .signUp({ ...formData, company: false })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        authFn
          .login(formData.email, formData.password)
          .then((data) => {
            console.log(data);
            return data.json();
          })
          .then((data) => {
            console.log(data);
            if (data.error) {
              throw new Error(data.error);
            }
            localStorage.setItem("auth", data.token);
            dispatch(authActions.login({ userData: authFn.getCurrentUser() }));
          });
      })
      .catch((error) => setError(error.message))
      .finally(() => setBtn(null));
  };
  return (
    <div className="form-container">
      {" "}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input ref={firstRef} type="text" id="name" name="name" required />

        <label htmlFor="skills">Skills:</label>
        <input type="text" id="skills" name="skills" required />

        <label htmlFor="descr">Dercription:</label>
        <input type="textbox" id="descr" name="descr" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={btn}>
          {btn ? btn : "SignUp"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
