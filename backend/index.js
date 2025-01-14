const express = require('express')
const app = express()
const port =5000
const cors=require('cors');
//  db.js will connected and all element of food_items will return in terminal
const mongoDB =require("./db")
mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3500");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(cors({
  origin:"*",
  credentials:true,
}));

app.use(express.json ())
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));




app.get('/', (req, res ) => {
  res.send('Hello World -->')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})