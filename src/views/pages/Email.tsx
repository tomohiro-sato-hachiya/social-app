import React, { useState, useEffect } from "react";
import EmailPasswordItem from "../components/credintial/EmailPasswordItem";
import ButtonItem from "../components/Email/ButtonItem";
import TextInputItem from "../components/TextInputItem";
import { auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const Edit: React.FC = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      !user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div>
      <h2>Change Email</h2>
      <Link to="/edit" className="no_underline">
        Go back to edit profile
      </Link>
      <br />
      <Link to="/password" className="no_underline">
        Change password
      </Link>
      <h3>Confirm credintial</h3>
      <EmailPasswordItem
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <br />
      <h3>New email</h3>
      <TextInputItem
        label="New email"
        value={newEmail}
        setter={setNewEmail}
        type="text"
      />
      <br />
      <ButtonItem email={email} password={password} newEmail={newEmail} />
    </div>
  );
};

export default Edit;
