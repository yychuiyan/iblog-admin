"use strict";(self.webpackChunkiblog_admin=self.webpackChunkiblog_admin||[]).push([[67],{4327:function(e,n,t){t.d(n,{Z:function(){return p}});var i=t(5529),s=t(7309),a=t(50),r=t(3834),l=t(9372),c=t(446),o=t(5323),u=(t(2791),t(8687)),d=t(4880),m=t(7892),h=t.n(m),Z=t(456),f=t(184),p=(0,u.$j)((function(e){return{isCollapsed:e.SideMenuStateReducer.isCollapsed}}),null)((0,d.EN)((function(e){var n=(0,Z.Z)(localStorage.getItem("token"))[0].role[0].role_type,t=e.time,u=e.showBack,d=e.onRefresh,m=e.onSave,p=e.onBack,g=e.onDraft,x=e.onPublish,v=t?"\u4e0a\u6b21\u4fdd\u5b58\u65f6\u95f4\uff1a".concat(h()(1e3*t).format("YYYY-MM-DD HH:mm:ss")):"\u6682\u65e0\u64cd\u4f5c",j=e.isCollapsed?"calc(100% - 128px)":"calc(100% - 248px)";return(0,f.jsx)("div",{children:(0,f.jsx)(i.Z,{className:"save_card",bordered:!1,style:{width:j},children:(0,f.jsxs)("div",{className:"save",children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(a.Z,{}),(0,f.jsx)("span",{children:v})]}),(0,f.jsxs)("div",{className:"save_right",children:[u&&(0,f.jsx)(s.Z,{onClick:p||function(){e.history.goBack()},type:"primary",ghost:!0,icon:(0,f.jsx)(r.Z,{}),disabled:n,className:"save_right_btn",children:"\u8fd4\u56de"}),p&&(0,f.jsx)(s.Z,{onClick:p,type:"primary",ghost:!0,icon:(0,f.jsx)(l.Z,{}),disabled:n,className:"save_right_btn",children:"\u8fd4\u56de"}),d&&(0,f.jsx)(s.Z,{onClick:d,type:"primary",ghost:!0,icon:(0,f.jsx)(c.Z,{}),disabled:n,className:"save_right_btn",children:"\u5237\u65b0"}),m&&(0,f.jsx)(s.Z,{onClick:m,icon:(0,f.jsx)(o.Z,{}),disabled:n,className:"save_right_btn",children:"\u4fdd\u5b58"}),g&&(0,f.jsx)(s.Z,{onClick:g,icon:(0,f.jsx)(o.Z,{}),disabled:n,className:"save_right_btn",children:"\u4fdd\u5b58\u8349\u7a3f"}),x&&(0,f.jsx)(s.Z,{onClick:x,icon:(0,f.jsx)(o.Z,{}),disabled:n,className:"save_right_btn",children:"\u53d1\u5e03\u6587\u7ae0"})]})]})})})})))},3802:function(e,n,t){t.d(n,{Z:function(){return g}});var i=t(9439),s=t(2791),a=t(9286),r=t(6988),l=t(5518),c=t(9428),o=t(8687),u=t(7781),d=t(8863),m=t(7615),h=t(7309),Z=t(940),f=t(184),p=function(e){var n=m.Z.useForm(),t=(0,i.Z)(n,1)[0],a=(0,s.useState)(!1),r=(0,i.Z)(a,2),l=r[0],o=r[1];(0,s.useEffect)((function(){e.fileList.length>0&&t.setFieldsValue({url:e.fileList[0].thumbUrl?e.fileList[0].thumbUrl:""})}),[t,e.fileList,e.imgUrl]);return(0,f.jsxs)("div",{children:[(0,f.jsx)(h.Z,{className:"btn-input",onClick:function(){o(!0),""===e.imgUrl.url&&t.resetFields(),e.fileList.length>0&&t.setFieldsValue({url:e.fileList[0].thumbUrl?e.fileList[0].thumbUrl:""})},type:"primary",children:"\u8f93\u5165\u94fe\u63a5"}),(0,f.jsx)("div",{children:(0,f.jsx)(c.Z,{forceRender:!0,title:(0,f.jsx)("div",{style:{textAlign:"left"},children:"\u56fe\u7247\u94fe\u63a5 "}),open:l,onOk:function(){var n=t.getFieldsValue();e.onChangeVal(n.url),o(!1)},onCancel:function(){o(!1)},children:(0,f.jsx)(m.Z,{form:t,children:(0,f.jsx)(m.Z.Item,{label:"\u56fe\u7247\u94fe\u63a5",name:"url",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5"}],children:(0,f.jsx)(Z.Z,{placeholder:"\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5"})})})})})]})},g=(0,o.$j)(null,(function(e){return{BlogActions:(0,u.DE)(d,e)}}))((function(e){var n=(0,s.useState)(!1),t=(0,i.Z)(n,2),o=t[0],u=t[1],d=(0,s.useState)(""),m=(0,i.Z)(d,2),h=m[0],Z=m[1],g=(0,s.useState)(""),x=(0,i.Z)(g,2),v=x[0],j=x[1],b=(0,s.useState)([]),y=(0,i.Z)(b,2),C=y[0],A=y[1],k=(0,s.useState)({}),S=(0,i.Z)(k,2),U=S[0],w=S[1];(0,s.useEffect)((function(){A(void 0!==e.imgUrlArr?e.imgUrlArr:[])}),[e.imgUrlArr]);var B=(0,f.jsxs)("div",{children:[(0,f.jsx)(a.Z,{}),(0,f.jsx)("div",{style:{marginTop:8},children:"Upload"})]});return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(l.Z,{listType:"picture-card",fileList:C,customRequest:function(n){e.BlogActions.asyncFileUploadAction(n).then((function(n){r.ZP.success("\u4e0a\u4f20\u6210\u529f"),n&&(e.handleChange(n),A([{name:n.name,thumbUrl:n.url}]))}))},onPreview:function(e){Z(e.thumbUrl),j(e.name),u(!0)},beforeUpload:function(e){var n="image/jpeg"===e.type||"image/png"===e.type||"image/webp"===e.type||"image/jpg"===e.type||"image/gif"===e.type;n||r.ZP.error("\u53ea\u5141\u8bb8\u4e0a\u4f20 JPG/PNG/WEBP/JPG/GIT \u6587\u4ef6!");var t=e.size/1024/1024<2;return t||r.ZP.error("\u56fe\u7247\u5927\u5c0f\u5fc5\u987b\u5c0f\u4e8e 2MB!"),n&&t},onRemove:function(n){e.handleRemove(n),A([]),w({url:""})},children:C.length>=1?null:B}),(0,f.jsx)(c.Z,{open:o,title:v,footer:null,onCancel:function(){return u(!1)},children:(0,f.jsx)("img",{alt:"example",style:{width:"100%"},src:h})}),(0,f.jsx)(p,{onChangeVal:function(n){e.handleChange(n);var t=n.indexOf("images"),i=n.indexOf("?",t),s=n.substring(t,i);A([{name:s,thumbUrl:n}])},fileList:C||[{name:"",thumbUrl:""}],imgUrl:U})]})}))},3067:function(e,n,t){t.r(n);var i=t(4165),s=t(1413),a=t(5861),r=t(9439),l=t(2791),c=t(940),o=t(458),u=t(7615),d=t(6988),m=t(6090),h=t(6106),Z=t(914),f=t(1306),p=t(4327),g=t(8687),x=t(7781),v=t(8863),j=t(3802),b=t(1092),y=t.n(b),C=t(184),A=c.Z.TextArea,k=o.Z.Option,S={labelCol:{span:6},wrapperCol:{span:18}},U={labelCol:{span:0},wrapperCol:{span:24}};n.default=(0,g.$j)(null,(function(e){return{BlogActions:(0,x.DE)(v,e)}}))((function(e){var n=u.Z.useForm(),t=(0,r.Z)(n,1)[0],g=(0,l.useState)([]),x=(0,r.Z)(g,2),v=x[0],b=x[1],w=(0,l.useState)([]),B=(0,r.Z)(w,2),_=B[0],F=B[1],L=(0,l.useState)(0),I=(0,r.Z)(L,1)[0],N=(0,l.useState)(0),P=(0,r.Z)(N,1)[0],T=(0,l.useState)(),D=(0,r.Z)(T,2),E=D[0],R=D[1],V=(0,l.useState)(),q=(0,r.Z)(V,2),O=q[0],G=q[1],M=(0,l.useState)(),Y=(0,r.Z)(M,2),$=Y[0],H=Y[1],J=(0,l.useState)(),z=(0,r.Z)(J,2),W=z[0],K=z[1],Q=(0,l.useState)(),X=(0,r.Z)(Q,2),ee=X[0],ne=X[1],te=(0,l.useState)([]),ie=(0,r.Z)(te,2),se=ie[0],ae=ie[1],re=(0,l.useState)(),le=(0,r.Z)(re,2),ce=le[0],oe=le[1],ue=(0,l.useState)(),de=(0,r.Z)(ue,2),me=de[0],he=de[1],Ze=(0,l.useState)(),fe=(0,r.Z)(Ze,2),pe=fe[0],ge=fe[1],xe=(0,l.useRef)();(0,l.useEffect)((function(){var n=e.match.params.id;G(n),e.BlogActions.asyncArticleDetailAction(e.match.params.id).then((function(e){var n=void 0===e.data.cover?"":e.data.cover,i=n.indexOf("images"),s=n.substring(i);e.data.cover=[{name:s,thumbUrl:e.data.cover}],ae(e.data.cover),he(e.data.views),ge(e.data.comment),R(e.data.updateTime),ne(e.data.isTop),H(e.data.isComment),K(e.data.isLike),t.setFieldsValue(e.data)}))}),[t,e.BlogActions,e.match.params.id]),(0,l.useEffect)((function(){e.BlogActions.asyncCategoriesAction(I,P,"").then((function(e){var n=e.data.data;F(n)}))}),[I,P,e.BlogActions]),(0,l.useEffect)((function(){e.BlogActions.asyncTagsAction(I,P,"").then((function(e){var n=e.data.data;b(n)}))}),[I,P,e.BlogActions]);var ve=function(){var n=(0,a.Z)((0,i.Z)().mark((function n(){var a;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.validateFields();case 2:return n.next=4,t.getFieldsValue();case 4:(a=n.sent).cover="object"===typeof ce?ce.url:ce,void 0===ce&&(a.cover=se[0].thumbUrl),e.BlogActions.asyncArticleUpdateAction((0,s.Z)((0,s.Z)({},a),{},{id:O,publishStatus:2,status:1,views:me,comment:pe,like:0,isComment:$,isLike:W,isTop:ee})).then((function(){m.Z.info({message:"\u4fee\u6539\u6210\u529f-\u4fdd\u5b58\u5230\u8349\u7a3f",description:"\u8df3\u8f6c\u5230\u6587\u7ae0\u5217\u8868"}),setTimeout((function(){e.history.push("/admin/article/list")}),500)}));case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),je=function(){var n=(0,a.Z)((0,i.Z)().mark((function n(){var a;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.validateFields();case 2:return n.next=4,t.getFieldsValue();case 4:(a=n.sent).cover="object"===typeof ce?ce.url:ce,void 0===ce&&(a.cover=se[0].thumbUrl),e.BlogActions.asyncArticleUpdateAction((0,s.Z)((0,s.Z)({id:O},a),{},{publishStatus:1,status:1,views:me,comment:pe,like:0,isComment:$,isLike:W,isTop:ee})).then((function(){m.Z.info({message:"\u4fee\u6539\u6210\u529f-\u53d1\u5e03\u5230\u7ebf\u4e0a",description:"\u5373\u5c06\u8df3\u8f6c\u5230\u6587\u7ae0\u5217\u8868"}),setTimeout((function(){e.history.push("/admin/article/list")}),500)}));case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(p.Z,{time:E,onRefresh:function(){d.ZP.success("\u5237\u65b0\u6210\u529f"),e.BlogActions.asyncArticleDetailAction(e.match.params.id).then((function(e){e.data.cover=[{imgUrl:e.data.cover}],R(e.data.updateTime),t.setFieldsValue(e.data)}))},onDraft:ve,onPublish:je,onBack:function(){e.history.goBack()}}),(0,C.jsxs)("div",{className:"about",children:["\u4fee\u6539\u6587\u7ae0",(0,C.jsxs)(u.Z,{form:t,children:[(0,C.jsxs)(h.Z,{children:[(0,C.jsxs)(Z.Z,{span:12,children:[(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"title"},S),{},{label:"\u6587\u7ae0\u6807\u9898",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898"}],children:(0,C.jsx)(c.Z,{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898"})})),(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({label:"\u5206\u7c7b",name:"categories"},S),{},{rules:[{required:!0,message:"\u5206\u7c7b\u4e0d\u80fd\u4e3a\u7a7a"}],children:(0,C.jsx)(o.Z,{showSearch:!0,style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5206\u7c7b\u4fe1\u606f",optionFilterProp:"children",children:_.map((function(e){return(0,C.jsx)(k,{value:e.name,children:e.name},e._id)}))})})),(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({label:"\u6807\u7b7e",name:"tags"},S),{},{rules:[{required:!0,message:"\u6807\u7b7e\u4e0d\u80fd\u4e3a\u7a7a"}],children:(0,C.jsx)(o.Z,{mode:"multiple",style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5bf9\u5e94\u7684\u6807\u7b7e",optionLabelProp:"label",children:v.map((function(e){return(0,C.jsx)(k,{value:e.name,label:e.name,children:e.name},e._id)}))})})),(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"introduction"},S),{},{label:"\u6587\u7ae0\u7b80\u4ecb",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u7ae0\u7b80\u4ecb"}],children:(0,C.jsx)(A,{showCount:!0,rows:4,maxLength:500})}))]}),(0,C.jsxs)(Z.Z,{span:10,children:[(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"cover"},S),{},{label:"\u6587\u7ae0\u5c01\u9762",children:(0,C.jsx)(j.Z,{imgUrlArr:se,handleChange:function(e){oe(e)},handleRemove:function(e){oe("")}})})),(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"isComment"},S),{},{label:"\u8bc4\u8bba",children:(0,C.jsx)(f.Z,{checked:$,onChange:function(e){H(e)}})})),(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"isLike"},S),{},{label:"\u70b9\u8d5e",children:(0,C.jsx)(f.Z,{checked:W,onChange:function(e){K(e)}})})),(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"isTop"},S),{},{label:"\u7f6e\u9876",children:(0,C.jsx)(f.Z,{checked:ee,onChange:function(e){ne(e)}})}))]})]}),(0,C.jsx)(h.Z,{children:(0,C.jsx)(Z.Z,{span:24,children:(0,C.jsx)(u.Z.Item,(0,s.Z)((0,s.Z)({name:"content"},U),{},{children:(0,C.jsx)(y(),{preview:!1,subfield:!1,placeholder:"\u8bf7\u64b0\u5199\u6587\u7ae0",ref:xe,addImg:function(n){return function(n){var t=new FormData;t.append("file",n),e.BlogActions.asyncFileUploadAction(t).then((function(e){e&&xe.current.$img2Url(n.name,e.url)}))}(n)}})}))})})]})]})]})}))}}]);
//# sourceMappingURL=67.ea5feb99.chunk.js.map