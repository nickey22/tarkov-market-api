const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const axios = require("axios");
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"50mb"}));


app.get('/api/test',async (req,res)=>{
    const tarkovAPI = "https://eft-loot.com/page-data/index/page-data.json";
    console.log('fetching tarkov data')
    try{
        const tarkovData = await axios.get(tarkovAPI);
        const tarkovRes = await tarkovData.data;
        res.json({ success:true, tarkovRes })
    }
    catch(error){
        console.log(error)
        res.json({success:false});
    }
})

app.listen(PORT,function(){
    console.log(`listening on port: ${PORT}`)
})