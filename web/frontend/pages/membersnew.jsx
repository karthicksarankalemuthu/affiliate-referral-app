import { Layout, Page,Form,Card,FormLayout,TextField,Button,Toast,Frame} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useState } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import { useNavigate } from "@shopify/app-bridge-react";
//import { redirect }from "react-router-dom";
//import { Navigate, useNavigate } from "react-router-dom";


export default function Membernew() {

  const fetch = useAuthenticatedFetch();
  const navigate=useNavigate();

    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[error,seterror]=useState("");
    
     function nav(path){
    (async ()=>{
       await navigate(to=`${path}`, {replace: true,target:"new"})
      await navigate('/member')
      }
    )()
     }
    


  const submit=async(e)=>{
    e. preventDefault()
    let res= await fetch("/api/create_member", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       name:name,
       email:email   
     
      })
    })
    res= await res.json()
    console.log(res)
    //window.location.replace("https://referral-affiliate-app.myshopify.com/admin/apps/referral-app-9/member");
    seterror(res?.msg);
    
  }
 
  const discount=async()=>{
    let res= await fetch("/api/create_discount", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       userid:"6e0d0667-723b-4a34-bb71-eb8a82a2b225"  
     
      })
    })
    res= await res.json()
    console.log(res)
    
  }
  const store=async()=>{
    let res= await fetch("/api/store_data", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       email:"karthick@gmail.com"  
      })
    })
    res= await res.json()
    console.log(res)
    
  }
 
 

    return (
        <Page  fullWidth>   
           <Layout>
           
           <Layout.Section oneHalf>
           <Navbar/> 
           </Layout.Section>
           
            <Layout.Section oneHalf>
            <Form  onSubmit={submit}>
               <FormLayout>
           
                 <Card  title="CREATE MEMBERS">
    
                 <Card.Section>
                    <TextField
                      label="MEMBER NAME"
                      placeholder="Enter member name"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={name}
                      onChange={setname}
                    />
                    </Card.Section>

                 
                <Card.Section>
                <Card.Subsection>
                <TextField
                      label="MEMBER EMAIL"
                      placeholder="Enter member email"
                      autoComplete="off"
                      value={email}
                      onChange={setemail}
                    />
              </Card.Subsection>
                </Card.Section>
                {error?(<Card.Section>
                <Card.Subsection>
                 <h1 style={{color:"red"}}>{error}</h1>
                </Card.Subsection>
                </Card.Section>):""}


                    </Card>
                    
                    <Button submit primary>Save </Button>
                    </FormLayout>
                    </Form>
                    
                  { /*<Button submit primary onClick={discount}>discount </Button>
                    <Button submit primary onClick={store}>store </Button>*/}
                    
                  
                    </Layout.Section>
                    </Layout>
                    </Page>
 )    


}