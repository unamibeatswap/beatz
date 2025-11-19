(()=>{var e={};e.id=9394,e.ids=[9394],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},28278:e=>{"use strict";e.exports=import("@sanity/client")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},67082:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>d,serverHooks:()=>u,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>c});var a={};r.r(a),r.d(a,{GET:()=>p});var i=r(48106),n=r(48819),s=r(12050),o=r(4235);async function p(){try{let e="https://beatschain.app",t=[];try{let{client:e}=await Promise.all([r.e(6e3),r.e(7983)]).then(r.bind(r,17983));t=await e.fetch(`
        *[_type == "post"] | order(publishedAt desc)[0...10] {
          _id,
          title,
          slug,
          excerpt,
          publishedAt
        }
      `)}catch(e){t=[]}let a=[];try{let{TestDataManager:e}=await r.e(6015).then(r.bind(r,56015));a=e.getTestBeats().slice(0,10).map(e=>({id:e.id,title:e.title,description:e.description,createdAt:e.createdAt,audioUrl:e.audioUrl,genre:e.genre,producer:e.producerName}))}catch(e){a=[{id:"1",title:"Dark Trap Beat",description:"Hard hitting trap beat with dark melodies",createdAt:new Date,audioUrl:"https://example.com/beat1.mp3",genre:"Trap",producer:"BeatMaker SA"}]}let i=`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>BeatsChain - Latest Beats</title>
    <description>Discover the latest beats from talented producers on BeatsChain</description>
    <link>${e}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>BeatsChain</itunes:author>
    <itunes:category text="Music"/>
    <image>
      <url>${e}/api/og?title=${encodeURIComponent("BeatsChain")}</url>
      <title>BeatsChain</title>
      <link>${e}</link>
    </image>
    
    ${a.map(t=>`
    <item>
      <title>${t.title} - ${t.genre} Beat by ${t.producer}</title>
      <description>${t.description} | Genre: ${t.genre} | Producer: ${t.producer}</description>
      <link>${e}/marketplace?beat=${t.id}</link>
      <guid>beat-${t.id}</guid>
      <pubDate>${new Date(t.createdAt).toUTCString()}</pubDate>
      <category>${t.genre}</category>
      <author>${t.producer}</author>
      ${t.audioUrl&&"https://example.com/beat1.mp3"!==t.audioUrl?`<enclosure url="${t.audioUrl}" type="audio/mpeg"/>`:""}
      <content:encoded><![CDATA[
        <div>
          <p>${t.description}</p>
          <p>Genre: ${t.genre} | Producer: ${t.producer}</p>
          <p><a href="${e}/marketplace?beat=${t.id}">Listen on BeatsChain</a></p>
          <img src="${e}/api/og?title=${encodeURIComponent(t.title)}&type=beat" width="1200" height="630" alt="${t.title}" />
        </div>
      ]]></content:encoded>
    </item>
    `).join("")}
    
    ${t.map(t=>`
    <item>
      <title>${t.title}</title>
      <description>${t.excerpt||"Latest blog post from BeatsChain"}</description>
      <link>${e}/blog/${t.slug?.current||t.slug}</link>
      <guid>blog-${t._id}</guid>
      <pubDate>${new Date(t.publishedAt||Date.now()).toUTCString()}</pubDate>
      <category>Blog</category>
      <author>BeatsChain Team</author>
      <content:encoded><![CDATA[
        <div>
          <p>${t.excerpt||"Latest blog post from BeatsChain"}</p>
          <p><a href="${e}/blog/${t.slug?.current||t.slug}">Read on BeatsChain</a></p>
          <img src="${e}/api/og?title=${encodeURIComponent(t.title)}&type=blog" width="1200" height="630" alt="${t.title}" />
        </div>
      ]]></content:encoded>
    </item>
    `).join("")}
  </channel>
</rss>`;return new o.NextResponse(i,{headers:{"Content-Type":"application/rss+xml","Cache-Control":"public, max-age=3600"}})}catch(e){return o.NextResponse.json({error:"RSS generation failed"},{status:500})}}let d=new i.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/rss/route",pathname:"/api/rss",filename:"route",bundlePath:"app/api/rss/route"},resolvedPagePath:"/workspaces/beatz/beats/packages/app/src/app/api/rss/route.ts",nextConfigOutput:"standalone",userland:a}),{workAsyncStorage:l,workUnitAsyncStorage:c,serverHooks:u}=d;function g(){return(0,s.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:c})}},80408:()=>{},87032:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[2050,3744],()=>r(67082));module.exports=a})();