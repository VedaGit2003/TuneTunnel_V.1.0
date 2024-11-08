const express = require("express")
const router = express.Router()
const passport = require('passport')
const Playlist = require('../models/Playlist')
const User = require('../models/User')
const Song = require('../models/Song')



router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user
    const { name, thumbnail, songs } = req.body
    if (!name || !thumbnail || !songs) {
        return res.status(404).json({ success: false, message: "Field required" })
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
    }
    const playlist = await Playlist.create(playlistData)
    return res.status(200).json({
        success: true, message: "Playlist created successfull", data: playlist
    })
})

router.get('/get/myplaylist',passport.authenticate('jwt',{session:false}),
async (req,res)=>{
    const artistId=req.user._id;
    const playlist=await Playlist.find({owner:artistId}).populate('owner')
    if (!playlist){
        return res.status(301).json({message:"Playlist not found"})
    }
    return res.status(200).json(playlist)
}
)


router.get('/get/playlist/:playlistId',
    passport.authenticate("jwt", { session: false }), async (req, res) => {
        const playlistId = req.params.playlistId;
        const playlist = await Playlist.findOne({ _id: playlistId })
        if (!playlist) {
            return res.status(301).json({message:"Invalid Id"})
        }
        return res.status(200).json(playlist)
    }
)
router.get('/get/artist/:artistId', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const artistId = req.params.artistId
        //if artist is available
        const artist = await User.findOne({ _id: artistId })
        if (!artist) {
            return res.status(404).json({ success: false, message: 'Artist Not available' })
        }
        const playlist = await Playlist.find({ owner: artistId })
        return res.status(200).json({
            success: true,
            message: 'Get playlist successfully',
            data: playlist
        })
    })

router.post('/add/song', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const currentUser = req.user
        const { playlistId, songId } = req.body
        //check if playlist is available or not\

        const playlist = await Playlist.findOne({ _id: playlistId })
        if (!playlist) {
            return res.status(404).json({
                success: false, message: 'Playlist not availble'
            })
        }
        // check if current user is the owner of the playlist of collaborator of that playlist

        if (!(currentUser._id).equals(playlist.owner) && !playlist.collaborators.includes(currentUser._id)) {
            return res.status(404).json({
                success: false, message: 'Not Allowed'
            })
        }
        //if song not available
        const song=await Song.findOne({_id:songId})
        if (!song){
            return res.status(404).json({
                success: false, message: 'Not available'
            })
        }
        playlist.songs.push(songId)
        await playlist.save()
        
return res.status(200).json({
    success:true,
    message:'Song added successfully',
    playlist
})
    }


)
module.exports = router