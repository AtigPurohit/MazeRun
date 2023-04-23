var express = require("express")
var bodyParser = require("body-parser")
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const Swal = require('sweetalert2')
const app = express()
const ejsMate = require('ejs-mate');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sjdhsjd434jh4j5j4k5h4kj5h4jk5';

app.use(express.urlencoded({encoded: true}))
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
// IMPORTING THE MODELS
const User = require('./models/User')
const Score = require('./models/Score')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cookieParser())


mongoose.connect('mongodb+srv://itsthechamp0074:Atig123@cluster0.8u1w8vn.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true not use in this version
  }).then(()=>{
    console.log('Connection Successful......');
  }).catch((e)=>{
    console.log('No Connection');
    console.log (e)
  });
 var db = mongoose.connection;




app.post("/signup",async (req,res)=>{
    console.log ("yo")
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;

    try {
        const userDoc = await User.create({
            name,
            email,
            mobile,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        // res.json(userDoc)
        return res.redirect('login.html')
    } catch (e) {
        res.status(422).json(e)
        console.log(e)
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password)
        if (passOK) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                console.log (token)
                res.cookie('token', token).redirect('user.html')
            })
        } else {
            res.status(422).json('Sorry, the password you entered is incorrect. Please try again.')
        }
    } else {
        res.status(422).json('No account found for that email. Please double-check or create a new account.');
    }
})

app.get ('/profile', (req, res) => {
    const {token} = req.cookies;
    console.log (req.cookies.token)
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            console.log (userData)
            if (err) throw err;
            console.log (err)
            const {name, email, _id} = await User.findById(userData.id)
            // console.log ({name, email, _id})
            // console.log("name: ", name);
            // console.log("email: ", email);
            // console.log("_id: ", _id);
            res.json({name, email, _id})
        })
    } else {
        res.json(null)
    }
})

app.get ('/success', (req, res) => {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            const {id} = userData
            res.json(await Score.find({player: id}))
        })
    }
})


    app.post ('/upload', async (req, res) => {
        const {token} = req.cookies;
        const {
            score_easy, score_med, score_hard, score_ext
        } = req.body
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            console.log (err)

            // Find the existing score document for the player
            const existingScoreDoc = await Score.findOne({ player: userData.id });

            if (existingScoreDoc) {
                // Check if the new score is lower than the existing score for the same level of difficulty
                let updateScore = false;
                console.log (score_easy)
                if (score_easy < existingScoreDoc.score_easy || existingScoreDoc.score_easy === undefined) {
                    existingScoreDoc.score_easy = score_easy;
                    updateScore = true;
                }
                if (score_med < existingScoreDoc.score_med || existingScoreDoc.score_med === undefined) {
                    existingScoreDoc.score_med = score_med;
                    updateScore = true;
                }
                if (score_hard < existingScoreDoc.score_hard || existingScoreDoc.score_hard === undefined) {
                    existingScoreDoc.score_hard = score_hard;
                    updateScore = true;
                }
                if (score_ext < existingScoreDoc.score_ext || existingScoreDoc.score_ext === undefined) {
                    existingScoreDoc.score_ext = score_ext;
                    updateScore = true;
                }

                // Save the updated document if necessary
                if (updateScore) {
                    await existingScoreDoc.save();
                    console.log("Existing ScoreDoc updated:", existingScoreDoc);
                    res.json(existingScoreDoc);
                } else {
                    console.log("Existing ScoreDoc not updated:", existingScoreDoc);
                    res.json(existingScoreDoc);
                }
            } else {
                // Create a new document if no existing document is found
                const newScoreDoc = await Score.create({
                    player: userData.id,
                    score_easy, score_med, score_hard, score_ext
                });
                console.log("New ScoreDoc created:", newScoreDoc);
                res.json(newScoreDoc);
            }
        });
    });

app.get('/score', async(req,res)=>{
    try{
    // const highScore= await Score.find({}).populate("player")
    res.send({highScore})
}catch(e){
console.log(e)
}
    })

    app.get('/leaderboard',async(req,res)=>{
        try{
            var mysort = { score_easy: 1 };
            const highScore= await Score.find({}).sort(mysort).populate("player");
            res.render('lboard',{h:highScore});
        }catch(e){
            console.log(e);
        }
    })
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
});
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
