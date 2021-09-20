import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../util/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import NumOfFollowItem from "./NumOfFollowItem";
import EditIcon from "@material-ui/icons/Edit";

const HeaderPart: React.FC = () => {
  const history = useHistory();
  const [isLogined, setIsLogined] = useState(false);
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileLink, setProfileLink] = useState("");
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setIsLogined(user !== null);
      const uid = user ? user.uid : "";
      setUid(uid);
      setProfileLink(`/profile/${uid}`);
      setDisplayName(user && user.displayName ? user.displayName : "");
    });
    return () => unSub();
  }, [auth.currentUser]);

  return (
    <div>
      <h1>Social App</h1>
      {isLogined && (
        <>
          <h3>Hi, {displayName}</h3>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              history.push("/edit");
            }}
            startIcon={<EditIcon />}
          >
            Edit profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={async () => {
              try {
                await signOut(auth);
              } catch (error: any) {
                alert(error.message);
              } finally {
                history.push("/");
              }
            }}
          >
            Logout
          </Button>
          <br />
          <NumOfFollowItem uid={uid} />
          <br />
        </>
      )}
      {!isLogined && (
        <>
          <h3>Welcome!</h3>
          <Link to="/login" className="no_underline">
            <Button variant="contained" color="primary" size="small">
              Login/Register
            </Button>
          </Link>
        </>
      )}
      <List>
        <Link to="/" className="no_underline">
          <ListItem key="timeline" button>
            <ListItemText primary="Timeline" />
          </ListItem>
        </Link>
        {isLogined && (
          <>
            <Link to="/likes" className="no_underline">
              <ListItem key="likes" button>
                <ListItemText primary="Likes" />
              </ListItem>
            </Link>
            <Link to={profileLink} className="no_underline">
              <ListItem key="profile" button>
                <ListItemText primary="My profile & posts" />
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </div>
  );
};

export default HeaderPart;
