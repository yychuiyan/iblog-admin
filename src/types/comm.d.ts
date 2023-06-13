interface article {
  publishStatus: number;
  status: number;
  views: number;
  comment: number;
  like: number;
  categories: string;
  content: string;
  cover: string;
  introduction: string;
  isComment: boolean;
  isLike: boolean;
  isTop: boolean;
  tags: string[];
  title: string;
}
export interface Action {
  type: string;
  userToken?: string;
  userinfo?: string;
  categories?: string;
  categoryId?: string;
  tags?: string[];
  tagId?: string;
  about?: boolean;
  users?: string;
  userId?: string;
  comments?: string;
  commId?: string;
  message?: string;
  msId?: string;
  articles?: Array;
  article?: article;
  articleStatus?: number;
  articleTopStatus?: number;
  articlePublishStatus?: number;
  artId?: string;
  detail?: string;
  friendly?: string[];
  fid?: string;
  eid?: string;
  essay?: string[];
  rights?: string[];
  rid?: string;
  role?: string[];
  admin?: string[];
}
