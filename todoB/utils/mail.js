import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // secure:true,
    auth: {
      user: "hamnahameed2001@gmail.com@",
      pass: "znzubxjoctdneuyd",
    },
  });

  export const sendMail = async (reciever, subject, message) => {
    const info = await transporter
      .sendMail({
        from: "hamnahameed2001@gmail.com",
        to: reciever,
        subject: subject,
        text: message,
      })
      .then((data) => {
        console.log("success", data);
      return true; 
      })
      .catch((e) => {
        console.log("Error", e);
      });
    return info;
  };
  
  export const randomPassGen = (length) => {
    const characters =
      "absgrmwl3875djcnshgetwj291834765bhggdhsuhdlskpanwcvfhrum985";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
// export const mail = async (receiver,message,subject)=>{
//     const transporter = nodemailer.createTransport({
//         host:"smtp.gmail.com",
//         port:465,
//         // secure:true,
//         auth:{
//             user:"hamnahameed2001@gmail.com",
//             pass:"znzubxjoctdneuyd",//znzu bxjo ctdn euyd
//         },
//     })

//     const info = await transporter.sendMail({
//         from:"hamnahameed2001@gmail.com",
//         to:receiver,
//         subject:subject,
//         text:message,
//     })
//     .then((data)=>{console.log("succcess",data)})
//     .catch((data)=>{console.log("error",data)})
// }

// export const randomPassGen=(length) =>{
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
//     let password = "";
//     for (let i = 0; i < length; i++) {
//       password += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return password;
//   }