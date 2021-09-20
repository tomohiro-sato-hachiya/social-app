import React, { useState, useEffect } from "react";
import { db } from "../../util/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

interface PROPS {
  uid: string;
}

const NumOfFollowItem: React.FC<PROPS> = (props) => {
  const [numOfFollowees, setNumOfFollowees] = useState(0);
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  useEffect(() => {
    const q = query(
      collection(db, "follows"),
      where("followee", "==", props.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setNumOfFollowers(querySnapshot.docs.length);
    });
    return () => unsub();
  }, [props.uid]);
  useEffect(() => {
    const q = query(
      collection(db, "follows"),
      where("follower", "==", props.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setNumOfFollowees(querySnapshot.docs.length);
    });
    return () => unsub();
  }, [props.uid]);
  return (
    <Link to={`/follows/${props.uid}`} className="no_underline">
      {numOfFollowers} follows
      <br />
      {numOfFollowees} following
    </Link>
  );
};

export default NumOfFollowItem;
