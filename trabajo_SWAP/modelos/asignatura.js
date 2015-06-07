var mongoose = require('mongoose'),
	
		asignaturaSchema = new mongoose.Schema({

			nombre: String,
			año:  Number,
			convocatorias: 	{types: Number},
			tipo: 			{
				type:String,
				enum:['obligatoria','troncal','optativa','libre_configuracion']
							},

			estado: 		{
				type:String,
				enum:['aprobada','suspendida','cursando','casi_aprobada']

				}	
	});
 	module.exports = mongoose.model('Asignatura',asignaturaSchema);
	
