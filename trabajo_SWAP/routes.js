module.exports=function(app){
	var Asignatura= require('./modelos/asignatura.js');

	//GET - Return all asignaturas in the DB
	findAll = function(req, res) {
			Asignatura.find(function(err, asignaturas) {
    			if(!err) res.send(asignaturas);
    			else  console.log('Error' + err);
			});
	};

	
	//GET - Return a Asignatura with specified ID
	findById = function(req, res) {
		Asignatura.findById(req.params.id, function(err, asignatura) {
    		if(!err) return res.send(asignatura);
    		else  console.log('Error' + err)
		});
	};

	//POST - Insert a new Asignatura in the DB
	add= function(req, res) {
		console.log('POST');
		console.log(req.body);

		var asignatura = new Asignatura({
			
			nombre:    req.body.nombre,
			año: 	  req.body.año,
			convocatorias:  req.body.convocatorias,
			tipo:   req.body.tipo,
			estado:  req.body.estado
			
		});

		asignatura.save(function(err, asignatura) {
			if(!err){
				res.send(asignatura);
				console.log('asignatura guardada');
			} 
	    	else  console.log('Error' + err)	
		});
		res.send(asignatura);
	};

	//PUT - Update a register already exists
	update = function(req, res) {
		Asignatura.findById(req.params.id, function(err, asignatura) {
			asignatura.nombre   = req.body.nombre;
			asignatura.año    =  req.body.año;
			asignatura.convocatorias = req.body.convocatorias;
			asignatura.tipo  = req.body.tipo;
			tvshow.estado = req.body.estado;

			asignatura.save(function(err) {
				if(!err) { 
					res.send(asignatura);
					console.log('asignatura modificada');
				}
	    		else  console.log('Error' + err)	
	      		
			});
		});
	};

//DELETE - Delete a asignatura with specified ID
deleteAsig = function(req, res) {
	Asignatura.findById(req.params.id, function(err, asignatura) {
		asignatura.remove(function(err) {
			if(!err) 
				console.log('asignatura borrada');
			else console.log('Error' + err) ;
			});
		});
	};

//Api Rutas
app.get('/asignaturas',findAll);
app.get('/asignaturas/:id',findById);
app.post('/asignaturas',add);
app.put('/asignaturas/:id',update);
app.delete('/asignaturas/:id',deleteAsig);

app.get('/',function(req,res){
	res("usage: http//localhost:3000/asignaturas");
});


}