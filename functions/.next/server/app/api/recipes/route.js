(()=>{var e={};e.id=195,e.ids=[195],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},5511:e=>{"use strict";e.exports=require("crypto")},4985:e=>{"use strict";e.exports=require("dns")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},3496:e=>{"use strict";e.exports=require("http2")},1645:e=>{"use strict";e.exports=require("net")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},9771:e=>{"use strict";e.exports=require("process")},7910:e=>{"use strict";e.exports=require("stream")},4631:e=>{"use strict";e.exports=require("tls")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},6288:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>w,routeModule:()=>d,serverHooks:()=>x,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>g});var s={};t.r(s),t.d(s,{GET:()=>u,POST:()=>p});var i=t(2706),o=t(8203),a=t(5994),n=t(9187),c=t(749);async function u(){try{let e=await (0,c.qt)();return n.NextResponse.json(e)}catch(e){return console.error("Error fetching recipes:",e),n.NextResponse.json({error:"Failed to fetch recipes"},{status:500})}}async function p(e){try{let r=await e.json(),t=await (0,c.YM)(r);return n.NextResponse.json(t,{status:201})}catch(e){return console.error("Error adding recipe:",e),n.NextResponse.json({error:"Failed to add recipe"},{status:500})}}let d=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/recipes/route",pathname:"/api/recipes",filename:"route",bundlePath:"app/api/recipes/route"},resolvedPagePath:"/Users/mgragg/Desktop/__WorkingFiles/woj-recipes/src/app/api/recipes/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:g,serverHooks:x}=d;function w(){return(0,a.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:g})}},6487:()=>{},8335:()=>{},749:(e,r,t)=>{"use strict";t.d(r,{YM:()=>p,cX:()=>l,hA:()=>g,qt:()=>u,sw:()=>d});var s=t(2618),i=t(1982);let o=(0,s.Wp)({apiKey:"AIzaSyAyGEztaV9AX8h2peg4snLSPa2GUPIEfco",authDomain:"wojtowicz-recipes.firebaseapp.com",projectId:"wojtowicz-recipes",storageBucket:"wojtowicz-recipes.firebasestorage.app",messagingSenderId:"y854644120710",appId:"1:854644120710:web:e1fb6c38c58c48ec268507"}),a=(0,i.aU)(o);function n(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"")}function c(e){return e.map(e=>e.toLowerCase().trim())}async function u(){let e=(0,i.rJ)(a,"recipes");return(await (0,i.GG)(e)).docs.map(e=>({id:e.id,...e.data()}))}async function p(e){let r=n(e.title),t=c(e.tags),s={...e,slug:r,tags:t};return{id:(await (0,i.gS)((0,i.rJ)(a,"recipes"),s)).id,...s}}async function d(e,r){let t=(0,i.H9)(a,"recipes",e),s=c(r.tags),o={...r,tags:s};return await (0,i.mZ)(t,o),{id:e,...o,slug:n(r.title)}}async function l(e){try{return await (0,i.kd)((0,i.H9)(a,"recipes",e)),!0}catch(r){return console.error(`Error deleting recipe: ${e}`,r),!1}}async function g(e){let r=(0,i.rJ)(a,"recipes"),t=(0,i.P)(r,(0,i._M)("slug","==",e)),s=await (0,i.GG)(t);if(s.empty)return null;let o=s.docs[0],n=o.data();return{id:o.id,slug:n.slug||"",title:n.title||"",ingredients:Array.isArray(n.ingredients)?n.ingredients:[],directions:n.directions||"",tags:Array.isArray(n.tags)?n.tags:[]}}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[989,205,452],()=>t(6288));module.exports=s})();