import { Layout, Page,Form,Card,FormLayout,TextField,Select,ChoiceList,Stack,Button} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { useState } from "react";
import {   useAuthenticatedFetch } from "../hooks";
import { useNavigate } from "@shopify/app-bridge-react";




export default function Affiliatenew() {

  const fetch = useAuthenticatedFetch();
  const navigate=useNavigate();
  const [campname,setcampname]=useState("");
  const [selectcamptyp, setSelectcamptyp] = useState("commission on product sales");
  const [selectpro, setSelectpro] = useState("All products");
  const [date,setdate]=useState("");
  const [time,settime]=useState("");
  const [offername,setoffername]=useState("");
  const [selectcomtyp, setSelectcomtyp] = useState("Percent of sale");
  const [offer, setoffer] = useState("");
  const [prefix,setprefix]=useState("%");
  const [value,setvalue]=useState("");
  const [cusdis,setcusdis]=useState("");
  const [influname,setinfluname]=useState("");





  const camptypchange=value => {
    if (value[0] == "commission on product sales") {
      setSelectcamptyp(value);  
      console.log(value);  

    } else {
      setSelectcamptyp(value);  
      console.log(value);  
    }
  };
 

  const prochange=value => {
    if (value[0] == "All products") {
      setSelectpro(value[0]);
      console.log(value[0]); 
        
    } else {
      setSelectpro(value[0]);  
      console.log(value[0]); 
      
    }
  };

  const comtypchange=value => {
    if (value[0] == "Percent of sale") {
      setSelectcomtyp(value[0]); 
      console.log(value[0]);   
      setprefix("%")
    } else {
      setSelectcomtyp(value[0]); 
      console.log(value[0]);  
      setprefix("$")
    }
  };


  
  const submit=async()=>{
    let res= await fetch("/api/create_affiliate", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
        campaign_name:campname,
        campaign_type:selectcamptyp,
        promoted_product:selectpro,
        date:date,
        Time:time,
        offer_name:offername,
        commission_type:selectcomtyp,
        value:value,
       customer_discount:cusdis,
       influencer_name:influname,
       offer:offer
      })
    })
    res= await res.json()
    console.log(res)
   // console.log(body)
   navigate('/affiliate')
    
   
  }

  return (
    <Page  fullWidth>   
       <Layout>
       
       <Layout.Section oneHalf>
       <Navbar/> 
       </Layout.Section>
       
        <Layout.Section oneHalf>
        <Form onSubmit={submit}>
           <FormLayout>
       
             <Card  title="CREATE CAMPAIGN">

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
                <Select
                   label="CAMPAIGN TYPE"
                    options={[
                     {label: 'commission on product sales', value: 'commission on product sales'},
                      {label: 'product gifting', value: 'product gifting'},]}
                      value={selectcamptyp}
                      onChange={camptypchange}
                      
                  />
              </Card.Subsection>
                </Card.Section>
   
                <Card.Section>
                <Card.Subsection>
                <ChoiceList
                  title="PROMOTED PRODUCT"
                  choices={[
                  {label: 'All products', value: 'All products'},
                  {label: 'Specific product collection', value: 'Specific product collection'}
                  
                  ]}
                  selected={selectpro}
                  onChange={prochange}
                  />
                </Card.Subsection>
                </Card.Section>
               
                <Card.Section>
                <Card.Subsection>
                <Stack distribution="fill">
               
                  <TextField
                  label="DATE"
                  placeholder="ex: 20/04/2023"
                  autoComplete="off"
                  value={date}
                  onChange={setdate}
                />
                
                <TextField
                  label="TIME"
                  placeholder="ex: 10:15 am"
                  autoComplete="off"
                  value={time}
                  onChange={settime}
                />
                
                  </Stack>
                </Card.Subsection>
                </Card.Section>
              </Card>
              <Card>
                <Card.Section>
                <TextField
                  label="OFFER NAME"
                  placeholder="Default offer - Product as gift"
                  autoComplete="off"
                  helpText="For your reference only. Not shown to customers."
                  value={offername}
                  onChange={setoffername}
                />
                </Card.Section>
                </Card>


        
        

        

                <Card>
                <Card.Section>
                <ChoiceList
                  title="COMMISSION TYPE"
                  choices={[
                  {label: 'Percent of sale', value: 'Percent of sale'},
                  {label: 'Flat rate per sale', value: 'Flat rate per sale'}
                  ]}
                  selected={selectcomtyp}
                  onChange={comtypchange}
                  />
                </Card.Section>
                <Card.Section>
                <Card.Subsection>
                <TextField
                  label="Value"
                  placeholder="25"
                  autoComplete="off"
                  prefix={prefix}
                  value={value}
                  onChange={setvalue}
                  
                />
                </Card.Subsection>
                </Card.Section>
                </Card>



                <Card>
                <Card.Section>
                <TextField
                  label="CUSTOMER DISCOUNT"
                  placeholder=" 30%"
                  autoComplete="off"
                  value={cusdis}
                  onChange={setcusdis}
                  
                />
                </Card.Section>
                </Card>

            
                <Card>
                <Card.Section>
                <TextField
                  label="INFLUENCER NAME"
                  placeholder="Tommy"
                  helpText="Note: The name will appear in the sticky bar after their referred customers click the affiliate link."
                  autoComplete="off"
                  value={influname}
                  onChange={setinfluname}
                />
                </Card.Section>
                <Card.Section>
                <Card.Subsection>
                <TextField
                   label="OFFER"
                   placeholder="offer % ex:30"
                    value={offer}
                    onChange={setoffer}
                  />
                </Card.Subsection>
                </Card.Section>
                </Card>
                <Button submit primary>Save </Button>

            </FormLayout> 
                </Form>
       </Layout.Section>
       
           
      
        </Layout>      
    </Page>
  );
}
