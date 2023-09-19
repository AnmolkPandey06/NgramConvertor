import mongoose from "mongoose";
 const SentenceSchema=new mongoose.Schema(
    {
        Sentence:{
            type:String,
        },
        Ngram:{
            type:Number
        }
        
    },
    {
        timestamps:true
    }
)

const Sentence=mongoose.model("Sentence",SentenceSchema);
export default Sentence;