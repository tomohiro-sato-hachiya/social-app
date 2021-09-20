import React, { useState, useEffect } from "react";
import EmailPasswordItem from "../components/credintial/EmailPasswordItem";
import ProfileItem from "../components/credintial/ProfileItem";
import ButtonItem from "../components/Edit/ButtonItem";
import { db, auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const Edit: React.FC = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState("");
  const [profileId, setProfileId] = useState("");
  const [preDisplayName, setPreDisplayName] = useState("");
  const [preProfile, setPreProfile] = useState("");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      !user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);
  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : "";
    const q = query(collection(db, "profiles"), where("uid", "==", uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        setPreDisplayName(doc.data().display_name);
        setPreProfile(doc.data().profile);
        setProfileId(doc.id);
      });
    });
    return () => unsub();
  }, [auth.currentUser]);

  return (
    <div>
      <h2>Edit profile</h2>
      <Link to="/email" className="no_underline">
        Change email
      </Link>
      <br />
      <Link to="/password" className="no_underline">
        Change password
      </Link>
      <h3>Current display name:{preDisplayName}</h3>
      <h3>Current profile</h3>
      <p className="line_feed">{preProfile}</p>
      <h3>Confirm credintial</h3>
      <EmailPasswordItem
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <br />
      <h3>Edit profile</h3>
      <ProfileItem
        show={true}
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
        profileId={profileId}
      />
    </div>
  );
};

export default Edit;
