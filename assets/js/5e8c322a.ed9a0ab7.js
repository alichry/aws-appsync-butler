"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7597],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return c}});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),s=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=s(a),c=n,u=m["".concat(p,".").concat(c)]||m[c]||k[c]||l;return a?r.createElement(u,i(i({ref:t},d),{},{components:a})):r.createElement(u,i({ref:t},d))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,i=new Array(l);i[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var s=2;s<l;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7926:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return d},default:function(){return m}});var r=a(7462),n=a(3366),l=(a(7294),a(3905)),i=["components"],o={id:"index",title:"aws-appsync-butler",slug:"/api/",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null},p=void 0,s={unversionedId:"api/index",id:"api/index",title:"aws-appsync-butler",description:"Service Classes",source:"@site/docs/api/index.md",sourceDirName:"api",slug:"/api/",permalink:"/aws-appsync-butler/docs/api/",editUrl:null,tags:[],version:"current",sidebarPosition:.5,frontMatter:{id:"index",title:"aws-appsync-butler",slug:"/api/",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Congratulations!",permalink:"/aws-appsync-butler/docs/getting-started/congratulations"},next:{title:"ResolverType",permalink:"/aws-appsync-butler/docs/api/enums/ResolverType"}},d=[{value:"Service Classes",id:"service-classes",children:[],level:2},{value:"Error Classes",id:"error-classes",children:[],level:2},{value:"Interfaces",id:"interfaces",children:[],level:2},{value:"Enumerations",id:"enumerations",children:[],level:2},{value:"Type aliases",id:"type-aliases",children:[{value:"DataSource",id:"datasource",children:[],level:3},{value:"LoaderOptions",id:"loaderoptions",children:[],level:3},{value:"ParsedResolverInfo",id:"parsedresolverinfo",children:[],level:3},{value:"ResolverInfo",id:"resolverinfo",children:[],level:3}],level:2},{value:"Functions",id:"functions",children:[{value:"createLoader",id:"createloader",children:[{value:"Parameters",id:"parameters",children:[],level:4},{value:"Returns",id:"returns",children:[],level:4},{value:"Parameters",id:"parameters-1",children:[],level:4},{value:"Returns",id:"returns-1",children:[],level:4},{value:"Parameters",id:"parameters-2",children:[],level:4},{value:"Returns",id:"returns-2",children:[],level:4}],level:3},{value:"getGraphqlFiles",id:"getgraphqlfiles",children:[{value:"Parameters",id:"parameters-3",children:[],level:4},{value:"Returns",id:"returns-3",children:[],level:4}],level:3}],level:2}],k={toc:d};function m(e){var t=e.components,a=(0,n.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},k,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"service-classes"},"Service Classes"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/Builder"},"Builder")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/CdkLoader"},"CdkLoader")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/SstLoader"},"SstLoader")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/Parser"},"Parser")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/Reader"},"Reader"))),(0,l.kt)("h2",{id:"error-classes"},"Error Classes"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/ValidationError"},"ValidationError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/DataSourceTypeMismatchError"},"DataSourceTypeMismatchError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/DataSourceNotFoundError"},"DataSourceNotFoundError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/FunctionNotFoundError"},"FunctionNotFoundError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/PipelineValidationError"},"PipelineValidationError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/UndefinedVariableError"},"UndefinedVariableError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/InvalidDirectiveError"},"InvalidDirectiveError")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"classes/DirectoryValidationError"},"DirectoryValidationError"))),(0,l.kt)("h2",{id:"interfaces"},"Interfaces"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ResolverTree"},"ResolverTree")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/SstLoaderOptions"},"SstLoaderOptions")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/CdkLoaderOptions"},"CdkLoaderOptions")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ParsedVtlFile"},"ParsedVtlFile")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ParsedVtlRequest"},"ParsedVtlRequest")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ParsedUnitResolverInfo"},"ParsedUnitResolverInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ParsedPipelineResolverInfo"},"ParsedPipelineResolverInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ParsedFunctionInfo"},"ParsedFunctionInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ParserOptions"},"ParserOptions")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/FileInfo"},"FileInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/UnitResolverInfo"},"UnitResolverInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/PipelineResolverInfo"},"PipelineResolverInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/FunctionInfo"},"FunctionInfo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/UnitDirectoryStructure"},"UnitDirectoryStructure")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/PipelineDirectoryStructure"},"PipelineDirectoryStructure")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/DirectoryStructure"},"DirectoryStructure")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"interfaces/ReaderOptions"},"ReaderOptions"))),(0,l.kt)("h2",{id:"enumerations"},"Enumerations"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"enums/ResolverType"},"ResolverType"))),(0,l.kt)("h2",{id:"type-aliases"},"Type aliases"),(0,l.kt)("h3",{id:"datasource"},"DataSource"),(0,l.kt)("p",null,"\u01ac ",(0,l.kt)("strong",{parentName:"p"},"DataSource"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"BaseDataSource")," ","|"," ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"loaderoptions"},"LoaderOptions"),(0,l.kt)("p",null,"\u01ac ",(0,l.kt)("strong",{parentName:"p"},"LoaderOptions"),": ",(0,l.kt)("a",{parentName:"p",href:"interfaces/SstLoaderOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoaderOptions"))," ","|"," ",(0,l.kt)("a",{parentName:"p",href:"interfaces/CdkLoaderOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoaderOptions"))),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"parsedresolverinfo"},"ParsedResolverInfo"),(0,l.kt)("p",null,"\u01ac ",(0,l.kt)("strong",{parentName:"p"},"ParsedResolverInfo"),": ",(0,l.kt)("a",{parentName:"p",href:"interfaces/ParsedUnitResolverInfo"},(0,l.kt)("inlineCode",{parentName:"a"},"ParsedUnitResolverInfo"))," ","|"," ",(0,l.kt)("a",{parentName:"p",href:"interfaces/ParsedPipelineResolverInfo"},(0,l.kt)("inlineCode",{parentName:"a"},"ParsedPipelineResolverInfo"))),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"resolverinfo"},"ResolverInfo"),(0,l.kt)("p",null,"\u01ac ",(0,l.kt)("strong",{parentName:"p"},"ResolverInfo"),": ",(0,l.kt)("a",{parentName:"p",href:"interfaces/UnitResolverInfo"},(0,l.kt)("inlineCode",{parentName:"a"},"UnitResolverInfo"))," ","|"," ",(0,l.kt)("a",{parentName:"p",href:"interfaces/PipelineResolverInfo"},(0,l.kt)("inlineCode",{parentName:"a"},"PipelineResolverInfo"))),(0,l.kt)("h2",{id:"functions"},"Functions"),(0,l.kt)("h3",{id:"createloader"},"createLoader"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"createLoader"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"options"),"): ",(0,l.kt)("a",{parentName:"p",href:"classes/CdkLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoader"))),(0,l.kt)("p",null,"Instantialize a CDK Loader instance"),(0,l.kt)("h4",{id:"parameters"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"scope")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"Construct")),(0,l.kt)("td",{parentName:"tr",align:"left"},"CDK Stack")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"options")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("a",{parentName:"td",href:"interfaces/CdkLoaderOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoaderOptions"))),(0,l.kt)("td",{parentName:"tr",align:"left"},"CDK Loader options")))),(0,l.kt)("h4",{id:"returns"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"classes/CdkLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoader"))),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"createLoader"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"options"),"): ",(0,l.kt)("a",{parentName:"p",href:"classes/SstLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoader"))),(0,l.kt)("p",null,"Instantialize an SST Loader instance"),(0,l.kt)("h4",{id:"parameters-1"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"scope")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"Construct")),(0,l.kt)("td",{parentName:"tr",align:"left"},"SST Stack")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"options")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("a",{parentName:"td",href:"interfaces/SstLoaderOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoaderOptions"))),(0,l.kt)("td",{parentName:"tr",align:"left"},"SST Loader options")))),(0,l.kt)("h4",{id:"returns-1"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"classes/SstLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoader"))),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"createLoader"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"options"),"): ",(0,l.kt)("a",{parentName:"p",href:"classes/CdkLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoader"))," ","|"," ",(0,l.kt)("a",{parentName:"p",href:"classes/SstLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoader"))),(0,l.kt)("p",null,"Instantialize a CDK or SST Loader instance"),(0,l.kt)("h4",{id:"parameters-2"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"scope")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"Construct")),(0,l.kt)("td",{parentName:"tr",align:"left"},"Stack")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"options")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("a",{parentName:"td",href:"interfaces/SstLoaderOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoaderOptions"))," ","|"," ",(0,l.kt)("a",{parentName:"td",href:"interfaces/CdkLoaderOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoaderOptions"))),(0,l.kt)("td",{parentName:"tr",align:"left"},"CDK or SST Loader options")))),(0,l.kt)("h4",{id:"returns-2"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"classes/CdkLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"CdkLoader"))," ","|"," ",(0,l.kt)("a",{parentName:"p",href:"classes/SstLoader"},(0,l.kt)("inlineCode",{parentName:"a"},"SstLoader"))),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"getgraphqlfiles"},"getGraphqlFiles"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,l.kt)("strong",{parentName:"p"},"getGraphqlFiles"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"directory"),"): ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,l.kt)("p",null,"Returns a list of *.graphql file paths in the specified directory"),(0,l.kt)("h4",{id:"parameters-3"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"directory")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"path to the directory containing .graphql files")))),(0,l.kt)("h4",{id:"returns-3"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,l.kt)("p",null,"An array of ",(0,l.kt)("em",{parentName:"p"},".graphql file paths in the form of ${directory}/"),".graphql"))}m.isMDXComponent=!0}}]);