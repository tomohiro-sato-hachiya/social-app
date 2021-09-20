import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "@material-ui/core";
import { db, auth } from "../../../util/firebase";
import "firebase/auth";
import { updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

interface PROPS {
  email: string;
  password: string;
  displayName: string;
  profile: string;
  login: boolean;
}

const ButtonItem: React.FC<PROPS> = (props) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    let result: boolean = true;
    if (props.email && props.password) {
      if (props.login) {
        result = false;
      } else {
        result = !props.displayName;
      }
    }
    setDisabled(result);
  }, [props.login, props.email, props.password, props.displayName]);
  const button = (
    <Button
      variant="contained"
      color="primary"
      size="small"
      disabled={disabled}
      onClick={
        props.login
          ? async () => {
              try {
                await signInWithEmailAndPassword(
                  auth,
                  props.email,
                  props.password
                );
                history.push("/");
              } catch (error: any) {
                alert(error.message);
              }
            }
          : async () => {
              try {
                await createUserWithEmailAndPassword(
                  auth,
                  props.email,
                  props.password
                );
                const user = auth.currentUser;
                if (user) {
                  await updateProfile(user, {
                    displayName: props.displayName,
                  });
                  addDoc(collection(db, "profiles"), {
                    uid: user.uid,
                    display_name: props.displayName,
                    profile: props.profile,
                  });
                } else {
                  throw new Error("Failed to register the user");
                }
              } catch (error: any) {
                alert(error.message);
              }
            }
      }
    >
      {props.login ? "Login" : "Register"}
    </Button>
  );
  return button;
};

export default ButtonItem;
