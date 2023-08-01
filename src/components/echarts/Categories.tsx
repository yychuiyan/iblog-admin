import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { withRouter } from 'react-router-dom';
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const Categories = (props: any) => {
  const [list, setList] = useState([{}]);
  // 接口数据
  useEffect(() => {
    let articles = props.data;
    let newList = articles.map((item: any) => {
      return {
        categories: item.categories,
        _id: item._id,
      };
    });
    // 分类的数量汇总
    let obj: any = {};
    for (let i = 0; i < newList.length; i++) {
      let item = newList[i].categories;
      obj[item] = obj[item] + 1 || 1;
    }

    // 将对象封装成数组对象格式
    let newCategories = [];
    let key = Object.keys(obj); // 取出当前对象的索引
    let values = Object.values(obj); // 取出当前对象的值
    let i = 1;
    let arrObj = key.map((item, index) => {
      return {
        value: values[index], // values是一个数组，加index是为了拿到跟索引同个位置的值
        name: item,
        id: i++,
      };
    });
    newCategories = arrObj;
    // 汇总数量
    let countCategory = newCategories.map((item: any) => item.value);
    let init = 0;
    let reduceCount = countCategory.reduce((prev, curr) => prev + curr, init);
    newCategories.map((item: any) => (item.value = (item.value / reduceCount) * 100));
    setList(newCategories);
  }, [props.data]);
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main') as HTMLElement);
    const option = {
      title: {
        text: '文章分类',
        left: 'left',
        top: '0'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [...list],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  }, [list]);

  return <div id="main" style={{ width: '100%', minHeight: '460px' }}></div>;
};

export default withRouter(Categories);
