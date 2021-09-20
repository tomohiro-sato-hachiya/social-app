import React, { useState, useEffect } from "react";
import "../../css/Timeline.css";
import { db, auth } from "../../util/firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { List } from "@material-ui/core";
import PostItem from "../components/PostItem";
import { post } from "../../util/interface";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@material-ui/core";
import NumOfFollowItem from "../components/NumOfFollowItem";

const Timeline: React.FC = (props: any) => {
  const { params } = props.match;
  const history = useHistory();
  const array: Array<post> = [];
  const [posts, setPosts] = useState(array);
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState("");
  const [canFollow, setCanFollow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState("");
  useEffect(() => {
    const q = query(collection(db, "posts"), where("uid", "==", params.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          content: doc.data().content,
          created_at: doc.data().created_at,
        }))
      );
    });
    return () => unsub();
  }, [params.uid]);
  useEffect(() => {
    const q = query(collection(db, "profiles"), where("uid", "==", params.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        history.push("/");
      }
      querySnapshot.docs.forEach((doc) => {
        setDisplayName(doc.data().display_name);
        setProfile(doc.data().profile);
      });
    });
    return () => unsub();
  }, [params.uid]);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setCanFollow(false);
      } else {
        setCanFollow(user.uid !== params.uid);
      }
    });
    return () => unSub();
  });
  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : "";
    const q = query(
      collection(db, "follows"),
      where("followee", "==", params.uid),
      where("follower", "==", uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length) {
        querySnapshot.forEach((doc) => {
          setFollowId(doc.id);
        });
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    });
    return () => unsub();
  }, [params.uid]);

  const follow = async () => {
    const user = auth.currentUser;
    if (user && canFollow) {
      if (isFollowing) {
        const followDoc = doc(db, "follows", followId);
        await deleteDoc(followDoc);
      } else {
        await addDoc(collection(db, "follows"), {
          followee: params.uid,
          follower: user.uid,
        });
      }
    }
    setIsFollowing(!isFollowing);
  };
  return (
    <div>
      <h2>{displayName}'s Profile</h2>
      <NumOfFollowItem uid={params.uid} />
      <br />
      {canFollow && (
        <Button
          aria-label="follow"
          color="primary"
          size="small"
          onClick={follow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
      <br />
      <p className="line_feed">{profile}</p>
      <h3>Posts</h3>
      <List>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            uid={post.uid}
            content={post.content}
            created_at={post.created_at}
          />
        ))}
      </List>
    </div>
  );
};

export default Timeline;
