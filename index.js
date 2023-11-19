/*var user = { nome: "Jogador", vitoria: 0, derrota: 0, empate: 0, pontos: 0 };
var user2 = { nome: "Jogador2", vitoria: 0, derrota: 0, empate: 0, pontos: 0 };
var user3 = { nome: "Jogador3", vitoria: 0, derrota: 0, empate: 0, pontos: 0 }; */
//document.getElementById("popup_del").style.display = "none"; //menu de remocao do jogador (invisivel)
//document.getElementById("popup_add").style.display = "none"; //menu de adicionar jogador (invisivel)

var defUserImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png";


var bodyTable = document.getElementById("body_table");
var jogadores = []; //array de jogadores

//funcao para adicionar vitoria
function addVitoria(indice) {
    jogadores[indice].vitoria += 1;
    jogadores[indice].pontos = pontos(indice, "vitoria");
    executarLista();
}

//funcao para adicionar derrota
function addDerrota(indice) {
    jogadores[indice].derrota++;
    executarLista();
}

//funcao para adicionar empate
function addEmpate() {
    for (var h = 0; h < jogadores.length; h++) {
        jogadores[h].empate++;
        jogadores[h].pontos += pontos(h, "empate");
    }
    executarLista();
}

//funcao para manipular pontos
function pontos(indice, tipo) {
    var pontos;
    if (tipo === "vitoria") {
        pontos = jogadores[indice].vitoria;
        pontos *= 3 + jogadores[indice].empate;
        return pontos;
    } else if (tipo === "empate") {
        pontos = 1;
        return pontos;
    }
}

//exibir menu para adicionar jogador
function add_player() {
    /*var popupadd = document.getElementById("popup_add");
	if(popupadd.style.display === "none"){
		popupadd.style.display = "block";
	}else{
		popupadd.style.display = "none";
	}*/

    document.getElementById("popup_add").classList.toggle("classAddMenu");
}

//funcao para adicionar jogador
function add() {
    var iptJogador = document.getElementById("in_nome");
    var iptFoto = document.getElementById("in_foto");
    
    var currentImage;
    if (
        iptJogador.value != "" &&
        iptFoto.value != "" &&
        (iptFoto.value.endsWith("jpg") || iptFoto.value.endsWith("png") || iptFoto.value === "default")
    ) {
    	if(iptFoto.value === "default"){
    		currentImage = defUserImg;
    	}else{
    		currentImage = iptFoto.value;
    	}
        var obj = {
            nome: iptJogador.value,
            foto: currentImage,
            vitoria: 0,
            derrota: 0,
            empate: 0,
            pontos: 0
        };
        jogadores.push(obj);
        executarLista();
        iptJogador.value = "";
        iptFoto.value = "";
        document.getElementById("popup_add").classList.toggle("classAddMenu");
    } else {
        iptJogador.style.border = "solid red 2px";
        iptJogador.placeholder = "adicione um nome.";
        iptFoto.style.border = "solid red 2px";
        iptFoto.placeholder = ".jpg ou .png";

        setTimeout(function () {
            iptJogador.style.border = "none";
            iptJogador.placeholder = "nome";
            iptFoto.style.border = "none";
            iptFoto.placeholder = "url";
        }, 2000);
    }
}

//resetar todos os pontos
function resetAll() {
    jogadores.forEach(item => {
        item.vitoria = 0;
        item.derrota = 0;
        item.empate = 0;
        item.pontos = 0;
    });
    executarLista();
}

//exibir menu para remover jogador
function menuDel() {
    listarOpcoesRemover();
    /*var popupdel = document.getElementById("popup_del");
	if(popupdel.style.display === "none"){
		popupdel.style.display = "block";
	}else{
		popupdel.style.display = "none";
	}*/

    document.getElementById("popup_del").classList.toggle("classDelMenu");
}

//funcao para remover jogador individualmente
function remover() {
    var el = document.getElementById("options_select").value;
    if (el != null) {
        jogadores.forEach((item, indice) => {
            if (item.nome === el) {
                jogadores.splice(indice, 1);
            }
        });
        document.getElementById("popup_del").classList.toggle("classDelMenu");
        executarLista();
    } else {
    }
}

//Remover todos os jogadores
function removeAll() {
    jogadores = [];
    executarLista();
}

//listar opcoes para remoção individual
function listarOpcoesRemover() {
    var el = document.getElementById("options_select");
    el.innerHTML = "";
    jogadores.forEach(item => {
        el.innerHTML += `
		<option value ="${item.nome}">${item.nome}</option>
		`;
    });
}

//executar a lista de jogadores
function executarLista() {
    bodyTable.innerHTML = "";
    for (var i = 0; i < jogadores.length; i++) {
        bodyTable.innerHTML +=
            `<tr>
							<td><div><img src="${jogadores[i].foto}">${jogadores[i].nome}</div></td>
							<td>${jogadores[i].vitoria}</td>
							<td>${jogadores[i].derrota}</td>
							<td>${jogadores[i].empate}</td>
							<td>${jogadores[i].pontos}</td>
							<td><button id="vit" onclick="addVitoria(` +
            i +
            `)">vitoria</button>
							<button id="der" onclick="addDerrota(` +
            i +
            `)">derrota</button>
							<button id="emp" onclick="addEmpate()">empate</button></td>
						</tr>`;
    }
}

executarLista();
