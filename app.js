var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    request    = require("request"),
    query      = null,
    query2     = null,
    data       = [
                  {name:"Property 1",area:450,cost:1102,location:"Rajajipuram Lucknow",dist:"0",dist2:"0"},
                  {name:"Property 2",area:860,cost:1520,location:"Lanka Varanasi",dist:"0",dist2:"0"},
                  {name:"Property 3",area:665,cost:800,location:"Rana Pratap Bagh Delhi",dist:"0",dist2:"0"},
                  {name:"Property 4",area:1350,cost:456,location:"Andheri East Mumbai",dist:"0",dist2:"0"},
                  {name:"Property 5",area:1620,cost:2105,location:"Victoria Memorial Hall Kolkata",dist:"0",dist2:"0"}
                 ],
    c;
    
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");


app.get("/",function(req, res) {
   data=[
      {name:"Property 1",area:450,cost:1102,location:"Rajajipuram Lucknow",dist:"0",dist2:"0"},
     {name:"Property 2",area:860,cost:1520,location:"Lanka Varanasi",dist:"0",dist2:"0"},
     {name:"Property 3",area:665,cost:800,location:"Rana Pratap Bagh Delhi",dist:"0",dist2:"0"},
     {name:"Property 4",area:1350,cost:456,location:"Andheri East Mumbai",dist:"0",dist2:"0"},
     {name:"Property 5",area:1620,cost:2105,location:"Victoria Memorial Hall Kolkata",dist:"0",dist2:"0"}
       ];
   res.render("search",{data1:data,query:query});
});
 

app.post("/search",function(req,res){
  c=0;
  query=req.body.currentlocation;
  apicollect();
  res.redirect("/search");
});


app.get("/search",function(req,res){
   res.render("results",{data1:data,query:query});
});
 
 
app.post("/compare",function(req,res){
  c=1;
  query2=req.body.currentlocation2;
  apicollect();
  res.redirect("/compare");
});
 
 
app.get("/compare",function(req,res){
 res.render("compare",{data1:data,query:query,query2:query2});
});
 

function apicollect(){
   data.forEach(function(property){ 
     if(c===1){
      var url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+query2+"&destinations="+property['location']+"&apikey=AIzaSyByHUY8tGxwZHprJhVbJ6ddS066__4DXos";
     }
     else{
      var url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+query+"&destinations="+property['location']+"&apikey=AIzaSyByHUY8tGxwZHprJhVbJ6ddS066__4DXos";
     }
     request(url,function(error,response,body){
       if(!error&&response.statusCode==200){
           var apidata=JSON.parse(body);
           if(apidata["rows"][0]["elements"][0]["status"]=="ZERO_RESULTS"){
              console.log("error");
              return;
           }
           else{
             if(c===0){
                property['dist']=apidata["rows"][0]["elements"][0]["distance"]["text"];
             }
             else if(c===1){
                property['dist2']=apidata["rows"][0]["elements"][0]["distance"]["text"];
             }
           }
        }
     });
   });
   
   
   	 var i,j;	if(data[0]['dist']!="0" && typeof(data[0]['dist'])=="string" ){		for(j=0;j<5;j++){			var num="";			var n= data[j]['dist'].indexOf(" ");			for(i=0;i<n;i++){				if(data[j]['dist'][i]!=",")				num = num+data[j]['dist'][i];			}		data[j]['dist']=Number(num);		}	}  

}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!!");
});