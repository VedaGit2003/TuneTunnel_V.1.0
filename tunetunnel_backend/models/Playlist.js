const mongoose=require("mongoose");


const Playlist=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    songs:[{
        type:mongoose.Types.ObjectId,
        ref:"Song"
    }],
    collaborators:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
}
// ,{
//     timestamps:true
// }
)
const PlaylistModel=mongoose.model("Playlist",Playlist)
module.exports = PlaylistModel
// export default mongoose.model("Song",Song)