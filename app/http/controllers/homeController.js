const { find } = require('laravel-mix/src/File');
const Menu=require('../../models/menu');
function home(){
    return {
        index:async function(req,res){
            const pizzas=await Menu.find();
            // console.log(pizzas);
           return res.render("home",{pizzas:pizzas});

            // Menu.find().then(function(pizzas){
            //     res.render("home",{pizzas:pizzas});
                
            // })
        }
    }
}
module.exports=home;