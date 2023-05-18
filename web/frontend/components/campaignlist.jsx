import { Layout, Page,Button,IndexTable, useIndexResourceState,Card} from "@shopify/polaris";
import { rows } from "./providers/list";
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";



export default function campaignlist() {
  const [data,setdata]=useState([]);

  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
   
  function deletecamp(id){
    (async()=>{
       let res= await fetch("/api/delete_affiliate/"+id,{
         method: 'DELETE',
       })
     res=await res.json()
        console.log(res)
     })()
     
   }

  useEffect(async()=>{
    
    let res= await fetch("/api/get_Affiliate")
    res=await res.json()
       console.log(res)
      setdata(res)
      console.log(data)
      // res = await res.json() 
    
},[data])
const resourceName = {
  singular: 'data',
  plural: 'datas',
};

 const {selectedResources, allResourcesSelected} =
    useIndexResourceState(data);

  
const rowMarkup = data?.map(
  (
    {id,campaign_name,date,Time,influencer_name},
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    ><IndexTable.Cell>{index+1}</IndexTable.Cell>
      <IndexTable.Cell>{campaign_name}</IndexTable.Cell>
      <IndexTable.Cell>{date}</IndexTable.Cell>
      <IndexTable.Cell>{Time +'am'}</IndexTable.Cell>
      <IndexTable.Cell>{influencer_name}</IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{deletecamp(id)}}>delete</Button></IndexTable.Cell>
    </IndexTable.Row>
  ),
); 
  return (
         <Page fullWidth>
            <Layout>
       <Layout.Section oneHalf>
       
           <Button onClick={()=>{navigate("/Affiliatenew")}}>Add campaign</Button>
           <Card></Card>
           <Card>
          
           <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
      
        headings={[
          {title: 'S.no'},
          {title: 'campaign name'},
          {title: 'date'},
          {title: 'time'},
          {title:'influencer'},
          {title:'Action'}
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
         
         </Card>
         </Layout.Section>
         </Layout>
         </Page>
  

  );}