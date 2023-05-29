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

export interface Api {
  Login(params: LoginParams): Promise<ApiResponse>;
  userRegister(params: UserRegister): Promise<ApiResponse>;
  loginOut(): Promise<ApiResponse>;
  getCategories(page: number, pageSize: number, name: string): Promise<ApiResponse>;
  categoryAdd(title: string): Promise<ApiResponse>;
  categoryDelete(id: number): Promise<ApiResponse>;
  categoryUpdate(params: any): Promise<ApiResponse>;
  getTagList(page: number, pageSize: number, name: string): Promise<ApiResponse>;
  tagAdd(params: any): Promise<ApiResponse>;
  tagDelete(id: number): Promise<ApiResponse>;
  tagUpdate(params: any): Promise<ApiResponse>;
  tagStatusUpdate(params: any): Promise<ApiResponse>;
  getAboutList(params: boolean): Promise<ApiResponse>;
  aboutAdd(params: any): Promise<ApiResponse>;
  aboutUpdate(params: any): Promise<ApiResponse>;
  getUserInfo(page: number, pageSize: number, nickName: string): Promise<ApiResponse>;
  userDelete(id: number): Promise<ApiResponse>;
  getComments(page: number, pageSize: number, articleTitle: string): Promise<ApiResponse>;
  commentDelete(id: number): Promise<ApiResponse>;
  getMessages(page: number, pageSize: number, auditStatus: string): Promise<ApiResponse>;
  messageStatusUpdate(params: any): Promise<ApiResponse>;
  messageDelete(id: number): Promise<ApiResponse>;
  getArticleList(
    page: number,
    pageSize: number,
    title: string,
    status: string,
    publishStatus: string
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
