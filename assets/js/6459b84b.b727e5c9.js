"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7868],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(n),f=a,m=d["".concat(u,".").concat(f)]||d[f]||p[f]||l;return n?r.createElement(m,o(o({ref:t},c),{},{components:n})):r.createElement(m,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8215:function(e,t,n){var r=n(7294);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},6396:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(7462),a=n(7294),l=n(2389),o=n(9443);var i=function(){var e=(0,a.useContext)(o.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},u=n(3616),s=n(6010),c="tabItem_vU9c";function p(e){var t,n,r,l=e.lazy,o=e.block,p=e.defaultValue,d=e.values,f=e.groupId,m=e.className,v=a.Children.map(e.children,(function(e){if((0,a.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),b=null!=d?d:v.map((function(e){var t=e.props;return{value:t.value,label:t.label}})),y=(0,u.lx)(b,(function(e,t){return e.value===t.value}));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var h=null===p?p:null!=(t=null!=p?p:null==(n=v.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(r=v[0])?void 0:r.props.value;if(null!==h&&!b.some((function(e){return e.value===h})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+h+'" but none of its children has the corresponding value. Available values are: '+b.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var g=i(),w=g.tabGroupChoices,k=g.setTabGroupChoices,T=(0,a.useState)(h),O=T[0],S=T[1],E=[],x=(0,u.o5)().blockElementScrollPositionUntilNextRender;if(null!=f){var C=w[f];null!=C&&C!==O&&b.some((function(e){return e.value===C}))&&S(C)}var N=function(e){var t=e.currentTarget,n=E.indexOf(t),r=b[n].value;r!==O&&(x(t),S(r),null!=f&&k(f,r))},D=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=E.indexOf(e.currentTarget)+1;n=E[r]||E[0];break;case"ArrowLeft":var a=E.indexOf(e.currentTarget)-1;n=E[a]||E[E.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":o},m)},b.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:O===t?0:-1,"aria-selected":O===t,className:(0,s.Z)("tabs__item",c,{"tabs__item--active":O===t}),key:t,ref:function(e){return E.push(e)},onKeyDown:D,onFocus:N,onClick:N},null!=n?n:t)}))),l?(0,a.cloneElement)(v.filter((function(e){return e.props.value===O}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},v.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==O})}))))}function d(e){var t=(0,l.Z)();return a.createElement(p,(0,r.Z)({key:String(t)},e))}},2424:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var r=n(7462),a=n(3366),l=(n(7294),n(3905)),o=n(6396),i=n(8215),u=["components"],s={sidebar_position:1},c="Installation",p={unversionedId:"getting-started/installation",id:"getting-started/installation",title:"Installation",description:"AWS AppSync Butler should be installed in your CDK or SST application.",source:"@site/docs/getting-started/installation.mdx",sourceDirName:"getting-started",slug:"/getting-started/installation",permalink:"/aws-appsync-butler/docs/getting-started/installation",editUrl:"https://github.com/alichry/aws-appsync-butler/edit/master/website/docs/getting-started/installation.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/aws-appsync-butler/docs/intro"},next:{title:"Setup the VTL directory",permalink:"/aws-appsync-butler/docs/getting-started/setup-vtl-directory"}},d=[{value:"Create a new CDK or SST application",id:"create-a-new-cdk-or-sst-application",children:[],level:2},{value:"Install dependencies",id:"install-dependencies",children:[],level:2}],f={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,u);return(0,l.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"installation"},"Installation"),(0,l.kt)("p",null,"AWS AppSync Butler should be installed in your CDK or SST application."),(0,l.kt)("h2",{id:"create-a-new-cdk-or-sst-application"},"Create a new CDK or SST application"),(0,l.kt)("p",null,"If you have an existing CDK or SST application setup, go to ",(0,l.kt)("a",{parentName:"p",href:"#install-dependencies"},"Install dependencies"),"."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Getting started with ",(0,l.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html"},"AWS Cloud Development Kit")),(0,l.kt)("li",{parentName:"ul"},"Getting started with ",(0,l.kt)("a",{parentName:"li",href:"https://docs.serverless-stack.com/installation"},"Serverless Stack Toolkit"))),(0,l.kt)("h2",{id:"install-dependencies"},"Install dependencies"),(0,l.kt)("p",null,"Open a terminal in your CDK or SST project and install the required dependencies."),(0,l.kt)(o.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"Serverless Stack Toolkit",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"# Using npm:\nnpm install aws-appsync-butler\n# Using Yarn:\nyarn add aws-appsync-butler\n"))),(0,l.kt)(i.Z,{value:"AWS Cloud Development Kit",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"# Using npm:\nnpm install aws-appsync-butler @aws-cdk/aws-appsync\n# Using Yarn:\nyarn add aws-appsync-butler @aws-cdk/aws-appsync\n")))))}m.isMDXComponent=!0}}]);