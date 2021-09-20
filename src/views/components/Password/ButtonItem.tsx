import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { auth } from "../../../util/firebase";
import "firebase/auth";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useHistory } from "react-router-dom";

interface PROPS {
  email: string;
  password: string;
  newPassword: string;
}

const ButtonItem: React.FC<PROPS> = (props) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const result: boolean =
      props.email !== "" && props.password !== "" && props.newPassword !== "";
    setDisabled(!result);
  }, [props.email, props.password, props.newPassword]);
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
                updatePassword(user, props.newPassword)
                  .then(() => {
                    window.alert("Password changed");
                    history.push("/");
                  })
                  .catch((error: any) => {
                    window.alert(error.message);
                  });
              })
              .catch((error: any) => {
                window.alert(error.message);
              });
          }
        }}
      >
        Change email
      </Button>
    </>
  );
};

export default ButtonItem;
