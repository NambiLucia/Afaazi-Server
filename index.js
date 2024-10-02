const express =require("express");
const fs = require('fs')
const morgan =require('morgan')
const path =require('path');
var cors = require('cors')
const {couplesRoute} = require("./routes/couplesRoute");
const {vendorsRoute} = require("./routes/vendorsRoute");
const {categoryRoute} = require("./routes/categoryRoute");
const { bookingsRoute } = require("./routes/bookingsRoute");


const app =express();
const PORT = process.env.PORT 
//|| 5000;

//middeleware
app.use(express.json());
app.use(cors());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'request_logs.txt'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


//middelware to direct endpoint requests to couplesRoute
app.use("/couples",couplesRoute);
app.use("/vendors",vendorsRoute);
app.use("/categories",categoryRoute);
app.use("/bookings",bookingsRoute); 





app.get("/",(req,res)=>{
return res.send("<h1>Welcome to the Afaazi Server page</h1>")
})

app.listen(PORT,()=>{
  console.log(`Server is listening on http://localhost:${PORT}`)

})