import { message } from 'antd';
import api from '@/api';
import { Dispatch } from 'redux';
import {
  USER_LOGIN,
  USER_REGISTER,
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
  USER_LIST,
  USER_DELETE,
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
  ARTICLE_COLLECT_UPDATE,
  FILE_UPLOAD,
  FRIENDLY_LIST,
  FRIENDLY_DELETE,
  FRIENDLY_INSERT,
  FRIENDLY_UPDATE,
  ESSAY_LIST,
  ESSAY_DELETE,
  ESSAY_INSERT,
  ESSAY_UPDATE,
} from '@/redux/constants';
import jwtDecode from 'jwt-decode';
import { LoginParams, UserRegister } from '@/types/api';
// 登录
export function asyncLoginAction(data: LoginParams) {
  return async (dispatch: Dispatch) => {
    const res = await api.Login(data);
    if (res.data === null) {
      message.error('用户名或密码错误，请再次确认');
      return;
    } else {
      // 将token存储存到本地
      localStorage.setItem('token', res.data.token);
      // 解析token
      let userToken = jwtDecode(res.data.token);
      dispatch({
        type: USER_LOGIN,
        userToken: userToken,
      });
      return res;
    }
  };
}
// 注册
export const asyncRegisterAction = (data: UserRegister) => {
  return async (dispatch: Dispatch) => {
    const res = await api.userRegister(data);
    dispatch({
      type: USER_REGISTER,
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
export const asyncCategoryDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.categoryDelete(id);
    dispatch({
      type: CATEGORY_DELETE,
      categoryId: '',
    });
    return res;
  };
};
// 更新分类
export const asyncCategoryUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.categoryUpdate(params);
    dispatch({
      type: CATEGORY_UPDATE,
      categories: res,
    });
    return res;
  };
};
// 获取标签
export const asyncTagsAction = (page: any, pageSize: any, name: any) => {
  return async (dispatch: any) => {
    const res = await api.getTagList(page, pageSize, name);
    dispatch({
      type: TAG_LIST,
      tags: res.data,
    });
    return res;
  };
};
// 新增标签
export const asyncTagAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.tagAdd(data);
    dispatch({
      type: TAG_ADD,
      tags: {},
    });
    return res;
  };
};
// 删除标签
export const asyncTagDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.tagDelete(id);
    dispatch({
      type: TAG_DELETE,
      tagId: '',
    });
    return res;
  };
};
// 更新标签
export const asyncTagUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.tagUpdate(params);
    dispatch({
      type: TAG_UPDATE,
      tags: res,
    });
    return res;
  };
};
// 更新状态
export const asyncTagStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.tagStatusUpdate(params);
    dispatch({
      type: TAG_STATUS_UPDATE,
      tags: res,
    });
    return res;
  };
};
// 获取关于信息
export const asyncAboutListAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.getAboutList(params);
    dispatch({
      type: ABOUT_LIST,
      about: res.data,
    });
    return res;
  };
};
// 新增关于
export const asyncAboutAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.aboutAdd(data);
    dispatch({
      type: ABOUT_ADD,
      about: {},
    });
    return res;
  };
};
// 更新标签
export const asyncAboutUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.aboutUpdate(params);
    dispatch({
      type: ABOUT_UPDATE,
      about: res,
    });
    return res;
  };
};
// 用户列表
export const asyncUserListAction = (page: any, pageSize: any, name: any) => {
  return async (dispatch: any) => {
    const res = await api.getUserInfo(page, pageSize, name);
    dispatch({
      type: USER_LIST,
      users: res,
    });
    return res;
  };
};
// 删除用户
export const asyncUserDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.userDelete(id);
    dispatch({
      type: USER_DELETE,
      userId: '',
    });
    return res;
  };
};
// 评论列表
export const asyncCommentsAction = (page: any, pageSize: any, articleTitle: any) => {
  return async (dispatch: any) => {
    const res = await api.getComments(page, pageSize, articleTitle);
    dispatch({
      type: ARTICLE_COMMENT,
      comments: res,
    });
    return res;
  };
};
// 删除评论
export const asyncCommentDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.commentDelete(id);
    dispatch({
      type: COMMENT_DELETE,
      commId: '',
    });
    return res;
  };
};
// 留言列表
export const asyncMessageListAction = (page: any, pageSize: any, auditStatus: any) => {
  return async (dispatch: any) => {
    const res = await api.getMessages(page, pageSize, auditStatus);
    dispatch({
      type: MESSAGE_LIST,
      message: res,
    });
    return res;
  };
};
// 留言审核状态
export const asyncMessageStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.messageStatusUpdate(params);
    dispatch({
      type: MESSAGE_AUDIT_STATUS,
      message: res,
    });
    return res;
  };
};
// 删除留言
export const asyncMessageDeleteAction = (id: any) => {
  return async (dispatch: any) => {
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
  page: any,
  pageSize: any,
  title: any,
  status: any,
  publishStatus: any
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
export const asyncArticleListAllAction = (status: any, publishStatus: any) => {
  return async (dispatch: any) => {
    const res = await api.getArticleListAll(status, publishStatus);
    dispatch({
      type: ARTICLE_LIST_ALL,
      articles: res,
    });
    return res;
  };
};
// 新增文章
export const asyncArticleAddAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.articleAdd(data);
    dispatch({
      type: ARTICLE_ADD,
      article: {},
    });
    return res;
  };
};
// 修改文章状态
export const asyncArticleStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleStatusUpdate(params);
    dispatch({
      type: ARTICLE_STATUS_UPDATE,
      articleStatus: res,
    });
    return res;
  };
};
// 修改文章置顶状态
export const asyncArticleTopStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleTopStatusUpdate(params);
    dispatch({
      type: ARTICLE_STATUS_TOP_UPDATE,
      articleTopStatus: res,
    });
    return res;
  };
};
// 修改文章发布状态
export const asyncArticlePublishStatusUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articlePublishStatusUpdate(params);
    dispatch({
      type: ARTICLE_PUBLISH_STATUS_UPDATE,
      articlePublishStatus: res,
    });
    return res;
  };
};
// 文章修改
export const asyncArticleUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleUpdate(params);
    dispatch({
      type: ARTICLE_UPDATE,
      artId: res,
    });
    return res;
  };
};
// 获取文章详情
export const asyncArticleDetailAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.articleDetail(id);
    dispatch({
      type: ARTICLE_DETAIL,
      detail: res,
    });
    return res;
  };
};
// 删除文章
export const asyncArticleDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.articleDelete(id);
    dispatch({
      type: ARTICLE_DELETE,
      artId: '',
    });
    return res;
  };
};
// 文章开启关闭收藏
export const asyncArticleCollectUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.articleCollectUpdate(params);
    dispatch({
      type: ARTICLE_COLLECT_UPDATE,
      collect: res,
    });
    return res;
  };
};
// 上传文件
export const asyncFileUploadAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.upload(params);
    dispatch({
      type: FILE_UPLOAD,
      files: res,
    });
    return res;
  };
};
// 友链列表
export const asyncFriendlyListAction = (page: any, pageSize: any, name: any) => {
  return async (dispatch: any) => {
    const res = await api.getFriendlyList(page, pageSize, name);
    dispatch({
      type: FRIENDLY_LIST,
      friendly: res,
    });
    return res;
  };
};
// 删除友链
export const asyncFriendlyDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.friendlyDelete(id);
    dispatch({
      type: FRIENDLY_DELETE,
      fid: '',
    });
    return res;
  };
};
// 新增友链
export const asyncFriendlyInsertAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.friendlyInsert(data);
    dispatch({
      type: FRIENDLY_INSERT,
      friendly: {},
    });
    return res;
  };
};
// 修改友链
export const asyncFriendlyUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.friendlyUpdate(params);
    dispatch({
      type: FRIENDLY_UPDATE,
      fid: res,
    });
    return res;
  };
};
// 友链列表
export const asyncEssayListAction = (page: any, pageSize: any, content: any) => {
  return async (dispatch: any) => {
    const res = await api.getEssaylyList(page, pageSize, content);
    dispatch({
      type: ESSAY_LIST,
      essay: res,
    });
    return res;
  };
};
// 删除友链
export const asyncEssayDeleteAction = (id: any) => {
  return async (dispatch: any) => {
    const res = await api.essayDelete(id);
    dispatch({
      type: ESSAY_DELETE,
      eid: '',
    });
    return res;
  };
};
// 新增友链
export const asyncEssayInsertAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.essayInsert(data);
    dispatch({
      type: ESSAY_INSERT,
      essay: {},
    });
    return res;
  };
};
// 修改友链
export const asyncEssayUpdateAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.essayUpdate(params);
    dispatch({
      type: ESSAY_UPDATE,
      eid: res,
    });
    return res;
  };
};
