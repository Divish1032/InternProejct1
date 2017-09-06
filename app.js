var express=require("express");
var app=express();
var bodyParser = require("body-parser");
var c=0;
var i,j;
app.use(bodyParser.urlencoded({extended: true}));
var request=require("request");
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
var data=[
       {name:"Property 1",area:"450 sq.feet",cost:1102,location:"Rajajipuram Lucknow",dist:"0"},
       {name:"Property 2",area:"860 sq.feet",cost:1520,location:"Lanka Varanasi",dist:"0"},
       {name:"Property 3",area:"665 sq.feet",cost:800,location:"Rana Pratap Bagh Delhi",dist:"0"},
       {name:"Property 4",area:"1350 sq.feet",cost:456,location:"Andheri East Mumbai",dist:"0"},
       {name:"Property 5",area:"1620 sq.feet",cost:2105,location:"Victoria Memorial Hall Kolkata",dist:"0"}
         ];
var query=null;
 app.get("/",function(req, res) {
     res.render("search",{data1:data,query:query});
     
 });
 app.post("/search",function(req,res){
       data=[
       {name:"Property 1",area:"450 sq.feet",cost:1102,location:"Rajajipuram Lucknow",dist:"0"},
       {name:"Property 2",area:"860 sq.feet",cost:1520,location:"Lanka Varanasi",dist:"0"},
       {name:"Property 3",area:"665 sq.feet",cost:800,location:"Rana Pratap Bagh Delhi",dist:"0"},
       {name:"Property 4",area:"1350 sq.feet",cost:456,location:"Andheri East Mumbai",dist:"0"},
       {name:"Property 5",area:"1620 sq.feet",cost:2105,location:"Victoria Memorial Hall Kolkata",dist:"0"}
         ];
       query=req.body.currentlocation;
      
      
      data.forEach(function(property){ 
       
      
       var url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+query+"&destinations="+property['location']+"&apikey=AIzaSyByHUY8tGxwZHprJhVbJ6ddS066__4DXos";
       request(url,function(error,response,body){
           if(!error&&response.statusCode==200){
               var apidata=JSON.parse(body);
               if(apidata["rows"][0]["elements"][0]["status"]=="ZERO_RESULTS"){
                   console.log("error")
               }
               else{
               property['dist']=apidata["rows"][0]["elements"][0]["distance"]["text"];
               }
           
       
      }
                
           
       });
       
      
      });
       
      
    res.redirect("/search");
   
 });
 
  app.get("/search",function(req,res){
   res.render("results",{data1:data,query:query});
  });
 
 app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!!");
});