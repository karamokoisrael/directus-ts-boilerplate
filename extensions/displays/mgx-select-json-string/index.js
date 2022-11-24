import{defineDisplay as t}from"@directus/extensions-sdk";import{defineComponent as e,computed as n,openBlock as r,createElementBlock as i,toDisplayString as s}from"vue";import{useI18n as l}from"vue-i18n";var o=e({props:{value:{type:String,default:null},json:{type:String,required:!0}},setup(t){const{t:e}=l();return{displayValue:n((()=>{try{const e=JSON.parse(t.json),n=[];for(const t of e)if(n.push(t),null!=t.children&&null!=t.children)for(const e of t.children)n.push(e);return n.find((e=>e.value==t.value)).text}catch(e){return t.value}})),t:e}}});o.render=function(t,e,n,l,o,a){return r(),i("div",null,s(t.t(t.displayValue.replace("$t:",""))),1)},o.__file="src/display.vue";var a=t({id:"mgx-select-json-string",name:"display an item from a json string",icon:"box",description:'display an item from a json string like \n\t[\n\t\t{\n\t\t\t"text": "ok",\n\t\t\t"value": "ok"\n\t\t},\n\t\t{\n\t\t\t"text": "test",\n\t\t\t"value": "test"\n\t\t}\n\t]',component:o,options:({field:t})=>[{field:"json",name:"json",type:"string",meta:{width:"full",interface:"input-code",options:{label:"json",language:"javascript"}},schema:{default_value:null}}],types:["string"]});export{a as default};