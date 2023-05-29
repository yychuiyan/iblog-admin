export interface Action {
  type: string;
  userToken?: string;
  userinfo?: string;
  categories?: string;
  categoryId?: string;
  tags?: Array;
  tagId?: string;
  about?: boolean;
  users?: string;
  userId?: string;
  comments?: string;
  commId?: string;
  message?: string;
  msId?: string;
  articles?: Array;
}
