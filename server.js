require("dotenv").config();
const express=require("express");
const app=express();
const path=require("path");
const session=require('express-session');
const flash=require("express-flash");
const MongoDbStore=require("connect-mongo");

// Dynamic Port
const PORT=process.env.PORT||3000
const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
//Connect mongoDB
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connection successful...")).catch((err)=>console.log(err));
const connection = mongoose.connection; 
// connection.once('open', () => {
// console.log('Database connected...');
// }).catch(err,() => {
// console.log('Connection failed...')
// });

//Template Engine
const ejs=require("ejs");

//Express layout
const expressLayout=require('express-ejs-layouts');


//session store
// let mongoStore=new MongoDbStore({
//     mongooseConnection:connection,
//     collection:'sessions'
// })

// session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
resave: false,
store:MongoDbStore.create({
    mongoUrl:url
}),
// strore:mongoStore,
saveUninitialized: false,
// cookie: { maxAge: 1000*15 }
cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))



app.use(flash());

//Assets 
app.use(express.static('public'));
app.use(express.json());

//global middlewares
app.use((req,res,next)=>{
res.locals.session=req.session
next()
})

// set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname,"/resources/views"));
app.set("view engine","ejs");


const initRoutes=require("./routes/web")
initRoutes(app);

app.listen( PORT,() => {
    console.log(`Expresso ☕ is on Port ${ PORT } Ctrl + C to Stop `) 
});
