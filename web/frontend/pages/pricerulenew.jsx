import { Layout, Page,Form,Card,FormLayout,TextField,Select,Stack,ChoiceList,Button, DatePicker} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useState } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import moment from 'moment';
import { Redirect } from "@shopify/app-bridge/actions";
//import { Redirect } from "@shopify/app-bridge/actions/Navigation/Redirect";
//import { useNavigate } from "@shopify/app-bridge-react";




export default function Pricerulenew() {

  const fetch = useAuthenticatedFetch();

    const[campname,setcampname]=useState("");
    const[discode,setdiscode]=useState("");
    const[disval,setdisval]=useState("");
    const[startdate,setstartdate]=useState(moment().format('DD/MM/YYYY'));
    const[enddate,setenddate]=useState("");
    const[prefix,setprefix]=useState("$");
    const[selectdistyp,setselectdistyp]=useState("orderDiscounts");
    const[ selectdisval,setselectdisval]=useState("fixedAmountValue");



       
      

  const changedate=(date)=>{
      const d=`${date.toString().replace(/\//g, "-")}`
      const res=d.split("-").reverse().join("-");
      return res+"T12:00:00Z";
    }

    const distypchange=value => {
        if (value[0] == "orderDiscounts") {
            setselectdistyp(value); 
            console.log(value)
        } 
        else if(value[1]=="productDiscounts"){
            setselectdistyp(value); 
            console.log(value)
        }
        else {
            setselectdistyp(value);  
            console.log(value)
        }
      };
    
      
      const disvalchange=value => {
        if (value[0] == "fixedAmountValue") {
            setselectdisval(value[0]);  
            setprefix("$")
            
        } else {
            setselectdisval(value[0]);    
            setprefix("%")
        }
      };



   const click=async()=>{   
    let res= await fetch("/api/get_discount")
    res=await res.json()
       console.log(res)

      }
     
  const submit=async()=>{
    let res= await fetch("/api/create_pricerule", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       campname:campname,
       disval:disval,
       discode:discode,
       selectdisval:selectdisval,
       startdate:changedate(startdate),
       enddate:changedate(enddate)
     
      })
    })
    res= await res.json()
    console.log(res)
    Redirect.Action.REMOTE("/pricerule")
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
           
                 <Card  title="CREATE REFERRAL CAMPAIGN">
    
                 <Card.Section>
                    <TextField
                      label="CAMPAIGN NAME"
                      placeholder="Enter campaign name"
                      autoComplete="off"
                      helpText="For your reference only. Not shown to customers."
                      value={campname}
                      onChange={setcampname}
                    />
                    </Card.Section>

                 
                <Card.Section>
                <Card.Subsection>
                <TextField
                      label="DISCOUNT CODE"
                      placeholder="Enter discount code"
                      autoComplete="off"
                      value={discode}
                      onChange={setdiscode}
                    />
                    

              </Card.Subsection>
                </Card.Section>

                <Card.Section>
                 <Card.Subsection>
                <ChoiceList
                  title="DISCOUNT TYPE"
                  choices={[
                  {label: 'fixedAmount', value: 'fixedAmountValue'},
                  {label: 'percentage', value: 'percentageValue'}
                  ]}
                  selected={selectdisval}
                  onChange={disvalchange}
                  />
                  </Card.Subsection>
                  </Card.Section>
                 
                 
                  <Card.Section>
                  <Card.Subsection>
                    <TextField
                      label="VALUE"
                      placeholder="Enter value"
                      autoComplete="off"
                      prefix={prefix}
                      value={disval}
                      onChange={setdisval}
                    />
                    </Card.Subsection>
                    </Card.Section>

                    <Card.Section>
                  <Card.Subsection>
                    <Stack distribution="fill">
               
                  <TextField
                  label="START DATE"
                  placeholder="ex: 25/0/2023"
                  autoComplete="off"
                  value={startdate}
                  onChange={setstartdate}
                />
                
                <TextField
                  label="END DATE"
                  placeholder="ex: 25/06/2023 "
                  autoComplete="off"
                  value={enddate}
                  onChange={setenddate}
                />
                
                  </Stack>
                  </Card.Subsection>
                  </Card.Section>
                    </Card>

                    <Button submit primary>Save </Button>
                    </FormLayout>
                    </Form>
                   { /*<Button  onClick={click} primary>click </Button>*/}
                    </Layout.Section>
                    </Layout>
                    </Page>
 )    


}