import React, { useState, useEffect } from "react";
import "../../css/Timeline.css";
import { db, auth } from "../../util/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { List, FormControl, TextField, Button } from "@material-ui/core";
import PostItem from "../components/PostItem";
import { post } from "../../util/interface";

const Timeline: React.FC = (props: any) => {
  const array: Array<post> = [];
  const [posts, setPosts] = useState(array);
  const [content, setContent] = useState("");
  useEffect(() => {
    const q = query(collection(db, "posts"));
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
  });
  const newPost = () => {
    const user = auth.currentUser;
    if (user) {
      addDoc(collection(db, "posts"), {
        uid: user.uid,
        content: content,
        created_at: Timestamp.now(),
      });
      setContent("");
    }
  };
  return (
    <div>
      <h2>Timeline</h2>
      {auth.currentUser && (
        <>
          <FormControl>
            <TextField
              name="content"
              label="post timeline"
              type="textarea"
              value={content}
              multiline
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContent(e.target.value);
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={async () => {
              try {
                newPost();
              } catch (error: any) {
                alert(error.message);
              }
            }}
          >
            Post
          </Button>
        </>
      )}
      <br />
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
