import { Layout, Page,Button,Card, IndexTable,useIndexResourceState} from "@shopify/polaris";
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";



export default function pricerule() {


      const [data,setdata]=useState([]);
      const[btn,setbtn]=useState();

  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
     
  function deleteprice(id){
    (async()=>{
       let res= await fetch("/api/delete_pricerule/"+id,{
         method: 'DELETE',
       })
     res=await res.json()
        console.log(res)
     })()
     
   }

   function active(id){
    (async()=>{
       let res= await fetch("/api/pricerule_enable/"+id,{
         method: 'PUT',
       })
     res=await res.json()
        console.log(res)
     })()
     
   }
useEffect(async()=>{
    
    let res= await fetch("/api/get_pricerule")
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
    {id,pricerule_name,discount_code,end_date,value,activate},
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    ><IndexTable.Cell>{index+1}</IndexTable.Cell>
      <IndexTable.Cell>{pricerule_name}</IndexTable.Cell>
      <IndexTable.Cell>{discount_code}</IndexTable.Cell>
      <IndexTable.Cell>{value}</IndexTable.Cell>
      <IndexTable.Cell>{end_date}</IndexTable.Cell>
      <IndexTable.Cell>{activate==true?"active":"inactive"}</IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{active(id)}}>{activate==true?"Disable":"enable"}</Button></IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{deleteprice(id)}}>delete</Button></IndexTable.Cell>
    </IndexTable.Row>
  ),
); 
      
    
 
  return (
         <Page fullWidth>
            <Layout>
            <Layout.Section oneHalf>
               <Navbar/>
            </Layout.Section>
       <Layout.Section oneHalf>
       
           <Button primary onClick={()=>{navigate('/pricerulenew')}}>Add PriceRule</Button>
           <Card></Card>
           <Card>
          
           <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
      
        headings={[
          {title: 'S.no'},
          {title: 'offername'},
          {title: 'discountcode'},
          {title: 'offer'},
          {title: 'offerended'},
          {title:'status'},
          {title: 'Action'},
          {title:'delete'}
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
         
         </Card>
         </Layout.Section>
         </Layout>
         </Page>
  

  );}