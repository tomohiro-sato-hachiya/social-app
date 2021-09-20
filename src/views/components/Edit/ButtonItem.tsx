import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db, auth } from "../../../util/firebase";
import "firebase/auth";
import {
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

interface PROPS {
  email: string;
  password: string;
  displayName: string;
  profile: string;
  profileId: string;
}

const ButtonItem: React.FC<PROPS> = (props) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const result: boolean =
      props.email !== "" && props.password !== "" && props.displayName !== "";
    setDisabled(!result);
  }, [props.email, props.password, props.displayName]);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={disabled}
        onClick={async () => {
          const user = auth.currentUser;
          if (user !== null) {
            const credential = EmailAuthProvider.credential(
              props.email,
              props.password
            );
            reauthenticateWithCredential(user, credential)
              .then(async () => {
                await updateProfile(user, {
                  displayName: props.displayName,
                });
                const profileDoc = doc(db, "profiles", props.profileId);
                await setDoc(profileDoc, {
                  uid: user.uid,
                  display_name: props.displayName,
                  profile: props.profile,
                }).then(() => {
                  window.alert("Profile changed");
                  history.push("/");
                });
              })
              .catch((error: any) => {
                window.alert(error.message);
              });
          }
        }}
      >
        Edit
      </Button>
    </>
  );
};

export default ButtonItem;
