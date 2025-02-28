const mongoose = require('mongoose')

const connectDb  = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB COnnect Successfully')
    }catch(error){
        console.error("MongoDb connect Failed:",error)
        process.exit(1)
    }
}

module.exports = connectDb;