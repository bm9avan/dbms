import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import configFn from "../../utils/configFn";
import "../jobs.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { configActions } from "../../store/configStore";
const DisplayJobs = ({ me }) => {
  const navigate = useNavigate();
  const state = useSelector((s) => s.auth);
  const user = state.user;
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(null);
  const [data, setData] = useState(null);
  const [del, setDelete] = useState(null);
  const [loading, setLoding] = useState(true);
  const notifyErr = (message, theme, hideProgressBar) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme,
    });
  };
  const notify = (message, theme, hideProgressBar) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme,
    });
  };
  useEffect(() => {
    setDelete(null);
    async function fetchJob() {
      let res;
      if (Object.keys(state.user.userData).length === 6) {
        res = await configFn.getDBemail(state.user.userData.email);
      } else {
        res = await configFn.getAllDBs();
      }
      const data = await res.json();
      console.log(data);
      setData(data);
      setLoding(false);
    }
    async function fetchAppliedJob() {
      const res = await configFn.appliedBYseeker(user.userData.email);
      const data = await res.json();
      console.log(data);
      setApplied(data);
      setLoding(false);
    }
    if (state.status && state.status !== "check") {
      if (me) {
        fetchAppliedJob();
      }
      fetchJob();
    }
  }, [me, del]);
  console.log(applied);
  if (!state.status) {
    return (
      <div className="message">
        Unauthorized -{" "}
        <button className="navbar-btn" onClick={() => navigate("/account")}>
          Sign Up / Log In
        </button>{" "}
        to see Jobs available
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      {me && applied && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Job Provider</th>
            </tr>
          </thead>
          <tbody>
            {applied.map((job, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{job.job_title}</td>
                <td>{job.providerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!me && data
        ? data.map((job) => {
            return (
              <div className="job-card" key={job.ID}>
                {/* Your conditional rendering logic goes here */}
                {Object.keys(state.user.userData).length === 6 && (
                  <>
                    {" "}
                    <span
                      className="delete"
                      onClick={() => {
                        configFn.deleteDB(job.ID);
                        console.log(job.ID);
                        setDelete(true);
                        notify("Job Deleted Sucessfully", undefined, true);
                      }}
                    >
                      <MdOutlineDeleteOutline className="icon" />
                    </span>
                    <span
                      className="edit"
                      onClick={() => {
                        dispatch(configActions.startEditingPost(job.ID));
                        navigate("post");
                      }}
                    >
                      <MdEdit className="icon" />
                    </span>
                  </>
                )}
                <h2>{job.title}</h2>
                <p>{job.descr}</p>
                <h4>{job.exp} yr Expressnes Required</h4>
                <p></p>
                <div className="techs">
                  {job.techs.split(",").map((tech, idx) => (
                    <span key={idx}>{tech}</span>
                  ))}
                </div>
                {Object.keys(state.user.userData).length !== 6 && (
                  <>
                    <button
                      className="details-button"
                      onClick={async () => {
                        const res = await configFn.apply(
                          job.ID,
                          job.email,
                          user.userData.email
                        );
                        console.log(res);
                        if (res.status === 200)
                          notify("Job Applied Sucessfully", undefined, true);
                        else notifyErr("Job Already Applied", undefined, true);
                      }}
                    >
                      Apply Job
                    </button>
                    <div>Job posted by {job.email}</div>
                  </>
                )}
              </div>
            );
          })
        : !me && <div>No jobs available </div>}
    </div>
  );
};

export default DisplayJobs;
