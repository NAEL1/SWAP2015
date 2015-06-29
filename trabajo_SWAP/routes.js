module.exports=function(app){
	var Asignatura= require('./modelos/asignatura.js');

	//GET - devuelve todas las asignaturas de la BD
	findAll = function(req, res) {
			Asignatura.find(function(err, asignaturas) {
    			if(!err) res.send(asignaturas);
    			else  console.log('Error' + err);
			});
	};

	
	//GET - devuelve una  Asignatura  por el id especefico
	findById = function(req, res) {
		Asignatura.findById(req.params.id, function(err, asignatura) {
    		if(!err) return res.send(asignatura);
    		else  console.log('Error' + err)
		});
	};

	//POST - inserta una  Asignatura en la DB
	add= function(req, res) {
		console.log('POST');
		console.log(req.body);

		var asignatura = new Asignatura({
			_id: req.body._id,
			nombre:    req.body.nombre,
			año: 	  req.body.año,
			convocatorias:  req.body.convocatorias,
			estado:  req.body.estado,
			tipo:   req.body.tipo
			
			
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

	//PUT -actualiza los registros existentes
	update = function(req, res) {
		Asignatura.findById(req.params.id, function(err, asignatura) {
			//asignatura._id = req.body.id;
			asignatura.nombre   = req.body.nombre;
			asignatura.año    =  req.body.año;
			asignatura.convocatorias = req.body.convocatorias;
			asignatura.estado = req.body.estado;
			asignatura.tipo  = req.body.tipo;
			
			asignatura.save(function(err) {
				if(!err) { 
					res.send(asignatura);
					console.log('asignatura modificada');
				}
	    		else  console.log('Error' + err)	
	      		
			});
		});
	};

//DELETE - borra una asignatura con un id especifico
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
	res.send("<strong>Listar todas las asignaturas:</strong> <br/> http//localhost:3000/asignaturas <br/> <strong>Listar una asignatura(id):</strong> <br/> http//localhost:3000/asignaturas/:id");
	

});



}