import { Timestamp } from "firebase/firestore";

export interface post {
  id: string;
  uid: string;
  content: string;
  created_at: Timestamp;
}

export interface like {
  id: string;
  uid: string;
  post: string;
}

export interface follow {
  id: string;
  uid: string;
}
