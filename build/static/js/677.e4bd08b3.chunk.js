"use strict";(self.webpackChunkiblog_admin=self.webpackChunkiblog_admin||[]).push([[677],{4327:(e,s,t)=>{t.d(s,{Z:()=>Z});var l=t(5529),n=t(7309),i=t(50),a=t(3834),r=t(9372),o=t(446),c=t(5323),d=(t(2791),t(8687)),h=t(4880),m=t(7892),u=t.n(m),g=t(456),p=t(6586),x=t(184);const Z=(0,d.$j)((e=>({isCollapsed:e.SideMenuStateReducer.isCollapsed})),null)((0,h.EN)((e=>{const s=(0,g.Z)(localStorage.getItem("token"))[0].role[0].role_type,{time:t,showBack:d,onRefresh:h,onSave:m,onBack:Z,onDraft:j,onPublish:b}=e,f=t?`\u4e0a\u6b21\u4fdd\u5b58\u65f6\u95f4\uff1a${u()(1e3*t).format("YYYY-MM-DD HH:mm:ss")}`:"\u6682\u65e0\u64cd\u4f5c";return(0,x.jsx)("div",{className:"save",children:(0,x.jsx)(l.Z,{className:"save_card",bordered:!1,style:{width:"100%"},children:(0,x.jsxs)("div",{className:"save",children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(i.Z,{}),(0,x.jsx)("span",{children:f})]}),(0,x.jsxs)("div",{className:"save_right",children:[d&&(0,x.jsx)(n.Z,{onClick:Z||(()=>{e.history.goBack()}),type:"primary",ghost:!0,icon:(0,x.jsx)(a.Z,{}),className:"save_right_btn",children:"\u8fd4\u56de"}),Z&&(0,x.jsx)(n.Z,{onClick:Z,type:"primary",ghost:!0,icon:(0,x.jsx)(r.Z,{}),className:"save_right_btn",children:"\u8fd4\u56de"}),h&&(0,x.jsx)(n.Z,{onClick:h,type:"primary",ghost:!0,icon:(0,x.jsx)(o.Z,{}),className:"save_right_btn",children:"\u5237\u65b0"}),m&&(0,x.jsx)(n.Z,{onClick:s?p.iy:m,icon:(0,x.jsx)(c.Z,{}),className:"save_right_btn",children:"\u66f4\u65b0\u53d1\u5e03"}),j&&(0,x.jsx)(n.Z,{onClick:s?p.ts:j,icon:(0,x.jsx)(c.Z,{}),className:"save_right_btn",children:"\u4fdd\u5b58\u8349\u7a3f"}),b&&(0,x.jsx)(n.Z,{onClick:s?p.HL:b,icon:(0,x.jsx)(c.Z,{}),className:"save_right_btn",children:"\u53d1\u5e03\u6587\u7ae0"})]})]})})})})))},3802:(e,s,t)=>{t.d(s,{Z:()=>j});var l=t(2791),n=t(9286),i=t(6988),a=t(5518),r=t(9428),o=t(8687),c=t(7781),d=t(8863),h=t(7615),m=t(7309),u=t(9389),g=t(456),p=t(6586),x=t(184);const Z=e=>{const s=(0,g.Z)(localStorage.getItem("token"))[0].role[0].role_type,[t]=h.Z.useForm(),[n,i]=(0,l.useState)(!1);(0,l.useEffect)((()=>{e.fileList.length>0&&t.setFieldsValue({url:e.fileList[0].thumbUrl?e.fileList[0].thumbUrl:""})}),[t,e.fileList,e.imgUrl]);return(0,x.jsxs)("div",{children:[(0,x.jsx)(m.Z,{className:"btn-input",onClick:()=>{i(!0),""===e.imgUrl.url&&t.resetFields(),e.fileList.length>0&&t.setFieldsValue({url:e.fileList[0].thumbUrl?e.fileList[0].thumbUrl:""})},type:"primary",children:"\u8f93\u5165\u94fe\u63a5"}),(0,x.jsx)("div",{children:(0,x.jsx)(r.Z,{forceRender:!0,title:(0,x.jsx)("div",{style:{textAlign:"left"},children:"\u56fe\u7247\u94fe\u63a5 "}),open:n,okText:"\u6dfb\u52a0",cancelText:"\u53d6\u6d88",onOk:()=>{if(s)return(0,p.BF)();let l=t.getFieldsValue();e.onChangeVal(l.url),i(!1)},onCancel:()=>{i(!1)},children:(0,x.jsx)(h.Z,{form:t,children:(0,x.jsx)(h.Z.Item,{label:"\u56fe\u7247\u94fe\u63a5",name:"url",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5"}],children:(0,x.jsx)(u.Z,{placeholder:"\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5"})})})})})]})},j=(0,o.$j)(null,(e=>({BlogActions:(0,c.DE)(d,e)})))((e=>{const s=(0,g.Z)(localStorage.getItem("token"))[0].role[0].role_type,[t,o]=(0,l.useState)(!1),[c,d]=(0,l.useState)(""),[h,m]=(0,l.useState)(""),[u,j]=(0,l.useState)([]),[b,f]=(0,l.useState)({});(0,l.useEffect)((()=>{j(void 0!==e.imgUrlArr?e.imgUrlArr:[])}),[e.imgUrlArr]);const v=(0,x.jsxs)("div",{children:[(0,x.jsx)(n.Z,{}),(0,x.jsx)("div",{style:{marginTop:8},children:"Upload"})]});return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a.Z,{listType:"picture-card",fileList:u,customRequest:s?p.b7:s=>{e.BlogActions.asyncFileUploadAction(s).then((s=>{i.ZP.success("\u4e0a\u4f20\u6210\u529f"),s&&(e.handleChange(s),j([{name:s.name,thumbUrl:s.url}]))}))},onPreview:e=>{d(e.thumbUrl),m(e.name),o(!0)},beforeUpload:e=>{const s="image/jpeg"===e.type||"image/png"===e.type||"image/webp"===e.type||"image/jpg"===e.type||"image/gif"===e.type;s||i.ZP.error("\u53ea\u5141\u8bb8\u4e0a\u4f20 JPG/PNG/WEBP/JPG/GIT \u6587\u4ef6!");const t=e.size/1024/1024<2;return t||i.ZP.error("\u56fe\u7247\u5927\u5c0f\u5fc5\u987b\u5c0f\u4e8e 2MB!"),s&&t},onRemove:s=>{e.handleRemove(s),j([]),f({url:""})},children:u.length>=1?null:v}),(0,x.jsx)(r.Z,{open:t,title:h,footer:null,onCancel:()=>o(!1),children:(0,x.jsx)("img",{alt:"example",style:{width:"100%"},src:c})}),(0,x.jsx)(Z,{onChangeVal:s=>{e.handleChange(s);let t=s.indexOf("images"),l=s.indexOf("?",t),n=s.substring(t,l);j([{name:n,thumbUrl:s}])},fileList:u||[{name:"",thumbUrl:""}],imgUrl:b})]})}))},677:(e,s,t)=>{t.r(s),t.d(s,{default:()=>C});var l=t(2791),n=t(9389),i=t(458),a=t(7615),r=t(6090),o=t(6988),c=t(6106),d=t(914),h=t(1306),m=t(4327),u=t(8687),g=t(7781),p=t(8863),x=t(3802),Z=t(1092),j=t.n(Z),b=(t(7342),t(184));const{TextArea:f}=n.Z,{Option:v}=i.Z,y={labelCol:{span:6},wrapperCol:{span:18}},w={labelCol:{span:0},wrapperCol:{span:24}},C=(0,u.$j)(null,(e=>({BlogActions:(0,g.DE)(p,e)})))((e=>{const[s]=a.Z.useForm(),[t,u]=(0,l.useState)([]),[g,p]=(0,l.useState)([]),[Z]=(0,l.useState)(0),[C]=(0,l.useState)(0),[k]=(0,l.useState)(),P=(0,l.useRef)(),[A,S]=(0,l.useState)(!0),[_,U]=(0,l.useState)(!0),[B,F]=(0,l.useState)(!1),[L,I]=(0,l.useState)();(0,l.useEffect)((()=>{e.BlogActions.asyncCategoriesAction(Z,C,"").then((e=>{let{data:s}=e.data;p(s)}))}),[Z,C,e.BlogActions]),(0,l.useEffect)((()=>{e.BlogActions.asyncTagsAction(Z,C,"").then((e=>{let{data:s}=e.data;u(s)}))}),[Z,C,e.BlogActions]);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{style:{height:"calc(100vh - 180px)",overflow:"auto"},children:["\u6dfb\u52a0\u6587\u7ae0",(0,b.jsxs)(a.Z,{form:s,children:[(0,b.jsxs)(c.Z,{children:[(0,b.jsxs)(d.Z,{span:12,children:[(0,b.jsx)(a.Z.Item,{name:"title",...y,label:"\u6587\u7ae0\u6807\u9898",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898"}],children:(0,b.jsx)(n.Z,{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898"})}),(0,b.jsx)(a.Z.Item,{label:"\u5206\u7c7b",name:"categories",...y,rules:[{required:!0,message:"\u5206\u7c7b\u4e0d\u80fd\u4e3a\u7a7a"}],children:(0,b.jsx)(i.Z,{showSearch:!0,style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5206\u7c7b\u4fe1\u606f",optionFilterProp:"children",children:g.map((e=>(0,b.jsx)(v,{value:e.name,children:e.name},e._id)))})}),(0,b.jsx)(a.Z.Item,{label:"\u6807\u7b7e",name:"tags",...y,rules:[{required:!0,message:"\u6807\u7b7e\u4e0d\u80fd\u4e3a\u7a7a"}],children:(0,b.jsx)(i.Z,{mode:"multiple",style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5bf9\u5e94\u7684\u6807\u7b7e",optionLabelProp:"label",children:t.map((e=>(0,b.jsx)(v,{value:e.name,label:e.name,children:e.name},e._id)))})}),(0,b.jsx)(a.Z.Item,{name:"introduction",...y,label:"\u6587\u7ae0\u7b80\u4ecb",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u7b80\u4ecb"}],children:(0,b.jsx)(f,{showCount:!0,rows:6,maxLength:500})})]}),(0,b.jsxs)(d.Z,{span:10,children:[(0,b.jsx)(a.Z.Item,{name:"cover",...y,label:"\u6587\u7ae0\u5c01\u9762",children:(0,b.jsx)(x.Z,{handleChange:e=>{I(e)},handleRemove:()=>{I("")}})}),(0,b.jsx)(a.Z.Item,{name:"isComment",...y,label:"\u8bc4\u8bba",children:(0,b.jsx)(h.Z,{checked:A,onChange:e=>{S(e)}})}),(0,b.jsx)(a.Z.Item,{name:"isLike",...y,label:"\u70b9\u8d5e",children:(0,b.jsx)(h.Z,{checked:_,onChange:e=>{U(e)}})}),(0,b.jsx)(a.Z.Item,{name:"isTop",...y,label:"\u7f6e\u9876",children:(0,b.jsx)(h.Z,{checked:B,onChange:e=>{F(e)}})})]})]}),(0,b.jsx)(c.Z,{children:(0,b.jsx)(d.Z,{span:24,children:(0,b.jsx)(a.Z.Item,{name:"content",...w,style:{width:"100%"},children:(0,b.jsx)(j(),{preview:!1,subfield:!1,placeholder:"\u8bf7\u64b0\u5199\u6587\u7ae0",ref:P,addImg:s=>(s=>{const t=new FormData;t.append("file",s),e.BlogActions.asyncFileUploadAction(t).then((e=>{e&&P.current.$img2Url(s.name,e.url)}))})(s)})})})})]})]}),(0,b.jsx)(m.Z,{time:k,onDraft:async()=>{await s.validateFields();let t=await s.getFieldsValue();"object"===typeof L&&(t.cover=L.url),t.cover=L,e.BlogActions.asyncArticleAddAction({...t,publishStatus:2,status:1,views:0,comment:0,like:0,isComment:A,isLike:_,isTop:B}).then((()=>{r.Z.info({message:"\u65b0\u589e\u6210\u529f-\u4fdd\u5b58\u5230\u8349\u7a3f",description:"\u8df3\u8f6c\u5230\u6587\u7ae0\u5217\u8868"}),setTimeout((()=>{e.history.push("/admin/article/list")}),500)}))},onPublish:async()=>{await s.validateFields();let t=s.getFieldsValue();t.cover="object"===typeof L?L.url:L,e.BlogActions.asyncArticleAddAction({...t,publishStatus:1,status:1,views:0,comment:0,like:0,isComment:A,isLike:_,isTop:B}).then((s=>{if("\u8be5\u6587\u7ae0\u5df2\u5b58\u5728"===s.msg)return o.ZP.warning("\u6587\u7ae0\u5df2\u5b58\u5728\uff0c\u8bf7\u67e5\u770b\u540e\u518d\u6b21\u63d0\u4ea4\uff01"),!1;r.Z.info({message:"\u65b0\u589e\u6210\u529f-\u53d1\u5e03\u5230\u7ebf\u4e0a",description:"\u5373\u5c06\u8df3\u8f6c\u5230\u6587\u7ae0\u5217\u8868"}),setTimeout((()=>{e.history.push("/admin/article/list")}),500)}))}})]})}))},6586:(e,s,t)=>{t.d(s,{BF:()=>Z,HL:()=>g,Lk:()=>o,Qk:()=>c,TV:()=>d,XE:()=>i,b7:()=>x,eV:()=>m,iy:()=>u,pv:()=>a,ts:()=>p,uB:()=>n,xc:()=>h,yP:()=>r});var l=t(6988);const n=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u5220\u9664\u64cd\u4f5c\ud83d\ude05"),i=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u66f4\u65b0\u64cd\u4f5c\ud83d\ude05"),a=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u6dfb\u52a0\u64cd\u4f5c\ud83d\ude05"),r=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u5ba1\u6279\u64cd\u4f5c\ud83d\ude05"),o=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e00\u952e\u5ba1\u6279\u64cd\u4f5c\ud83d\ude05"),c=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e0b\u7ebf\u6587\u7ae0\u64cd\u4f5c\ud83d\ude05"),d=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e0a\u7ebf\u6587\u7ae0\u64cd\u4f5c\ud83d\ude05"),h=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u7f6e\u9876\u64cd\u4f5c\ud83d\ude05"),m=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u72b6\u6001\u53d8\u66f4\u64cd\u4f5c\ud83d\ude05"),u=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u53d1\u5e03\u64cd\u4f5c\ud83d\ude05"),g=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u53d1\u5e03\u6587\u7ae0\u64cd\u4f5c\ud83d\ude05"),p=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4fdd\u5b58\u8349\u7a3f\u64cd\u4f5c\ud83d\ude05"),x=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u4e0a\u4f20\u56fe\u7247\u64cd\u4f5c\ud83d\ude05"),Z=()=>l.ZP.warning("\u8bbf\u5ba2\u6682\u4e0d\u652f\u6301\u8f93\u5165\u56fe\u7247\u94fe\u63a5\u64cd\u4f5c\ud83d\ude05")},7342:()=>{}}]);
//# sourceMappingURL=677.e4bd08b3.chunk.js.map