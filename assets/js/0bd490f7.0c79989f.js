"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7973],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=n.createContext({}),p=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(r),m=a,k=u["".concat(d,".").concat(m)]||u[m]||c[m]||i;return r?n.createElement(k,o(o({ref:t},s),{},{components:r})):n.createElement(k,o({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2774:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return s},default:function(){return u}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],l={id:"CdkLoader",title:"Class: CdkLoader",sidebar_label:"CdkLoader",sidebar_position:0,custom_edit_url:null},d=void 0,p={unversionedId:"api/classes/CdkLoader",id:"api/classes/CdkLoader",title:"Class: CdkLoader",description:"Load resolvers into an AppSync GraphQL API construct.",source:"@site/docs/api/classes/CdkLoader.md",sourceDirName:"api/classes",slug:"/api/classes/CdkLoader",permalink:"/aws-appsync-butler/docs/api/classes/CdkLoader",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"CdkLoader",title:"Class: CdkLoader",sidebar_label:"CdkLoader",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Builder",permalink:"/aws-appsync-butler/docs/api/classes/Builder"},next:{title:"DataSourceNotFoundError",permalink:"/aws-appsync-butler/docs/api/classes/DataSourceNotFoundError"}},s=[{value:"Hierarchy",id:"hierarchy",children:[],level:2},{value:"Properties",id:"properties",children:[{value:"builder",id:"builder",children:[{value:"Inherited from",id:"inherited-from",children:[],level:4}],level:3},{value:"functions",id:"functions",children:[{value:"Inherited from",id:"inherited-from-1",children:[],level:4}],level:3}],level:2},{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[{value:"Parameters",id:"parameters",children:[],level:4},{value:"Inherited from",id:"inherited-from-2",children:[],level:4}],level:3}],level:2},{value:"Methods",id:"methods",children:[{value:"load",id:"load",children:[{value:"Returns",id:"returns",children:[],level:4},{value:"Inherited from",id:"inherited-from-3",children:[],level:4}],level:3}],level:2}],c={toc:s};function u(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Load resolvers into an AppSync GraphQL API construct."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { CdkLoader } from 'aws-appsync-butler';\nimport { GraphqlApi } from '@aws-cdk/aws-appsync';\nimport { Table } from '@aws-cdk/aws-dynamodb';\n\nconst graphqlApi = new GraphqlApi(...);\nconst table = new Table(...);\n\nconst loader = new CdkLoader(appStack, {\n  api: graphqlApi,\n  defaultUnitResolverDataSource: table,\n  defaultFunctionDataSource: 'none',\n  variables: {\n    tableName: table.tableName\n  }\n});\nloader.load();\n")),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"Loader"),"<",(0,i.kt)("a",{parentName:"p",href:"../interfaces/CdkLoaderOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"CdkLoaderOptions")),">"),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"CdkLoader"))))),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"builder"},"builder"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"builder"),": ",(0,i.kt)("a",{parentName:"p",href:"Builder"},(0,i.kt)("inlineCode",{parentName:"a"},"Builder"))),(0,i.kt)("p",null,"The underlying builder instance that is responsible for building the resolver\ntree and function dictionary."),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,"Loader.builder"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"functions"},"functions"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"functions"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"AppsyncFunction"),">"," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("p",null,"The created Appsync Functions. Only populated after loading."),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,"Loader.functions"),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new CdkLoader"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"scope")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Construct")),(0,i.kt)("td",{parentName:"tr",align:"left"},"A CDK construct. Usually, it is the stack instance.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../interfaces/CdkLoaderOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"CdkLoaderOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Loading, parsing, or reading directives.")))),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,"Loader<CdkLoaderOptions",">",".constructor"),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"load"},"load"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"load"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Load on-disk resolvers and functions into AppSync."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,"Loader.load"))}u.isMDXComponent=!0}}]);