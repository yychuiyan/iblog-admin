import { message } from 'antd';
import api from '@/api';
import { Dispatch } from 'redux';
import {
  ADMIN_LOGIN,
  ADMIN_REGISTER,
  LOGINOUT,
  CHANGE_COLLAPSED,
  CATEGORY_LIST,
  CATEGORY_ADD,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
  TAG_LIST,
  TAG_ADD,
  TAG_UPDATE,
  TAG_DELETE,
  TAG_STATUS_UPDATE,
  ABOUT_LIST,
  ABOUT_ADD,
  ABOUT_UPDATE,
  ADMIN_LIST,
  ADMIN_DELETE,
  ARTICLE_COMMENT,
  COMMENT_DELETE,
  MESSAGE_LIST,
  MESSAGE_DELETE,
  MESSAGE_AUDIT_STATUS,
  ARTICLE_LIST,
  ARTICLE_LIST_ALL,
  ARTICLE_ADD,
  ARTICLE_STATUS_UPDATE,
  ARTICLE_STATUS_TOP_UPDATE,
  ARTICLE_PUBLISH_STATUS_UPDATE,
  ARTICLE_UPDATE,
  ARTICLE_DETAIL,
  ARTICLE_DELETE,
  FILE_UPLOAD,
  FRIENDLY_LIST,
  FRIENDLY_DELETE,
  FRIENDLY_INSERT,
  FRIENDLY_UPDATE,
  ESSAY_LIST,
  ESSAY_DELETE,
  ESSAY_INSERT,
  ESSAY_UPDATE,
  RIGHTS_LIST,
  RIGHTS_DELETE,
  RIGHTS_CHILDREN_DELETE,
  RIGHTS_UPDATE,
  RIGHTS_CHILDREN_UPDATE,
  ROLE_LIST,
  ROLE_DELETE,
  ROLE_UPDATE,
  ADMIN_ADD,
  ADMIN_STATUS,
  ADMIN_UPDATE,
  USER_LIST,
  USER_UPDATE,
  USER_DELETE,
  AFFICHE_LIST,
  AFFICHE_ADD,
  AFFICHE_UPDATE,
  AFFICHE_DELETE,
  APOTHEGM_LIST,
  APOTHEGM_ADD,
  APOTHEGM_UPDATE,
  APOTHEGM_DELETE,
  APOTHEGM_STATUS,
  FRIENDLY_CHECKED,
  FRIENDLY_STATUS,
  READER_LIST,
  READER_DELETE,
  READER_INSERT,
  READER_UPDATE,
  READER_CHECKED,
  NAVIGATION_LIST,
  NAVIGATION_DELETE,
  NAVIGATION_UPDATE,
  NAVIGATION_STATUS,
} from '@/redux/constants';
import jwtDecode from 'jwt-decode';
import {
  AboutAdd,
  AboutUpdate,
  IArticleAdd,
  CategoryUpdate,
  LoginParams,
  MessageStatus,
  TagsUpdate,
  TagsUpdateStatus,
  AdminRegister,
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
  AdminAdd,
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
  NavigationAdd,
  NavigationUpdate,
  NavigationUpdateStatus,
} from '@/types/api';
// 登录
export function asyncLoginAction(data: LoginParams) {
  return async (dispatch: Dispatch) => {
    const res = await api.Login(data);
    if (res.code === 110404) {
      message.error(res.msg);
    } else if (res.code === 110405) {
      message.error(res.msg);
    }
    if (res.code === 0) {
      // 将token存储存到本地
      localStorage.setItem('token', res.data.token);
      // 解析token
      let userToken = jwtDecode(res.data.token);
      dispatch({
        type: ADMIN_LOGIN,
        userToken: userToken,
      });
      return res;
    } else if (res.code === 110401) {
      message.error('请检查管理员名或密码后重新登录');
    }
  };
}
// 注册
export const asyncRegisterAction = (data: AdminRegister) => {
  return async (dispatch: Dispatch) => {
    const res = await api.adminRegister(data);
    dispatch({
      type: ADMIN_REGISTER,
      userinfo: {},
    });
    return res;
  };
};
// 登出
export const asyncLoginOutAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await api.loginOut();
    dispatch({
      type: LOGINOUT,
      userinfo: res,
    });
  };
};
// 管理员列表
export const asyncAdminListAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getAdminList(page, pageSize, name);
    dispatch({
      type: ADMIN_LIST,
      users: res,
    });
    return res;
  };
};
// 新增管理员
export const asyncAdminAddAction = (data: AdminAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.adminAdd(data);
    dispatch({
      type: ADMIN_ADD,
      userinfo: {},
    });
    return res;
  };
};
// 删除管理员
export const asyncAdminDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.adminDelete(id);
    dispatch({
      type: ADMIN_DELETE,
      userId: '',
    });
    return res;
  };
};
// 更新管理员状态
export const asyncAdminStatusUpdateAction = (params: AdminUpdateStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.adminStatusUpdate(params);
    dispatch({
      type: ADMIN_STATUS,
      admin: res,
    });
    return res;
  };
};
// 更新管理员
export const asyncAdminUpdateAction = (params: AdminUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.adminUpdate(params);
    dispatch({
      type: ADMIN_UPDATE,
      admin: res,
    });
    return res;
  };
};
// 用户列表
export const asyncUserListAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getUserList(page, pageSize, name);
    dispatch({
      type: USER_LIST,
      users: res,
    });
    return res;
  };
};
// 更新用户
export const asyncUserUpdateAction = (params: UserUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.userUpdate(params);
    dispatch({
      type: USER_UPDATE,
      user: res,
    });
    return res;
  };
};
// 删除用户
export const asyncUserDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.userDelete(id);
    dispatch({
      type: USER_DELETE,
      userId: '',
    });
    return res;
  };
};
// 侧边栏展示和隐藏
export const changeCollapsed = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_COLLAPSED,
    });
  };
};
// 获取分类
export const asyncCategoriesAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getCategories(page, pageSize, name);
    dispatch({
      type: CATEGORY_LIST,
      categories: res,
    });
    return res;
  };
};

// 新增分类
export const asyncCategoryAddAction = (data: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.categoryAdd(data);
    dispatch({
      type: CATEGORY_ADD,
      categories: {},
    });
    return res;
  };
};
// 删除分类
export const asyncCategoryDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.categoryDelete(id);
    dispatch({
      type: CATEGORY_DELETE,
      categoryId: '',
    });
    return res;
  };
};
// 更新分类
export const asyncCategoryUpdateAction = (params: CategoryUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.categoryUpdate(params);
    dispatch({
      type: CATEGORY_UPDATE,
      categories: res,
    });
    return res;
  };
};
// 获取标签
export const asyncTagsAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getTagList(page, pageSize, name);
    dispatch({
      type: TAG_LIST,
      tags: res.data,
    });
    return res;
  };
};
// 新增标签
export const asyncTagAddAction = (data: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.tagAdd(data);
    dispatch({
      type: TAG_ADD,
      tags: {},
    });
    return res;
  };
};
// 删除标签
export const asyncTagDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.tagDelete(id);
    dispatch({
      type: TAG_DELETE,
      tagId: '',
    });
    return res;
  };
};
// 更新标签
export const asyncTagUpdateAction = (params: TagsUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.tagUpdate(params);
    dispatch({
      type: TAG_UPDATE,
      tags: res,
    });
    return res;
  };
};
// 更新状态
export const asyncTagStatusUpdateAction = (params: TagsUpdateStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.tagStatusUpdate(params);
    dispatch({
      type: TAG_STATUS_UPDATE,
      tags: res,
    });
    return res;
  };
};
// 获取关于信息
export const asyncAboutListAction = (checked: boolean) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getAboutList(checked);
    dispatch({
      type: ABOUT_LIST,
      about: res.data,
    });
    return res;
  };
};
// 新增关于
export const asyncAboutAddAction = (data: AboutAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.aboutAdd(data);
    dispatch({
      type: ABOUT_ADD,
      about: {},
    });
    return res;
  };
};
// 更新关于
export const asyncAboutUpdateAction = (params: AboutUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.aboutUpdate(params);
    dispatch({
      type: ABOUT_UPDATE,
      about: res,
    });
    return res;
  };
};

// 评论列表
export const asyncCommentsAction = (page: number, pageSize: number, articleTitle: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getComments(page, pageSize, articleTitle);
    dispatch({
      type: ARTICLE_COMMENT,
      comments: res,
    });
    return res;
  };
};
// 删除评论
export const asyncCommentDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.commentDelete(id);
    dispatch({
      type: COMMENT_DELETE,
      commId: '',
    });
    return res;
  };
};
// 留言列表
export const asyncMessageListAction = (page: number, pageSize: number, auditStatus: boolean) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getMessages(page, pageSize, auditStatus);
    dispatch({
      type: MESSAGE_LIST,
      message: res,
    });
    return res;
  };
};
// 留言审核状态
export const asyncMessageStatusUpdateAction = (params: MessageStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.messageStatusUpdate(params);
    dispatch({
      type: MESSAGE_AUDIT_STATUS,
      message: res,
    });
    return res;
  };
};
// 删除留言
export const asyncMessageDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.messageDelete(id);
    dispatch({
      type: MESSAGE_DELETE,
      msId: '',
    });
    return res;
  };
};
// 文章列表
export const asyncArticleListAction = (
  page: number,
  pageSize: number,
  title: string,
  status: number,
  publishStatus: number
) => {
  return async (dispatch: any) => {
    const res = await api.getArticleList(page, pageSize, title, status, publishStatus);
    dispatch({
      type: ARTICLE_LIST,
      articles: res,
    });
    return res;
  };
};
// 全部文章列表
export const asyncArticleListAllAction = (status: number, publishStatus: number) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getArticleListAll(status, publishStatus);
    dispatch({
      type: ARTICLE_LIST_ALL,
      articles: res,
    });
    return res;
  };
};
// 新增文章
export const asyncArticleAddAction = (data: IArticleAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articleAdd(data);
    dispatch({
      type: ARTICLE_ADD,
      article: {},
    });
    return res;
  };
};
// 修改文章状态
export const asyncArticleStatusUpdateAction = (params: IArticleStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articleStatusUpdate(params);
    dispatch({
      type: ARTICLE_STATUS_UPDATE,
      articleStatus: res,
    });
    return res;
  };
};
// 修改文章置顶状态
export const asyncArticleTopStatusUpdateAction = (params: IArticleTopStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articleTopStatusUpdate(params);
    dispatch({
      type: ARTICLE_STATUS_TOP_UPDATE,
      articleTopStatus: res,
    });
    return res;
  };
};
// 修改文章发布状态
export const asyncArticlePublishStatusUpdateAction = (params: IArticlePublishStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articlePublishStatusUpdate(params);
    dispatch({
      type: ARTICLE_PUBLISH_STATUS_UPDATE,
      articlePublishStatus: res,
    });
    return res;
  };
};
// 文章修改
export const asyncArticleUpdateAction = (params: IArticleUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articleUpdate(params);
    dispatch({
      type: ARTICLE_UPDATE,
      artId: res,
    });
    return res;
  };
};
// 获取文章详情
export const asyncArticleDetailAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articleDetail(id);
    dispatch({
      type: ARTICLE_DETAIL,
      detail: res,
    });
    return res;
  };
};
// 删除文章
export const asyncArticleDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.articleDelete(id);
    dispatch({
      type: ARTICLE_DELETE,
      artId: '',
    });
    return res;
  };
};

// 上传文件
export const asyncFileUploadAction = (params: FormData) => {
  return async (dispatch: Dispatch) => {
    const res = await api.upload(params);
    dispatch({
      type: FILE_UPLOAD,
      files: res,
    });
    return res;
  };
};
// 友链列表
export const asyncFriendlyListAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getFriendlyList(page, pageSize, name);
    dispatch({
      type: FRIENDLY_LIST,
      friendly: res,
    });
    return res;
  };
};
// 删除友链
export const asyncFriendlyDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.friendlyDelete(id);
    dispatch({
      type: FRIENDLY_DELETE,
      fid: '',
    });
    return res;
  };
};
// 新增友链
export const asyncFriendlyInsertAction = (data: FriendlyAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.friendlyInsert(data);
    dispatch({
      type: FRIENDLY_INSERT,
      friendly: {},
    });
    return res;
  };
};
// 修改友链
export const asyncFriendlyUpdateAction = (params: FriendlyUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.friendlyUpdate(params);
    dispatch({
      type: FRIENDLY_UPDATE,
      fid: res,
    });
    return res;
  };
};
// 更新友链网站状态
export const asyncFriendlyStatusUpdateAction = (params: FriendlyUpdateStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.friendlyStatusUpdate(params);
    dispatch({
      type: FRIENDLY_STATUS,
      friendly: res,
    });
    return res;
  };
};
// 更新友链状态
export const asyncFriendlyCheckedUpdateAction = (params: FriendlyUpdateChecked) => {
  return async (dispatch: Dispatch) => {
    const res = await api.friendlyCheckedUpdate(params);
    dispatch({
      type: FRIENDLY_CHECKED,
      friendly: res,
    });
    return res;
  };
};
// 随笔列表
export const asyncEssayListAction = (page: number, pageSize: number, content: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getEssaylyList(page, pageSize, content);
    dispatch({
      type: ESSAY_LIST,
      essay: res,
    });
    return res;
  };
};
// 删除随笔
export const asyncEssayDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.essayDelete(id);
    dispatch({
      type: ESSAY_DELETE,
      eid: '',
    });
    return res;
  };
};
// 新增随笔
export const asyncEssayInsertAction = (data: EssayAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.essayInsert(data);
    dispatch({
      type: ESSAY_INSERT,
      essay: {},
    });
    return res;
  };
};
// 修改随笔
export const asyncEssayUpdateAction = (params: EssayUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.essayUpdate(params);
    dispatch({
      type: ESSAY_UPDATE,
      eid: res,
    });
    return res;
  };
};
// 权限列表
export const asyncRightsListAction = (page: number, pageSize: number, title: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getRightsList(page, pageSize, title);
    dispatch({
      type: RIGHTS_LIST,
      rights: res,
    });
    return res;
  };
};
// 删除权限
export const asyncRightsDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.rightsDelete(id);
    dispatch({
      type: RIGHTS_DELETE,
      rid: '',
    });
    return res;
  };
};
// 删除权限子菜单
export const asyncRightsChildrenDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.rightsChildrenDelete(id);
    dispatch({
      type: RIGHTS_CHILDREN_DELETE,
      rid: '',
    });
    return res;
  };
};
// 更新权限
export const asyncRightsUpdateAction = (params: RightsUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.rightsUpdate(params);
    dispatch({
      type: RIGHTS_UPDATE,
      rid: res,
    });
    return res;
  };
};
// 更新子菜单权限
export const asyncRightsChildrenUpdateAction = (params: RightsChildrenUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.rightsChildrenUpdate(params);
    dispatch({
      type: RIGHTS_CHILDREN_UPDATE,
      rid: res,
    });
    return res;
  };
};
// 角色列表
export const asyncRoleListAction = (page: number, pageSize: number, role_name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getRoleList(page, pageSize, role_name);
    dispatch({
      type: ROLE_LIST,
      role: res,
    });
    return res;
  };
};
// 删除角色
export const asyncRoleDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.roleDelete(id);
    dispatch({
      type: ROLE_DELETE,
      rid: '',
    });
    return res;
  };
};
// 更新角色
export const asyncRoleUpdateAction = (params: RoleUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.roleUpdate(params);
    dispatch({
      type: ROLE_UPDATE,
      rid: res,
    });
    return res;
  };
};
// 获取公告信息
export const asyncAfficheListAction = (page: number, pageSize: number, content: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getAfficheList(page, pageSize, content);
    dispatch({
      type: AFFICHE_LIST,
      affiche: res.data,
    });
    return res;
  };
};
// 新增公告
export const asyncAfficheAddAction = (data: AfficheAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.afficheAdd(data);
    dispatch({
      type: AFFICHE_ADD,
      affiche: {},
    });
    return res;
  };
};
// 更新公告
export const asyncAfficheUpdateAction = (params: AfficheUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.afficheUpdate(params);
    dispatch({
      type: AFFICHE_UPDATE,
      affiche: res,
    });
    return res;
  };
};
// 删除公告
export const asyncAfficheDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.afficheDelete(id);
    dispatch({
      type: AFFICHE_DELETE,
      afficheId: '',
    });
    return res;
  };
};
// 更新状态
export const asyncAfficheStatusUpdateAction = (params: AfficheUpdateStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.afficheStatusUpdate(params);
    dispatch({
      type: AFFICHE_UPDATE,
      affiche: res,
    });
    return res;
  };
};

// 获取警句信息
export const asyncApothegmListAction = (page: number, pageSize: number, author: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getApothegmList(page, pageSize, author);
    dispatch({
      type: APOTHEGM_LIST,
      apothegm: res.data,
    });
    return res;
  };
};
// 新增警句
export const asyncApothegmAddAction = (data: ApothegmAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.apothegmAdd(data);
    dispatch({
      type: APOTHEGM_ADD,
      apothegm: {},
    });
    return res;
  };
};
// 更新警句
export const asyncApothegmUpdateAction = (params: ApothegmUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.apothegmUpdate(params);
    dispatch({
      type: APOTHEGM_UPDATE,
      apothegm: res,
    });
    return res;
  };
};
// 删除警句
export const asyncApothegmDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.apothegmDelete(id);
    dispatch({
      type: APOTHEGM_DELETE,
      apothegmId: '',
    });
    return res;
  };
};
// 更新警句
export const asyncApothegmStatusUpdateAction = (params: ApothegmUpdateStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.apothegmStatusUpdate(params);
    dispatch({
      type: APOTHEGM_STATUS,
      affiche: res,
    });
    return res;
  };
};
// 友链列表
export const asyncReaderListAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getReaderList(page, pageSize, name);
    dispatch({
      type: READER_LIST,
      reader: res,
    });
    return res;
  };
};
// 删除书籍
export const asyncReaderDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.readerDelete(id);
    dispatch({
      type: READER_DELETE,
      rid: '',
    });
    return res;
  };
};
// 新增书籍
export const asyncReaderInsertAction = (data: ReaderAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.readerInsert(data);
    dispatch({
      type: READER_INSERT,
      reader: {},
    });
    return res;
  };
};
// 修改书籍
export const asyncReaderUpdateAction = (params: ReaderUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.readerUpdate(params);
    dispatch({
      type: READER_UPDATE,
      rid: res,
    });
    return res;
  };
};
// 更新书籍状态
export const asyncReaderCheckedUpdateAction = (params: ReaderUpdateChecked) => {
  return async (dispatch: Dispatch) => {
    const res = await api.readerCheckedUpdate(params);
    dispatch({
      type: READER_CHECKED,
      reader: res,
    });
    return res;
  };
};
// 导航列表
export const asyncNavigationListAction = (page: number, pageSize: number, name: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getNavigationList(page, pageSize, name);
    dispatch({
      type: NAVIGATION_LIST,
      nav: res,
    });
    return res;
  };
};
// 删除导航
export const asyncNavigationDeleteAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.navigationDelete(id);
    dispatch({
      type: NAVIGATION_DELETE,
      nid: '',
    });
    return res;
  };
};
// 新增导航
export const asyncNavigationInsertAction = (data: NavigationAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.navigationInsert(data);
    dispatch({
      type: FRIENDLY_INSERT,
      nav: {},
    });
    return res;
  };
};
// 修改导航
export const asyncNavigationUpdateAction = (params: NavigationUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.navigationUpdate(params);
    dispatch({
      type: NAVIGATION_UPDATE,
      nid: res,
    });
    return res;
  };
};
// 更新导航网站状态
export const asyncNavigationStatusUpdateAction = (params: NavigationUpdateStatus) => {
  return async (dispatch: Dispatch) => {
    const res = await api.navigationStatusUpdate(params);
    dispatch({
      type: NAVIGATION_STATUS,
      nav: res,
    });
    return res;
  };
};
