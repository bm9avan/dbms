import React, { useEffect, useState } from "react";
import authFn from "../appWrite/authFn";

const Verify = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMessage("Verifing User...");
    authFn
      .updateVerification()
      .then((data) => {
        console.log(data);
        setMessage("User Verification Sucessful");
      })
      .catch((error) => {
        setMessage(null);
        setError(error.message);
      })
      .finally(() => setMessage(null));
  }, []);

  return (
    <div>
      <h3>Verification</h3>
      {error && <div className="error">{error}</div>}
      {message && message}
    </div>
  );
};

export default Verify;
