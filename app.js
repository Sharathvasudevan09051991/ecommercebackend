const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config()
const  morgan = require('morgan');
const  bodyParser = require('body-parser');

//app
const app = express();

// DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(
    () => console.log("DB Connected"),
    (err) => console.log(err),
)

//middleware
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());


// routes middleware
app.use('/api/authToken', require('./routes/auth'));
app.use('/api/signUp', require('./routes/user'));
app.use('/api/signIn', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
app.use('/api/product', require('./routes/product'));




const port  = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

