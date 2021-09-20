import React, { useState, useEffect } from "react";
import "../../css/Timeline.css";
import { db, auth } from "../../util/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { List } from "@material-ui/core";
import { like } from "../../util/interface";
import { onAuthStateChanged } from "firebase/auth";
import LikeItem from "../components/Likes/LikeItem";

const Likes: React.FC = (props: any) => {
  const array: Array<like> = [];
  const [likes, setLikes] = useState(array);
  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : "";
    const q = query(collection(db, "likes"), where("uid", "==", uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setLikes(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          post: doc.data().post,
        }))
      );
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user === null) {
        props.history.push("/login");
      }
    });
    return () => unSub();
  }, []);
  return (
    <div>
      <h2>Likes</h2>
      <List>
        {likes.map((like) => (
          <LikeItem
            key={like.id}
            id={like.id}
            uid={like.uid}
            post={like.post}
          />
        ))}
      </List>
    </div>
  );
};

export default Likes;
