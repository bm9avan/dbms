import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./JobRouter.css"; // Create a separate CSS file for styling

const JobRouter = () => {
  return (
    <>
      <nav className="inner-nav-bar">
        <NavLink
          to="/jobs"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          end
        >
          All Job Openings
        </NavLink>
        <NavLink
          to="me"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Applicable for Me
        </NavLink>
        <NavLink
          to="post"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Post a Job
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default JobRouter;
