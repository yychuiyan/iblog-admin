"use strict";(self.webpackChunkiblog_admin=self.webpackChunkiblog_admin||[]).push([[67],{4327:(e,t,s)=>{s.d(t,{Z:()=>Z});var a=s(5529),i=s(7309),l=s(50),n=s(3834),r=s(9372),o=s(446),c=s(5323),d=(s(2791),s(8687)),m=s(4880),h=s(7892),u=s.n(h),g=s(456),p=s(6586),x=s(184);const Z=(0,d.$j)((e=>({isCollapsed:e.SideMenuStateReducer.isCollapsed})),null)((0,m.EN)((e=>{const t=(0,g.Z)(localStorage.getItem("token"))[0].role[0].role_type,{time:s,showBack:d,onRefresh:m,onSave:h,onBack:Z,onDraft:j,onPublish:v}=e,b=s?`\u4e0a\u6b21\u4fdd\u5b58\u65f6\u95f4\uff1a${u()(1e3*s).format("YYYY-MM-DD HH:mm:ss")}`:"\u6682\u65e0\u64cd\u4f5c";return(0,x.jsx)("div",{className:"save",children:(0,x.jsx)(a.Z,{className:"save_card",bordered:!1,style:{width:"100%"},children:(0,x.jsxs)("div",{className:"save",children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(l.Z,{}),(0,x.jsx)("span",{children:b})]}),(0,x.jsxs)("div",{className:"save_right",children:[d&&(0,x.jsx)(i.Z,{onClick:Z||(()=>{e.history.goBack()}),type:"primary",ghost:!0,icon:(0,x.jsx)(n.Z,{}),className:"save_right_btn",children:"\u8fd4\u56de"}),Z&&(0,x.jsx)(i.Z,{onClick:Z,type:"primary",ghost:!0,icon:(0,x.jsx)(r.Z,{}),className:"save_right_btn",children:"\u8fd4\u56de"}),m&&(0,x.jsx)(i.Z,{onClick:m,type:"primary",ghost:!0,icon:(0,x.jsx)(o.Z,{}),className:"save_right_btn",children:"\u5237\u65b0"}),h&&(0,x.jsx)(i.Z,{onClick:t?p.iy:h,icon:(0,x.jsx)(c.Z,{}),className:"save_right_btn",children:"\u66f4\u65b0\u53d1\u5e03"}),j&&(0,x.jsx)(i.Z,{onClick:t?p.ts:j,icon:(0,x.jsx)(c.Z,{}),className:"save_right_btn",children:"\u4fdd\u5b58\u8349\u7a3f"}),v&&(0,x.jsx)(i.Z,{onClick:t?p.HL:v,icon:(0,x.jsx)(c.Z,{}),className:"save_right_btn",children:"\u53d1\u5e03\u6587\u7ae0"})]})]})})})})))},3802:(e,t,s)=>{s.d(t,{Z:()=>j});var a=s(2791),i=s(9286),l=s(6988),n=s(5518),r=s(9428),o=s(8687),c=s(7781),d=s(8863),m=s(7615),h=s(7309),u=s(9389),g=s(456),p=s(6586),x=s(184);const Z=e=>{const t=(0,g.Z)(localStorage.getItem("token"))[0].role[0].role_type,[s]=m.Z.useForm(),[i,l]=(0,a.useState)(!1);(0,a.useEffect)((()=>{e.fileList.length>0&&s.setFieldsValue({url:e.fileList[0].thumbUrl?e.fileList[0].thumbUrl:""})}),[s,e.fileList,e.imgUrl]);return(0,x.jsxs)("div",{children:[(0,x.jsx)(h.Z,{className:"btn-input",onClick:()=>{l(!0),""===e.imgUrl.url&&s.resetFields(),e.fileList.length>0&&s.setFieldsValue({url:e.fileList[0].thumbUrl?e.fileList[0].thumbUrl:""})},type:"primary",children:"\u8f93\u5165\u94fe\u63a5"}),(0,x.jsx)("div",{children:(0,x.jsx)(r.Z,{forceRender:!0,title:(0,x.jsx)("div",{style:{textAlign:"left"},children:"\u56fe\u7247\u94fe\u63a5 "}),open:i,okText:"\u6dfb\u52a0",cancelText:"\u53d6\u6d88",onOk:()=>{if(t)return(0,p.BF)();let a=s.getFieldsValue();e.onChangeVal(a.url),l(!1)},onCancel:()=>{l(!1)},children:(0,x.jsx)(m.Z,{form:s,children:(0,x.jsx)(m.Z.Item,{label:"\u56fe\u7247\u94fe\u63a5",name:"url",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5"}],children:(0,x.jsx)(u.Z,{placeholder:"\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5"})})})})})]})},j=(0,o.$j)(null,(e=>({BlogActions:(0,c.DE)(d,e)})))((e=>{const t=(0,g.Z)(localStorage.getItem("token"))[0].role[0].role_type,[s,o]=(0,a.useState)(!1),[c,d]=(0,a.useState)(""),[m,h]=(0,a.useState)(""),[u,j]=(0,a.useState)([]),[v,b]=(0,a.useState)({});(0,a.useEffect)((()=>{j(void 0!==e.imgUrlArr?e.imgUrlArr:[])}),[e.imgUrlArr]);const f=(0,x.jsxs)("div",{children:[(0,x.jsx)(i.Z,{}),(0,x.jsx)("div",{style:{marginTop:8},children:"Upload"})]});return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(n.Z,{listType:"picture-card",fileList:u,customRequest:t?p.b7:t=>{e.BlogActions.asyncFileUploadAction(t).then((t=>{l.ZP.success("\u4e0a\u4f20\u6210\u529f"),t&&(e.handleChange(t),j([{name:t.name,thumbUrl:t.url}]))}))},onPreview:e=>{d(e.thumbUrl),h(e.name),o(!0)},beforeUpload:e=>{const t="image/jpeg"===e.type||"image/png"===e.type||"image/webp"===e.type||"image/jpg"===e.type||"image/gif"===e.type;t||l.ZP.error("\u53ea\u5141\u8bb8\u4e0a\u4f20 JPG/PNG/WEBP/JPG/GIT \u6587\u4ef6!");const s=e.size/1024/1024<2;return s||l.ZP.error("\u56fe\u7247\u5927\u5c0f\u5fc5\u987b\u5c0f\u4e8e 2MB!"),t&&s},onRemove:t=>{e.handleRemove(t),j([]),b({url:""})},children:u.length>=1?null:f}),(0,x.jsx)(r.Z,{open:s,title:m,footer:null,onCancel:()=>o(!1),children:(0,x.jsx)("img",{alt:"example",style:{width:"100%"},src:c})}),(0,x.jsx)(Z,{onChangeVal:t=>{e.handleChange(t);let s=t.indexOf("images"),a=t.indexOf("?",s),i=t.substring(s,a);j([{name:i,thumbUrl:t}])},fileList:u||[{name:"",thumbUrl:""}],imgUrl:v})]})}))},3067:(e,t,s)=>{s.r(t),s.d(t,{default:()=>k});var a=s(2791),i=s(9389),l=s(458),n=s(7615),r=s(6988),o=s(6090),c=s(6106),d=s(914),m=s(1306),h=s(4327),u=s(8687),g=s(7781),p=s(8863),x=s(3802),Z=s(1092),j=s.n(Z),v=s(184);const{TextArea:b}=i.Z,{Option:f}=l.Z,y={labelCol:{span:6},wrapperCol:{span:18}},w={labelCol:{span:0},wrapperCol:{span:24}},k=(0,u.$j)(null,(e=>({BlogActions:(0,g.DE)(p,e)})))((e=>{const[t]=n.Z.useForm(),[s,u]=(0,a.useState)([]),[g,p]=(0,a.useState)([]),[Z]=(0,a.useState)(0),[k]=(0,a.useState)(0),[A,C]=(0,a.useState)(),[S,P]=(0,a.useState)(),[U,B]=(0,a.useState)(),[_,F]=(0,a.useState)(),[L,T]=(0,a.useState)(),[I,N]=(0,a.useState)([]),[V,E]=(0,a.useState)(),[D,R]=(0,a.useState)(),[q,O]=(0,a.useState)(),[$,G]=(0,a.useState)(),H=(0,a.useRef)();(0,a.useEffect)((()=>{let s=e.match.params.id;P(s),e.BlogActions.asyncArticleDetailAction(e.match.params.id).then((e=>{let s=void 0===e.data.cover?"":e.data.cover,a=s.indexOf("images"),i=s.substring(a);e.data.cover=[{name:i,thumbUrl:e.data.cover}],N(e.data.cover),G(e.data.like),R(e.data.views),O(e.data.comment),C(e.data.updateTime),T(e.data.isTop),B(e.data.isComment),F(e.data.isLike),t.setFieldsValue(e.data)}))}),[t,e.BlogActions,e.match.params.id]),(0,a.useEffect)((()=>{e.BlogActions.asyncCategoriesAction(Z,k,"").then((e=>{let{data:t}=e.data;p(t)}))}),[Z,k,e.BlogActions]),(0,a.useEffect)((()=>{e.BlogActions.asyncTagsAction(Z,k,"").then((e=>{let{data:t}=e.data;u(t)}))}),[Z,k,e.BlogActions]);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{className:"about",style:{height:"calc(100vh - 174px)",overflow:"auto"},children:["\u4fee\u6539\u6587\u7ae0",(0,v.jsxs)(n.Z,{form:t,children:[(0,v.jsxs)(c.Z,{children:[(0,v.jsxs)(d.Z,{span:12,children:[(0,v.jsx)(n.Z.Item,{name:"title",...y,label:"\u6587\u7ae0\u6807\u9898",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898"}],children:(0,v.jsx)(i.Z,{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898"})}),(0,v.jsx)(n.Z.Item,{label:"\u5206\u7c7b",name:"categories",...y,rules:[{required:!0,message:"\u5206\u7c7b\u4e0d\u80fd\u4e3a\u7a7a"}],children:(0,v.jsx)(l.Z,{showSearch:!0,style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5206\u7c7b\u4fe1\u606f",optionFilterProp:"children",children:g.map((e=>(0,v.jsx)(f,{value:e.name,children:e.name},e._id)))})}),(0,v.jsx)(n.Z.Item,{label:"\u6807\u7b7e",name:"tags",...y,rules:[{required:!0,message:"\u6807\u7b7e\u4e0d\u80fd\u4e3a\u7a7a"}],children:(0,v.jsx)(l.Z,{mode:"multiple",style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5bf9\u5e94\u7684\u6807\u7b7e",optionLabelProp:"label",children:s.map((e=>(0,v.jsx)(f,{value:e.name,label:e.name,children:e.name},e._id)))})}),(0,v.jsx)(n.Z.Item,{name:"introduction",...y,label:"\u6587\u7ae0\u7b80\u4ecb",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u7b80\u4ecb"}],children:(0,v.jsx)(b,{showCount:!0,rows:4,maxLength:500})})]}),(0,v.jsxs)(d.Z,{span:10,children:[(0,v.jsx)(n.Z.Item,{name:"cover",...y,label:"\u6587\u7ae0\u5c01\u9762",children:(0,v.jsx)(x.Z,{imgUrlArr:I,handleChange:e=>{E(e)},handleRemove:e=>{E("")}})}),(0,v.jsx)(n.Z.Item,{name:"isComment",...y,label:"\u8bc4\u8bba",children:(0,v.jsx)(m.Z,{checked:U,onChange:e=>{B(e)}})}),(0,v.jsx)(n.Z.Item,{name:"isLike",...y,label:"\u70b9\u8d5e",children:(0,v.jsx)(m.Z,{checked:_,onChange:e=>{F(e)}})}),(0,v.jsx)(n.Z.Item,{name:"isTop",...y,label:"\u7f6e\u9876",children:(0,v.jsx)(m.Z,{checked:L,onChange:e=>{T(e)}})})]})]}),(0,v.jsx)(c.Z,{children:(0,v.jsx)(d.Z,{span:24,children:(0,v.jsx)(n.Z.Item,{name:"content",...w,children:(0,v.jsx)(j(),{preview:!1,subfield:!1,placeholder:"\u8bf7\u64b0\u5199\u6587\u7ae0",ref:H,addImg:t=>(t=>{const s=new FormData;s.append("file",t),e.BlogActions.asyncFileUploadAction(s).then((e=>{e&&H.current.$img2Url(t.name,e.url)}))})(t)})})})})]})]}),(0,v.jsx)(h.Z,{time:A,onRefresh:()=>{r.ZP.success("\u5237\u65b0\u6210\u529f"),e.BlogActions.asyncArticleDetailAction(e.match.params.id).then((e=>{e.data.cover=[{imgUrl:e.data.cover}],C(e.data.updateTime),t.setFieldsValue(e.data)}))},onDraft:async()=>{await t.validateFields();let s=await t.getFieldsValue();s.cover="object"===typeof V?V.url:V,void 0===V&&(s.cover=I[0].thumbUrl),e.BlogActions.asyncArticleUpdateAction({...s,id:S,publishStatus:2,status:1,views:D,comment:q,like:$,isComment:U,isLike:_,isTop:L}).then((()=>{o.Z.info({message:"\u4fee\u6539\u6210\u529f-\u4fdd\u5b58\u5230\u8349\u7a3f",description:"\u8df3\u8f6c\u5230\u6587\u7ae0\u5217\u8868"}),setTimeout((()=>{e.history.push("/admin/article/list")}),500)}))},onPublish:async()=>{await t.validateFields();let s=await t.getFieldsValue();s.cover="object"===typeof V?V.url:V,void 0===V&&(s.cover=I[0].thumbUrl),e.BlogActions.asyncArticleUpdateAction({id:S,...s,publishStatus:1,status:1,views:D,comment:q,like:$,isComment:U,isLike:_,isTop:L}).then((()=>{o.Z.info({message:"\u4fee\u6539\u6210\u529f-\u53d1\u5e03\u5230\u7ebf\u4e0a",description:"\u5373\u5c06\u8df3\u8f6c\u5230\u6587\u7ae0\u5217\u8868"}),setTimeout((()=>{e.history.push("/admin/article/list")}),500)}))},onBack:()=>{e.history.goBack()}})]})}))},6586:(e,t,s)=>{s.d(t,{BF:()=>Z,HL:()=>g,Lk:()=>o,Qk:()=>c,TV:()=>d,XE:()=>l,b7:()=>x,eV:()=>h,iy:()=>u,pv:()=>n,ts:()=>p,uB:()=>i,xc:()=>m,yP:()=>r});var a=s(6988);const i=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u5220\u9664\u64cd\u4f5c\ud83d\ude05"),l=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u66f4\u65b0\u64cd\u4f5c\ud83d\ude05"),n=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u6dfb\u52a0\u64cd\u4f5c\ud83d\ude05"),r=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u5ba1\u6279\u64cd\u4f5c\ud83d\ude05"),o=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e00\u952e\u5ba1\u6279\u64cd\u4f5c\ud83d\ude05"),c=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e0b\u7ebf\u6587\u7ae0\u64cd\u4f5c\ud83d\ude05"),d=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e0a\u7ebf\u6587\u7ae0\u64cd\u4f5c\ud83d\ude05"),m=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u7f6e\u9876\u64cd\u4f5c\ud83d\ude05"),h=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u72b6\u6001\u53d8\u66f4\u64cd\u4f5c\ud83d\ude05"),u=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u53d1\u5e03\u64cd\u4f5c\ud83d\ude05"),g=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u53d1\u5e03\u6587\u7ae0\u64cd\u4f5c\ud83d\ude05"),p=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4fdd\u5b58\u8349\u7a3f\u64cd\u4f5c\ud83d\ude05"),x=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e0a\u4f20\u56fe\u7247\u64cd\u4f5c\ud83d\ude05"),Z=()=>a.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u8f93\u5165\u56fe\u7247\u94fe\u63a5\u64cd\u4f5c\ud83d\ude05")}}]);
//# sourceMappingURL=67.3de54969.chunk.js.map