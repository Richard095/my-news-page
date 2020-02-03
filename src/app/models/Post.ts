export interface Post {
  _id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  createdAt?: string;
  images?: Images[];
  reactions?: Reactions[];
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
