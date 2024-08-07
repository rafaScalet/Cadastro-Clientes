// aplica mascaras para o elemento que tenha o id == inputCEP
$('#inputCEP').mask('99999-999');

// inicializa um array vazio de clientes
const clients = [];

// função que, quando chamada, retorna um objeto data, como todos os valores de todos os inputs, incluindo o id
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

//função que faz a busca do cep pela api
function searchCEP (CEPValue) {

	const errorMsg = document.querySelector('.text-danger');
	// remove qualquer carácter que não seja um número do CEP.
	const CEP = CEPValue.replace(/\D/g, '');
	// expressão regular para validar o CEP
	const validation = /^[0-9]{8}$/;

	// se o CEP não for informado ou for inválido(tendo menos de 8 dígitos), lança um alerta e encerra a função
	if (!CEP || !validation.test(CEP)) {
		cleanUp(true);
		return errorMsg.innerHTML = 'Cep inválido'
	};

	// faz um request para a API para receber os dados do CEP enviado, e retorna como um objeto js
	fetch(`https://viacep.com.br/ws/${CEP}/json/`).then(response => response.json()).then(data => {
		if (data.erro == 'true') {
			cleanUp(true);
			return errorMsg.innerHTML = 'Cep não encontrado'
		};

		insertDataByCEP(data);
	});
};

// coloca os valores de data (usado no método acima) nos values de cada input
function insertDataByCEP (data) {
	document.getElementById('inputAddress').value = data.logradouro;
	document.getElementById('inputNeighborhood').value = data.bairro;
	document.getElementById('inputCity').value = data.localidade;
	document.getElementById('inputState').value = data.uf;
	document.getElementById('inputNumber').disabled = false;
};

// função chamada pelo botão salvar
function save () {
	//define uma constante data com os valores recebidos da função getValues
	const data = getValues();

	// adiciona os valores do constante ao array de clients
	clients.push(data);

	// função para adicionar uma linha a tabela com os valores da constante data
	newRow(data);

	// limpa todos os inputs
	cleanUp();
};


// função que cria uma nova linha na tabela, recebe como para clients, passado pelo método acima
function newRow (clients) {
	// constantes para facilitar a manipulação da tabela
	const table = document.getElementById('tableClients');
  const newRow = table.insertRow();

	// cria uma constante para cada célula da tabela
  const idCell = newRow.insertCell();
	// cria um nó de texto para cada item dentro de clients, e adiciona ele a célula da tabela
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