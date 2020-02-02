export interface Post {
  _id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  createdAt?: string;
  images?: Images[];
}
export interface Images {
  url?: string;
  id?: string;
}
