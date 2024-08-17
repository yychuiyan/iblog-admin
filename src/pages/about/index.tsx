import React, { useEffect, useRef, useState } from 'react';
import { Form, Row, Col, message, Switch } from 'antd';
import Save from '@/components/save';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import Editor from 'for-editor';
import { AxiosResponse } from 'axios';
interface DataConter {
  _id: string;
  isChecked: boolean;
  updateTime: string;
  createTime: string;
  content: string;
}
interface AboutData {
  data: DataConter[];
}
const About = (props: any) => {
  // 表单数据
  const [form] = Form.useForm();
  // 获取接口数据
  const [aboutData, setAboutData] = useState<DataConter[]>([]);
  // 定义ref
  const editorRef = useRef<Editor>(null);
  // 上次保存时间
  const [updateTime, setUpdateTime] = useState<string>();
  // 是否选中
  const [isChecked, setIsChecked] = useState(false);
  // 关于列表
  useEffect(() => {
    props.BlogActions.asyncAboutListAction(isChecked).then((res: AxiosResponse<AboutData>) => {
      let { data } = res.data;
      let updateTime = data.map((item) => item.updateTime).join('');
      let createTime = data.map((item) => item.createTime).join('');
      let content = data.map((item) => item.content).join('');
      setTimeout(() => {
        form.setFieldsValue({ content: content });
      }, 500);
      setUpdateTime(updateTime === '0' ? createTime : updateTime);
      setAboutData(data);
    });
  }, [form, isChecked, props.BlogActions]);

  // 保存
  const submit = async () => {
    await form.validateFields();
    const val = await form.getFieldsValue();
    // 修改和添加是在一块的
    aboutData.length > 0
      ? props.BlogActions.asyncAboutUpdateAction({
          id: aboutData[0]._id,
          content: val.content,
          checked: isChecked,
      }).then(() => {
          message.success('更新成功');
        props.BlogActions.asyncAboutListAction(isChecked).then((res: AxiosResponse<AboutData>) => {
          let { data } = res.data;
          let updateTime = data.map((item) => item.updateTime).join('');
          let createTime = data.map((item) => item.createTime).join('');
          let content = data.map((item) => item.content).join('');
            setTimeout(() => {
              form.setFieldsValue({ content: content });
            }, 500);
            setUpdateTime(updateTime === '0' ? createTime : updateTime);
            setAboutData(data);
          });
        })
      : props.BlogActions.asyncAboutAddAction({
          checked: isChecked,
          content: val.content,
      }).then(() => {
          message.success('新增成功');
        props.BlogActions.asyncAboutListAction(isChecked).then((res: AxiosResponse<AboutData>) => {
          let { data } = res.data;
          let updateTime = data.map((item) => item.updateTime).join('');
          let createTime = data.map((item) => item.createTime).join('');
          let content = data.map((item) => item.content).join('');
            setTimeout(() => {
              form.setFieldsValue({ content: content });
            }, 500);
            setUpdateTime(updateTime === '0' ? createTime : updateTime);
            setAboutData(data);
          });
        });
  };
  // 点击刷新时重新调用接口
  const onRefresh = () => {
    message.success('刷新成功');
    props.BlogActions.asyncAboutListAction().then((res: AboutData) => {
      // 将值设置进表单数据中
      form.setFieldsValue(res.data);
    });
  };
  // 切换状态
  const handleClickChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div style={{ height: 'calc(100vh - 180px)', overflow: 'auto' }}>
        <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
          {isChecked ? (
            <span style={{ fontSize: '20px', marginRight: '1rem' }}>关于我</span>
          ) : (
            <span style={{ fontSize: '20px', marginRight: '1rem' }}>关于本站</span>
          )}
          <Switch
            checked={isChecked}
            onClick={handleClickChecked}
            style={{ fontSize: '20px' }}
          ></Switch>
        </div>

        <Form form={form} className="mx-auto">
          {isChecked ? (
            <Row>
              <Col span={24}>
                <Form.Item name="content">
                  <Editor preview={false} subfield={false} placeholder="关于我" ref={editorRef} />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col span={24}>
                <Form.Item name="content">
                    <Editor preview={false} subfield={false} placeholder="关于本站" ref={editorRef} />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </div>
      <Save time={updateTime} onRefresh={onRefresh} onSave={submit} />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(About);
