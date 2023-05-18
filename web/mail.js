import pkg from 'nodemailer';
const nodemailer  = pkg;



export async function mail(code,usermail,friend_name) {
    
     try{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
      auth: {
        user:"karthicksarankalemuthu@gmail.com", 
        pass:"mmbjpprzabgeipdy", 
      },
    });
  


  
    let info = await transporter.sendMail({
      from:"karthicksarankalemuthu@gmail.com", 
      to: `${usermail}`, 
      subject: " 🎉 Congrats You earn the coupon", 
      //text:"hello",
    //  html: "<h2>"+friend_name+"give discount coupon to you" +"</h2><br/><h3>"+code+"</h3>", 
      html: `<h2>${friend_name} just made a purchase with your referral link
           </h2><br/>
      <h2>discount code</h2><br/>
      <h3>${code}</h3>`
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Mail send successfully");
}
catch(e){
    console.log(e)
}
   
  }
  

