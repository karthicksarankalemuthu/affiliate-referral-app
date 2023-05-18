
export const CREATE_PRICERULE_MUTATION = `
mutation priceRuleCreate($priceRule: PriceRuleInput!) {
  priceRuleCreate(priceRule: $priceRule) {
    priceRule {
        id
    } 
  }
}

`;

export const get_pricerule=`query {
  priceRules(first: 10) {
    nodes {
      id
      title
      status
    }
  }
}`;


 
export const create_discount=`mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
  codeDiscountNode{
    codeDiscount {
      ... on DiscountCodeBasic {
        endsAt
        codes(first: 10) {
          edges {
            node {
              code
            }
          }
        }
        customerGets {
          items {
            ... on AllDiscountItems {
              allItems
            }
          }
          value {
            ... on DiscountAmount {
             amount {
                amount
              }
          }
          ... on DiscountPercentage {
            percentage
          }
        }
        }
        customerSelection {
          ... on DiscountCustomerAll {
            allCustomers
          }
          }
        title
        startsAt
        usageLimit
      }
      }
    }
    userErrors {
      field
      code
      message
    }
  }
}`;

export const get_discount=`query {
  codeDiscountNodes(first:10) {
    nodes {
      id
      codeDiscount {
        ... on DiscountCodeBasic {
          title
          status
        }
      }
     
    }
  }
}`;

export const get_single_discount=`query {
  codeDiscountNode(id:gid://shopify/DiscountCodeNode/1394692653346) {
      id
      codeDiscount {
        ... on DiscountCodeBasic {
          title
          status
        }
      } 
  }
}`;

"uka3ft"


