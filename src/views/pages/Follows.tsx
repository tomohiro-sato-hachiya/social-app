import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../util/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { List } from "@material-ui/core";
import FollowItem from "../components/Follows/FollowItem";
import { follow } from "../../util/interface";

const Follows: React.FC = (props: any) => {
  const { params } = props.match;
  const history = useHistory();
  const array: Array<follow> = [];
  const [follows, setFollows] = useState(array);
  const [showFollowers, setShowFollowers] = useState(true);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    const q = query(collection(db, "profiles"), where("uid", "==", params.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        history.push("/");
      }
      querySnapshot.docs.forEach((doc) => {
        setDisplayName(doc.data().display_name);
      });
    });
    return () => unsub();
  }, [params.uid]);

  useEffect(() => {
    const q = query(
      collection(db, "follows"),
      showFollowers
        ? where("followee", "==", params.uid)
        : where("follower", "==", params.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setFollows(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          uid: showFollowers ? doc.data().follower : doc.data().followee,
        }))
      );
    });
    return () => unsub();
  }, [params.uid, showFollowers]);

  return (
    <div>
      <h3>
        {displayName}
        {showFollowers ? "'s followers:" : " is following:"}
      </h3>
      <span onClick={() => setShowFollowers(!showFollowers)}>
        {showFollowers ? "Show followees" : "Show followers"}
      </span>
      <br />
      <List>
        {follows.map((follow) => (
          <FollowItem key={follow.id} id={follow.id} uid={follow.uid} />
        ))}
      </List>
    </div>
  );
};

export default Follows;
