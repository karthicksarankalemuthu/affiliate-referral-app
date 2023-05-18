const btn=document.getElementById("btn");
const popup=document.getElementById("container");
const closebtn=document.getElementById("closebtn");
const text=document.getElementById("text");
const submit=document.getElementById("button");
const closepopup=document.getElementById("closepopup");
const dispopup=document.getElementById("popup-container");
const code = document.getElementById("code");
const get = document.getElementById("get");
//const text=document.getElementById("text");
const mail=document.getElementById("mail");
const twitter=document.getElementById("twitter");
const facebook=document.getElementById("facebook");


/*btn.addEventListener("click",()=>{
    const email=text.value
    console.log(email)

    const random = Math.floor(Math.random() * (1000000 - 99999 + 1)) + 99999;
    var url="https://referral-affiliate-app.myshopify.com/?id="+random;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "LInrdOD8Gc5ZOKVSc64aqHYz28It9Lsl");
    
    var raw = url;
    
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw
    };
    
    fetch("https://api.apilayer.com/short_url/hash", requestOptions)
      .then(response => response.text())
      .then(result => 
        result.short_url=text.value)
      .catch(error => console.log('error', error));

     mail.href="mailto:"+mail+"?subject=referral&body=hiiiiiiii";
    twitter.href="https://twitter.com/intent/tweet?text=hiii"
    facebook.href="https://www.facebook.com/sharer/sharer.php?u=hiii"
  
})*/
btn.addEventListener("click",()=>{
  popup.style.visibility="visible";
   btn.style.visibility="hidden";
   closebtn.style.visibility="visible";
    
})

 closebtn.addEventListener("click",()=>{
  popup.style.visibility="hidden";
  btn.style.visibility="visible";
  closebtn.style.visibility="hidden";
 })

 if(closepopup){
 closepopup.addEventListener("click",()=>{
  dispopup.style.visibility="hidden";
 
 })}
 const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 let d=urlParams.get('id')
 //console.log(d)
 if(d){
  dispopup.style.visibility="visible";
 }
 
 /*copy.addEventListener("click",async()=>{
    await navigator.clipboard.writeText(code.value);
    copy.innerHTML="copied"
 })*/
 


  submit.addEventListener("click",async(e)=>{
  const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 let d=urlParams.get('id')
 //console.log(d)
 //let auth=await fetch("https://ff0b-2409-4072-8e1e-f6a-6933-31cf-e1e2-8024.ngrok-free.app/api/ans")
 if(submit.innerHTML="get 10% off"){
 e.preventDefault()
  let res= await fetch("/apps/authapp/store/store_data",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'ngrok-skip-browser-warning':'69420'
    },
  body: JSON.stringify({
    email:text.value
    })

  })
   // console.log(text.value)
   let rsu=await res.json()
    let val=rsu?.msg;
    text.value=val;
    submit.innerHTML="copy"}
    if(submit.innerHTML="copy"){
      navigator.clipboard.writeText(text.value)
      submit.innerHTML="copied"
      
    }
    
   
       
     /*var myHeaders = new Headers();
     myHeaders.append("apikey", "LInrdOD8Gc5ZOKVSc64aqHYz28It9Lsl");
     myHeaders.append('Access-Control-Allow-Origin','*');
     myHeaders.append( 'ngrok-skip-browser-warning','69420');
     var raw = url;
     
     var requestOptions = {
       method: 'POST',
       redirect: 'follow',
       headers: myHeaders,
       body: raw
     };
     fetch("https://api.apilayer.com/short_url/hash", requestOptions)
       .then(response => response.text())
       .then(result => 
        text.innerHTML=result.short_url)
       .catch(error => console.log('error', error));*/
 })
 
 if(get){
 get.addEventListener("click",async(e)=>{
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let d=urlParams.get('id')
  e.preventDefault()
  let res= await fetch("/apps/authapp/store/check_email",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'ngrok-skip-browser-warning':'69420'
    },
  body: JSON.stringify({
    email:code.value,
     userid:d
    })

  })
  let rsu=await res.json()
  //console.log(rsu)
  let err=rsu?.msg
  console.log(err)
  if(err){
    code.value=err
  }
  let val=rsu.da.data.discountCodeBasicCreate.codeDiscountNode.codeDiscount.codes.edges[0].node.code;
 
  if(val){
    code.value=val
  }
  
 
 }) 
}
/*
 const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 let d=urlParams.get('id')
 console.log(d)
 if(d){
  let res=fetch("/apps/authapp/store/create_discount",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      userid:d
    })  
})
res= res.json()
console.log(res)}*/
