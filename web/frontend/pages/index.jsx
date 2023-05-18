import { Page,Layout} from "@shopify/polaris";
import Navbar from "../components/navbar";



export default function HomePage() {
 
  return (
    <Page  fullWidth>          
       <Layout>
       <Layout.Section oneHalf>
       <Navbar/> 
       </Layout.Section>
       
       </Layout>
    </Page>
  );
}
