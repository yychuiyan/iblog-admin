"use strict";(self.webpackChunkiblog_admin=self.webpackChunkiblog_admin||[]).push([[15],{7761:function(e,n,t){t.r(n),t.d(n,{default:function(){return oe}});var i=t(2791),a=t(4880),s=t(586),r=t(43),o=t(1413),l=t(9439),c=t(3388),u=t(8687),d=t(7781),m=t(8863),h=t(456),p=t(1890),x=t(62),f=t(3340),j=t(9529),g=t(3451),y=t(9293),b=t(1752),v=t(9150),A=t(2383),Z=t(7391),z=t(821),k=t(9783),P=t(184),W=s.Z.Sider,C=(0,u.$j)((function(e){return{userinfo:e.LoginReducer.userinfo,isCollapsed:e.SideMenuStateReducer.isCollapsed}}),(function(e){return{BlogActions:(0,d.DE)(m,e)}}))((0,a.EN)((function(e){var n=(0,h.Z)(localStorage.getItem("token"))[0].role,t=(0,i.useState)([]),s=(0,l.Z)(t,2),r=s[0],u=s[1],d=(0,a.TH)();(0,i.useEffect)((function(){e.BlogActions.asyncRightsListAction().then((function(e){var t=e.data.data;t.map((function(e,n){if(e.children.length<1)return t[n].children="";var i=e.children.filter((function(e){return 1===e.pagepermission}));return e.children=i}));var i=t.filter((function(e){return 1===e.pagepermission&&n[0].rights.includes(e.key)}));u(i)}))}),[e.BlogActions]);var m=function(e){switch(e){case"HomeOutlined":return(0,P.jsx)(p.Z,{});case"HighlightOutlined":return(0,P.jsx)(x.Z,{});case"VerifiedOutlined":return(0,P.jsx)(f.Z,{});case"UserOutlined":return(0,P.jsx)(j.Z,{});case"MessageOutlined":return(0,P.jsx)(g.Z,{});case"LinkedinOutlined":return(0,P.jsx)(y.Z,{});case"EditOutlined":return(0,P.jsx)(b.Z,{});case"NotificationOutlined":return(0,P.jsx)(v.Z,{});case"RocketOutlined":return(0,P.jsx)(A.Z,{});case"HeartOutlined":return(0,P.jsx)(Z.Z,{});case"ContactsOutlined":return(0,P.jsx)(z.Z,{});case"SketchOutlined":return(0,P.jsx)(k.Z,{});default:return null}},C=[e.location.pathname],S=["/admin/"+d.pathname.split("/")[2]];return(0,P.jsxs)(W,{trigger:null,collapsible:!0,collapsed:e.isCollapsed,style:{userSelect:"none"},children:[(0,P.jsx)("div",{className:"logo",children:e.isCollapsed?(0,P.jsx)("div",{className:"logo_text_hide",children:(0,P.jsx)("img",{src:"https://yychuiyan.com/assets/avatar-8540a345.webp",alt:"",style:{borderRadius:"50%",height:"35px",width:"35px",marginTop:"8px"}})}):(0,P.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",left:"25px"},children:[(0,P.jsx)("img",{src:"https://yychuiyan.com/assets/avatar-8540a345.webp",alt:"",style:{borderRadius:"50%"}}),(0,P.jsx)("div",{className:"logo_text",children:"\u591c\u96e8\u708a\u70df"})]})}),(0,P.jsx)(c.Z,{theme:"dark",mode:"inline",className:"sidemeun",defaultSelectedKeys:["/admin/home"],selectedKeys:C,onClick:function(n){var t=n.keyPath[0];e.history.push(t)},defaultOpenKeys:S,items:r.map((function(e){return(0,o.Z)((0,o.Z)({},e),{},{icon:m(e.icon)})}))})]})}))),S=t(6988),O=t(294),N=t(3621),E=t(5797),L=s.Z.Header,R=(0,u.$j)((function(e){return{userinfo:e.LoginReducer.userinfo,isCollapsed:e.SideMenuStateReducer.isCollapsed}}),(function(e){return{BlogActions:(0,d.DE)(m,e),ChangeCollapsed:(0,d.DE)(m,e)}}))((0,a.EN)((function(e){var n=(0,i.useState)(),t=(0,l.Z)(n,2),a=t[0],s=t[1];(0,i.useEffect)((function(){var e=(0,h.Z)(localStorage.getItem("token"))[0].username;s(e)}),[]);var r=function(){e.ChangeCollapsed.changeCollapsed()},o=[{label:(0,P.jsx)("div",{children:(0,P.jsx)("div",{onClick:function(){e.history.push("/admin/user/list")},children:"\u7528\u6237\u7ba1\u7406"})}),key:"1"},{label:(0,P.jsx)("div",{children:(0,P.jsx)("div",{onClick:function(){e.BlogActions.asyncLoginOutAction().then((function(){localStorage.removeItem("token"),S.ZP.success("\u9000\u51fa\u767b\u5f55\uff01"),e.history.push("/admin/login")}))},children:"\u9000\u51fa\u767b\u5f55"})}),key:"2",danger:!0}];return(0,P.jsxs)(L,{className:"site-layout-background",style:{padding:"0 16px",userSelect:"none",position:"relative"},children:[e.isCollapsed?(0,P.jsx)(N.Z,{onClick:r}):(0,P.jsx)(E.Z,{onClick:r}),(0,P.jsx)("div",{className:"avatar",children:(0,P.jsx)(O.Z,{menu:{items:o},placement:"bottom",children:(0,P.jsx)("div",{className:"avatar_text",children:"guest"===a?"\u300c\u8bbf\u5ba2\u767b\u5f55\u300d":(0,P.jsxs)("span",{children:["\u300c",a,"\u300d"]})})})})]})}))),w=t(691),B=t.n(w),_=(t(6598),(0,i.lazy)((function(){return t.e(944).then(t.bind(t,8944))}))),H=(0,i.lazy)((function(){return t.e(808).then(t.bind(t,7808))})),D=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(659),t.e(585),t.e(721),t.e(6),t.e(454),t.e(41)]).then(t.bind(t,41))})),I=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(6),t.e(683)]).then(t.bind(t,6683))})),K=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(94)]).then(t.bind(t,5094))})),M=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(823)]).then(t.bind(t,2823))})),$=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(215)]).then(t.bind(t,5215))})),T=(0,i.lazy)((function(){return Promise.all([t.e(615),t.e(529),t.e(92),t.e(769),t.e(384)]).then(t.bind(t,3569))})),U=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(659),t.e(585),t.e(642)]).then(t.bind(t,9642))})),V=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(257)]).then(t.bind(t,9257))})),q=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(721),t.e(819)]).then(t.bind(t,4819))})),F=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(743),t.e(529),t.e(92),t.e(769),t.e(90),t.e(677)]).then(t.bind(t,677))})),G=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(743),t.e(529),t.e(92),t.e(769),t.e(90),t.e(67)]).then(t.bind(t,3067))})),J=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(454),t.e(421)]).then(t.bind(t,9421))})),Q=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(721),t.e(725)]).then(t.bind(t,3725))})),X=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(92),t.e(669)]).then(t.bind(t,669))})),Y=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(721),t.e(454),t.e(477)]).then(t.bind(t,6477))})),ee=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(243)]).then(t.bind(t,8243))})),ne=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(410)]).then(t.bind(t,410))})),te=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(721),t.e(852)]).then(t.bind(t,5852))})),ie=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(721),t.e(471)]).then(t.bind(t,1471))})),ae=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(743),t.e(721),t.e(6),t.e(426)]).then(t.bind(t,6426))})),se=(0,i.lazy)((function(){return Promise.all([t.e(861),t.e(615),t.e(659),t.e(585),t.e(834),t.e(47)]).then(t.bind(t,3823))})),re=s.Z.Content,oe=(0,u.$j)((function(e){return{isLoading:e.LoadingReducer.isLoading}}),(function(e){return{BlogActions:(0,d.DE)(m,e)}}))((function(e){return B().start(),B().done(),(0,P.jsxs)(s.Z,{children:[(0,P.jsx)(C,{}),(0,P.jsxs)(s.Z,{className:"site-layout",children:[(0,P.jsx)(R,{}),(0,P.jsx)(re,{className:"site-layout-background",style:{margin:"10px 10px",padding:10,userSelect:"none"},children:(0,P.jsx)(i.Suspense,{fallback:(0,P.jsx)("div",{}),children:(0,P.jsx)(r.Z,{size:"large",spinning:e.isLoading,children:(0,P.jsxs)(a.rs,{children:[(0,P.jsx)(a.AW,{path:"/admin/home",component:_}),(0,P.jsx)(a.AW,{path:"/admin/article/list",component:D}),(0,P.jsx)(a.AW,{path:"/admin/permission/list",component:I}),(0,P.jsx)(a.AW,{path:"/admin/permission/rule",component:K}),(0,P.jsx)(a.AW,{path:"/admin/article/category",component:M}),(0,P.jsx)(a.AW,{path:"/admin/article/tags",component:$}),(0,P.jsx)(a.AW,{path:"/admin/article/insert",component:F}),(0,P.jsx)(a.AW,{path:"/admin/article/update/:id",component:G}),(0,P.jsx)(a.AW,{path:"/admin/article/comment",component:U}),(0,P.jsx)(a.AW,{path:"/admin/about",component:T}),(0,P.jsx)(a.AW,{path:"/admin/permission/admin",component:V}),(0,P.jsx)(a.AW,{path:"/admin/user/list",component:q}),(0,P.jsx)(a.AW,{path:"/admin/message",component:J}),(0,P.jsx)(a.AW,{path:"/admin/friendly",component:Q}),(0,P.jsx)(a.AW,{path:"/admin/essay",component:X}),(0,P.jsx)(a.AW,{path:"/admin/reader",component:Y}),(0,P.jsx)(a.AW,{path:"/admin/affiche",component:ee}),(0,P.jsx)(a.AW,{path:"/admin/apothegm",component:ne}),(0,P.jsx)(a.AW,{path:"/admin/navigation/project",component:te}),(0,P.jsx)(a.AW,{path:"/admin/navigation/tools",component:ie}),(0,P.jsx)(a.AW,{path:"/admin/navigation/website",component:ae}),(0,P.jsx)(a.AW,{path:"/admin/navigation/category",component:se}),(0,P.jsx)(a.AW,{path:"*",component:H})]})})})})]})]})}))}}]);
//# sourceMappingURL=15.8b6421d4.chunk.js.map