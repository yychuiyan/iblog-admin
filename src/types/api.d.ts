import { AxiosRequestConfig, AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<ApiResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<ApiResponse>;
  }
}

export interface ApiResponse<T = any> {
  error: number;
  msg: string;
  code: number;
  data: T;
}
// 登录
interface LoginParams {
  username: string;
  password: string;
}
interface UserRegister {
  username: string;
  password: string;
  verifyPassword: string;
}
interface CategoryUpdate {
  id: string;
  name: string;
  articleNum: number;
  createTime: string;
  updateTime: string;
}
interface TagsUpdate {
  id: string;
  name: string;
}
interface TagsUpdateStatus {
  status: boolean;
  id: string;
}
interface AboutAdd {
  isChecked: boolean;
  updateTime: string;
  createTime: string;
  content: string;
}
interface AboutUpdate {
  id: string;
  isChecked: boolean;
  updateTime: string;
  createTime: string;
  content: string;
}
interface MessageStatus {
  id: string;
  auditStatus: boolean;
}
export interface Api {
  Login(params: LoginParams): Promise<ApiResponse>;
  userRegister(params: UserRegister): Promise<ApiResponse>;
  loginOut(): Promise<ApiResponse>;
  getCategories(page: number, pageSize: number, name: string): Promise<ApiResponse>;
  categoryAdd(name: string): Promise<ApiResponse>;
  categoryDelete(id: string): Promise<ApiResponse>;
  categoryUpdate(params: CategoryUpdate): Promise<ApiResponse>;
  getTagList(page: number, pageSize: number, name: string): Promise<ApiResponse>;
  tagAdd(name: string): Promise<ApiResponse>;
  tagDelete(id: string): Promise<ApiResponse>;
  tagUpdate(params: TagsUpdate): Promise<ApiResponse>;
  tagStatusUpdate(params: TagsUpdateStatus): Promise<ApiResponse>;
  getAboutList(checked: boolean): Promise<ApiResponse>;
  aboutAdd(params: AboutAdd): Promise<ApiResponse>;
  aboutUpdate(params: AboutUpdate): Promise<ApiResponse>;
  getUserInfo(page: number, pageSize: number, nickName: string): Promise<ApiResponse>;
  userDelete(id: string): Promise<ApiResponse>;
  getComments(page: number, pageSize: number, articleTitle: string): Promise<ApiResponse>;
  commentDelete(id: string): Promise<ApiResponse>;
  getMessages(page: number, pageSize: number, auditStatus: boolean): Promise<ApiResponse>;
  messageStatusUpdate(params: MessageStatus): Promise<ApiResponse>;
  messageDelete(id: string): Promise<ApiResponse>;
  getArticleList(
    page: number,
    pageSize: number,
    title: string,
    status: boolean,
    publishStatus: boolean
  ): Promise<ApiResponse>;
  getArticleListAll(status: string, publishStatus: string): Promise<ApiResponse>;
  articleAdd(params: any): Promise<ApiResponse>;
  articleStatusUpdate(params: any): Promise<ApiResponse>;
  articleTopStatusUpdate(params: any): Promise<ApiResponse>;
  articlePublishStatusUpdate(params: any): Promise<ApiResponse>;
  articleUpdate(params: any): Promise<ApiResponse>;
  articleDetail(id: number): Promise<ApiResponse>;
  articleDelete(id: number): Promise<ApiResponse>;
  articleCollectUpdate(params: any): Promise<ApiResponse>;
  upload(params: FormData): Promise<ApiResponse>;
  getFriendlyList(page: number, pageSize: number, name: string): Promise<ApiResponse>;
  friendlyDelete(id: number): Promise<ApiResponse>;
  friendlyInsert(params: any): Promise<ApiResponse>;
  friendlyUpdate(params: any): Promise<ApiResponse>;
  getEssaylyList(page: number, pageSize: number, content: string): Promise<ApiResponse>;
  essayDelete(id: number): Promise<ApiResponse>;
  essayInsert(params: any): Promise<ApiResponse>;
  essayUpdate(params: any): Promise<ApiResponse>;
}
