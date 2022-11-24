import{useApi as e,defineDisplay as r}from"@directus/extensions-sdk";import{defineComponent as a,ref as l,onMounted as n,openBlock as t,createElementBlock as u,createElementVNode as c,toDisplayString as i}from"vue";var s=a({props:{value:{type:[String,Number],default:null},lang:{type:String,default:"fr-FR"},currency:{type:String,default:null}},setup(r){const a=l(null),t=e=>null==e||null==e||""==e;return n((async()=>{try{if((e=>{for(const r of e)if(t(r))return!0;return!1})([r.lang,r.currency])){const l=e(),{data:n}=await l.get("/users/me",{params:{fields:["currency","language"]}});a.value=new Intl.NumberFormat(t(r.lang)?n.data.language:r.lang,{style:"currency",currency:n.data.currency}).format(Number(r.value))}else a.value=new Intl.NumberFormat(r.lang,{style:"currency",currency:r.currency}).format(Number(r.value))}catch(e){a.value=r.value}})),{displayValue:a}}});s.render=function(e,r,a,l,n,s){return t(),u("div",null,[c("p",null,i(e.displayValue),1)])},s.__file="src/display.vue";var o=r({id:"mgx-display-local-user-currency",name:"Dislay user local currency",icon:"money",description:"Display user local currency  so awesome",component:s,options:({collection:e})=>[{field:"lang",name:"lang",type:"string",meta:{width:"half",interface:"input",placeholder:"en-US"},schema:{default_value:"fr-FR"}},{field:"currency",name:"currency",type:"string",meta:{width:"half",interface:"input",placeholder:"USD"}}],types:["float","integer","decimal","string"]});export{o as default};
