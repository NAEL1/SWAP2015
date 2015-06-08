var express = require("express"),
	app = express(),
	http=require("http"),
	server=http.createServer(app),
	mongoose=require('mongoose')

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});


mongoose.connect('mongodb://localhost/asignaturas',function(err,res){
	if(err){
		console.log('Error conctando a la bd'+ err);
	}
	else{
		console.log('Conectado a la base de datos');
	}
});

require('./routes')(app);

server.listen(3000,function(){
	console.log('servidor node escuchando el puerto 3000');
});