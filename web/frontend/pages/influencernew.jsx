import { Layout, Page,Form,Card,FormLayout,TextField,Button,Tag,Toast,Frame} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useForm, useField } from "@shopify/react-form";
import { useCallback, useEffect, useState } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import { useNavigate } from "@shopify/app-bridge-react";

export default function Influencernew() {

  const [influname , setinflu]= useState("");
  const [influemail , setemail]= useState("");
   const [influtag , settag]= useState([]);
   const[toast,settoast]=useState(false);
   const fetch = useAuthenticatedFetch();
   const navigate=useNavigate();
/*useEffect(()=>{
  (async()=>{

    let response = await fetch("/api/getdata");
    response = await response.json()
console.log(response)

  })()

},[])*/
   
  const activetoast=()=>{
         settoast(!toast)
  }
   
   
  const submit=async()=>{
    let res= await fetch("/api/create_influencer", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
        name:influname,
        email:influemail,
        tags:influtag
      })
    })
    res= await res.json()
    console.log(res)
   navigate('/influencerlist')
   
  }

 /* const {
    fields: {
      influ,
      email,
      tag,
    },
  } = useForm({
    fields: {
      influ: useField(""),
      email:useField(""),
      tag:useField([])}
    })
 */

     


    return (
      <Page  fullWidth>   
         <Layout>
         
         <Layout.Section oneHalf>
         <Navbar/> 
         </Layout.Section>
         
          <Layout.Section oneHalf>
          <Form onSubmit={submit}>
             <FormLayout>
             <Card  title="Add Influencer">

          <Card.Section>
           <TextField
            label="INFLUENCER NAME"
           autoComplete="off"
         //  {...influ}
           value={influname}
           onChange={setinflu}
           placeholder="tommy"
          helpText="Note: The name will appear in the sticky bar after you create an affiliate link for the influencer in one campaign and their referred customers click the affiliate link."
         />
       </Card.Section>

          <Card.Section>
        <Card.Subsection>
         <TextField
          label="EMAIL (optional)"
        //  {...email}
           placeholder="xyz@gmail.com"
           value={influemail}
           onChange={setemail}
          autoComplete="off"
         />
        </Card.Subsection>
         </Card.Section>

         <Card.Section>
        <Card.Subsection>
         <TextField
          label="TAG"
          autoComplete="off"
          placeholder="digitalmarketer,influencer"
        //  {...tag}
           value={influtag}
            onChange={settag}
         />
         
        </Card.Subsection>
         </Card.Section>

         </Card>
         <Button submit primary>Save </Button>
           </FormLayout>
       </Form>  
       {toast?<Frame>
       <Toast content="Data stored successfully" onDismiss={activetoast} duration={3000} />
       </Frame>: null}
       
       
       </Layout.Section>
       </Layout>
       </Page>
    )}