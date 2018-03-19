angular.module('frontCalculadora',[])
	.controller('ShippingController', function($scope){
		let self = this; //Sempre se refere ao que você está acessando. Nesse caso, o controller.
		$scope.shippings = [{
				nameSender: $scope.nameSender,
				cep_sender: $scope.cepSender,
				nameRecipient: $scope.nameRecipient,
				cep_recipient: $scope.cepRecipient
			}];

		$scope.postShipping = function(){
			//let shippingData = new FormData(); Organiza os dados para poder enviar um formulário para o servidor.

			let shippingData = {
				nameSender: $scope.nameSender,
				cep_sender: $scope.cepSender,
				nameRecipient: $scope.nameRecipient,
				cep_recipient: $scope.cepRecipient
			};

			let config = { headers: {    'Content-Type': 'application/x-www-form-urlencoded', } };

			console.log('Está chegando aqui');

			/*
			shippingData.append('nameSender', $scope.nameSender);
			console.log($scope.nameSender);
			shippingData.append('cep_sender', $scope.cepSender);
			console.log($scope.cepSender);
			shippingData.append('nameRecipient', $scope.nameRecipient);
			console.log($scope.nameRecipient);
			shippingData.append('cep_recipient', $scope.cepRecipient);
			console.log($scope.cepRecipient); 
			*/

			axios.post('/api/shippings?'+ jQuery.param(shippingData))
			.then(function(result){
				if (result){
					$scope.shippings.push(result.data);
					console.log($scope.shippings);
				}
			})

			.catch(function(error){             
			if (error.response) {                 
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers); 					
			} else if (error.request) { 
				console.log({request: error.request});
				} else {
					console.log({message: error.message});             
					}
						console.log({config: error.config}); 		
						});
		}
	})