import { Layout, Page,Button,Card, IndexTable,Heading,DataTable, useIndexResourceState} from "@shopify/polaris";
import { mendata } from "./providers/list";
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";




export default function Influencerlist() {


      const [data,setdata]=useState([]);

  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
    
  function deleteinflu(id){
   (async()=>{
      let res= await fetch("/api/delete_influencer/"+id,{
        method: 'DELETE',
      })
    res=await res.json()
       console.log(res)
    })()
    
  }

   /*  const { data } = useAppQuery({
    url: "/api/getdata",
    reactQueryOptions: {
      onSuccess: () =>
        console.log(data);
      },
    },
  });*/
useEffect(async()=>{
    
    let res= await fetch("/api/get_influencer")
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
    {id,name,email,tags},
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    ><IndexTable.Cell>{index+1}</IndexTable.Cell>
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>{tags}</IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{deleteinflu(id)}}>delete</Button></IndexTable.Cell>
    </IndexTable.Row>
  ),
); 
      
    
 
  return (
         <Page fullWidth>
            <Layout>
       <Layout.Section oneHalf>
       
           <Button onClick={()=>{navigate('/influencernew')}}>Add Influencer</Button>
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
          {title: 'name'},
          {title: 'email'},
          {title: 'tag'},
          {title: 'delete'}
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