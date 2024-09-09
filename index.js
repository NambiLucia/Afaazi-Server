const express =require("express");
const fs = require('fs')
const morgan =require('morgan')
const path =require('path');
const {couplesRoute} = require("./routes/couplesRoute");
const {vendorsRoute} = require("./routes/vendorsRoute");


const app =express();
const PORT =5000;

//middeleware
app.use(express.json());
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'request_logs.txt'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


//middelware to direct endpoint requests to couplesRoute
app.use("/couples",couplesRoute);
app.use("/vendors",vendorsRoute);





app.get("/",(req,res)=>{
return res.send("<h1>Welcome to the Afaazi Server page</h1>")
})

app.listen(PORT,()=>{
  console.log(`Server is listening on http://localhost:${PORT}`)

})