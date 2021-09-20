import React from "react";
import { FormControl, TextField } from "@material-ui/core";

interface PROPS {
  label: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  type: "text" | "textarea" | "password";
}

const TextInputItem: React.FC<PROPS> = (props) => {
  return (
    <FormControl>
      <TextField
        name={props.label}
        label={props.label}
        type={props.type}
        multiline={props.type === "textarea"}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setter(e.target.value);
        }}
      />
    </FormControl>
  );
};

export default TextInputItem;
