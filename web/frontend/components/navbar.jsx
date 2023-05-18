import { Frame,  Navigation} from "@shopify/polaris";
import { ShareMinor, ThumbsUpMajor } from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useState } from "react";


  export default function Navbar() {
  const[open,setopen]=useState(false)
  const[open1,setopen1]=useState(false)
    const navigate = useNavigate();
    return (
        
        <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Referral',
              icon:  ShareMinor, 
              selected:open1,
              onClick:()=>{setopen1(!open1)},
             subNavigationItems: [
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Referral Campaigns',
                onClick:()=>{navigate("/pricerule")}
              },
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Advocate Campaigns',
                onClick:()=>{navigate("/advocate")}
              },
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Members',
                onClick:()=>{navigate("/member")}
              }],
            },

            {
              url: '#',
              excludePaths: ['#'],
              label: 'Affiliate',
              icon:  ThumbsUpMajor,
              selected:open,
              onClick:()=>{setopen(!open)},
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Campaigns',
                  onClick:()=>{navigate("/Affiliate")}
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Influencer list',
                  onClick:()=>{navigate("/influencer")}
                }],
            },
            
          ]}
        
              
                
        />
      </Navigation>
    </Frame>
             
                   
        
     
   
  );
}
