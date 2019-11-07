
/*
Quando todo documento for carregado, e o usuário clicou no botão comecar,
-Armazena nas variaveis jog1 e jog2 valor dos inputs dos nomes dos jogadores
-Faz a verificação se os nomes foram preenchidos, para que haja ou não o início do jogo
--Nomes preechido:
    -Substitui os inputs pelos nomes inseridos previamente em forma de span
    -Altera o estilo do label VS, de id #vs
    -Altera os labels de id #labelX e #labelY para outros labels com cor vermelha, fonte menor e outro texto
    - remove o botão começar, pois o jogo já começou
    -Finalmente, adiciona a label para saber quem deve jogar no turno atual
--Nomes não preenchidos:
    -Alerta usuário para o preenchimento dos nomes e não inicia o jogo
*/
$(document).ready(function () {
    $("#botaoComecar").click(function () {
        var jogador1 = $("#jog1").val();
        var jogador2 = $("#jog2").val();
        if (jogador1.trim().length > 0 && jogador2.trim().length > 0) {
            $("#jog1").replaceWith("<span id='spanjog1'>" + jogador1 + "</span>");
            $("#jog2").replaceWith("<span id='spanjog2'>" + jogador2 + "</span>");
            $("#vs").css({ "font-size": "16px", "margin-right": "0px" });
            $("#labelX").replaceWith("<label style='font-size:16px; color:red'>" + "(X)" + "</label>");
            $("#labelY").replaceWith("<label style='font-size:16px; color:red'>" + "(Y)" + "</label>");
            $("#botaoComecar").remove();
            $("table").after("<label class='turn'> </label>");

            comecarJogo();
        } else {
            alert('Favor preencher corretamente os nomes')
        }
    });
});

//variavel para definir quem esta jogando no momento
var qntJogadas = 0;


/*
No momento que uma celula for clicada, verifica se todas celulas ja foram clicadas
--Ainda tem celulas
    -Aumenta a qnt de jogadas
    -Altera o texto da celula clicada para o simbolo que representa o jogador que esta jogando
    -A cada clique, verifica se há um ganhador
*/
function comecarJogo() {
    $("table td").click(function () {
        if (qntJogadas < 9) {
            qntJogadas++;
            $(this).text(verificaQuemJogou());
            verificaVencedor();
        }
    });

}

//Essa funcao verifica quem jogou, atualiza de quem é a vez e retorna quem jogou
function verificaQuemJogou() {
    var answer = (qntJogadas % 2 == 0) ? "O" : "X";
    atualizaQuemJoga(answer);
    return answer;
}


//Essa função verifica quem joga e atualiza a label que mostra de quem é a vez pros jogadores  
function atualizaQuemJoga(jogador) {
    var jogador1 = $("#spanjog1").text();
    var jogador2 = $("#spanjog2").text();
    if (jogador.localeCompare("X") != 0) {
        $(".turn").text("É a vez do(a): " + jogador1);
    } else {
        $(".turn").text("É a vez do(a): " + jogador2);
    }
}

//Essa funcao verifica, a cada clique, se houve um vencedor
function verificaVencedor() {

    /*
    Sequencias vencedoras que sao checadas nos ifs:
    1,2,3
    4,5,6
    7,8,9

    1,4,7
    2,5,8
    3,6,9

    1,5,9
    3,5,7

    */

    //linhas
    if ((($("#cel1").text().localeCompare($("#cel2").text())) == 0) &&
        (($("#cel2").text().localeCompare($("#cel3").text())) == 0) &&
        ($("#cel1").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }

    if ((($("#cel4").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel6").text())) == 0) &&
        ($("#cel4").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }

    if ((($("#cel7").text().localeCompare($("#cel8").text())) == 0) &&
        (($("#cel8").text().localeCompare($("#cel9").text())) == 0) &&
        ($("#cel7").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }


    //colunas
    if ((($("#cel1").text().localeCompare($("#cel4").text())) == 0) &&
        (($("#cel4").text().localeCompare($("#cel7").text())) == 0) &&
        ($("#cel1").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }

    if ((($("#cel2").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel8").text())) == 0) &&
        ($("#cel2").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }

    if ((($("#cel3").text().localeCompare($("#cel6").text())) == 0) &&
        (($("#cel6").text().localeCompare($("#cel9").text())) == 0) &&
        ($("#cel3").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }


    //diagonais
    if ((($("#cel1").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel9").text())) == 0) &&
        ($("#cel1").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }

    if ((($("#cel3").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel7").text())) == 0) &&
        ($("#cel3").text().localeCompare("")) != 0) {
        alert("Ganhou!!");
    }

}


        //testar todas formas de vencer
        //colocar jogador que ganhou em vez de alert
        //bloquear insercao de valores dps q alguem ganhou
        //caso for a ultima jogada, colocar jogo empatado

