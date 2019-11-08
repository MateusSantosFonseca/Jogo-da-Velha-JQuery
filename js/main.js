/*espera o carregamento do documento e comeca com a tabela escondida após o click no botao começar,
valida os campos dos nomes e inicia o jogo, escondendo elementos desnecessários e adicionando outros necessários*/
$(document).ready(function () {
    $('.tabelaJogo').hide();
    $("#botaoComecar").click(function () {
        var jogador1 = $("#jog1").val();
        var jogador2 = $("#jog2").val();
        if (jogador1.trim().length > 0 && jogador2.trim().length > 0) {
            $('.tabelaJogo').show();
            $("#jog1").replaceWith("<span id='spanjog1'>" + jogador1 + "</span>");
            $("#jog2").replaceWith("<span id='spanjog2'>" + jogador2 + "</span>");
            $("#vs").css({ "font-size": "16px", "margin-right": "0px" });
            $("#labelX").replaceWith("<label style='font-size:16px; color:red'>" + "(X)" + "</label>");
            $("#labelY").replaceWith("<label style='font-size:16px; color:red'>" + "(O)" + "</label>");
            $("#botaoComecar").remove();
            $("table").after("<a id='botaoRecomecar' title='Recomeçar jogo' href='index.html'>Recomeçar jogo</a>");
            $("table").after("<label class='turn'> </label>");
            comecarJogo();
        } else {
            alert('Favor preencher corretamente os nomes')
        }
    });
});

//variavel para definir quem esta jogando no momento (se o mod por 2 der ímpar: jogador 1, se for par: jogador 2)
var qntJogadas = 0;

//Funcao que inicia o jogo
function comecarJogo() {
    $("table td").click(function () {
        if (qntJogadas < 9) {
            qntJogadas++;
            $(this).text(verificaQuemJogou());
            var vencedor = verificaVencedor();
            qntJogadas = vencedor != null ? 10 : qntJogadas;
        }

        $("table").after("<span id='resultado'> </span>");
        if (qntJogadas == 10) {
            $(".turn").remove();
            if (vencedor.localeCompare("X") == 0) {
                $("#resultado").text("O jogador: " + $('#spanjog1').text() + " venceu!!");
            }
            else
                $("#resultado").text("O jogador: " + $('#spanjog2').text() + " venceu!!");

        } else if (qntJogadas == 9) {
            $(".turn").remove();
            $("#resultado").text("O jogo terminou empatado!!");
        }
    });

}

//Essa funcao verifica quem jogou, atualiza de quem é a vez e retorna quem jogou
function verificaQuemJogou() {
    var answer = (qntJogadas % 2 == 0) ? "O" : "X";
    atualizaQuemJoga(answer);
    return answer;
}

//Essa função verifica quem joga e atualiza a label que mostra de quem é a vez agora
function atualizaQuemJoga(jogador) {
    var jogador1 = $("#spanjog1").text();
    var jogador2 = $("#spanjog2").text();
    if (jogador.localeCompare("X") != 0) {
        $(".turn").text("É a vez do(a): " + jogador1);
    } else {
        $(".turn").text("É a vez do(a): " + jogador2);
    }
}

//Essa funcao verifica, a cada clique, se houve um vencedor (regras do jogo)
//Sequencias vencedoras checadas: 1,2,3 / 4,5,6 /7,8,9  / 1,4,7 / 2,5,8 / 3,6,9 / 1,5,9 / 3,5,7
function verificaVencedor() {

    //checando linhas
    if ((($("#cel1").text().localeCompare($("#cel2").text())) == 0) &&
        (($("#cel2").text().localeCompare($("#cel3").text())) == 0) &&
        ($("#cel1").text().localeCompare("")) != 0) {
        return $("#cel1").text();
    }

    if ((($("#cel4").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel6").text())) == 0) &&
        ($("#cel4").text().localeCompare("")) != 0) {
        return $("#cel4").text();
    }

    if ((($("#cel7").text().localeCompare($("#cel8").text())) == 0) &&
        (($("#cel8").text().localeCompare($("#cel9").text())) == 0) &&
        ($("#cel7").text().localeCompare("")) != 0) {
        return $("#cel7").text();
    }

    //checando colunas
    if ((($("#cel1").text().localeCompare($("#cel4").text())) == 0) &&
        (($("#cel4").text().localeCompare($("#cel7").text())) == 0) &&
        ($("#cel1").text().localeCompare("")) != 0) {
        return $("#cel1").text();
    }

    if ((($("#cel2").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel8").text())) == 0) &&
        ($("#cel2").text().localeCompare("")) != 0) {
        return $("#cel2").text();
    }

    if ((($("#cel3").text().localeCompare($("#cel6").text())) == 0) &&
        (($("#cel6").text().localeCompare($("#cel9").text())) == 0) &&
        ($("#cel3").text().localeCompare("")) != 0) {
        return $("#cel3").text();
    }

    //checando diagonais
    if ((($("#cel1").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel9").text())) == 0) &&
        ($("#cel1").text().localeCompare("")) != 0) {
        return $("#cel1").text();
    }

    if ((($("#cel3").text().localeCompare($("#cel5").text())) == 0) &&
        (($("#cel5").text().localeCompare($("#cel7").text())) == 0) &&
        ($("#cel3").text().localeCompare("")) != 0) {
        return $("#cel3").text();
    }
}