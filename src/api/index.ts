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
  RightsUpdate,
  RightsChildrenUpdate,
  RoleUpdate,
  AdminUpdateStatus,
  AdminUpdate,
  UserUpdate,
  AfficheAdd,
  AfficheUpdate,
  AfficheUpdateStatus,
  ApothegmAdd,
  ApothegmUpdate,
  ApothegmUpdateStatus,
  FriendlyUpdateStatus,
  FriendlyUpdateChecked,
  ReaderAdd,
  ReaderUpdate,
  ReaderUpdateChecked,
} from '@/types/api';

const baseURL = `/api/v1`;
// 接口请求
const api: Api = {
  // 登录
  Login(params) {
    return axios.post(`${baseURL}/admin/login`, params);
  },
  // 注册
  adminRegister(params) {
    return axios.post(`${baseURL}/admin/register`, params);
  },
  // 退出登录
  loginOut() {
    return axios.post(`${baseURL}/admin/logout`);
  },
  // 管理员列表
  getAdminList(page: number, pageSize: number, username: string) {
    return axios.get(`${baseURL}/admin?page=${page}&&pageSize=${pageSize}&&username=${username}`);
  },
  // 新增管理员
  adminAdd(params) {
    return axios.post(`${baseURL}/admin`, params);
  },
  // 删除管理员
  adminDelete(id: string) {
    return axios.delete(`${baseURL}/admin/${id}`);
  },
  // 更新管理员状态
  adminStatusUpdate(params: AdminUpdateStatus) {
    return axios.put(`${baseURL}/admin/status/${params.id}`, params);
  },
  // 更新管理员
  adminUpdate(params: AdminUpdate) {
    return axios.put(`${baseURL}/admin/${params.id}`, params);
  },
  // 用户列表
  getUserList(page: number, pageSize: number, username: string) {
    return axios.get(`${baseURL}/user?page=${page}&&pageSize=${pageSize}&&username=${username}`);
  },
  // 更新用户
  userUpdate(params: UserUpdate) {
    return axios.put(`${baseURL}/user/${params.id}`, params);
  },
  // 删除用户
  userDelete(id: string) {
    return axios.delete(`${baseURL}/user/${id}`);
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
  // 友链网站状态
  friendlyStatusUpdate(params: FriendlyUpdateStatus) {
    return axios.put(`${baseURL}/friendly/status/${params.id}`, params);
  },
  // 友链状态
  friendlyCheckedUpdate(params: FriendlyUpdateChecked) {
    return axios.put(`${baseURL}/friendly/checked/${params.id}`, params);
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
  // 修改权限
  rightsUpdate(params: RightsUpdate) {
    return axios.put(`${baseURL}/rights/${params.id}`, params);
  },
  // 修改权限子菜单
  rightsChildrenUpdate(params: RightsChildrenUpdate) {
    return axios.put(`${baseURL}/rights-children/${params.id}`, params);
  },
  // 角色列表
  getRoleList(page: number, pageSize: number, role_name: string) {
    return axios.get(`${baseURL}/role?page=${page}&&pageSize=${pageSize}&&role_name=${role_name}`);
  },
  // 删除角色
  roleDelete(id: string) {
    return axios.delete(`${baseURL}/role/${id}`);
  },
  // 修改角色
  roleUpdate(params: RoleUpdate) {
    return axios.put(`${baseURL}/role/${params.id}`, params);
  },
  // 获取公告信息
  getAfficheList(page: number, pageSize: number, content: string) {
    return axios.get(`${baseURL}/affiche?page=${page}&&pageSize=${pageSize}&&content=${content}`);
  },
  // 新增公告
  afficheAdd(params: AfficheAdd) {
    return axios.post(`${baseURL}/affiche`, params);
  },
  // 修改公告
  afficheUpdate(params: AfficheUpdate) {
    return axios.put(`${baseURL}/affiche/${params.id}`, params);
  },
  // 删除公告
  afficheDelete(id: string) {
    return axios.delete(`${baseURL}/affiche/${id}`);
  },
  // 公告状态
  afficheStatusUpdate(params: AfficheUpdateStatus) {
    return axios.put(`${baseURL}/affiche/status/${params.id}`, params);
  },
  // 获取警句信息
  getApothegmList(page: number, pageSize: number, author: string) {
    return axios.get(`${baseURL}/apothegm?page=${page}&&pageSize=${pageSize}&&author=${author}`);
  },
  // 新增警句
  apothegmAdd(params: ApothegmAdd) {
    return axios.post(`${baseURL}/apothegm`, params);
  },
  // 修改警句
  apothegmUpdate(params: ApothegmUpdate) {
    return axios.put(`${baseURL}/apothegm/${params.id}`, params);
  },
  // 删除警句
  apothegmDelete(id: string) {
    return axios.delete(`${baseURL}/apothegm/${id}`);
  },
  // 警句状态
  apothegmStatusUpdate(params: ApothegmUpdateStatus) {
    return axios.put(`${baseURL}/apothegm/status/${params.id}`, params);
  },
  // 书籍列表
  getReaderList(page: number, pageSize: number, name: string) {
    return axios.get(`${baseURL}/reader?page=${page}&&pageSize=${pageSize}&&name=${name}`);
  },
  // 删除书籍
  readerDelete(id: string) {
    return axios.delete(`${baseURL}/reader/${id}`);
  },
  // 新增书籍
  readerInsert(params: ReaderAdd) {
    return axios.post(`${baseURL}/reader`, params);
  },
  // 修改书籍
  readerUpdate(params: ReaderUpdate) {
    return axios.put(`${baseURL}/reader/${params.id}`, params);
  },
  // 书籍状态
  readerCheckedUpdate(params: ReaderUpdateChecked) {
    return axios.put(`${baseURL}/reader/checked/${params.id}`, params);
  },
};
export default api;
