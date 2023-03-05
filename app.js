const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

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

    const url = "https://us21.api.mailchimp.com/3.0/lists/3ab9331cc9"
    const options = {
        method : "POST",
        auth: "gagmern:7e8dd0bda05e01612c5c7096bb29ca27-us21"
    }

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


app.listen(3000, () =>{
    console.log("Server is up and running on port 3000");
})



// url 
// https://us21.api.mailchimp.com/3.0/

// apikey
// 7e8dd0bda05e01612c5c7096bb29ca27-us21

// listkey
// 3ab9331cc9

// /lists/list_id