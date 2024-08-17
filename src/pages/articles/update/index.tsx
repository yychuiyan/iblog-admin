import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Row, Col, message, Switch, Select, notification } from 'antd';
import Save from '@/components/save';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import UploadImage from '@/components/upload';
import Editor from 'for-editor';
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const formItemLayoutTwo = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
interface CoverData {
  name: string;
  thumbUrl: string;
}
interface DataType {
  url: any;
  data: any;
  name: string;
  _id: string | null | undefined;
  publishStatus: number;
  status: number;
  views: number;
  comment: number;
  like: number;
  categories: string;
  content: string;
  cover: CoverData;
  introduction: string;
  isComment: boolean;
  isLike: boolean;
  isTop: boolean;
  tags: string[];
  title: string;
}
const ArticleUpdate = (props: any) => {
  const [form] = Form.useForm();
  // 标签信息
  const [tagsList, setTagsList] = useState([]);
  // 分类信息
  const [categoryList, setCategoryList] = useState([]);
  // 当前第几页
  const [currentPage] = useState(0);
  // 每页显示条数
  const [pageSize] = useState(0);
  // 上次保存时间
  const [updateTime, setUpdateTime] = useState();
  // 获取到的ID值
  const [ids, setIds] = useState();
  // 评论状态
  const [isComment, setIsComment] = useState();
  // 点赞状态
  const [isLike, setIsLike] = useState();
  // 置顶状态
  const [isTop, setIsTop] = useState();
  // 图片地址
  const [imgUrl, setImgUrl] = useState<any>([]);
  // 图片列表
  const [imageList, setImageList] = useState<any>();
  // 访问数量
  const [viewCount, setViewCount] = useState()
  // 评论数量
  const [commentCount, setCommentCount] = useState()
  // 点赞数量
  const [likeCount, setLikeCount] = useState()
  // 定义ref
  const editorRef = useRef<any>();

  // 获取文章详情
  useEffect(() => {
    let ids = props.match.params.id;
    setIds(ids);
    props.BlogActions.asyncArticleDetailAction(props.match.params.id).then((res: DataType) => {
      let data = res.data.cover === undefined ? '' : res.data.cover;
      let start = data.indexOf('images');
      let name = data.substring(start);
      res.data.cover = [
        {
          name: name,
          thumbUrl: res.data.cover,
        },
      ];
      setImgUrl(res.data.cover);
      setLikeCount(res.data.like)
      setViewCount(res.data.views)
      setCommentCount(res.data.comment)
      setUpdateTime(res.data.updateTime);
      setIsTop(res.data.isTop);
      setIsComment(res.data.isComment);
      setIsLike(res.data.isLike);
      form.setFieldsValue(res.data);
    });
  }, [form, props.BlogActions, props.match.params.id]);

  // 获取分类列表
  useEffect(() => {
    props.BlogActions.asyncCategoriesAction(currentPage, pageSize, '').then((res: DataType) => {
      let { data } = res.data;
      setCategoryList(data);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 获取标签列表
  useEffect(() => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, '').then((res: DataType) => {
      let { data } = res.data;
      setTagsList(data);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 添加图片
  const addImg = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    // 上传图片接口
    props.BlogActions.asyncFileUploadAction(formData).then((res: DataType) => {
      if (res) {
        // 如果返回值
        editorRef.current.$img2Url(file.name, res.url);
      }
    });
  };
  // 点击刷新时重新调用接口
  const onRefresh = () => {
    message.success('刷新成功');
    // 重新调用接口
    props.BlogActions.asyncArticleDetailAction(props.match.params.id).then((res: DataType) => {
      res.data.cover = [
        {
          imgUrl: res.data.cover,
        },
      ];
      setUpdateTime(res.data.updateTime);
      form.setFieldsValue(res.data);
    });
  };
  // 保存草稿
  const onDraft = async () => {
    await form.validateFields();
    // 获取表单数据
    let formData = await form.getFieldsValue();
    // 获取表单值
    if (typeof imageList === 'object') {
      formData.cover = imageList.url;
    } else {
      formData.cover = imageList;
    }
    if (imageList === undefined) {
      formData.cover = imgUrl[0].thumbUrl;
    }
    props.BlogActions.asyncArticleUpdateAction({
      ...formData,
      id: ids,
      publishStatus: 2,
      status: 1,
      views: viewCount,
      comment: commentCount,
      like: likeCount,
      isComment: isComment,
      isLike: isLike,
      isTop: isTop,
    }).then(() => {
      notification.info({
        message: '修改成功-保存到草稿',
        description: `跳转到文章列表`,
      });
      setTimeout(() => {
        props.history.push('/admin/article/list');
      }, 500);
    });
  };
  // 点击更新数据
  const onPublish = async () => {
    await form.validateFields();
    let formData = await form.getFieldsValue();
    // 表单数据
    // 获取表单值
    if (typeof imageList === 'object') {
      formData.cover = imageList.url;
    } else {
      formData.cover = imageList;
    }
    if (imageList === undefined) {
      formData.cover = imgUrl[0].thumbUrl;
    }
    props.BlogActions.asyncArticleUpdateAction({
      id: ids,
      ...formData,
      publishStatus: 1,
      status: 1,
      views: viewCount,
      comment: commentCount,
      like: likeCount,
      isComment: isComment,
      isLike: isLike,
      isTop: isTop,
    }).then(() => {
      notification.info({
        message: '修改成功-发布到线上',
        description: `即将跳转到文章列表`,
      });
      setTimeout(() => {
        props.history.push('/admin/article/list');
      }, 500);
    });
  };
  // 返回
  const onBack = () => {
    props.history.goBack();
  };
  // 评论开启关闭
  const onCommentChange = (record: any) => {
    setIsComment(record);
  };
  // 点赞开启关闭
  const onLikeChange = (record: any) => {
    setIsLike(record);
  };
  // 置顶开启关闭
  const onTopChange = (record: any) => {
    setIsTop(record);
  };
  // 接收上传的图片信息
  const handleChange = (data: any) => {
    setImageList(data);
  };
  // 获取移除的图片信息
  const handleRemove = (val: any) => {
    setImageList('');
  };
  return (
    <>

      <div className="about" style={{ height: 'calc(100vh - 174px)', overflow: 'auto' }}>
        修改文章
        <Form form={form}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="title"
                {...formItemLayout}
                label="文章标题"
                rules={[
                  {
                    required: true,
                    message: '请输入文章标题',
                  },
                ]}
              >
                <Input placeholder="请输入文章标题" />
              </Form.Item>
              <Form.Item
                label="分类"
                name="categories"
                {...formItemLayout}
                rules={[{ required: true, message: '分类不能为空' }]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="请选择分类信息"
                  optionFilterProp="children"
                >
                  {categoryList.map((item: any) => (
                    <Option value={item.name} key={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="标签"
                name="tags"
                {...formItemLayout}
                rules={[{ required: true, message: '标签不能为空' }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择对应的标签"
                  optionLabelProp="label"
                >
                  {tagsList.map((item: any) => (
                    <Option value={item.name} key={item._id} label={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="introduction"
                {...formItemLayout}
                label="文章简介"
                rules={[
                  {
                    required: true,
                    message: '请输入文章简介',
                  },
                ]}
              >
                <TextArea showCount rows={4} maxLength={500} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="cover" {...formItemLayout} label="文章封面">
                <UploadImage
                  // @ts-ignore
                  imgUrlArr={imgUrl}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                />
              </Form.Item>
              <Form.Item name="isComment" {...formItemLayout} label="评论">
                <Switch checked={isComment} onChange={onCommentChange} />
              </Form.Item>
              <Form.Item name="isLike" {...formItemLayout} label="点赞">
                <Switch checked={isLike} onChange={onLikeChange} />
              </Form.Item>
              <Form.Item name="isTop" {...formItemLayout} label="置顶">
                <Switch checked={isTop} onChange={onTopChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="content" {...formItemLayoutTwo}>
                <Editor
                  preview={false}
                  subfield={false}
                  placeholder="请撰写文章"
                  ref={editorRef}
                  addImg={file => addImg(file)}
                // onChange={value => this.handleChange(value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Save
        time={updateTime}
        onRefresh={onRefresh}
        onDraft={onDraft}
        onPublish={onPublish}
        onBack={onBack}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ArticleUpdate);
