import React, { useState, useEffect } from "react";
import { db } from "../../../util/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useHistory, Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { follow } from "../../../util/interface";

const FollowItem: React.FC<follow> = (props) => {
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();

  useEffect(() => {
    const q = query(collection(db, "profiles"), where("uid", "==", props.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        history.push("/");
      }
      querySnapshot.docs.forEach((doc) => {
        setDisplayName(doc.data().display_name);
      });
    });
    return () => unsub();
  }, [props.uid]);

  return (
    <ListItem key={props.id}>
      <p>
        <Link to={`/profile/${props.uid}`} className="no_underline">
          {displayName}
        </Link>
      </p>
    </ListItem>
  );
};

export default FollowItem;
