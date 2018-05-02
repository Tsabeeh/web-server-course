const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');
const port =process.env.PORT||3000 ;

var app = express ();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engin','hbs')
app.use(express.static(__dirname +'/puplic'));
app.use((req,res,next)=>{

  var now =new Date ().toString();
  var log = `${now}  ${req.method} ${req.url}` ;
  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (err)=>{
    if (err) {
      console.log ('error in fs append file')
    }
  });
  next();

});



app.use((req,res,next)=>{

res.render('maintenance.hbs');
});







hbs.registerHelper('getcurrntyear', ()=> {
return  new Date().getFullYear() ;
    });
    hbs.registerHelper('scremIt', (text)=> {
    return  text.toUpperCase();
        });

app.get('/',(req,res)=>{
res.render('home.hbs',{
  TittleName: 'Tsabeeh'

});
});

app.get('/about', (req,res)=>{
  res.render('about.hbs', {
  TittleName :'about page'

  });
});

app.get('/bad',(req,res)=>{
  res.send({
errorMessage: 'unable to start '
});

});
app.listen( port , ()=>{
  console.log(`server is up on port  ${port}`)
} );
