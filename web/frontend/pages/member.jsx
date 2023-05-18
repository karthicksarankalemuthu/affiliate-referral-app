import { Layout, Page,Button,Card, IndexTable,useIndexResourceState,Link} from "@shopify/polaris";
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useAuthenticatedFetch  } from "../hooks";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";



export default function Memberlist() {


      const [data,setdata]=useState([]);
      const [dis,setdis]=useState();
  const fetch=useAuthenticatedFetch();

  const navigate = useNavigate(); 
 
    
  function deletemember(id){
   (async()=>{
      let res= await fetch("/api/delete_member/"+id,{
        method: 'DELETE',
      })
    res=await res.json()
       console.log(res)
    })()
    
  }


  function active(id){
    (async()=>{
       let res= await fetch("/api/member_enable/"+id,{
         method: 'PUT',
       })
     res=await res.json()
        console.log(res)
     })()
     
   }


   const discount=async(id)=>{
    let res= await fetch("/api/create_discount", {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "application/json" },
      body: JSON.stringify({
       userid:`${id}`
     
      })
    })
    res= await res.json()
    console.log(res)
    console.log(res.success)
    setdis(res.success)
    
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
    
    let res= await fetch("/api/get_member")
    res=await res.json()
       console.log(res)
      setdata(res)
      console.log(res)
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
    {id,name,email,link,enable},
    index,
  ) => (
    <IndexTable.Row
     id={id}
      key={id}
      position={index} 

    ><IndexTable.Cell>{index+1}</IndexTable.Cell>
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell> <Link url={link} external>referral</Link></IndexTable.Cell>
      <IndexTable.Cell>{enable==true?"Active":"Inactive"}</IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{active(id)}}>{enable==true?"Disable":"enable"}</Button></IndexTable.Cell>
      <IndexTable.Cell> <Button onClick={()=>{deletemember(id)}}>delete</Button></IndexTable.Cell>
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
       
       
           <Button primary onClick={()=>{navigate('/membersnew')}}>Add Members</Button>
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
          {title: 'link'},
          {title: 'status'},
          {title:'enable'},
          {title: 'delete'},
         // {title:'create discount'}
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
  " <Button primary onClick={()=>{discount(id)}}>{dis==true ?created:create discount}</Button>"