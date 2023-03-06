const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
require('dotenv').config();


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html")
})


app.post("/", (req,res) => {
    const firstName = req.body.first 
    const lastName = req.body.last 
    const emailid = req.body.mail 
    // console.log(firstName);
    // console.log(lastName);
    // console.log(emailid);

    const data = {
        members: [
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const LIST_ID = process.env.LIST_ID
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const url = "https://us21.api.mailchimp.com/3.0/lists/" + LIST_ID
    const options = {
        method : "POST",
        auth: "gagmern:"+ API_KEY
        }
    
    const request = https.request(url, options, function(response){
                            
                            response.on("data", function(data){
                                const status = response.statusCode
                                console.log(status);

                                console.log(JSON.parse(data));
                                const meta_data = JSON.parse(data)
                                const duplicate_check = meta_data.errors[0].error_code

                                if (status===200){
                                    // res.sendFile(__dirname + "/success.html")
                
                                    if ( duplicate_check === "ERROR_CONTACT_EXISTS"){
                                        console.log("****** This is duplicate *****");
                                        res.sendFile(__dirname + "/success_if_duplicate.html")
                                    }
                                    else{
                                        console.log("###### No duplicate so new added ######");
                                        res.sendFile(__dirname + "/success.html")
                                    }
                                }
                                else{
                                    res.sendFile(__dirname + "/failure.html")
                                }
                             })
                    })
                    
    request.write(jsonData)
    request.end()
})


app.post("/", function(req,res){
    res.redirect("/")
})


app.listen(3000 || process.env.PORT, () =>{
    console.log("Server is up and running on port 3000");
})
