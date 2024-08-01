$('#inputCEP').mask('99999-999');

const clients = [];

function getValues () {
	const data = {
		id: clients.length + 1,
		name: document.getElementById('inputName').value,
		surname: document.getElementById('inputSurname').value,
		CEP: document.getElementById('inputCEP').value,
		address: document.getElementById('inputAddress').value,
		number: document.getElementById('inputNumber').value,
		neighborhood: document.getElementById('inputNeighborhood').value,
		city: document.getElementById('inputCity').value,
		state: document.getElementById('inputState').value
	};

	return data;
}

// quando chamada declara todos os valores do inputs como '', exceto quando (onlyCEP) for true
function cleanUp (onlyCEP) {
	if (onlyCEP) {
		document.getElementById('inputCEP').value = '';
		return
	};
	document.getElementById('inputName').value = '';
	document.getElementById('inputSurname').value = '';
	document.getElementById('inputCEP').value = '';
	document.getElementById('inputAddress').value = '';
	document.getElementById('inputNumber').value = '';
	document.getElementById('inputNeighborhood').value = '';
	document.getElementById('inputCity').value = '';
	document.getElementById('inputState').value = '';
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
	});
};

function insertDataByCEP (data) {
	document.getElementById('inputAddress').value = data.logradouro;
	document.getElementById('inputNeighborhood').value = data.bairro;
	document.getElementById('inputCity').value = data.localidade;
	document.getElementById('inputState').value = data.uf;
	document.getElementById('inputNumber').disabled = false;
};

function save () {
	const data = getValues();
	clients.push(data);
	newRow(data);
	cleanUp();
};

function newRow (clients) {
	const table = document.getElementById('tableClients');
  const newRow = table.insertRow();

  const idCell = newRow.insertCell();
  idCell.appendChild(document.createTextNode(clients.id));

  const completeNameCell = newRow.insertCell();
  completeNameCell.appendChild(document.createTextNode(`${clients.name} ${clients.surname}`));

  const CEPCell = newRow.insertCell();
  CEPCell.appendChild(document.createTextNode(clients.CEP));

  const addressCell = newRow.insertCell();
  addressCell.appendChild(document.createTextNode(`${clients.address} ${clients.number}`));

  const neighborhoodCell = newRow.insertCell();
  neighborhoodCell.appendChild(document.createTextNode(clients.neighborhood));

  const cityCell = newRow.insertCell();
  cityCell.appendChild(document.createTextNode(clients.city));

  const stateCell = newRow.insertCell();
  stateCell.appendChild(document.createTextNode(clients.state));
};