"use strict";exports.id=7983,exports.ids=[7983],exports.modules={17983:(t,e,r)=>{r.a(t,async(t,n)=>{try{r.r(e),r.d(e,{client:()=>h,fetchSanity:()=>l,getNavigation:()=>y,getPageBySlug:()=>g,getSiteSettings:()=>o,urlFor:()=>s});var i=r(28278),a=r(86e3),c=r.n(a),u=t([i]);i=(u.then?(await u)():u)[0];let h=(0,i.createClient)({projectId:"i01qs9p6",dataset:"production",apiVersion:"2023-05-03",token:"skjFJmUQgJ1AirscHu0KYrF7D5v9ycvCaC94ql0oSKGmqmP4XTFQSTYE02reGAaE8MjAEFWO0ULyzMMMdZVsru3DxUZu7NVaarTpbuArReIpwYAHui66uYPOrNi7ZU26t7dVReebx0OfiHHz3HSMGLHMCviGo2zkcd1Ob5xLRqcNcLdofcXy",useCdn:!0}),d=c()(h);function s(t){return d.image(t)}async function l(t,e={}){try{return await h.fetch(t,e)}catch(t){return null}}async function o(){try{return await h.fetch('*[_type == "siteSettings"][0]')}catch(t){return null}}async function y(t=!0){try{return await h.fetch(`
      *[_type == "navigation" && isMain == ${t}][0] {
        items[] {
          label,
          link,
          isExternal,
          requiresAuth,
          icon,
          children[] {
            label,
            link,
            isExternal,
            requiresAuth
          }
        }
      }
    `)}catch(t){return{items:[]}}}async function g(t){try{return await h.fetch(`
      *[_type == "page" && slug.current == $slug][0]
    `,{slug:t})}catch(t){return null}}n()}catch(t){n(t)}})}};