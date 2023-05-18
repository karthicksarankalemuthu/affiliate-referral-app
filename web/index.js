// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import {create_discount, get_discount, get_single_discount} from "./mutation.js";
import { mail } from "./mail.js";
import shopify from "./shopify.js";
import { GraphqlQueryError } from "@shopify/shopify-api";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import cors from 'cors';
import { Session } from "inspector";
/*import pkg from 'pg';
const { Client } = pkg;*/


/*const con=new Client({
  host: 'localhost',
  port: 5432,
  database: 'affiliate',
  user: 'postgres',
  password: 'karthick@1',
})*/


//con.connect();


const prisma= new PrismaClient();



const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

app.use(cors({origin:'*'}))
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());
//app.use("/store/*", shopify.validateAuthenticatedSession());
app.use(express.json());



app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});


// get discount code


app.get("/api/get_discount", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    const client =new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    const data = await client.query({
      data:get_discount
     })
    var da=data.body;
  } catch (e) {
   if (e instanceof GraphqlQueryError) {
      throw new Error(
        `${e.message}\n${JSON.stringify(e.response, null, 2)}`
      );
    } else {
      throw e;
    }
   // console.log(`Failed to process products/create: ${e.message}`);
  // status = 500;
  //  error = e.message;
  }
 res.status(status).send({ success: status === 200, error,da });
  console.log(da)
});



// Discount create

app.post("/api/create_discount", async (_req, res) => {
  let status = 200;
  let error = null;
       const {userid}=_req.body;    
    const code = Math.random().toString(36).substring(2,8);
       
  try {
    const client = new shopify.api.clients.Graphql({session:res.locals.shopify.session});
    console.log(client)   
     console.log(res.locals.shopify.session)
   const price= await prisma.pricerule.findFirst({where:{activate:true}})
   const member=await prisma.members.findUnique({where:{id:userid}})

 const enable_check=member?.enable==true;
 const discount_get=member?.get_discount==false;

    if(price && enable_check){
      
      if(discount_get){
     if(price?.discount_type=="fixedAmountValue"){
      res.json(price)
   const data= await client.query({
    
      data: {
        query:create_discount,
        variables: {
          basicCodeDiscount:{
           endsAt:price?.end_date,
            code:price?.discount_code,
            customerGets:{
              items: {
                all: true
              },
              value:{
               discountAmount: {
                  amount:price?.value,
                  appliesOnEachItem:false
                
                },
               // percentage: 0.2
              }
            },
            customerSelection: {
              all: true
            },
            title:price?.pricerule_name,
            startsAt:price?.start_date ,
            usageLimit: 5,
            
      },
  },

    }
  });
  var da=data.body;}
else{
  
  const data= await client.query({
    
    data: {
      query:create_discount,
      variables: {
        basicCodeDiscount:{
         endsAt:price?.end_date,
          code:price?.discount_code,
          customerGets:{
            items: {
              all: true
            },
            value:{
           /*   discountAmount: {
                amount: 10.00,
                appliesOnEachItem:false
              
              },*/
              percentage:parseInt(price?.value)/100
            }
          },
          customerSelection: {
            all: true
          },
          title:price?.pricerule_name,
          startsAt:price?.start_date ,
          usageLimit: 5,
          
    },},}})
    var da=data.body;
   
}
}
else{
  res.send({msg:"your already get discount"})
}
}
 
  else{
    res.send({msg:"No pricerule active (or) your not enable"})
  }
 // res.json(price)
  //res.status(200).send({msg:{da}})
  } catch (e) {
    if (e instanceof GraphqlQueryError) {
      throw new Error(
        `${e.message}\n${JSON.stringify(e.response, null, 2)}`
      );
    } else {
      throw e;
    }
  //console.log(`Failed to process discount/create: ${e.message}`);
  //status = 500;
  //error = e.message;
  }
  res.status(status).send({ success: status === 200, error,da,});
 
});

// store post method

app.post("/store/store_data",async(req,res)=>{
  const{email}=req.body;

  try{
    const existinguser=await prisma.members.findUnique({where:{email:email}})
    if(existinguser){
          //res.status(404).send({msg:"Email is already exist"})
          res.status(200).send({msg:existinguser?.link})
    }
    else{
      const url="https://referral-affiliate-app.myshopify.com/collections/all"
     const senddata=await prisma.members.create({data:{name:"",email:email,link:"",enable:true,setting:""}})
     const id=await prisma.members.update({where:{email:email},data:{link:url+"?id="+senddata?.id}})
     //const set =await prisma.members.update({where:{id:id?.id},data:{link:url+id?.id},});
     const link=await prisma.members.findUnique({where:{email:email}})
   res.send({msg:link?.link})
    }  
}
catch(err){
console.log(err)

}
})


// store discount code create check exist customer

app.post("/store/check_email",async(req,res)=>{
  let status = 200;
  let error = null;

  const{email,userid}=req.body;
  const code = Math.random().toString(36).substring(2,8);
const ses={Session:{
    id: 'offline_referral-affiliate-app.myshopify.com',
     shop: 'referral-affiliate-app.myshopify.com',
     state: '792561467202753',
     isOnline: false,
    scope: 'write_discounts',
      accessToken: 'shpua_66cfd44b9466827b93302b0534a5e52e' }}
  try{
    const existinguser=await prisma.customers.findUnique({where:{email:email}})
    const existingdis=await prisma.referrals.findUnique({where:{referral_email:email}})
    if(existinguser){
          //res.status(404).send({msg:"Email is already exist"})
          res.status(404).send({msg:"Discount only for first customer"})
    }
    else if(existingdis){
      res.status(404).send({msg:existingdis.discount_code})
    }

    
    
    else{   
    //  const code = Math.random().toString(36).substring(2,8);
     // console.log(req.headers)
     // const lo=await shopify.config.sessionStorage.findSessionsByShop("referral-affiliate-app.myshopify.com")
    //  console.log(lo)
    // const a=await shopify.api.session.getCurrentId({ isOnline: true,
      
    // rawRequest: req,
       // rawResponse: res,})
       // console.log(a)
     // const l= await shopify.config.sessionStorage.loadSession()
     /// console.log(l)
      const client = new shopify.api.clients.Graphql({session:ses.Session});
    // console.log(client)  
    // console.log(res.locals.shopify.session)

    
     const price= await prisma.pricerule.findFirst({where:{activate:true}})
     const member=await prisma.members.findUnique({where:{id:userid}})
  
   const enable_check=member?.enable==true;
  // const discount_get=member?.get_discount==false;
  

      if(price && enable_check){
        
        //if(discount_get){
       if(price?.discount_type=="fixedAmountValue"){
       // res.json(price)
     const data= await client.query({
      
        data: {
          query:create_discount,
          variables: {
            basicCodeDiscount:{
             endsAt:price?.end_date,
              code:code,
              customerGets:{
                items: {
                  all: true
                },
                value:{
                 discountAmount: {
                    amount:price?.value,
                    appliesOnEachItem:false
                  
                  },
                 // percentage: 0.2
                }
              },
              customerSelection: {
                all: true
              },
              title:code,
              startsAt:price?.start_date ,
              usageLimit: 5,
              
        },
    },
  
      }

    });
    var da=data.body;}
  else{
    
    const data= await client.query({
      
      data: {
        query:create_discount,
        variables: {
          basicCodeDiscount:{
           endsAt:price?.end_date,
            code:code,
            customerGets:{
              items: {
                all: true
              },
              value:{
             /*   discountAmount: {
                  amount: 10.00,
                  appliesOnEachItem:false
                
                },*/
                percentage:parseInt(price?.value)/100
              }
            },
            customerSelection: {
              all: true
            },
            title:code,
            startsAt:price?.start_date ,
            usageLimit: 5,
            
      },},}})
      var da=data.body;
     
  }
 // }
 // else{
 //   res.send({msg:"your already get discount"})
 // }
  }
   
    else{
      res.status(404).send({msg:"No pricerule active (or) your not enable"})
    }
   // res.json(price)
    //res.status(200).send({msg:{da}})
    } 

    }  

catch(e){
  if (e instanceof GraphqlQueryError) {
    throw new Error(
      `${e.message}\n${JSON.stringify(e.response, null, 2)}`
    );
  } else {
    throw e;
  }


}
res.status(status).send({ success: status === 200, error,da,});
let send=await prisma.referrals.create({data:{advocate_id:userid,referral_email:email,discount_code:`${code}`}})
console.log(send)

//res.json(send)
//res.status(200).send({msg:send.discount_code})
})

//create priceRule

app.post("/api/create_pricerule",async(req,res)=>{
  const{campname,disval,discode,selectdisval,startdate,enddate}=req.body;
try{
   const send=await prisma.pricerule.create({data:{pricerule_name:campname, discount_code:discode, discount_type:selectdisval, 
    value:disval,
    start_date:startdate,
    end_date:enddate,
    activate:true}})
}
catch(err){
 console.log(err)

}
})


//create advocate

app.post("/api/create_advocate",async(req,res)=>{
  const{campname,disval,discode,selectdisval,startdate,enddate}=req.body;
try{
   const send=await prisma.advocate.create({data:{advocate_name:campname, discount_code:discode, discount_type:selectdisval, 
    value:disval,
    start_date:startdate,
    end_date:enddate,
    activate:true}})
}
catch(err){
 console.log(err)

}
})

// get the member data

app.get("/api/get_member",async(req,res)=>{
  try{  
    const getdata =await prisma.members.findMany();
    res.json(getdata)
    
  }
  catch(err){
    console.log(err)
  }
})


// get the pricerule data

app.get("/api/get_pricerule",async(req,res)=>{
  try{  
    const getdata =await prisma.pricerule.findMany();
    res.json(getdata)
  
    
  }
  catch(err){
    console.log(err)
  }
})

// get the advocate data

app.get("/api/get_advocate",async(req,res)=>{
  try{  
    const getdata =await prisma.advocate.findMany();
    res.json(getdata)
  
    
  }
  catch(err){
    console.log(err)
  }
})

// get the influencer list

app.get("/api/get_influencer",async(req,res)=>{
  try{  
    const getdata =await prisma.influencer.findMany();
    res.json(getdata)
    console.log(getdata)
    
  }
  catch(err){
    console.log(err)
  }
})

// get the affiliate campaign list

app.get("/api/get_Affiliate",async(req,res)=>{
  try{  
    const getdata =await prisma.affiliate.findMany();
    res.json(getdata)
    console.log(getdata)
  }
  catch(err){
    console.log(err)
  }
})

//create influencer

 app.post("/api/create_influencer",async(req,res)=>{
     const{name,email,tags}=req.body;
  try{
      const senddata=await prisma.influencer.create({data:{name:name,email:email,tags:[tags]}})
     console.log(senddata)
  }
  catch(err){
    console.log(err)

  }
 })


 //create members

 app.post("/api/create_member",async(req,res)=>{
  const{name,email}=req.body;
try{
     const existinguser=await prisma.members.findUnique({where:{email:email}})
     if(existinguser){
           res.status(404).send({msg:"Email is already exist"})
     }
     else{
      const url="https://referral-affiliate-app.myshopify.com/collections/all"
      const senddata=await prisma.members.create({data:{name:name,email:email,link:"",enable:true,setting:""}})
      const id=await prisma.members.update({where:{email:email},data:{link:url+"?id="+senddata?.id}})
    console.log(id)
     }  
}
catch(err){
 console.log(err)

}
})
//create affiliate campaign

 app.post("/api/create_affiliate",async(req,res)=>{
  const{campaign_name,campaign_type,promoted_product,date,Time,offer_name,commission_type,value,customer_discount,
   influencer_name,
   offer}=req.body;
try{
   const senddata=await prisma.affiliate.create({data:{campaign_name:campaign_name,campaign_type:campaign_type,promoted_product:promoted_product,
    date:date,Time:Time,offer_name:offer_name,commission_type:commission_type,value:value,
    customer_discount:customer_discount,influencer_name:influencer_name,offer:offer
    }})
    res.json(senddata)
  console.log(senddata)
}
catch(err){
 console.log(err)
}
})

// delete influencer

app.delete("/api/delete_influencer/:id",async(req,res)=>{
      const id=req.params.id;
  try{  
    const getdata =await prisma.influencer.delete({where:{id:id}});
    res.json(getdata)
    console.log(getdata)   
  }
  catch(err){
    console.log(err)
  }
})

// delete affiliate

app.delete("/api/delete_affiliate/:id",async(req,res)=>{
  const id=req.params.id;
try{  
const getdata =await prisma.affiliate.delete({where:{id:id}});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})

// delete pricerule

app.delete("/api/delete_pricerule/:id",async(req,res)=>{
  const id=req.params.id;
try{  
const getdata =await prisma.pricerule.delete({where:{id:id}});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})


// delete advocate

app.delete("/api/delete_advocate/:id",async(req,res)=>{
  const id=req.params.id;
try{  
const getdata =await prisma.advocate.delete({where:{id:id}});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})

// delete members

app.delete("/api/delete_member/:id",async(req,res)=>{
  const id=req.params.id;
try{  
const getdata =await prisma.members.delete({where:{id:id}});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})


// enable pricerule

app.put("/api/pricerule_enable/:id",async(req,res)=>{
  const id=req.params.id;
try{  
  const get=await prisma.pricerule.findUnique({where:{id:id}})
  res.json(get)
   let status=get?.activate
const getdata =await prisma.pricerule.update({where:{id:id},data:{activate:!status},});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})

// enable advocate

app.put("/api/advocate_enable/:id",async(req,res)=>{
  const id=req.params.id;
try{  
  const get=await prisma.advocate.findUnique({where:{id:id}})
  res.json(get)
   let status=get?.activate
const getdata =await prisma.advocate.update({where:{id:id},data:{activate:!status},});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})

// enable members

app.put("/api/member_enable/:id",async(req,res)=>{
  const id=req.params.id;
try{  
  const get=await prisma.members.findUnique({where:{id:id}})
  res.json(get)
   let status=get?.enable
const getdata =await prisma.members.update({where:{id:id},data:{enable:!status},});
res.json(getdata)
console.log(getdata)   
}
catch(err){
console.log(err)
}
})


app.get("/store/a", (req, res) => {
 // res.set({session:res.locals.shopify.session})
  res.status(200).send({msg:"Succeed"})
})

//advocate get referral

app.post("/webhook/d",async(req,res)=>{
  const{discount_codes,customer}=req.body;

  let status = 200;
  let error = null;

  const discode = Math.random().toString(36).substring(2,8);

  const ses={Session:{
      id: 'offline_referral-affiliate-app.myshopify.com',
       shop: 'referral-affiliate-app.myshopify.com',
       state: '792561467202753',
       isOnline: false,
      scope: 'write_discounts',
        accessToken: 'shpua_66cfd44b9466827b93302b0534a5e52e' }}
  console.log("webhook called ");


  try{
    console.log(discount_codes)
    let mail=customer?.email;
    let code=discount_codes[0].code
    const verify_email=await prisma.referrals.findUnique({where:{referral_email:mail}})
    const verify_code=await prisma.referrals.findUnique({where:{discount_code:code}})
    if(verify_email && verify_code){
   const user=await prisma.members.findUnique({where:{id:verify_email.advocate_id}})  

   var sendmail=user?.email

   const client = new shopify.api.clients.Graphql({session:ses.Session});
   const rule= await prisma.advocate.findFirst({where:{activate:true}})
     if(rule){
     
      if(rule?.discount_type=="fixedAmountValue"){
        res.json(rule)
     const data= await client.query({
      
        data: {
          query:create_discount,
          variables: {
            basicCodeDiscount:{
             endsAt:rule?.end_date,
              code:discode,
              customerGets:{
                items: {
                  all: true
                },
                value:{
                 discountAmount: {
                    amount:rule?.value,
                    appliesOnEachItem:false
                  
                  },
                 // percentage: 0.2
                }
              },
              customerSelection: {
                all: true
              },
              title:discode,
              startsAt:rule?.start_date,
              usageLimit: 5,
              
        },
    },
  
      }

    });
    var da=data.body;}
  else{
    
    const data= await client.query({
      
      data: {
        query:create_discount,
        variables: {
          basicCodeDiscount:{
           endsAt:rule?.end_date,
            code:discode,
            customerGets:{
              items: {
                all: true
              },
              value:{
             /*   discountAmount: {
                  amount: 10.00,
                  appliesOnEachItem:false
                
                },*/
                percentage:parseInt(rule?.value)/100
              }
            },
            customerSelection: {
              all: true
            },
            title:discode,
            startsAt:rule?.start_date ,
            usageLimit: 5,
            
      },},}})
      var da=data.body;
     
  }
 // }
 // else{


 

     }
   

    }


    else{
      console.log("error")
    }
     // console.log(res);
 // console.log(email);
 //customer.admin_graphql_api_id
  //console.log(customer);
  //console.log(discount_codes)

  }
  catch(e){
    if (e instanceof GraphqlQueryError) {
      throw new Error(
        `${e.message}\n${JSON.stringify(e.response, null, 2)}`
      );
    } else {
      throw e;
    }


  }
  let usermail=customer.email
  let friend_name=customer.first_name
 let custid=customer.admin_graphql_api_id
   //console.log(customer);
   //console.log(discount_codes)
  // mail(discode,sendmail,friend_name)
   let send=await prisma.customers.create({data:{name:friend_name,email:usermail,customer_id:custid}})
  console.log(send)
  mail(discode,sendmail,friend_name)
  res.status(status).send({ success: status === 200, error,da,});
})


app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});





app.listen(PORT);
