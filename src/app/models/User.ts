import { Post } from './Post';

export interface User {
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  token?: string;
  email?: string;
  posts?: Post[]
}
