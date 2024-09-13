import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeHightlighter({ children }) {
  return (
    <SyntaxHighlighter
      customStyle={{
        borderRadius: "10px",
        padding: "20px",
        maxHeight: "80vh",
        width: "700px",
        overflow: "auto",
        whiteSpace: "pre-wrap",
        fontSize: "0.9rem",
      }}
      language="cpp"
      style={atomOneDark}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default function RpgCode() {
  return (
    <CodeHightlighter>
      {`#include <iostream>
using namespace std;
/* Inventario
Cena 0: o Inicio
Cena 1: floresta
Cena 2: Covil Dragao
Cena 3: ruinas
cena 4: Praça
cena 5: Biblioteca/Galpao
cena 6: caverna
cena 7: o dragao*/

// Sopa = 1(Sopa incopleta: final ruim), Sopa = 2(sopa completa: final bom)
int int_conhecimento,
    escolha,
    int_Cena,
    sopa,
    Nrepetir;

string sabedoria;

bool carne,
     cogumelo,
     drake_Morto,
     ruina,
     tocha,
     videiras = true;


void covil_Dragon(),
     ruinas(),
     cena(),
     inventario(),
     inicio(),
     caverna();


void desistir() {

	cout << "\nTem certeza\n1.Sim\n2.Nao\n";
	cin >> escolha;
	if(escolha == 1) {

		cout << "\nSem tenacidade para adentrar a Floresta de Nutrafall e com seu coracao consumido pela tenebrosa aura do lugar, voce decide dar meia-volta e retornar ao Reino humilhado. Voce e uma desonra a sua familia e a todos que confiaram em ti. Seus titulos de cavaleiro e explorador sao revogados e voce e condenado a humilhacao em praca publica.\n\nO Principe Morreu...\n";

		exit(0);
	} else {

		cout << "\nCom toda a coragem que possui voce decide continuar\n";
		inicio();

	};
};

void terminar() {

	if(sopa == 2) {
		cout << "\nRetornando ao reino com a sopa para salvar o principe, voce de imetiato a entrega para os curandeiros a levarem para o principe. Quando a primeira colherada e posta em sua boca ele parece melhorar quese que imediatamente. Seu corpo nao mais palido e sua repiracao estavel indicavam que havia funcionado. O Rei sabendo da noticia em homenagem a recuperacao de seu primogenito decide festejar no dia Seguinte e pelo servico feito voce esta convidado, nao so para a festa, quanto tambem para descansar esta noite em um dos quartos de hospede do castelo.\n\nNa calada da noite sons de briga sao escutados no quarto do filho mais velho do principe, indo investigar voce encontra o irmao mais novo com uma faca tentado apunhalar o principe. Interferindo na luta voce consegue ganhar tempo ate os guardas chegarem e levarem o filho mais novo aos calaboucos onde aguardara sua senteca.\n\n";


	} else if(sopa == 1) {
		cout << "\nRetornando ao reino com a sopa para salvar o principe, voce de imetiato a entrega para os curandeiros a levarem para o principe. Quando a primeira colherada e posta em sua boca ele comeca a se debater, seus batimentos comecam a acelarar exponencialmente. O filho mais novo vem em sua direcao questionando se aquilo realmente era a Sopa ancetral ou apenas um veneno feito para matar o principe? Antes que pudesse responder os guardas sao comandados a levare-no para o calabouco.\n\nAlgumas horas se passam.\n\nUma Figura envolta nas sombras aparece em frente a sua cela.\n\n-Inacraditavel como tudo deu tao certo, ne?\n-Tudo porque voce não encontrou eles - a Figura diz isso enquanto arremesa um cogumelo que voce nunca viu antes.\n\nSaindo das Sombras voce reconhece a figura e o filho mais novo do rei.\n\n-Por matar um membro da familia real sua execucao foi marcada pra amanha.\n-GraC'as a vocC* me tornarei rei em breve...\n\nE com um sorriso nefasto ele some novamente nas sombras.\n\nVoce Morreu.\n\n";
		exit(0);


	} else if(carne == true) {
		if(cogumelo == true) {
			cout << "\nRetornando ao reino com os ingredientes para salvar o principe, voce de imetiato os entrega para os curandeiros prepararem a sopa com os cogumelos e as escamas.Quando a primeira colherada e posta em sua boca ele comeca a se debater, seus batimentos comecam a acelarar exponencialmente. O filho mais novo vem em sua direcao questionando se aquilo realmente era a Sopa ancetral ou apenas um veneno feito para matar o principe? Antes que pudesse responder os guardas sao comandados a levare-no para o calabouco.\n\nAlgumas horas se passam.\n\nUma Figura envolta nas sombras aparece em frente a sua cela.\n\n-Inacraditavel como tudo deu tao certo, ne?\n-Voce conseguiu todos os ingredientes, mas faltou algo...\n-Eu deveria ter lhe avisado que fogo convencional nao consegue infudir os ingredientes...\n-Fazer o que, ne? - A Figura diz em tom risonho\n\nSaindo das Sombras voce reconhece a figura e o filho mais novo do rei.\n\n-Por matar um membro da familia real sua execucao foi marcada pra amanha.\n-Gracas a voce me tornarei rei em breve... \n\nE com um sorriso nefasto ele some novamente nas sombras.\n\nVoce Morreu.\n\n";
			exit(0);

		} else {
			cout << "\nRetornando ao reino com o ingrediente que salvara o principe, voce de imetiato o entrega para os curandeiros prepararem a sopa com as escamas. Quando a primeira colherada e posta em sua boca ele comeca a se debater, seus batimentos comecam a acelarar exponencialmente. O filho mais novo vem em sua direcao questionando se aquilo realmente era a Sopa ancetral ou apenas um veneno feito para matar o principe? Antes que pudesse responder os guardas sao comandados a levare-no para o calabouco.\n\nAlgumas horas se passam.\n\nUma Figura envolta nas sombras aparece em frente a sua cela.\n\n-Inacraditavel como tudo deu tao certo, ne?\n-Realmente contratei a pessoa certa.\n-Uma pessoa tao ingenua que nao se daria o trabalho de fazer nada mais que o necessario.\n\nSaindo das Sombras voce reconhece a figura e o filho mais novo do rei.\n\n-Por matar um membro da familia real sua execucao foi marcada pra amanha.\n-Gracas a voce me tornarei rei em breve... \n\nE com um sorriso nefasto ele some novamente nas sombras.\n\nVoce Morreu.\n\n";

		}
	};



}

void floresta() {
	int_Cena = 1;

	cout << "\nVagueando cada vez mais adentro a floresta, onde os raios de sol nao mais permeiam as volumosas folhas das arvores, com videiras que se entrelacam e formam pequenas paredes  e os passaros que hao de se calar, deixando apenas o vasto silencio em meio ao matagal. A sua frente, uma bifurcacao, um caminho seguindo reto e outro fazendo uma curva para a direita.\nPara onde seguir?\n\n1.Em frente\n2.A Direita.\n3.Inventario\n";
	if(videiras == true ) {
		if(tocha == true) {
			cout << "4.Queimar as Videiras\n";
		};
	} else if(cogumelo == false) {
		cout << "4.Passar pelas Videiras\n";
	};

	if(tocha == true && cogumelo == false) {
		if(sopa == 1 || sopa == 2 || carne == true) {
			cout << "5.Terminar missao.\n";
		}
	} else {
		if(sopa == 1 || sopa == 2 || carne == true) {
			cout << "4.Terminar missao.\n";
		};
	};

	cin >> escolha;
	if(escolha == 1) {
		ruinas();

	} else if(escolha == 2) {
		covil_Dragon();

	} else if(escolha == 3) {
		inventario();

	} else if(escolha == 4 && videiras == false) {
		caverna();

	} else if(escolha == 4 && tocha == true) {
		cout << "\nAproximando a tocha de fogo anciao das videiras, em poucos segundos apenas as cinzas restam e um novo caminho e descoberto\n";
		videiras = false;
		floresta();

	} else if(escolha == 4 && tocha == false) {
		terminar();

	} else if(escolha == 5  && (sopa == 1 || sopa == 2 || carne == true) && tocha == true) {
		terminar();

	};

}

void dragao() {
	int_Cena = 7;

	if(carne == false && sopa == 0){
		cout << "Ao entrar encontra apenas palha no chao e uma enorme escaderia em espiral.\n\n1.Subir\n2.Voltar\n";
		cin >> escolha;

		switch(escolha) {
		case 1:
			cout << "\nSubindo as escadas, voce estranha uma torre dessas ter apenas dois andares.\nAo chegar no topo voce se depara com um dragao pequeno, mas de longo pescoco, dormindo.\nO que fazer?\n\n1.Ataca-lo\n2.Pedir educadamente por algumas escamas.\n3.Sair\n";
			cin.ignore();
			cin >> escolha;

			switch(escolha) {

			case 1:
				cout << "\nPegando sua arma mais afiada voce parte para cima do sonolento dragao o acertando em cheio, entretanto sua resistentes escamas o protegem.\nAntes que conseguisse perceber o despertar do dragao, voce se encontra no chao sangrando. Sua ultima visao e do pequeno dragao devorando suas partes decepadas.\n";
				cout << "\nVoce morreu.\n\n";
				exit(0);

			case 2:
				cout << "\nApos poucos passos o dragao ainda de olhos fechados diz para parar de se aproximar e dizer o que quer.\n\n-Algumas escamas? - Ele se pergunta\n\n-Certo, lhe darei algumas escamas, mas sabe, tem sido entediante desde a ultima vez que me visitaram, nada para pensar, nada para fazer, apenas dormir e definhar e o que faco recentemente, ja que diferente dos outros dragoes nao acho que a riqueza estaja na maior quantia de ouro que se possa ter, pra mim o conhecimento e mais valioso, entao em troca das escamas me de algo valioso.\n\n";
				cin.ignore();
				getline(cin, sabedoria);
				cout << "-...\n-...\n-...Bom o bastante, pode pegar as escamas que precisa, ha varias das quais nao preciso mais espalhadas pela sala.\n-Assim que pegar o que precisa saia e feche a porta\n\n";
				cout << "Com as escamas ja em sua mochila, voce comeca a descer a escada, apenas para escutar o dragao se questionando.\n-" << sabedoria << "?\n-" << sabedoria << "?\n-" << sabedoria << "?\n-O que ele quis dizer com isso?\n\n";

				carne = true;
				covil_Dragon();
				break;

			case 3:
				covil_Dragon();
				break;
			};



		case 2:
			covil_Dragon();
			break;
		};

	} else {
		cout << "Ao entrar na torre voce escuta odragao ainda se questionando.\n-" << sabedoria << "?\n-" << sabedoria << "?\n-" << sabedoria << "?\n-O que ele quis dizer com isso?\n\n";
        cout << "Voce decide deixalo em paz por enquanto\n";
        covil_Dragon();
	};

};

void covil_Dragon() {
	int_Cena = 2;
	if(Nrepetir + 1 != 2) {
		cout << "\nA mata vai se fechando cada vez mais, mas insistindo muito voce chega em uma torre de pedra intacta, coberta por musgo e no topo algumas videiras pegando fogo, nao ha mais nehuma construcao por perto\n\n";
	};
	if(Nrepetir == 1) {

		cout << "1.Entrar\n2.Inventario\n3.Voltar\n";

		cin >> escolha;
		switch(escolha) {

		case 1:
			cout << "\nCom um rangido ecooante a porta se abre e voce entra\n";
			dragao();
			break;

		case 2:
			inventario();
			break;

		case 3:
			cout << "\nAo sair voce escuta a porta ranger e se fechar novamente\n\n";
			Nrepetir = 0;
			floresta();
			break;
		}
	} else {
		cout << "1.Bater na porta\n2.Tentar entrar\n3.Inventario\n4.Voltar\n";

	};
	cin >> escolha;
	switch(escolha) {
	case 1:
		cout << "\nAo bater na porta, seu som ecooa pela floresta juntamento ao rangido da porta lentamente se abrindo\n\n";
		Nrepetir = 1;
		covil_Dragon();
		break;

	case 2:
		cout << "\nCom um rangido ecooante a porta se abre e voce entra\n";
		dragao();
		break;

	case 3:
		inventario();
		break;

	case 4:
		cout << "\nAo sair voce escuta a porta ranger e se fechar novamente\n\n";
		Nrepetir = 0;
		floresta();
		break;
	}
};

void caverna() {
	int_Cena = 6;

	cout << "\nAo atravessar as videiras e caminhar um pouco voce chega a uma caverna. Entrando nela um pequeno lago azul cristalino pode ser encontrado. Cogumelos de uma especie que voce nunca viu crescem nas paredes desta caverna.\nO que fazer?\n1.Pegar alguns cogumelos\n2.Voltar";
	cin >> escolha;
	switch(escolha) {

	case 1:
		cout << "\nVoce coleta alguns cogumelos e volta para a floresta.\n";
		cogumelo = true;
		floresta();
		break;

	case 2:
		floresta();
		break;

	};

}

void praca() {
	int_Cena = 4;
	cout << "\nEnormes arcos de pedra a maioria despedacada no chao, alguns ainda em pe circulando um enorme caldeirao no centro, estranhamente ainda ha brasas em baixo do caldeirao, mas voce tem certeza absoluta de que e o primeiro pisar aqui em pelo menos dois seculos.\n\n";
	cout << "1.Voltar\n2.Inventario\n";

	if(carne == true) {
		cout << "3.Cozinhar\n";
	};
	if(int_conhecimento >= 1 && carne == false && tocha == false) {
		cout << "3.Pegar um pouco do Fogo\n";
		tocha = true;
	} else if(int_conhecimento >=1 && carne == true && tocha == false) {
		cout << "4.Pegar um pouco do Fogo\n";
		tocha = true;
	};

	cin >> escolha;

	switch(escolha) {

	case 1:
		ruinas();
		break;
	case 2:
		inventario();
		break;
	};
//Final Bom:
	if(escolha == 3 && cogumelo == true && carne == true) {
		cout << "Misturando os cogumelos junto as escamas no caldeirao, um cheiro de podre comeca a subir a cor da agua fica marrom lama com algumas manchas verde musgo.\nVoce tem vontade de jogar isso fora, mas e a unica coisa que salvara o filho mais novo do rei\n\n";
		sopa = 2;
		carne = false;
		cogumelo = false;

//Final Ruim:
	} else if(escolha == 3 && cogumelo == false && carne == true) {
		cout << "\nAo misturar as escamas junto agua, voce nota a cor da agua se alterar rapidamente e um cheiro maravilhoso comeC'a a emanar da sopa\n";
		sopa = 1;
		carne = false;
	};

	ruinas();
};

void galpao() {
	int_Cena = 5;
	string livro = "\nEste aqui parece ser historia do povoado, muitas das paginas ja se desfizeram devido ao tempo, mas as que sobraram contam sobre um Dragao que era louvado por este povoado, ja que em troca de comida e abrigo fornecia suas escamas velhas(comumente usado para armadura dado sua resistencia) e uma chama capaz de queimar para para todo o sempre. mesmo apos seu objeto ser completamente carbonizado, esta chama fora batizada de Fogo Anciao.\n",
	       pergaminho_1 = "\nSopa Ancestral:\nIngredientes:\n-2 Escamas de Deus.\n-5 Cogumelos Lunar.\n-3 Litros de agua.\n\nProcesso:\nEm um caldeirao aquecido por fogo ancicao coloque os cogumelos para cozinhar na agua e adicione as escamas pulverizadas.\n\n Aviso: Nao esquecer dos cogumelos ou criara veneno extremamente potente.\n",
	       pergaminho_2 = "\nParece ser uma requicisao para a autoridade local, nela esta dizendo que as videiras estao crescendo mais rapido e mais resistentes que o convencional, com nem mesmo a mais afiada das laminas conseguindo cortar. O requerimento pede um pouco de fogo anciao para eliminar de vez estas videiras antes que bloqueiem o caminho para a Caverna da Lagrima Lunar. Ha um carimbo em forma de 'X' em vermelho no canto superior.\n";
	if(int_conhecimento <= 0) {
		cout << "\nSubindo o morrinho e adentrando o galpao voce nota que isto e uma forma arcaica das bibliotecas atuais, tendo estantes entupidas de pergaminhos antigos e livros.\n Olhando por cima ha 2 pergaminhos e um livro que te chamam a atencao e ainda sao legiveis.\n";
		cout << "\nPor qual comecar?";
	} else if( int_conhecimento > 0) {
		cout << "\nVoce chega na biblioteca do vilarejo.";
		cout << "\nQual Livro voce que ler agora?";
	};
	cout << "\n1.Livro\n2.Pergaminho 1\n3.Pergaminho\n4.Voltar.\n";

	cin >> escolha;
	if(escolha == 1) {

		cout << livro;
		int_conhecimento = int_conhecimento + 1;
		galpao();
	} else if(escolha == 2) {

		cout << pergaminho_1;
		int_conhecimento = int_conhecimento + 1;
		galpao();
	} else if(escolha == 3) {

		cout << pergaminho_2;
		int_conhecimento = int_conhecimento + 1;
		galpao();
	} else {

		ruinas();
	};

};

void ruinas() {
	int_Cena = 3;
	if(ruina == false) {
		cout << "\nAo longo do caminho, aos poucos e cada vez mais nota-se pedregulhos e restos de uma civilizacao absortos pela mata.\n Mais a frente um clarao cega seus olhos ja desacostumados com a simples luz do dia, ao recuperar sua visao percebes uma clareira pouco mais a frente, parece ser o centro das ruinas. Nela ha apenas algumas construcoes intactas, sendo elas: algo similar a uma praca no meio das ruinas, um galpao em um morrinho e ao longe no em meio a floresta uma torre a direita de tudo.\n";
		cout << "\n1.Praca\n2.Galpao\n3.Torre\n4.Inventario\n5.Voltar\n";
		ruina = true;

	} else {
		cout << "\nVoce esta nas ruinas. Para onde ir?\n";
		cout << "1.Praca\n2.Galpao\n3.Torre\n4.Inventario\n5.Voltar\n";
	};

	cin >> escolha;
	switch(escolha) {

	case 1:
		praca();
		break;
	case 2:
		galpao();
		break;
	case 3:
		cout << "Mesmo olhando em cada canto das ruinas nao parece ter um caminho para a torre por aqui, a floresta deve ter bloqueado o caminho - quem sabe haja outro caminho - voce pensa para si mesmo.\n";
		ruinas();
		break;
	case 4:
		inventario();
		break;
	case 5:
		floresta();
		break;
	};
};

void inspecionar() {
	string inspecao;
	cout << "\nQual item voce quer inspecionar?\n";
	cin.ignore();
	getline(cin,inspecao);

	if(inspecao == "Equipamentos de Aventura") {

		cout << "\nPecas de roupa, utensilios de cozinha, fosforos, tochas apagadas, cantil de agua e...\n\n\n...uma marinada de 1 ano atras?\n Voce se esqueceu dela, nao?\n\n";
	};
	if(carne == true && inspecao == "Escamas de Dragao") {
		cout << "\nPara algumas civilizacoes dragoes sao Deuses, ter isso e como ter um pedaco de Deus com voce.\n\n";
	};
	if (cogumelo == true && inspecao == "Cogumelos Lunar") {
		cout << "\nMuitos anos atras a lua chorou, uma lagrima caiu aqui originando algumas cavernas e esta especie de Cogumelo...\n\n";
	};
	if(tocha == true && inspecao == "Tocha") {
		cout << "\nO fogo que queima para sempre, assim era conhecido o fogo anciao, uma chama tao acolhedora, tao calmante, mas ainda assim tao danosa.\n\n";
	};
	if (sopa == 2 && inspecao == "Sopa") {
		cout << "\nA sopa da antiga civilizacao de Nutrafall, seu cheiro putrido e sua aparencia ensebada o fazem querer jogar fora, mas e para salvar o principe.\n\n";

	} else if(sopa == 1) {
		cout << "\nA sopa da antiga civilizacao de Nutrafall, seu cheiro e aparecia agradariam ate o mais dificil dos criticos, apenas me resta voltar e entrega-la\n\n";
	};
	cout << endl;
	inventario();
}

void inventario() {
	cout << "\nInventario:\n\n-Equipamentos de Aventura.\n";
	if(carne == true) {
		cout << "-Escamas de Dragao.\n";
	};
	if (cogumelo == true) {
		cout << "-Cogumelos Lunar\n";
	};
	if(tocha == true) {
		cout << "-Tocha.\n";
	};
	if (sopa > 0) {
		cout << "-Sopa.\n";
	};

	cout << "\n1.Inspecionar\n2.voltar\n";
	cin >> escolha;

	escolha == 1 ? (inspecionar()):(cena());
}

void cena() {

	switch(int_Cena) {

	case 0:
		inicio();
		break;
	case 1:
		floresta();
		break;
	case 2:
		covil_Dragon();
		break;
	case 3:
		ruinas();
		break;
	case 4:
		praca();
		break;
	case 5:
		galpao();
		break;
	case 6:
		caverna;
		break;
	case 7:
		dragao();
		break;
	};
};

void inicio() {

	int_Cena = 0;
	string str_Inicio = "Agora, sozinho em meio a densa mata de Nutrafall, ouvindo apenas os passaros da regiao e vendo apenas o que os poucos raios de sol tocam, o que pretende fazer?\n\n1.Avancar\n2.Inventario\n3.Desistir\n";

	cout <<  str_Inicio;
	cin >> escolha;
	switch(escolha) {

	case 1:
		floresta();
		break;
	case 2:
		inventario();
		break;
	case 3:
		desistir();
		break;
	};
}

int main() {

	cout << "Outrora, em uma Floresta a poucos metros daqui, no povoado de Nutrafall, uma receita que mudaria rumos a de ser descoberta. Usando das escamas de lagartos, esse povo conseguiu um caldo capaz de curar ate as piores das enfermidades.\n";
	cout << "Essa e a fabula mais antiga a ser contada, porem com o filho mais velho do Rei adoecendo misteriosamente, a unica esperanca para que o Reino de Falakros continue a prosperar e tornar esta lenda realidade.\n";
	cout << "A mandado do filho mais novo do Rei voce fora escolhido, pois se alguem e capaz de descobrir os segredos desta receita, so poderia ser um(a) dos(as) melhores cozinheiros(as) da atualidade.\n\n";

	inicio();
	return 0;
}
`}
    </CodeHightlighter>
  );
}
