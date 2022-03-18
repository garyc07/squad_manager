const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = process.env.PORT || 3001

const app = express()

const corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Configure API routes through Express app
require('./app/api/routes')(app)


// Last step error handling, for any unhandled errors that escape
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === 'UnauthorizedError') return res.status(err.status || 401).send({message:err.message})
  return res.sendStatus(500)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});