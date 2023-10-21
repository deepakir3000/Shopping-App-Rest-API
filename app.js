const express = require('express');
const cors = require('cors');

const app = express()

var corOption = {
    origin: "https://localhost:8091"
}

//-----MiddleWare

app.use(cors(corOption));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// Routers

const router = require('./routes/productRouter.js')
app.use('/api/products',router)


//Testing API

app.get('/', (req,res)=>{
    res.json({message: 'Hello World'})
});

const PORT = process.env.PORT || 8091 ;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})
