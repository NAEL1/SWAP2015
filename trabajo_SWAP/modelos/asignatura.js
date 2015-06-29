var mongoose = require('mongoose'),
	
		asignaturaSchema = new mongoose.Schema({
			_id : Number,
			nombre: String,
			año:  Number,
			convocatorias: Number,
			estado: 		{
				type:String,
				enum:['aprobada','suspendida','cursando','casi_aprobada']
							},
			tipo: 			{
				type:String,
				enum:['obligatoria','troncal','optativa','libre_configuracion']
							}
			
	});
 	module.exports = mongoose.model('Asignatura',asignaturaSchema);
	

	
