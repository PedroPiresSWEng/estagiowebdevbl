let moment = require('moment');
let axios = require('axios');
moment.locale('pt-br');

function booleanCep(cep_recipient_number, cep_sender_number){
	return (!(((cep_recipient_number>=1000000 && cep_recipient_number<=39999999) && (cep_sender_number>=1000000 && cep_sender_number<=39999999))
		|| ((cep_recipient_number>=40000000 && cep_recipient_number<=65999999) && (cep_sender_number>=40000000 && cep_sender_number<=65999999))
		|| ((cep_recipient_number>=80000000 && cep_recipient_number<=99999999) && (cep_sender_number>=80000000 && cep_sender_number<=99999999))
		|| (((cep_recipient_number>=70000000 && cep_recipient_number<=76799999) || (cep_recipient_number>=78000000 && cep_recipient_number<=79999999)) && ((cep_sender_number>=70000000 && cep_sender_number<=76799999) || (cep_sender_number>=78000000 && cep_sender_number<=79999999)))
		|| (((cep_recipient_number>=66000000 && cep_recipient_number<=69999999) || (cep_recipient_number>=76800000 && cep_recipient_number<=77999999)) && ((cep_sender_number>=66000000 && cep_sender_number<=69999999) || (cep_sender_number>=76800000 && cep_sender_number<=77999999)))
		));
}

let ShippingController = { //objeto
	postShipping : function(req, res, next){ // Parâmetros da URL. Enviar os dados pro Back-end e chamar as APIs.
		
		let cep_recipient = req.param('cep_recipient');
		let cep_sender = req.param('cep_sender');
		let now = moment().format('YYYY-MM-DD h:mm:ss');
		let arrive = moment().add(1,'days').format('YYYY-MM-DD h:mm:ss');
		let taxPrice = 0;

		axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+cep_sender+'&destinations='+cep_recipient+'&mode=driving&language=pt-BR&sensor=false')
		.then(function(result){
			let googleApi = result.data;
			let waitTime = googleApi.rows[0].elements[0].duration.value;
			let distance = googleApi.rows[0].elements[0].distance.value;
			let week = moment(arrive.toString()).format('dddd');
			let hour = 0;
			let minutes = 0;
			let seconds = 0;

			while(waitTime>0){
				if (waitTime>=28800) {
					if(week!='Domingo'){
						waitTime -= 28800;
						arrive = moment(arrive.toString()).add(1,'days').format('YYYY-MM-DD h:mm:ss');
						week = moment(arrive.toString()).format('dddd');
					}else{
						arrive = moment(arrive.toString()).add(1,'days').format('YYYY-MM-DD h:mm:ss');
						week = moment(arrive.toString()).format('dddd');
							}
						}else{
							if (waitTime<=14400){
								waitTime += 28800;
								hour = Math.floor(waitTime/3600);
								waitTime -= hour*3600;
								minutes = Math.floor(waitTime/60);
								waitTime -= minutes*60;
								seconds = Math.floor(waitTime);
								waitTime = 0;

								arrive = moment(arrive.toString()).format('YYYY-MM-DD');
								arrive = moment(arrive.toString() + " " + hour + ":" + minutes + ":" + seconds).format('YYYY-MM-DD h:mm:ss');
							}else{
								waitTime += 36000;
								hour = Math.floor(waitTime/3600);
								waitTime -= hour*3600;
								minutes = Math.floor(waitTime/60);
								waitTime -= minutes*60;
								seconds = Math.floor(waitTime);
								waitTime = 0

								arrive = moment(arrive.toString()).format('YYYY-MM-DD');
								arrive = moment(arrive.toString() + " " + hour + ":" + minutes + ":" + seconds).format('YYYY-MM-DD h:mm:ss');
							}
						}
			}

			taxPrice = distance*0.0012;
			cep_recipient_number = parseInt(cep_recipient);
			cep_sender_number = parseInt(cep_sender);
			
			if (booleanCep(cep_recipient_number, cep_sender_number)){ 
				taxPrice *= 1.3; 
			}

			res.json({
			nameSender: req.param('nameSender'),
			cepSender: cep_sender,
			nameRecipient: req.param('nameRecipient'),
			cepRecipient: cep_recipient,
			dateNow: now,
			dateArrive: arrive,
			taxPrice: taxPrice,
			test: 'test'
			});
		})
		.catch(function(error){
		res.status(500);             
			if (error.response) {                 
				res.json({ 					
					data: error.response.data, 					
					status: error.response.status, 					
					headers: error.response.headers 				
				});             
			} else if (error.request) { 
				res.json({request: error.request});
				} else {
					res.json({message: error.message});             
					}
						res.json({config: error.config}); 		
						});
	},
	getShipping : function(req, res, next){
		res.json({name: 'Pedro'});
	}
};

module.exports = ShippingController;