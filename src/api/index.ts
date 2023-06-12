import axios from '@/utils/http';
import {
  AboutAdd,
  AboutUpdate,
  Api,
  IArticleAdd,
  CategoryUpdate,
  MessageStatus,
  TagsUpdate,
  TagsUpdateStatus,
  IArticleStatus,
  IArticleTopStatus,
  IArticlePublishStatus,
  IArticleUpdate,
  FriendlyAdd,
  FriendlyUpdate,
  EssayAdd,
  EssayUpdate,
} from '@/types/api';

const baseURL = `/api/v1`;
// 接口请求
const api: Api = {
  // 登录
  Login(params) {
    return axios.post(`${baseURL}/admin/login`, params);
  },
  // 注册
  userRegister(params) {
    return axios.post(`${baseURL}/register`, params);
  },
  // 退出登录
  loginOut() {
    return axios.post(`${baseURL}/admin/logout`);
  },
  // 获取分类列表
  getCategories(page, pageSize, name) {
    return axios.get(`${baseURL}/categories?page=${page}&&pageSize=${pageSize}&&name=${name}`);
  },
  // 新增分类
  categoryAdd(name: string) {
    return axios.post(`${baseURL}/categories`, name);
  },
  // 删除分类
  categoryDelete(id: string) {
    return axios.delete(`${baseURL}/categories/${id}`);
  },
  // 更新分类
  categoryUpdate(params: CategoryUpdate) {
    return axios.put(`${baseURL}/categories/${params.id}`, params);
  },
  // 获取标签列表
  getTagList(page: number, pageSize: number, name: string) {
    return axios.get(`${baseURL}/tags?page=${page}&&pageSize=${pageSize}&&name=${name}`);
  },
  // 新增标签
  tagAdd(name: string) {
    return axios.post(`${baseURL}/tags`, name);
  },
  // 删除标签
  tagDelete(id: string) {
    return axios.delete(`${baseURL}/tags/${id}`);
  },
  // 更新标签
  tagUpdate(params: TagsUpdate) {
    return axios.put(`${baseURL}/tags/${params.id}`, params);
  },
  // 更新标签状态
  tagStatusUpdate(params: TagsUpdateStatus) {
    return axios.put(`${baseURL}/tags/status/${params.id}`, params);
  },
  // 获取关于信息
  getAboutList(checked: boolean) {
    return axios.get(`${baseURL}/about?checked=${checked}`);
  },
  // 新增关于
  aboutAdd(params: AboutAdd) {
    return axios.post(`${baseURL}/about`, params);
  },
  // 修改关于
  aboutUpdate(params: AboutUpdate) {
    return axios.put(`${baseURL}/about/${params.id}`, params);
  },
  // 用户列表
  getUserInfo(page: number, pageSize: number, nickName: string) {
    return axios.get(`${baseURL}/user?page=${page}&&pageSize=${pageSize}&&nickName=${nickName}`);
  },
  // 删除用户
  userDelete(id: string) {
    return axios.delete(`${baseURL}/user/${id}`);
  },
  // 评论列表
  getComments(page: number, pageSize: number, articleTitle: string) {
    return axios.get(
      `${baseURL}/comment?page=${page}&&pageSize=${pageSize}&&articleTitle=${articleTitle}`
    );
  },
  // 删除评论
  commentDelete(id: string) {
    return axios.delete(`${baseURL}/comment/${id}`);
  },
  // 留言列表
  getMessages(page: number, pageSize: number, auditStatus: boolean) {
    return axios.get(
      `${baseURL}/message?page=${page}&&pageSize=${pageSize}&&auditStatus=${auditStatus}`
    );
  },
  // 修改审核状态
  messageStatusUpdate(params: MessageStatus) {
    return axios.put(`${baseURL}/message/${params.id}`, params);
  },
  // 删除留言
  messageDelete(id: string) {
    return axios.delete(`${baseURL}/message/${id}`);
  },
  // 文章列表
  getArticleList(
    page: number,
    pageSize: number,
    title: string,
    status: number,
    publishStatus: number
  ) {
    return axios.get(
      `${baseURL}/articles?page=${page}&&pageSize=${pageSize}&&title=${title}&&status=${status}&&publishStatus=${publishStatus}`
    );
  },
  // 全部文章列表
  getArticleListAll(status: any, publishStatus: any) {
    return axios.get(
      `${baseURL}/article/list/all?status=${status}&&publishStatus=${publishStatus}`
    );
  },
  // 新增文章
  articleAdd(params: IArticleAdd) {
    return axios.post(`${baseURL}/articles`, params);
  },
  // 修改文章状态
  articleStatusUpdate(params: IArticleStatus) {
    return axios.put(`${baseURL}/articles/status/${params.id}`, params);
  },
  // 修改文章置顶状态
  articleTopStatusUpdate(params: IArticleTopStatus) {
    return axios.put(`${baseURL}/articles/top/${params.id}`, params);
  },
  // 修改文章发布状态
  articlePublishStatusUpdate(params: IArticlePublishStatus) {
    return axios.put(`${baseURL}/articles/publishStatus/${params.id}`, params);
  },
  // 文章修改
  articleUpdate(params: IArticleUpdate) {
    return axios.put(`${baseURL}/articles/${params.id}`, params);
  },
  // 获取文章详情
  articleDetail(id: string) {
    return axios.get(`${baseURL}/articles/${id}/edit`);
  },
  // 删除文章
  articleDelete(id: string) {
    return axios.delete(`${baseURL}/articles/${id}`);
  },
  // 上传文件接口
  upload(params) {
    return axios.post(`${baseURL}/upload`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // 友链列表
  getFriendlyList(page: number, pageSize: number, name: string) {
    return axios.get(`${baseURL}/friendly?page=${page}&&pageSize=${pageSize}&&name=${name}`);
  },
  // 删除友链
  friendlyDelete(id: string) {
    return axios.delete(`${baseURL}/friendly/${id}`);
  },
  // 新增友链
  friendlyInsert(params: FriendlyAdd) {
    return axios.post(`${baseURL}/friendly`, params);
  },
  // 修改友链
  friendlyUpdate(params: FriendlyUpdate) {
    return axios.put(`${baseURL}/friendly/${params.id}`, params);
  },
  // 随笔列表
  getEssaylyList(page: number, pageSize: number, content: string) {
    return axios.get(`${baseURL}/essay?page=${page}&&pageSize=${pageSize}&&content=${content}`);
  },
  // 删除随笔
  essayDelete(id: string) {
    return axios.delete(`${baseURL}/essay/${id}`);
  },
  // 新增随笔
  essayInsert(params: EssayAdd) {
    return axios.post(`${baseURL}/essay`, params);
  },
  // 修改随笔
  essayUpdate(params: EssayUpdate) {
    return axios.put(`${baseURL}/essay/${params.id}`, params);
  },
  // 权限列表
  getRightsList(page: number, pageSize: number, title: string) {
    return axios.get(`${baseURL}/rights?page=${page}&&pageSize=${pageSize}&&title=${title}`);
  },
  // 删除权限
  rightsDelete(id: string) {
    return axios.delete(`${baseURL}/rights/${id}`);
  },
  // 删除权限子菜单
  rightsChildrenDelete(id: string) {
    return axios.delete(`${baseURL}/rights-children/${id}`);
  },
};
export default api;
