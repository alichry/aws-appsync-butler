"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2963],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),d=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(r),m=a,f=u["".concat(s,".").concat(m)]||u[m]||c[m]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var d=2;d<i;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2800:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return u}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],l={id:"SstLoader",title:"Class: SstLoader",sidebar_label:"SstLoader",sidebar_position:0,custom_edit_url:null},s=void 0,d={unversionedId:"api/classes/SstLoader",id:"api/classes/SstLoader",title:"Class: SstLoader",description:"Load resolvers into an SST AppSyncAPI construct.",source:"@site/docs/api/classes/SstLoader.md",sourceDirName:"api/classes",slug:"/api/classes/SstLoader",permalink:"/aws-appsync-butler/docs/api/classes/SstLoader",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"SstLoader",title:"Class: SstLoader",sidebar_label:"SstLoader",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Reader",permalink:"/aws-appsync-butler/docs/api/classes/Reader"},next:{title:"UndefinedVariableError",permalink:"/aws-appsync-butler/docs/api/classes/UndefinedVariableError"}},p=[{value:"Hierarchy",id:"hierarchy",children:[],level:2},{value:"Properties",id:"properties",children:[{value:"builder",id:"builder",children:[{value:"Inherited from",id:"inherited-from",children:[],level:4}],level:3},{value:"functions",id:"functions",children:[{value:"Inherited from",id:"inherited-from-1",children:[],level:4}],level:3}],level:2},{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[{value:"Parameters",id:"parameters",children:[],level:4},{value:"Inherited from",id:"inherited-from-2",children:[],level:4}],level:3}],level:2},{value:"Methods",id:"methods",children:[{value:"load",id:"load",children:[{value:"Returns",id:"returns",children:[],level:4},{value:"Inherited from",id:"inherited-from-3",children:[],level:4}],level:3}],level:2}],c={toc:p};function u(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Load resolvers into an SST AppSyncAPI construct."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { SstLoader } from 'aws-appsync-butler';\nimport { Table, AppSyncApi } from '@serverless-stack/resources';\n\nconst table = new Table(...);\n\nconst api = new AppSyncApi(myStack, \"api\", {\n  dataSources: { myTable: { table } }\n});\n\nconst loader = new SstLoader(myStack, {\n  api,\n  defaultUnitResolverDataSource: 'myTable',\n  defaultFunctionDataSource: 'none',\n  variables: {\n    tableName: table.dynamodbTable.tableName\n  }\n})\n")),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"Loader"),"<",(0,i.kt)("a",{parentName:"p",href:"../interfaces/SstLoaderOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"SstLoaderOptions")),">"),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"SstLoader"))))),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"builder"},"builder"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"builder"),": ",(0,i.kt)("a",{parentName:"p",href:"Builder"},(0,i.kt)("inlineCode",{parentName:"a"},"Builder"))),(0,i.kt)("p",null,"The underlying builder instance that is responsible for building the resolver\ntree and function dictionary."),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,"Loader.builder"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"functions"},"functions"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"functions"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"AppsyncFunction"),">"," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("p",null,"The created Appsync Functions. Only populated after loading."),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,"Loader.functions"),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new SstLoader"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"scope")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Construct")),(0,i.kt)("td",{parentName:"tr",align:"left"},"A CDK construct. Usually, it is the stack instance.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../interfaces/SstLoaderOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"SstLoaderOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Loading, parsing, or reading directives.")))),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,"Loader<SstLoaderOptions",">",".constructor"),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"load"},"load"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"load"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Load on-disk resolvers and functions into AppSync."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,"Loader.load"))}u.isMDXComponent=!0}}]);