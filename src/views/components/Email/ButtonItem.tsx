import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { auth } from "../../../util/firebase";
import "firebase/auth";
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useHistory } from "react-router-dom";

interface PROPS {
  email: string;
  password: string;
  newEmail: string;
}

const ButtonItem: React.FC<PROPS> = (props) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const result: boolean =
      props.email !== "" && props.password !== "" && props.newEmail !== "";
    setDisabled(!result);
  }, [props.email, props.password, props.newEmail]);
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
                updateEmail(user, props.newEmail)
                  .then(() => {
                    window.alert("Email changed");
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
