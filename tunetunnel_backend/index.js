const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/User');
const authroutes = require("./routes/auth");
const songroutes = require("./routes/song");
const playlistroutes=require("./routes/playlist")
const cors=require('cors')

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

//cors setting
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
}));

// Parse JSON bodies
app.use(express.json());

// Connect to the database
connectDB();

// Authentication through Passport
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'randomSecretVeda#^$&$)&%)&'
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({_id: jwt_payload.identifier });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

app.use(passport.initialize());

// Default route
app.get("/", (req, res) => {
    res.status(200).send({
        message: "successful",
        success: true
    });
});

// Create middleware for routes
app.use('/auth', authroutes);
app.use('/song', songroutes);
app.use('/playlist', playlistroutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on Port No: ${PORT}`);
});
