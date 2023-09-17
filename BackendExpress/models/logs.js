import mongoose from "mongoose";
 const LogSchema=new mongoose.Schema(
    {
        frontend:{
            type:String,
            default:"request"

        }
        
    },
    {
        timestamps:true
    }
)

const Log=mongoose.model("Log",LogSchema);
export default Log;