import React, { useEffect, useState } from "react";
import "../../components/profile/Form.css"; // Replace 'YourFormStyles.css' with the actual name of your CSS file
import configFn from "../../appWrite/configFn";
import { useSelector } from "react-redux";
import authFn from "../../appWrite/authFn";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);
  const [intialData, setIntialData] = useState({
    cgpa: "6.5",
    date: "",
    desc: "",
    skills: "",
    title: "",
  });
  const [btn, setBtn] = useState(null);
  const state = useSelector((s) => s.auth);
  const user = state.user;
  const id = useSelector((s) => s.config.postId);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      configFn
        .getDB(id)
        .then((data) => setIntialData(data))
        .catch((error) => setError(error));
    }
  }, [id]);

  if (state.status === "check") {
    return <>Loading...</>;
  }

  if (!user) {
    return (
      <div className="message">
        Unauthorized -{" "}
        <button className="navbar-btn" onClick={() => navigate("/account")}>
          Sign Up / Log In
        </button>{" "}
        to see Jobs available and post job.
      </div>
    );
  }

  if (user && !user.userData.emailVerification) {
    if (btn && typeof btn === "object") {
      return (
        <>
          <div className="message">
            Mail has sent{" "}
            <a href="https://mail.google.com/mail/" target="_blank">
              <button>Open Gmail</button>
            </a>
          </div>
          <br />
          <div>Reload the window after verification</div>
        </>
      );
    }
    return (
      <>
        {error && <div className="error">{error}</div>}
        <div className="message">
          Unverified -{" "}
          <button
            className="navbar-btn"
            onClick={() => {
              setBtn("Sending Verification mail...");
              authFn
                .emailVerification()
                .then((data) => {
                  setBtn(data);
                })
                .catch((error) => setError(error.message));
              // .finally(() => setBtn(null));
            }}
            disabled={btn}
          >
            {btn ? btn : "Verify"}
          </button>{" "}
          your account to post Job.
        </div>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (id) {
      setBtn("Updating Post...");
    } else {
      setBtn("Creating Post...");
    }
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());
    formData.email = user.userData.email;
    formData.name = user.userData.name;
    formData.usn = user.userData.$id;
    if (id) {
      configFn
        .updateDB(id, formData)
        .then((data) => {
          console.log(data);
          setStatus(true);
        })
        .catch((error) => setError(error.message))
        .finally(() => setBtn(null));
    } else {
      configFn
        .postDB(formData)
        .then((data) => {
          console.log(data);
          setStatus(true);
        })
        .catch((error) => setError(error.message))
        .finally(() => setBtn(null));
    }
  };

  if (status) {
    return (
      <>
        sucess
        <button onClick={() => setStatus(false)}>Add another post</button>
      </>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={intialData.title}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required={!id}
          defaultValue={Date(intialData.date)}
        />

        <label htmlFor="desc">Description (Optional):</label>
        <input
          type="text"
          id="desc"
          name="desc"
          defaultValue={intialData.desc}
        />

        <label htmlFor="skills">Skills (Separate by comma):</label>
        <input
          type="text"
          id="skills"
          name="skills"
          required
          defaultValue={intialData.skills}
          placeholder="Technologies (comma separated)"
        />

        <label htmlFor="cgpa">CGPA:</label>
        <input
          type="number"
          step={0.01}
          id="cgpa"
          name="cgpa"
          defaultValue={intialData.cgpa}
        />

        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={btn}>
          {btn ? btn : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
