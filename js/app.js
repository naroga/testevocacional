//Estrutura de alternativas
var Alternative = function (text, s, b, h) {

    var answer = "";
    var science = 0;
    var biological = 0;
    var humanities = 0;

    this.answer = text;
    this.science = s;
    this.biological = b;
    this.humanities = h;

}

//Estrutura de questões
var Question = function (text, alternatives) {

    var question;
    var alternatives;
    var answer = 0;

    this.question = text;
    this.alternatives = alternatives;

}

//Aplicação
var App = {

    questions: new Array(),
    answers: new Array(),
    currentIndex: 0,

    getQuestion: function (index) {
        if (this.questions.length > index) {
            return this.questions[index];
        }
    },

    render: function () {

        var question = this.getQuestion(this.currentIndex);

        var container = $("div#body_content");
        container.html('');

        container.append("<h3 style='text-align: center'>" + question.question + "</h3>");

        for (var i = 0; i < question.alternatives.length; i++) {

            container.append(
                "<a id=\"alternative_" + i + "\" data-role=\"button\" data-theme=\"b\" href=\"javascript:void(0)\" data-icon=\"forward\" data-iconpos=\"right\" data-index=\"" + i + "\">" +
                    question.alternatives[i].answer +
                    "</a>"
            );

            $("a#alternative_" + i).on("click", function () {
                question.answer = $(this).attr("data-index");
                App.next();
            });

            $("div#body_content").trigger('create');
        }

    },

    next: function () {

        if (this.questions.length > this.currentIndex + 1) {
            ++this.currentIndex
            this.render();
        } else {
            this.result();
        }

    },

    previous: function() {

        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.render();
        }

    },

    result: function () {

        var science = 0;
        var biological = 0;
        var humanities = 0;

        for (var i = 0; i < this.questions.length; i++) {

            science += this.questions[i].alternatives[this.questions[i].answer].science;
            biological += this.questions[i].alternatives[this.questions[i].answer].biological;
            humanities += this.questions[i].alternatives[this.questions[i].answer].humanities;

        }

        var container = $("div#body_content");
        container.html('');

        container.append("<h3 style='text-align: center'>Resultado</h3>");
        container.append("<div id='result_content' style='text-align: center;'><center>");
        container.append("<div id=\"chart1\" style=\"width:300px; height:300px;\"></div><pre class=\"code brush:js\"></pre>");
        container.append("</center></div>");

        $.jqplot.config.enablePlugins = true;
        var s1 = [science, biological, humanities];
        var ticks = ['Exatas', 'Biológicas', 'Humanas'];

        plot1 = $.jqplot('chart1', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: false }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },

            highlighter: { show: false }
        });

        var max = Math.max(science, biological, humanities);
        if (max == science) {
            container.append("<h5 color='#555555' style='text-align: center'>Você parece ter bastante aptidão" +
                "para as <b>Ciências Exatas e tecnológicas. " +
                "Confira alguns cursos que a <a href=\"http://www.facig.com.br/\" target=\"_blank\" data-transition=\"turn\">FACIG</a> " +
                "oferece nesta área: </h5>");
            container.append("<h5 style='text-align: center'>" +
                "Ciências Contábeis<br />" +
                "Arquitetura e Urbanismo<br />" +
                "Engenharia Civil<br />" +
                "Matemática<br />" +
                "Análise e Desenvolvimento de Sistemas<br />" +
                "Construção de Edifícios<br />" +
                "</h5>");
        } else
        if (max == humanities) {
            container.append("<h5 color='#555555' style='text-align: center'>Você parece ter bastante aptidão " +
                "para as <b>Ciências Humanas. " +
                "Confira alguns cursos que a <a href=\"http://www.facig.com.br/\" target=\"_blank\" data-transition=\"turn\">FACIG</a> " +
                "oferece nesta área: </h5>");
            container.append("<h5 style='text-align: center'>" +
                "Administração<br />" +
                "Direito<br />" +
                "Serviços Sociais<br />" +
                "História<br />" +
                "Marketing<br />" +
                "Gestão Ambiental<br />" +
                "Gestão de Turismo<br />" +
                "</h5>");
        } else
        if (max == biological) {
            container.append("<h5 color='#555555' style='text-align: center'>Você parece ter bastante aptidão " +
                "para as <b>Ciências biológicas e da natureza. " +
                "Confira alguns cursos que a <a href=\"http://www.facig.com.br/\" target=\"_blank\" data-transition=\"turn\">FACIG</a> " +
                "oferece nesta área: </h5>");
            container.append("<h5 style='text-align: center'>" +
                "Medicina<br />" +
                "</h5>");
        }

        container.append("<h5 style='text-align: center'><a href=\"http://www.facig.com.br/\" target=\"_blank\" data-transition=\"turn\">Clique aqui para acessar o site da FACIG e obter mais informações sobre cursos na sua área.</a></h5>");

    },

    init: function () {

        var questions = new Array();

        questions = [
            new Question(
                "Quais são as qualidades que você mais admira em uma pessoa?",
                [
                    new Alternative(
                        "Inteligência, raciocínio", 3, 1, 2
                    ),
                    new Alternative(
                        "Carisma, capacidade de lidar com pessoas", 1, 2, 3
                    ),
                    new Alternative(
                        "Sabedoria, experiência de vida", 1, 2, 2
                    )
                ]
            ),
            new Question(
                "Na escola, a categoria de disciplinas que você mais gosta/gostava é:",
                [
                    new Alternative(
                        "Matemática, física", 2, 0, 0
                    ),
                    new Alternative(
                        "História, geografia, artes", 0, 0, 2
                    ),
                    new Alternative(
                        "Esportes, biologia, química", 0, 2, 0
                    )
                ]
            ),
            new Question(
                "Sua vida fica melhor:",
                [
                    new Alternative(
                        "Com pouca rotina, poucas regras", 1, 3, 2
                    ),
                    new Alternative(
                        "Com regras bem definidas e disciplina", 3, 2, 2
                    ),
                    new Alternative(
                        "Interagindo com todo tipo de pessoa", 1, 2, 3
                    ),
                    new Alternative(
                        "Com tempo para meditar", 3, 1, 2
                    )
                ]
            ),
            new Question(
                "Como você se descreveria",
                [
                    new Alternative(
                        "Impulsivo, aventureiro", 1, 3, 2
                    ),
                    new Alternative(
                        "Cuidadoso, responsável", 2, 1, 2
                    ),
                    new Alternative(
                        "Entusiasmado, festeiro, amigo", 1, 2, 3
                    ),
                    new Alternative(
                        "Calmo, introvertido", 3, 2, 2
                    )
                ]
            ),
            new Question(
                "Das viagens abaixo, qual seria o destino de sua preferência?",
                [
                    new Alternative(
                        "Castelos antigos, museus", 1, 1, 3
                    ),
                    new Alternative(
                        "Praia paradisíaca", 3, 3, 2
                    ),
                    new Alternative(
                        "Esportes radicais", 1, 2, 1
                    ),
                    new Alternative(
                        "Compras e conforto nos EUA", 3, 2, 1
                    )
                ]
            ),
            new Question(
                "O mais importante para você em uma profissão é",
                [
                    new Alternative(
                        "Retorno financeiro", 2, 3, 1
                    ),
                    new Alternative(
                        "Gerar inovação", 3, 2, 1
                    ),
                    new Alternative(
                        "Fazer algo que gosto", 1, 2, 3
                    ),
                    new Alternative(
                        "Poder ajudar a comunidade", 1, 2, 3
                    )
                ]
            ),
            new Question(
                "Dentre as abaixo, a personalidade que você mais admira é",
                [
                    new Alternative(
                        "Madre Tereza", 1, 1, 3
                    ),
                    new Alternative(
                        "Steve Jobs", 3, 1, 1
                    ),
                    new Alternative(
                        "Ronaldo", 1, 2, 1
                    ),
                    new Alternative(
                        "Dr. House", 2, 3, 1
                    )
                ]
            ),
            new Question(
                "Se fosse abrir um desses negócios, qual seria?",
                [
                    new Alternative(
                        "Empresa de internet", 3, 1, 1
                    ),
                    new Alternative(
                        "Restaurante", 1, 3, 2
                    ),
                    new Alternative(
                        "Academia", 1, 3, 2
                    ),
                    new Alternative(
                        "Clínica médica", 1, 3, 1
                    )
                ]
            ),
            new Question(
                "Aproveito minhas horas de lazer para",
                [
                    new Alternative(
                        "Sair com os amigos", 1, 2, 3
                    ),
                    new Alternative(
                        "Estudar, aprender novas coisas", 2, 2, 1
                    ),
                    new Alternative(
                        "Fazer compras", 1, 2, 2
                    )
                ]
            ),
            new Question(
                "Quando conheço alguém do sexo oposto, a primeira coisa que procuro saber é",
                [
                    new Alternative(
                        "Hábitos e interesses", 2, 3, 3
                    ),
                    new Alternative(
                        "Aspirações, carreira, entre outros", 2, 2, 1
                    ),
                    new Alternative(
                        "Sobre sua família e amigos", 1, 2, 3
                    )
                ]
            )
        ]

        //questions[0].text = "Teste questão 1";

        this.questions = questions;

        this.render();

    }

}

$(document).on("pageinit", "#home", function(event) {

    App.init();

    $("a#back_button").on("click", function() {
        App.previous();
    });

});