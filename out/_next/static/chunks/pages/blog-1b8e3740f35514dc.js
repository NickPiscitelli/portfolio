(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9195],{3986:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return r(6531)}])},6253:function(e,t,r){"use strict";r.d(t,{w:function(){return h}});var s=r(5893);let a=()=>(0,s.jsx)("svg",{version:"1.2",baseProfile:"tiny",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 2350 2314.8",fill:"white",children:(0,s.jsx)("path",{d:"M1175,0C525.8,0,0,525.8,0,1175c0,552.2,378.9,1010.5,890.1,1139.7c-5.9-14.7-8.8-35.3-8.8-55.8v-199.8H734.4 c-79.3,0-152.8-35.2-185.1-99.9c-38.2-70.5-44.1-179.2-141-246.8c-29.4-23.5-5.9-47,26.4-44.1c61.7,17.6,111.6,58.8,158.6,120.4 c47,61.7,67.6,76.4,155.7,76.4c41.1,0,105.7-2.9,164.5-11.8c32.3-82.3,88.1-155.7,155.7-190.9c-393.6-47-581.6-240.9-581.6-505.3 c0-114.6,49.9-223.3,132.2-317.3c-26.4-91.1-61.7-279.1,11.8-352.5c176.3,0,282,114.6,308.4,143.9c88.1-29.4,185.1-47,284.9-47 c102.8,0,196.8,17.6,284.9,47c26.4-29.4,132.2-143.9,308.4-143.9c70.5,70.5,38.2,261.4,8.8,352.5c82.3,91.1,129.3,202.7,129.3,317.3 c0,264.4-185.1,458.3-575.7,499.4c108.7,55.8,185.1,214.4,185.1,331.9V2256c0,8.8-2.9,17.6-2.9,26.4 C2021,2123.8,2350,1689.1,2350,1175C2350,525.8,1824.2,0,1175,0L1175,0z"})});var i=r(9252);let n=(e,t)=>e&&t&&Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every(r=>t.hasOwnProperty(r)&&e[r]===t[r]),l=e=>i[e],c=["a11yLight","anOldHope","androidstudio","arta","atomOneDark","atomOneLight","codepen","dracula","far","github","googlecode","hopscotch","hybrid","irBlack","monoBlue","monokaiSublime","monokai","nord","noctisViola","obsidian","ocean","paraisoDark","paraisoLight","pojoaque","purebasic","railscast","rainbow","shadesOfPurple","solarizedDark","solarizedLight","sunburst","tomorrowNightBlue","tomorrowNightBright","tomorrowNightEighties","tomorrowNight","tomorrow","vs2015","xt256","zenburn"],o=e=>{let{themeSwitcher:t,userTheme:r}=e;return(0,s.jsx)("div",{className:"pl-2 pr-2 ml-4 py-2 rounded font-sm bg-dracula",children:(0,s.jsx)("select",{onChange:e=>{t(i[e.target.value])},className:"text-white bg-dracula ml-2",children:c.map((e,t)=>(0,s.jsx)("option",{selected:n(l(e),r),children:e},t))})})},d=()=>(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M4 17L10 11L4 5M12 19H20",stroke:"#ffffff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),h=e=>{let{themeSwitcher:t,userTheme:r}=e;return(0,s.jsxs)("nav",{id:"main-nav",className:"flex flex-wrap md:flex-nowrap shadow border-dracula-light border-b justify-between bg-dracula-dark py-3 px-6",children:[(0,s.jsxs)("div",{className:"flex mb-2 md:mb-0 self-center",children:[(0,s.jsx)("div",{className:"w-[25px] h-[25px] relative top-[2px]",children:(0,s.jsx)(d,{})}),(0,s.jsx)("div",{className:"text-xl text-white font-bold align-middle self-center pl-2"})]}),(0,s.jsxs)("div",{className:"flex",children:[(0,s.jsx)("a",{href:"https://github.com/NickPiscitelli",className:"w-[25px] self-center icon github",children:(0,s.jsx)(a,{})}),(0,s.jsx)(o,{themeSwitcher:t,userTheme:r})]})]})}},9407:function(e,t,r){"use strict";r.d(t,{m:function(){return n}});var s=r(5893),a=r(2096),i=r(9252);let n=e=>{let{userTheme:t,panels:r}=e;return(0,s.jsx)(a.O.Panels,{className:"tabbed-code-pane scrollbar-hide",children:r.map((e,r)=>(0,s.jsx)(a.O.Panel,{className:"".concat("Introduction.tsx"===e.title&&"lg:hidden"," text-sm h-[80vh]"),children:(0,s.jsx)(i.CodeBlock,{customStyle:{wordBreak:"break-word",whiteSpace:"pre-wrap",paddingTop:5,paddingRight:26,borderRadius:0,zIndex:10},text:function(e){let t=e.split("\n");return t.length<50&&(e+="\n".repeat(50-t.length)),e}(e.body),theme:t,language:e.title.split(/\./)[1],showLineNumbers:!0,wrapLines:!0})},r))})}},7420:function(e,t,r){"use strict";r.d(t,{a:function(){return n}});var s=r(5893),a=r(2096),i=r(7294);let n=e=>{let{tabs:t,setTab:r}=e;return(0,s.jsx)(a.O.List,{className:"relative z-20 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.3)] flex overflow-x-auto scrollbar-hide",children:t.map((e,n)=>(0,s.jsx)(a.O,{as:i.Fragment,children:a=>{let{selected:i}=a;return(0,s.jsxs)("div",{onClick:()=>{e.active=!0,r([...t])},"data-tab":e.title,className:"".concat("Introduction.tsx"===e.title&&"lg:hidden"," outline-none text-left relative pl-8 py-3 grow min-w-[200px] border-r border-dracula-light text-xs bg-dracula text-white"),children:[e.title,i&&(0,s.jsx)("i",{className:"rounded-xl bg-slate-100 w-[8px] h-[8px] align-right top-4 absolute right-4 block",children:"\xa0"})]})}},n))})}},6531:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return d},default:function(){return h}});var s=r(5893),a=r(6253),i=r(2096),n=r(9252),l=r(7294),c=r(7420),o=r(9407),d=!0;function h(e){let{blogs:t}=e,[r,d]=(0,l.useState)(t),[h,u]=(0,l.useState)(n.dracula),x=e=>{for(let s of r)s.active=s.title===e.title;d([...t])};return(0,s.jsxs)("main",{children:[(0,s.jsx)(a.w,{themeSwitcher:u,userTheme:h}),(0,s.jsx)("section",{className:"code cf flex",children:(0,s.jsx)("div",{className:"w-screen shadow-[-7px_0px_10px_1px_rgba(0,0,0,0.3)]",children:(0,s.jsxs)(i.O.Group,{children:[(0,s.jsx)(c.a,{setTab:x,tabs:r}),(0,s.jsx)(o.m,{userTheme:h,panels:r})]})})})]})}}},function(e){e.O(0,[7727,9774,2888,179],function(){return e(e.s=3986)}),_N_E=e.O()}]);