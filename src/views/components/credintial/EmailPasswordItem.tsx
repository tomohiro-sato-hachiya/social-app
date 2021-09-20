import React from "react";
import TextInputItem from "../TextInputItem";

interface PROPS {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const EmailPasswordItem: React.FC<PROPS> = (props) => {
  return (
    <>
      <TextInputItem
        label="email"
        value={props.email}
        setter={props.setEmail}
        type="text"
      />
      <br />
      <TextInputItem
        label="password"
        value={props.password}
        setter={props.setPassword}
        type="password"
      />
    </>
  );
};

export default EmailPasswordItem;
