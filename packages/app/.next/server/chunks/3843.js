exports.id=3843,exports.ids=[3843,7983],exports.modules={17983:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{client:()=>g,fetchSanity:()=>u,getNavigation:()=>d,getPageBySlug:()=>p,getSiteSettings:()=>o,urlFor:()=>n});var i=r(28278),s=r(86e3),c=r.n(s),l=e([i]);i=(l.then?(await l)():l)[0];let g=(0,i.createClient)({projectId:"i01qs9p6",dataset:"production",apiVersion:"2023-05-03",token:"skjFJmUQgJ1AirscHu0KYrF7D5v9ycvCaC94ql0oSKGmqmP4XTFQSTYE02reGAaE8MjAEFWO0ULyzMMMdZVsru3DxUZu7NVaarTpbuArReIpwYAHui66uYPOrNi7ZU26t7dVReebx0OfiHHz3HSMGLHMCviGo2zkcd1Ob5xLRqcNcLdofcXy",useCdn:!0}),y=c()(g);function n(e){return y.image(e)}async function u(e,t={}){try{return await g.fetch(e,t)}catch(e){return null}}async function o(){try{return await g.fetch('*[_type == "siteSettings"][0]')}catch(e){return null}}async function d(e=!0){try{return await g.fetch(`
      *[_type == "navigation" && isMain == ${e}][0] {
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
    `)}catch(e){return{items:[]}}}async function p(e){try{return await g.fetch(`
      *[_type == "page" && slug.current == $slug][0]
    `,{slug:e})}catch(e){return null}}a()}catch(e){a(e)}})},31447:(e,t,r)=>{"use strict";r.d(t,{z:()=>a});class a{async getProducer(e){return e?.startsWith("0x")?{id:e.toLowerCase(),name:"Web3 Producer",bio:"Producer on BeatsChain platform.",location:"Blockchain",genres:["Hip Hop"],totalBeats:0,totalSales:0,verified:!1,walletAddress:e}:null}async getProducerBeats(e){return[]}async getAllProducers(){return[]}async getBeat(e){return null}async getFeaturedBeats(e=6){return[]}}},58629:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{q:()=>c});var i=r(61817),s=e([i]);i=(s.then?(await s)():s)[0];class c{async getProducer(e){try{if(!e)return null;let t=await i.Sn.fetch(`
        *[_type == "producer" && slug.current == $id][0] {
          _id, name, bio, location, genres, profileImage, coverImage, 
          verified, walletAddress, stats
        }
      `,{id:e});if(!t)return null;return{id:t.slug?.current||t._id,name:t.name||"Beat Creator",bio:t.bio||"",location:t.location||"South Africa",genres:Array.isArray(t.genres)?t.genres:["Hip Hop"],totalBeats:t.stats?.totalBeats||0,totalSales:t.stats?.totalSales||0,verified:t.verified||!1,profileImageUrl:t.profileImage?(0,i.dk)(t.profileImage).url():void 0,coverImageUrl:t.coverImage?(0,i.dk)(t.coverImage).url():void 0,walletAddress:t.walletAddress||void 0}}catch(e){return null}}async getProducerBeats(e){try{if(!e)return[];let t=await i.Sn.fetch(`
        *[_type == "beat" && producer->slug.current == $producerId] {
          _id, title, slug, description, producer->{name, slug},
          stageName, genre, bpm, key, price, audioFile, coverImage
        }
      `,{producerId:e});if(!t)return[];return t.map(e=>({id:e.slug?.current||e._id,title:e.title||"Untitled Beat",description:e.description||"",producerId:e.producer?.slug?.current||"",producerName:e.stageName||e.producer?.name||"",genre:e.genre||"Hip Hop",bpm:e.bpm||120,key:e.key||"C",price:e.price||.05,audioUrl:e.audioFile?.asset?.url||"",sanityAudioUrl:e.audioFile?.asset?.url||"",coverImageUrl:e.coverImage?(0,i.dk)(e.coverImage).url():void 0,isNFT:!1}))}catch(e){return[]}}async getAllProducers(){try{let e=await i.Sn.fetch(`
        *[_type == "producer"] {
          _id, name, slug, bio, location, genres, profileImage, 
          coverImage, verified, walletAddress, stats
        }
      `);if(!e)return[];return e.map(e=>({id:e.slug?.current||e._id,name:e.name||"Beat Creator",bio:e.bio||"",location:e.location||"South Africa",genres:e.genres||["Hip Hop"],totalBeats:e.stats?.totalBeats||0,totalSales:e.stats?.totalSales||0,verified:e.verified||!1,profileImageUrl:e.profileImage?(0,i.dk)(e.profileImage).url():void 0,coverImageUrl:e.coverImage?(0,i.dk)(e.coverImage).url():void 0,walletAddress:e.walletAddress||void 0}))}catch(e){return[]}}async getBeat(e){try{if(!e)return null;let t=await i.Sn.fetch(`
        *[_type == "beat" && slug.current == $id][0] {
          _id, title, slug, description, producer->{name, slug},
          stageName, genre, bpm, key, price, audioFile, coverImage
        }
      `,{id:e});if(!t)return null;return{id:t.slug?.current||t._id,title:t.title||"Untitled Beat",description:t.description||"",producerId:t.producer?.slug?.current||"",producerName:t.stageName||t.producer?.name||"",genre:t.genre||"Hip Hop",bpm:t.bpm||120,key:t.key||"C",price:t.price||.05,audioUrl:t.audioFile?.asset?.url||"",sanityAudioUrl:t.audioFile?.asset?.url||"",coverImageUrl:t.coverImage?(0,i.dk)(t.coverImage).url():void 0,isNFT:!1}}catch(e){return null}}async getFeaturedBeats(e=6){try{let e=await i.Sn.fetch(`
        *[_type == "beat" && featured == true] {
          _id, title, slug, description, producer->{name, slug},
          stageName, genre, bpm, key, price, audioFile, coverImage
        }
      `);return e&&0!==e.length||(e=await i.Sn.fetch(`
          *[_type == "beat"] {
            _id, title, slug, description, producer->{name, slug},
            stageName, genre, bpm, key, price, audioFile, coverImage
          }
        `)),e||(e=[]),e.map(e=>({id:e.slug?.current||e._id,title:e.title||"Untitled Beat",description:e.description||"",producerId:e.producer?.slug?.current||"",producerName:e.stageName||e.producer?.name||"",genre:e.genre||"Hip Hop",bpm:e.bpm||120,key:e.key||"C",price:e.price||.05,audioUrl:e.audioFile?.asset?.url||"",sanityAudioUrl:e.audioFile?.asset?.url||"",coverImageUrl:e.coverImage?(0,i.dk)(e.coverImage).url():void 0,isNFT:!1}))}catch(e){return[]}}constructor(){this.client=i.Sn}}a()}catch(e){a(e)}})},60767:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{C:()=>n});var i=r(58629),s=r(31447),c=e([i]);i=(c.then?(await c)():c)[0];class l{constructor(){this.sanityAdapter=new i.q,this.web3Adapter=new s.z}async getProducer(e){if(!e)return null;try{if(e?.startsWith("0x"))try{let t=await this.web3Adapter.getProducer(e);if(t)return t}catch(e){}try{let t=await this.sanityAdapter.getProducer(e);if(t){if(t.walletAddress)try{let e=await this.web3Adapter.getProducer(t.walletAddress);if(e)return{...t,totalBeats:e.totalBeats||t.totalBeats,totalSales:e.totalSales||t.totalSales}}catch(e){}return t}}catch(e){}return null}catch(e){return null}}async getProducerBeats(e){if(!e)return[];try{let t=await this.getProducer(e);if(!t)return[];if(t.walletAddress)try{let e=await this.web3Adapter.getProducerBeats(t.walletAddress);if(e&&e.length>0)return e}catch(e){}try{return await this.sanityAdapter.getProducerBeats(e)}catch(e){}return[]}catch(e){return[]}}async getAllProducers(){try{let e=await this.sanityAdapter.getAllProducers();return await Promise.all(e.map(async e=>{if(e.walletAddress)try{let t=await this.web3Adapter.getProducer(e.walletAddress);if(t)return{...e,totalBeats:t.totalBeats||e.totalBeats,totalSales:t.totalSales||e.totalSales}}catch(e){}return e}))}catch(e){return[]}}async getBeat(e){if(!e)return null;try{if(/^\d+$/.test(e))if(e.length>10)try{let t=await fetch(`https://beatschain.app/api/beat-metadata/${e}`,{headers:{"User-Agent":"BeatsChain-Server/1.0"}});if(t.ok){let e=await t.json();return{id:e.id,title:e.title,description:e.description,genre:e.genre,bpm:e.bpm,key:e.key,price:e.price,producerName:e.stageName||e.producerName,stageName:e.stageName,coverImageUrl:e.coverImageUrl,audioUrl:e.audioUrl,tags:e.tags,licenseType:e.licenseType,createdAt:e.createdAt,status:e.status,isActive:e.isActive,source:"api-cache"}}}catch(e){}else try{let t=await this.web3Adapter.getBeat(e);if(t)return t}catch(e){}return this.sanityAdapter.getBeat(e)}catch(e){return null}}async getFeaturedBeats(e=8){try{let[t,r]=await Promise.all([this.getWeb3Beats(e),this.sanityAdapter.getFeaturedBeats()]);return[...t.map(e=>({...e,source:"web3",priority:1})),...r.map(e=>({...e,source:"sanity",isDemo:!0,priority:2}))].sort((e,t)=>{if(e.priority!==t.priority)return(e.priority||999)-(t.priority||999);let r=new Date(e.createdAt||0).getTime();return new Date(t.createdAt||0).getTime()-r}).slice(0,e)}catch(e){return[]}}async getWeb3Beats(e=8){let t=[];try{let e=await fetch("https://beatschain.app/api/community-beats",{headers:{"User-Agent":"BeatsChain-UnifiedProvider/1.0"}});if(e.ok){let r=await e.json();r.success&&r.beats&&t.push(...r.beats)}}catch(e){}try{let r=await this.web3Adapter.getFeaturedBeats(e);t.push(...r)}catch(e){}return t.filter((e,t,r)=>e.isActive&&r.findIndex(t=>t.id===e.id)===t).slice(0,e)}}let n=new l;a()}catch(e){a(e)}})},80408:()=>{},87032:()=>{}};