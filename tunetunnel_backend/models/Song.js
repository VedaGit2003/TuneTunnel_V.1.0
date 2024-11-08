const mongoose=require("mongoose");


const Song=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
    },
    track:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
}
// ,{
//     timestamps:true
// }
)
const SongModel=mongoose.model("Song",Song)
module.exports = SongModel
// export default mongoose.model("Song",Song)