$('#inputCEP').mask('99999-999');

// quando chamada declara todos os valores do inputs como '', exceto quando (onlyCEP) for true
function cleanUp (onlyCEP) {
	if (onlyCEP) {
		document.getElementById('inputCEP').value = '';
	};
};

function searchCEP (CEPValue) {
	// remove qualquer carácter que não seja um número do CEP.
	const CEP = CEPValue.replace(/\D/g, '');
	// expressão regular para validar o CEP
	const validation = /^[0-9]{8}$/;

	// se o CEP não for informado ou for inválido(tendo menos de 8 dígitos), lança um alerta e encerra a função
	if (!CEP || !validation.test(CEP)) {
		cleanUp(true);
		return alert('CEP inválido');
	};

	// faz um request para a API para receber os dados do CEP enviado, e retorna como um objeto js
	fetch(`https://viacep.com.br/ws/${CEP}/json/`).then(response => response.json()).then(data => {
		if (data.erro == 'true') {
			cleanUp(true);
			return alert('CEP não encontrado');
		};

		insertDataByCEP(data);
		console.log(data);
	});
};

function insertDataByCEP (data) {
	document.getElementById('inputAddress').value = data.logradouro;
	document.getElementById('inputNeighborhood').value = data.bairro;
	document.getElementById('inputCity').value = data.localidade;
	document.getElementById('inputState').value = data.uf;
	document.getElementById('inputNumber').disabled = false;
};