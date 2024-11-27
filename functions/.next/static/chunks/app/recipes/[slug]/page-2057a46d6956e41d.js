(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{1969:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,4839,23)),Promise.resolve().then(r.bind(r,9132)),Promise.resolve().then(r.bind(r,5535))},9132:(e,t,r)=>{"use strict";r.d(t,{default:()=>l});var s=r(5155),a=r(2115),i=r(6046);function l(e){let{slug:t}=e,[r,l]=(0,a.useState)(!1),n=(0,i.useRouter)(),o=async()=>{if(confirm("Are you sure you want to delete this recipe?")){l(!0);try{(await fetch("/api/recipes/".concat(t),{method:"DELETE"})).ok?(n.push("/"),n.refresh()):alert("Failed to delete recipe. Please try again.")}catch(e){console.error("Error deleting recipe:",e),alert("An error occurred. Please try again.")}finally{l(!1)}}};return(0,s.jsx)("button",{onClick:o,disabled:r,className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50",children:r?"Deleting...":"Delete Recipe"})}},5535:(e,t,r)=>{"use strict";r.d(t,{default:()=>l});var s=r(5155),a=r(2115),i=r(6046);function l(e){let{recipe:t,slug:r}=e,[l,n]=(0,a.useState)(t.title),[o,d]=(0,a.useState)(t.ingredients.join("\n")),[c,u]=(0,a.useState)(t.directions),[h,p]=(0,a.useState)(!1),[b,x]=(0,a.useState)(""),g=(0,i.useRouter)(),m=async e=>{e.preventDefault(),x("");try{let e=await fetch("/api/recipes/".concat(r),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:l,ingredients:o.split("\n"),directions:c})});if(e.ok)p(!1),g.refresh();else{let t=await e.json();x(t.error||"Failed to update recipe. Please try again.")}}catch(e){console.error("Error updating recipe:",e),x("An error occurred. Please try again.")}};return h?(0,s.jsxs)("form",{onSubmit:m,className:"space-y-4 mt-8",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold",children:"Edit Recipe"}),b&&(0,s.jsx)("div",{className:"text-red-500",children:b}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"title",className:"block mb-1",children:"Title:"}),(0,s.jsx)("input",{type:"text",id:"title",value:l,onChange:e=>n(e.target.value),required:!0,className:"w-full p-2 border rounded"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"ingredients",className:"block mb-1",children:"Ingredients (one per line):"}),(0,s.jsx)("textarea",{id:"ingredients",value:o,onChange:e=>d(e.target.value),required:!0,className:"w-full p-2 border rounded",rows:5})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"directions",className:"block mb-1",children:"Directions:"}),(0,s.jsx)("textarea",{id:"directions",value:c,onChange:e=>u(e.target.value),required:!0,className:"w-full p-2 border rounded",rows:5})]}),(0,s.jsxs)("div",{className:"flex space-x-4",children:[(0,s.jsx)("button",{type:"submit",className:"bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600",children:"Update Recipe"}),(0,s.jsx)("button",{type:"button",onClick:()=>p(!1),className:"bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400",children:"Cancel"})]})]}):(0,s.jsx)("button",{onClick:()=>p(!0),className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",children:"Edit Recipe"})}}},e=>{var t=t=>e(e.s=t);e.O(0,[598,441,517,358],()=>t(1969)),_N_E=e.O()}]);