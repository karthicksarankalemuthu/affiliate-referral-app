import { Layout, Page} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { rows } from "../components/providers/list";
import Campaignlist from "../components/campaignlist";
import Affiliatenew from "./Affiliatenew";
import { useState } from "react";




export default function Affiliate() {
    const[value,setvalue]=useState(rows)
  return (
         <Page fullWidth>
            <Layout>
            <Layout.Section oneHalf>
               <Navbar/>
            </Layout.Section>
          <Layout.Section oneHalf>

          {value?(<Campaignlist/>):(<Affiliatenew/>)}
           
         </Layout.Section>
         </Layout>
         </Page>
  

  );}