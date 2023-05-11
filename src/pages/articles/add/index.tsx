import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Row, Col, Switch, Select, notification, message } from 'antd';
import Save from '@/components/save';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import UploadImage from '@/components/upload';
// import MarkDown from '@/components/markdown/MarkDown';
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
const ArticleAdd = (props: any) => {
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
  const [updateTime] = useState();
  // 定义ref
  const editorRef = useRef<any>();
  // 评论状态
  const [isComment, setIsComment] = useState(true);
  // 点赞状态
  const [isLike, setIsLike] = useState(true);
  // 置顶状态
  const [isTop, setIsTop] = useState(false);
  // 图片列表
  const [imageList, setImageList] = useState<any>();
  // 获取分类列表
  useEffect(() => {
    props.BlogActions.asyncCategoriesAction(currentPage, pageSize, '').then((res: any) => {
      let { data } = res.data;
      setCategoryList(data);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 获取标签列表
  useEffect(() => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, '').then((res: any) => {
      let { data } = res.data;
      setTagsList(data);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 添加图片
  const addImg = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    // 上传图片接口
    props.BlogActions.asyncFileUploadAction(formData).then((res: any) => {
      if (res) {
        // 如果返回值
        editorRef.current.$img2Url(file.name, res.url);
      }
    });
  };
  // 保存到草稿
  const onDraft = async () => {
    await form.validateFields();
    let formData = await form.getFieldsValue();
    // 获取表单值
    if (typeof imageList === 'object') {
      formData.cover = imageList.url;
    }
    formData.cover = imageList;
    props.BlogActions.asyncArticleAddAction({
      ...formData,
      publishStatus: 2,
      status: 1,
      views: 0,
      comment: 0,
      like: 0,
      isComment: isComment,
      isLike: isLike,
      isTop: isTop,
    }).then((res: any) => {
      notification.info({
        message: '新增成功-保存到草稿',
        description: `跳转到文章列表`,
      });
      setTimeout(() => {
        props.history.push('/admin/article/list');
      }, 500);
    });
  };
  // 发布
  const onPublish = async () => {
    await form.validateFields();
    let formData = form.getFieldsValue();

    // 获取表单值
    if (typeof imageList === 'object') {
      formData.cover = imageList.url;
    } else {
      formData.cover = imageList;
    }
    props.BlogActions.asyncArticleAddAction({
      ...formData,
      publishStatus: 1,
      status: 1,
      views: 0,
      comment: 0,
      like: 0,
      isComment: isComment,
      isLike: isLike,
      isTop: isTop,
    }).then((res: any) => {
      console.log("res", res);
      if (res.msg === "该文章已存在") {
        message.warning("文章已存在，请查看后再次提交！")
        return false;
      } else {
        notification.info({
          message: '新增成功-发布到线上',
          description: `即将跳转到文章列表`,
        });
        setTimeout(() => {
          props.history.push('/admin/article/list');
        }, 500);
      }
    });
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
  // 获取图片信息
  const handleChange = (data: any) => {
    setImageList(data);
  };
  // 获取移除的图片信息
  const handleRemove = (val: any) => {
    setImageList('');
  };
  return (
    <>
      <Save time={updateTime} onDraft={onDraft} onPublish={onPublish} />
      <div className="about">
        新增文章
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
                <TextArea showCount rows={6} maxLength={500} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="cover" {...formItemLayout} label="文章封面">
                {/* @ts-ignore */}
                <UploadImage handleChange={handleChange} handleRemove={handleRemove} />
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
              <Form.Item name="content" {...formItemLayoutTwo} style={{ width: '100%' }}>
                {/* <MarkDown handleChangeVal={handleChangeVal} /> */}
                <Editor
                  preview={false}
                  subfield={false}
                  placeholder="请撰写文章"
                  ref={editorRef}
                  addImg={file => addImg(file)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ArticleAdd);
