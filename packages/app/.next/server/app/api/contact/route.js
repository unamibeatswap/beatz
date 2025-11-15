(()=>{var e={};e.id=8746,e.ids=[8746],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},15638:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>l,serverHooks:()=>u,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>c});var a={};r.r(a),r.d(a,{POST:()=>p});var o=r(48106),s=r(48819),n=r(12050),i=r(4235);async function p(e){try{let{name:t,email:r,walletAddress:a,subject:o,message:s,signature:n,messageHash:p,isWeb3Verified:l}=await e.json();if(!t||!r||!o||!s)return i.NextResponse.json({error:"Missing required fields"},{status:400});let d=l?"\uD83D\uDD10 Web3 Verified":"\uD83D\uDCE7 Standard",c={to:"info@unamifoundation.org",from:"noreply@beatschain.com",replyTo:r,subject:`${d} BeatsChain Contact: ${o}`,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid ${l?"#10b981":"#3b82f6"}; padding-bottom: 10px;">
            ${d} BeatsChain Contact
          </h2>
          
          ${l?`
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0; font-size: 16px;">🔐 Web3 Verified Message</h3>
            <p style="color: #166534; font-size: 14px; margin: 5px 0;">This message was cryptographically signed by the sender's wallet.</p>
            <p style="color: #166534; font-size: 12px; margin: 0; word-break: break-all;"><strong>Signature:</strong> ${n?.slice(0,20)}...${n?.slice(-10)}</p>
          </div>
          `:""}
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Name:</strong> ${t}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${r}">${r}</a></p>
            <p><strong>🔗 Wallet:</strong> ${a||"Not provided"}</p>
            <p><strong>📋 Subject:</strong> ${o}</p>
            ${l?"<p><strong>✅ Status:</strong> Web3 Verified with Wallet Signature</p>":""}
          </div>
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">💬 Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${s.replace(/\n/g,"<br>")}</p>
          </div>
          
          ${n?`
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h4 style="color: #374151; margin-top: 0; font-size: 14px;">🔐 Cryptographic Verification</h4>
            <p style="font-size: 12px; color: #6b7280; margin: 5px 0;"><strong>Message Hash:</strong></p>
            <pre style="font-size: 10px; color: #4b5563; background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-wrap: break-word; white-space: pre-wrap;">${p}</pre>
            <p style="font-size: 12px; color: #6b7280; margin: 5px 0;"><strong>Wallet Signature:</strong></p>
            <pre style="font-size: 10px; color: #4b5563; background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-wrap: break-word; white-space: pre-wrap;">${n}</pre>
          </div>
          `:""}
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            📅 Submitted: ${new Date().toLocaleString()}<br>
            🌐 Platform: BeatsChain Web3 Beat Marketplace<br>
            ⛓️ Blockchain: Ethereum Network<br>
            ${l?"\uD83D\uDD10 Verification: Cryptographically Signed":"\uD83D\uDCE7 Verification: Standard Email"}
          </p>
        </div>
      `},u=!1;if(process.env.RESEND_API_KEY)try{(await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify(c)})).ok&&(u=!0)}catch(e){}if(!u&&process.env.SENDGRID_API_KEY)try{(await fetch("https://api.sendgrid.com/v3/mail/send",{method:"POST",headers:{Authorization:`Bearer ${process.env.SENDGRID_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({personalizations:[{to:[{email:"info@unamifoundation.org"}]}],from:{email:"noreply@beatschain.com",name:"BeatsChain"},reply_to:{email:r,name:t},subject:c.subject,content:[{type:"text/html",value:c.html}]})})).ok&&(u=!0)}catch(e){}if(!u)try{new Date().toISOString(),n&&(n.slice(0,10),n.slice(-6)),process.env.DISCORD_WEBHOOK_URL&&await fetch(process.env.DISCORD_WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({embeds:[{title:`${d} BeatsChain Contact`,color:3447003,fields:[{name:"\uD83D\uDC64 Name",value:t,inline:!0},{name:"\uD83D\uDCE7 Email",value:r,inline:!0},{name:"\uD83D\uDD17 Wallet",value:a||"None",inline:!0},{name:"\uD83D\uDCCB Subject",value:o,inline:!1},{name:"\uD83D\uDCAC Message",value:s.substring(0,1e3),inline:!1}],timestamp:new Date().toISOString()}]})}),u=!0}catch(e){}if(u)return i.NextResponse.json({success:!0,message:"Message sent successfully! We'll get back to you soon."});return i.NextResponse.json({success:!0,message:"Message received! We'll get back to you soon."})}catch(e){return i.NextResponse.json({error:"Failed to send message. Please try again or contact us directly."},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"/workspaces/beatz/beats/packages/app/src/app/api/contact/route.ts",nextConfigOutput:"standalone",userland:a}),{workAsyncStorage:d,workUnitAsyncStorage:c,serverHooks:u}=l;function g(){return(0,n.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:c})}},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},80408:()=>{},87032:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[2050,3744],()=>r(15638));module.exports=a})();