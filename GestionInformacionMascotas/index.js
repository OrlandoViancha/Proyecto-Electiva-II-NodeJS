const express= require('express');
const path = require('path');
const app = express()
const port = 3000
const pets= require('./routes/pets')


app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use('/',pets)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))