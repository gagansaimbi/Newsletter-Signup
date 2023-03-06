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

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const url = "https://us21.api.mailchimp.com/3.0/lists/3ab9331cc9"
    const options = {
        method : "POST",
        auth: "gagmern:"+ API_KEY
        }
        console.log(options.auth);
    const request = https.request(url, options, function(response){
                            const status = response.statusCode
                            console.log(status);
                            response.on("data", function(data){
                                console.log(JSON.parse(data));
                        })
                        if (status===200){
                            res.sendFile(__dirname + "/success.html")
                        }
                        else{
                            res.sendFile(__dirname + "/failure.html")
                        }
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




// /lists/list_id