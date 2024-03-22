import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import configFn from "../../appWrite/configFn";
import "../jobs.css";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { configActions } from "../../store/configStore";
const DisplayJobs = ({ me }) => {
  const navigate = useNavigate();
  const state = useSelector((s) => s.auth);
  const user = state.user;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [cgpa, setcgpa] = useState(8);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    async function fetchJob() {
      const res = await configFn.getAllDBs();
      setData(res.documents);
      setLoding(false);
    }
    if (state.status && state.status !== "check") {
      fetchJob();
    }
  }, [me, cgpa]);
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
      {me && (
        <>
          <div style={{ height: "3rem" }}></div>
          <div className="searchdiv">
            <label htmlFor="searchcgpa">CGPA : </label>
            <input
              type="number"
              name="searchcgpa"
              id="searchcgpa"
              value={cgpa}
              onChange={(e) => setcgpa(e.target.value)}
              min={5}
              max={10}
              placeholder="Enter your CGPA"
              required
            />
          </div>
        </>
      )}
      {data ? (
        data
          .filter((eachJob) => (me ? +eachJob.cgpa <= +cgpa : true))
          .map((job) => {
            return (
              <div className="job-card" key={job.$id}>
                {job.usn === user.userData.$id && (
                  <>
                    <span
                      className="delete"
                      onClick={() => configFn.deleteDB(job.$id)}
                    >
                      <MdOutlineDeleteOutline className="icon" />
                    </span>
                    <span
                      className="edit"
                      onClick={() => {
                        dispatch(configActions.startEditingPost(job.$id));
                        navigate("post");
                      }}
                    >
                      <MdEdit className="icon" />
                    </span>
                  </>
                )}
                <h2>{job.title}</h2>
                <p>{job.desc}</p>
                <p>
                  <b>CGPA</b> : {job.cgpa ? job.cgpa : "Not specified"}
                </p>
                <div className="techs">
                  {job.skills.split(",").map((tech, idx) => {
                    return <span key={job.$id + idx}>{tech}</span>;
                  })}
                </div>
                <div>Interview on</div>
                <button className="details-button">
                  {Date(job.date).slice(0, 16)}
                </button>
                <span>
                  <div>
                    Job posted by {job.name} ({job.usn})
                  </div>
                  <div>{job.email}</div>
                </span>
              </div>
            );
          })
      ) : (
        <div>No jobs available for your CGPA</div>
      )}
    </div>
  );
};

export default DisplayJobs;
