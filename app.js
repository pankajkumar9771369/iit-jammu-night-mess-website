const express =require("express");
const mongoose=require('mongoose');
const app=express()
const User=require('./models/user.js');
const Order=require("./models/order.js")
const userRoute=require('./routes/user.js');
const orderRoute=require('./routes/order.js');
    
if(process.env.NODE_ENV!='Production'){
    require('dotenv').config();
}

const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');

const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');

const LocalStrategy=require('passport-local');

app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

const sessionOptions={
    secret:'mysecretcode',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000+60*60*24*3,
        maxAge:1000+60*60*24*3,
        httpOnly:true
    }
}
app.use(session(sessionOptions));
app.use(flash());




const dbUrl = process.env.ATLASDB_URL || 'your-default-mongodb-url-here';


async function main() {
  try {
   
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to DB');
  } catch (err) {
    console.error('DB connection error:', err);
  }
}

main().catch(err => console.log(err));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.curruser=req.user;
    next();
});


app.use('/',userRoute);

app.use("/",orderRoute);

app.get("/",async(req,res)=>{
    res.render("orders/Home.ejs")
})
app.get("/dashboard",async(req,res)=>{
    res.render("orders/Dashboard.ejs")})

  
app.all('*',(req,res,next)=>{
    res.render('orders/error.ejs');
});
app.use((err,req,res,next)=>{
    let{status=404,message='Validation Error'}=err;
    if(err.kind==='ObjectId'){
        res.status(status).send('Invalid URL');
    }
    else res.render('orders/error.ejs',{err});
});
app.listen(8080,(req,res)=>{
    console.log('App is Listening at port 8080');
});
