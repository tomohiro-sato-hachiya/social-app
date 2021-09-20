import React, { useState, useEffect } from "react";
import EmailPasswordItem from "../components/credintial/EmailPasswordItem";
import ProfileItem from "../components/credintial/ProfileItem";
import ButtonItem from "../components/Login/ButtonItem";
import { auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Login: React.FC = (props: any) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      user && props.history.goBack();
    });
    return () => unSub();
  }, [props.history]);
  return (
    <div>
      <h2>Login/Register</h2>
      <EmailPasswordItem
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <br />
      <ProfileItem
        show={!login}
        displayName={displayName}
        setDisplayName={setDisplayName}
        profile={profile}
        setProfile={setProfile}
      />
      <br />
      <ButtonItem
        email={email}
        password={password}
        displayName={displayName}
        profile={profile}
        login={login}
      />
      <br />
      <span onClick={() => setLogin(!login)}>
        {login ? "Create new account ?" : "Back to login"}
      </span>
    </div>
  );
};

export default Login;
