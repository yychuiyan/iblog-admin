import { message } from 'antd';

// 禁止操作项
export const handleNotDelete = () => {
  return message.warning('访客暂不支持删除操作😅');
};
export const handleNotUpdate = () => {
  return message.warning('访客暂不支持更新操作😅');
};
export const handleNotAdd = () => {
  return message.warning('访客暂不支持添加操作😅');
};
export const handleNotAudit = () => {
  return message.warning('访客暂不支持审批操作😅');
};
export const handleNotAllAudit = () => {
  return message.warning('访客暂不支持一键审批操作😅');
};
export const onNotChangePublishStatus = () => {
  return message.warning('访客暂不支持下线文章操作😅');
};
export const onNotChangePublishLineStatus = () => {
  return message.warning('访客暂不支持上线文章操作😅');
};
export const onNotChangeStatus = () => {
  return message.warning('访客暂不支持置顶操作😅');
};
export const handleNotChangeStatus = () => {
  return message.warning('访客暂不支持状态变更操作😅');
};
export const handleNotSave = () => {
  return message.warning('访客暂不支持发布操作😅');
};
export const handleNotSaveArticle = () => {
  return message.warning('访客暂不支持发布文章操作😅');
};
export const handleNotSaveDraft = () => {
  return message.warning('访客暂不支持保存草稿操作😅');
};
export const handleNotUpload = () => {
  return message.warning('访客暂不支持上传图片操作😅');
};
export const handleNotLike = () => {
  return message.warning('访客暂不支持输入图片链接操作😅');
};
