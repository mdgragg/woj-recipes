(()=>{var e={};e.id=145,e.ids=[145],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},5511:e=>{"use strict";e.exports=require("crypto")},4985:e=>{"use strict";e.exports=require("dns")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},3496:e=>{"use strict";e.exports=require("http2")},1645:e=>{"use strict";e.exports=require("net")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},9771:e=>{"use strict";e.exports=require("process")},7910:e=>{"use strict";e.exports=require("stream")},4631:e=>{"use strict";e.exports=require("tls")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},8054:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>w,routeModule:()=>d,serverHooks:()=>f,workAsyncStorage:()=>g,workUnitAsyncStorage:()=>x});var s={};t.r(s),t.d(s,{DELETE:()=>l,GET:()=>p,PUT:()=>c});var i=t(2706),o=t(8203),n=t(5994),a=t(9187),u=t(749);async function p(e){let r=e.nextUrl.pathname.split("/").pop();try{if(!r)return a.NextResponse.json({error:"Slug is required"},{status:400});let e=await (0,u.hA)(r);if(e)return a.NextResponse.json(e);return a.NextResponse.json({error:"Recipe not found"},{status:404})}catch(e){return console.error("Error fetching recipe:",e),a.NextResponse.json({error:"Failed to fetch recipe"},{status:500})}}async function c(e){let r=e.nextUrl.pathname.split("/").pop();try{if(!r)return a.NextResponse.json({error:"Slug is required"},{status:400});let t=await e.json(),s=await (0,u.hA)(r);if(!s)return a.NextResponse.json({error:"Recipe not found"},{status:404});let i=await (0,u.sw)(s.id,t);if(i)return a.NextResponse.json(i);return a.NextResponse.json({error:"Failed to update recipe"},{status:500})}catch(e){return console.error("Error updating recipe:",e),a.NextResponse.json({error:"Failed to update recipe"},{status:500})}}async function l(e){let r=e.nextUrl.pathname.split("/").pop();try{if(!r)return a.NextResponse.json({error:"Slug is required"},{status:400});let e=await (0,u.hA)(r);if(!e)return a.NextResponse.json({error:"Recipe not found"},{status:404});if(await (0,u.cX)(e.id))return a.NextResponse.json({message:"Recipe deleted successfully"});return a.NextResponse.json({error:"Failed to delete recipe"},{status:500})}catch(e){return console.error("Error deleting recipe:",e),a.NextResponse.json({error:"Failed to delete recipe"},{status:500})}}let d=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/recipes/[slug]/route",pathname:"/api/recipes/[slug]",filename:"route",bundlePath:"app/api/recipes/[slug]/route"},resolvedPagePath:"/Users/mgragg/Desktop/__WorkingFiles/woj-recipes/src/app/api/recipes/[slug]/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:g,workUnitAsyncStorage:x,serverHooks:f}=d;function w(){return(0,n.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:x})}},6487:()=>{},8335:()=>{},749:(e,r,t)=>{"use strict";t.d(r,{YM:()=>c,cX:()=>d,hA:()=>g,qt:()=>p,sw:()=>l});var s=t(2618),i=t(1982);let o=(0,s.Wp)({apiKey:"AIzaSyAyGEztaV9AX8h2peg4snLSPa2GUPIEfco",authDomain:"wojtowicz-recipes.firebaseapp.com",projectId:"wojtowicz-recipes",storageBucket:"wojtowicz-recipes.firebasestorage.app",messagingSenderId:"y854644120710",appId:"1:854644120710:web:e1fb6c38c58c48ec268507"}),n=(0,i.aU)(o);function a(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"")}function u(e){return e.map(e=>e.toLowerCase().trim())}async function p(){let e=(0,i.rJ)(n,"recipes");return(await (0,i.GG)(e)).docs.map(e=>({id:e.id,...e.data()}))}async function c(e){let r=a(e.title),t=u(e.tags),s={...e,slug:r,tags:t};return{id:(await (0,i.gS)((0,i.rJ)(n,"recipes"),s)).id,...s}}async function l(e,r){let t=(0,i.H9)(n,"recipes",e),s=u(r.tags),o={...r,tags:s};return await (0,i.mZ)(t,o),{id:e,...o,slug:a(r.title)}}async function d(e){try{return await (0,i.kd)((0,i.H9)(n,"recipes",e)),!0}catch(r){return console.error(`Error deleting recipe: ${e}`,r),!1}}async function g(e){let r=(0,i.rJ)(n,"recipes"),t=(0,i.P)(r,(0,i._M)("slug","==",e)),s=await (0,i.GG)(t);if(s.empty)return null;let o=s.docs[0],a=o.data();return{id:o.id,slug:a.slug||"",title:a.title||"",ingredients:Array.isArray(a.ingredients)?a.ingredients:[],directions:a.directions||"",tags:Array.isArray(a.tags)?a.tags:[]}}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[989,205,452],()=>t(8054));module.exports=s})();