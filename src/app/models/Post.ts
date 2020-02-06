export interface Post {
  _id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  createdAt?: string;
  images?: Images[];
  reactions?: Reactions[];
  comments?: Comment[];
}
export interface Images {
  url?: string;
  id?: string;
}

export interface Reactions {
  _id?: string;
  postedBy?: string;
}

export interface IGiveReaction {
  postId?: string;
  reactionId?: string;
}

export interface Comment {
  _id?: string;
  commentedBy?: string;
  postId?: string;
  comment?: string;
  commentId?: string;
  createdAt?: string;
}
