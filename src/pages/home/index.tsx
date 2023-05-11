import React, { useEffect, useState } from 'react';
import Categories from '@/components/echarts/Categories';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
const Home = (props: any) => {
  // 文章列表
  const [list, setList] = useState([]);
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleListAllAction(1, 1).then((res: any) => {
      // 获取文章
      let { data } = res.data;
      setList(data);
    });
  }, [props.BlogActions]);
  return (
    <div>
      <Categories data={list} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Home);
