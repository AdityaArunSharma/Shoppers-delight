import {userEmail,passEmail} from '../constants.js'
import nodemailer from 'nodemailer'


function getReceipt(cartItems){
    var receipt = []
    for(var x=0;x<cartItems.length;x++){
        receipt.push("Product Name : "+ cartItems[x].name + " Price - "  + cartItems[x].price + " Quantity - " + cartItems[x].qty)
    }
    return receipt
}

function getMail(name,email,receipt,address){
    const mail = "Customer Name : "+name+"\n"+"Customer Email : "+email+"\n"+"Items Ordered :-\n"+receipt+"\n"+"Address : "+address+"\n"
    return mail
}


function getMailIds(cartItems){
    var mailIds = ""
    for(var x=0;x<cartItems.length;x++){
        if(x==cartItems.length-1){
            mailIds = mailIds + cartItems[x].sellerMail
        } else{
            mailIds = mailIds + cartItems[x].sellerMail + " , "
        }
        
    }
    return mailIds
}

function sendEmailHelper(email,message){

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: userEmail,
    pass: passEmail
        }
    });

    var mailOptions = {
        from: userEmail,
        to: email,
        subject: 'New Order!',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

}

export const sendEmail = (req,res)=>{
    
    const { userInfo,
            cart
    } 
        = req.body;     
        
    // console.log(userInfo)
    // console.log(cart)

    
    

    const {name,email} = userInfo

    const {cartItems,shippingAddress} = cart

    const receipt = getReceipt(cartItems)

    const address = shippingAddress.address + " " + shippingAddress.city + " " + shippingAddress.postalCode + " " + shippingAddress.country + " "

    // console.log(name)
    // console.log(email)
    // console.log(receipt)
    // console.log(address)

    const mailBody = getMail(name,email,receipt,address)

    console.log(mailBody)

    const mailSubject = "New Order!"

    const mailIds = getMailIds(cartItems)
    console.log(mailIds)
    res.status(201).json({'status' : 'sent'})

    
}