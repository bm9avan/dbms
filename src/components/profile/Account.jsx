import React from "react";
import authFn from "../../appWrite/authFn";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authStore";
import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user.userData);
  console.log(user);
  return (
    <div className="auth">
      <div className="account-container">
        <h1>Account Information</h1>
        <div className="user-details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>USN:</strong> {user.$id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Email Verification:</strong>{" "}
            {user.emailVerification ? "Verified" : "Not Verified"}
          </p>
          <p>
            <strong>Registration Date:</strong>{" "}
            {new Date(user.registration).toLocaleDateString()}
          </p>
          {/* Add more details as needed */}
        </div>
      </div>
      <button
        className="logout"
        onClick={() => {
          authFn.logout().then(() => dispatch(authActions.logout()));
        }}
      >
        Log Out
      </button>{" "}
    </div>
  );
};

export default Account;
