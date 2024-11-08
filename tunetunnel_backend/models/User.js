const mongoose = require("mongoose");


const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        private:true,
    },
    userName: {
        type: String,
        required: true
    },
    likedSongs: {
        type: String,
        default: ""
    },
    likedPlaylists: {
        type: String,
        default: ""
    },
    subscribeArtists: {
        type: String,
        default: ""
    }
}
    // ,{
    //     timestamps:true
    // }
)
const UserModel = mongoose.model("User", User)
module.exports = UserModel
// export default mongoose.model("User",User)