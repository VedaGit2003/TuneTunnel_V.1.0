const express = require("express");
const router = express.Router();
const Song = require('../models/Song');
const passport = require("passport");
const User = require('../models/User')

// API for creating a song
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { name, thumbnail, track } = req.body;

    // Validate required fields
    if (!name || !thumbnail || !track) {
      return res.status(400).json({ success: false, message: "Insufficient details to create song" });
    }

    // Create song details
    const artist = req.user?._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);

    // Return success response with created song
    return res.status(201).json({ success: true, message: "Song created successfully", song: createdSong });
  } catch (error) {
    console.error("Error creating song:", error);  // Log the error for debugging
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

// API for getting songs created by the user
router.get('/get/mysongs', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.user._id }).populate({path:'artist'});

    // Return the user's songs
    return res.status(200).json({ success: true, data: songs });
  } catch (error) {
    console.error("Error fetching user's songs:", error);  // Log the error for debugging
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

//search song by id artist name
router.get('/get/artist/:artistId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { artistId } = req.params

    const artist = await User.findOne({_id:artistId})
    // console.log(artist)
    if (!artist) {
      return res.status(301).json({ success: false, message: "Artist not exist" })
    }
    const songs = await Song.find({ artist: artistId })
    return res.status(200).json({ success: true, message: "getting song successfully", data: songs })
  } catch (error) {
    return res.status(404).json({ success: false, message: "Internal Server Error"})
  }
});

//search by songname
router.get('/get/songname/:songName', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { songName } = req.params;

    if (!songName) {
      return res.status(400).json({ success: false, message: "Song name is required" });
    }

    try {
      const songs = await Song.find({ name: { $regex: songName, $options: 'i' } }).populate('artist');
      return res.status(200).json({ success: true, message: "Getting song successfully", data: songs });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
);

//get all song
router.get('/get/allsongs',passport.authenticate('jwt',{session:false}),
async(req,res)=>{
  try{
const allSongs=await Song.find({})
return res.status(200).json({success:true,message:"Getting song successfully",data:allSongs})
  }catch(error){
    return res.status(500).json({ success: false, message: "Server error", error: error.message });

  }
}
)

module.exports = router;