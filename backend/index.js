const express = require('express')
const app = express()
const port = 3001

const mongoDB = require('./db');

mongoDB();

app.use(express.json());

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  next();
})

app.use('/api',require('./Routes/UserRouting'));
app.use('/api',require('./Routes/FoodRouting'));
app.use('/api',require('./Routes/OrderRouting'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Food app listerning on port ${port}`)
})