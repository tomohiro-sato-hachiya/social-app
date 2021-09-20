import React from "react";
import TextInputItem from "../TextInputItem";

interface PROPS {
  show: boolean;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileItem: React.FC<PROPS> = (props) => {
  const textField = (
    <>
      <TextInputItem
        label="displayName"
        value={props.displayName}
        setter={props.setDisplayName}
        type="text"
      />
      <br />
      <TextInputItem
        label="profile"
        value={props.profile}
        setter={props.setProfile}
        type="textarea"
      />
    </>
  );
  return props.show ? textField : null;
};

export default ProfileItem;
