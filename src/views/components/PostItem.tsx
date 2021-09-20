import React, { useState, useEffect } from "react";
import { ListItem, Button } from "@material-ui/core";
import { post } from "../../util/interface";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../util/firebase";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const PostItem: React.FC<post> = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [showStar, setShowStar] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "profiles"), where("uid", "==", props.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDisplayName(doc.data().display_name);
      });
    });
    return () => unsub();
  }, [props.uid]);
  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : "";
    const q = query(
      collection(db, "likes"),
      where("uid", "==", uid),
      where("post", "==", props.id)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length) {
        querySnapshot.forEach((doc) => {
          setLikeId(doc.id);
        });
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
    return () => unsub();
  }, [auth.currentUser, props.id]);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setShowStar(user !== null);
    });
    return () => unSub();
  });

  const like = async () => {
    const user = auth.currentUser;
    if (user) {
      if (liked) {
        const likeDoc = doc(db, "likes", likeId);
        await deleteDoc(likeDoc);
      } else {
        await addDoc(collection(db, "likes"), {
          uid: user.uid,
          post: props.id,
        });
      }
      setLiked(!liked);
    }
  };

  return (
    <ListItem key={props.id}>
      <p>
        <Link to={`/profile/${props.uid}`} className="no_underline">
          {displayName}
        </Link>
        {showStar && (
          <Button aria-label="like" onClick={like}>
            {liked ? (
              <StarIcon className="star like" />
            ) : (
              <StarBorderIcon className="star not_like" />
            )}
          </Button>
        )}
        <br />
        <span className="line_feed">{props.content}</span>
        <br />
        posted at {props.created_at.toDate().toLocaleString()}
      </p>
    </ListItem>
  );
};

export default PostItem;
