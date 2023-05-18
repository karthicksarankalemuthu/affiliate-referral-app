import { Layout, Page} from "@shopify/polaris";
import Navbar from "../components/navbar";
import { mendata } from "../components/providers/list";
import Influencernew from "./influencernew"
import Influencerlist from "../components/influencerlist";
import { useState } from "react";




export default function Influencer() {
    const[value,setvalue]=useState(mendata)
  return (
         <Page fullWidth>
            <Layout>
            <Layout.Section oneHalf>
               <Navbar/>
            </Layout.Section>
          <Layout.Section oneHalf>

          {value?(<Influencerlist/>):(<Influencernew/>)}
           
         </Layout.Section>
         </Layout>
         </Page>
  

  );}