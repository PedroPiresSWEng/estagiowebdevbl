var dados;

function enviarDados(){

var requisicao = new XMLHttpRequest();
var url = "http://127.0.0.1:3000";

	requisicao.open("GET", url, true);
	requisicao.responseType = 'json';

var dados = JSON.stringify(dados);
	requisicao.send(dados);

console.log('requisicaoFeita');
};
