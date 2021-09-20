import React, { useState } from "react";
import { like } from "../../../util/interface";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../../util/firebase";
import PostItem from "../PostItem";

const LikeItem: React.FC<like> = (props) => {
  const [post, setPost] = useState({
    id: "",
    uid: "",
    content: "",
    created_at: Timestamp.now(),
  });
  const getPost = async () => {
    const docRef = doc(db, "posts", props.post);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({
        id: docSnap.id,
        uid: docSnap.data().uid,
        content: docSnap.data().content,
        created_at: docSnap.data().created_at,
      });
    }
  };
  getPost();
  return (
    <PostItem
      id={props.post}
      uid={post.uid}
      content={post.content}
      created_at={post.created_at}
    />
  );
};

export default LikeItem;
