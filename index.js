
const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/time");
const express=require('express');
const path=require('path');
const multer=require('multer');
const app=express();
const User=require('./models/usermodel');
const body=require('body-parser');
const storage=multer.diskStorage({
    destination:function(req,res,cb)
    {
        cb(null,path.join(__dirname,'./public/image'));
    },
    filename:function(req,file,cb){
        const name=file.originalname;
        cb(null,name);
    }
})
const upload=multer({storage:storage});
const session = require('express-session');
const { name } = require('ejs');
app.use(session({
    secret: 'your-secret-key', // Change this to a long random string
    resave: false,
    saveUninitialized: false
}));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen('3000', () => {
    console.log("Server is live on port 3000");
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register',upload.single('image'),async (req, res) => {
    try {
        const user = new User({
            name:req.body.name,
            image:req.file.filename,
            mon1: req.body.mon1,
            mon2: req.body.mon2,
            mon3: req.body.mon3,
            mon4: req.body.mon4,
            mon5:req.body.mon5,
            tue1:req.body.tue1,
            tue2:req.body.tue2,
            tue3:req.body.tue3,
            tue4:req.body.tue4,
            tue5:req.body.tue5,
            wed1:req.body.wed1,
            wed2:req.body.wed2,
            wed3:req.body.wed3,
            wed4:req.body.wed4,
            wed5:req.body.wed5,

            th1:req.body.th1,
            th2:req.body.th2,
            th3:req.body.th3,
            th4:req.body.th4,
            th5:req.body.th5,

            fri1:req.body.fri1,
            fri2:req.body.fri2,
            fri3:req.body.fri3,
            fri4:req.body.fri4,
            fri5:req.body.fri5
        });
        const savedUser = await user.save();
        console.log('User is registered:', savedUser);
        res.render('hello', { user:savedUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/login',function(req,res){
    res.render('login');
})
app.post('/login',async function(req, res){
    try{
      const name = req.body.name;
      const userdata = await User.findOne({ name:name });
      
      if (!userdata) {
        // User not found
        res.send("User not found");
        return;
    }
    else{
         res.render('hello', { user:userdata});
    }
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});