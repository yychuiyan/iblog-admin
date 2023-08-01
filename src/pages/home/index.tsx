import React, { useEffect, useState } from 'react';
// import Categories from '@/components/echarts/Categories';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import './index.less'
const Home = (props: any) => {
  // 文章列表
  // const [list, setList] = useState([]);
  // 文章总量
  const [articleNum, setArticleNum] = useState(0)
  // 文章访问量
  const [articleViews, setArticleViews] = useState(0)
  // 文章点赞
  const [articleLikes, setArticleLikes] = useState(0)
  // 随笔数量
  const [essayCount, setEssayCount] = useState(0)
  // 友链数量
  const [friendCount, setFriendCount] = useState(0)
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleListAllAction(1, 1).then((res: any) => {
      // 获取文章
      let { data } = res.data;
      // 文章数量
      let articleNumber = data.length;
      setArticleNum(articleNumber)
      // 文章访问量
      let views = data.map((item: any) => item.views)
      let init = 0;
      let viewCount = views.reduce((prev: any, curr: any) => {
        return prev + curr
      }, init)
      setArticleViews(viewCount)
      // 点赞数量
      console.log("data", data)
      let likes = data.map((item: any) => item.like)
      let initLike = 0;
      let likeCount = likes.reduce((prev: any, curr: any) => {
        return prev + curr
      }, initLike)
      setArticleLikes(likeCount)
      // 随笔
      props.BlogActions.asyncEssayListAction('', '', '').then((res: any) => {
        // 获取随笔
        let { data } = res.data;
        setEssayCount(data.length)
      });
      // 获取友链列表数据
      props.BlogActions.asyncFriendlyListAction('', '', '').then((res: any) => {
        // 获取友链
        let { data } = res.data;
        console.log("友链：", data);
        setFriendCount(data.length)
      });
      // setList(data);
    });
  }, [props.BlogActions]);

  return (
    <div className='home'>
      <div className='home_nav'>
        <div>
          <span className='home_nav_title'>文章访问量</span>
          <span className='home_nav_num'>{articleViews}</span>
        </div>
        <div>
          <span className='home_nav_title'>点赞总量</span>
          <span className='home_nav_num'>{articleLikes}</span>
        </div>
        <div>
          <span className='home_nav_title'>文章总量</span>
          <span className='home_nav_num'>{articleNum}</span>
        </div>
        <div>
          <span className='home_nav_title'>随笔数量</span>
          <span className='home_nav_num'>{essayCount}</span>
        </div>
        <div>
          <span className='home_nav_title'>友链数量</span>
          <span className='home_nav_num'>{friendCount}</span>
        </div>
      </div>
      <div className='home_content'>
        {/* <div className='home_category'>
          <Categories data={list} />
        </div> */}
        {/* <div>
          1
        </div>
        <div>
          2
        </div> */}
        <h2>看板建设中······</h2>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Home);
