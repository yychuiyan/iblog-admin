import { combineReducers } from 'redux';
import { LoginReducer } from './login';
import { RegisterReducer } from './register';
import { LoginOutReducer } from './login/loginout';
import { AdminListReducer } from './admin/list';
import { AdminDeleteReducer } from './admin/delete';
import { AdminAddReducer } from './admin/add';
import { AdminStatusUpdateReducer } from './admin/status_update';
import { AdminUpdateReducer } from './admin/update';
import { UserListReducer } from './user/list';
import { UserUpdateReducer } from './user/update';
import { UserDeleteReducer } from './user/delete';
import { SideMenuStateReducer } from './collapsed';
import { LoadingReducer } from './loading';
import { CategoriesReducer } from './categories/list';
import { CategoryAddReducer } from './categories/add';
import { CategoryDeleteReducer } from './categories/delete';
import { CategoryUpdateReducer } from './categories/update';
import { TagsReducer } from './tags/list';
import { TagAddReducer } from './tags/add';
import { TagDeleteReducer } from './tags/delete';
import { TagUpdateReducer } from './tags/update';
import { TagStatusUpdateReducer } from './tags/status_update';
import { AboutListReducer } from './about/list';
import { AboutAddReducer } from './about/add';
import { AboutUpdateReducer } from './about/update';
import { CommentsReducer } from './comments/list';
import { CommentDeleteReducer } from './comments/delete';
import { MessageListReducer } from './messages/list';
import { MessageDeleteReducer } from './messages/delete';
import { MessageStatusUpdateReducer } from './messages/update';
import { ArticleListReducer } from './articles/list';
import { ArticleListAllReducer } from './articles/list_all';
import { ArticleAddReducer } from './articles/add';
import { ArticleStatusUpdateReducer } from './articles/article_status';
import { ArticleStatusTopUpdateReducer } from './articles/article_top_status';
import { ArticlePublishStatusUpdateReducer } from './articles/article_publish_status';
import { ArticleDetailReducer } from './articles/detail';
import { ArticleUpdateReducer } from './articles/update';
import { ArticleDeleteReducer } from './articles/delete';
import { FileUploadReducer } from './upload/index';
import { FriendlyListReducer } from './friendly/list';
import { FriendlyDeleteReducer } from './friendly/delete';
import { FriendlyInsertReducer } from './friendly/insert';
import { FriendlyUpdateReducer } from './friendly/update';
import { FriendlyStatusUpdateReducer } from './friendly/status_update';
import { FriendlyCheckedUpdateReducer } from './friendly/checked_update';
import { EssayListReducer } from './essay/list';
import { EssayDeleteReducer } from './essay/delete';
import { EssayInsertReducer } from './essay/insert';
import { EssayUpdateReducer } from './essay/update';
import { RightsListReducer } from './rights/list';
import { RightsDeleteReducer } from './rights/delete';
import { RightsChildrenDeleteReducer } from './rights/children-delete';
import { RightsUpdateReducer } from './rights/update';
import { RightsChildrenUpdateReducer } from './rights/children-update';
import { RoleListReducer } from './role/list';
import { RoleDeleteReducer } from './role/delete';
import { RoleUpdateReducer } from './role/update';
import { AfficheAddReducer } from './affiche/add';
import { AfficheListReducer } from './affiche/list';
import { AfficheUpdateReducer } from './affiche/update';
import { AfficheStatusUpdateReducer } from './affiche/status_update';
import { AfficheDeleteReducer } from './affiche/delete';
import { ApothegmAddReducer } from './apothegm/add';
import { ApothegmListReducer } from './apothegm/list';
import { ApothegmUpdateReducer } from './apothegm/update';
import { ApothegmStatusUpdateReducer } from './apothegm/status_update';
import { ApothegmDeleteReducer } from './apothegm/delete';
import { ReaderListReducer } from './reader/list';
import { ReaderInsertReducer } from './reader/insert';
import { ReaderDeleteReducer } from './reader/delete';
import { ReaderUpdateReducer } from './reader/update';
import { ReaderCheckedUpdateReducer } from './reader/checked_update';
import { NavigationUpdateReducer } from './navigation/update';
import { NavigationStatusUpdateReducer } from './navigation/status_update';
import { NavigationListReducer } from './navigation/list';
import { NavigationInsertReducer } from './navigation/insert';
import { NavigationDeleteReducer } from './navigation/delete';
const RootReducer = combineReducers({
  LoginReducer,
  RegisterReducer,
  LoginOutReducer,
  AdminAddReducer,
  AdminListReducer,
  AdminDeleteReducer,
  AdminUpdateReducer,
  AdminStatusUpdateReducer,
  UserListReducer,
  UserUpdateReducer,
  UserDeleteReducer,
  SideMenuStateReducer,
  LoadingReducer,
  CategoriesReducer,
  CategoryAddReducer,
  CategoryDeleteReducer,
  CategoryUpdateReducer,
  TagsReducer,
  TagAddReducer,
  TagDeleteReducer,
  TagUpdateReducer,
  TagStatusUpdateReducer,
  AboutListReducer,
  AboutAddReducer,
  AboutUpdateReducer,
  CommentsReducer,
  CommentDeleteReducer,
  MessageListReducer,
  MessageDeleteReducer,
  MessageStatusUpdateReducer,
  ArticleListReducer,
  ArticleListAllReducer,
  ArticleStatusUpdateReducer,
  ArticlePublishStatusUpdateReducer,
  ArticleDetailReducer,
  ArticleUpdateReducer,
  ArticleStatusTopUpdateReducer,
  ArticleDeleteReducer,
  FileUploadReducer,
  ArticleAddReducer,
  FriendlyListReducer,
  FriendlyDeleteReducer,
  FriendlyInsertReducer,
  FriendlyUpdateReducer,
  FriendlyStatusUpdateReducer,
  FriendlyCheckedUpdateReducer,
  EssayListReducer,
  EssayDeleteReducer,
  EssayInsertReducer,
  EssayUpdateReducer,
  RightsListReducer,
  RightsDeleteReducer,
  RightsChildrenDeleteReducer,
  RightsUpdateReducer,
  RightsChildrenUpdateReducer,
  RoleListReducer,
  RoleDeleteReducer,
  RoleUpdateReducer,
  AfficheAddReducer,
  AfficheListReducer,
  AfficheUpdateReducer,
  AfficheStatusUpdateReducer,
  AfficheDeleteReducer,
  ApothegmAddReducer,
  ApothegmListReducer,
  ApothegmUpdateReducer,
  ApothegmStatusUpdateReducer,
  ApothegmDeleteReducer,
  ReaderListReducer,
  ReaderInsertReducer,
  ReaderDeleteReducer,
  ReaderUpdateReducer,
  ReaderCheckedUpdateReducer,
  NavigationDeleteReducer,
  NavigationInsertReducer,
  NavigationListReducer,
  NavigationStatusUpdateReducer,
  NavigationUpdateReducer,
});
export default RootReducer;
