//Estrutura de alternativas
var Alternative = function (text, science, biological, humanities) {

    var answer = "";
    var science = 0;
    var biological = 0;
    var humanities = 0;

    this.answer = text;
    this.science = science;
    this.biological = biological;
    this.humanities = humanities;

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

        for (var i = 0; i < 4; i++) {

            container.append(
                "<a id=\"alternative_" + i + "\" data-role=\"button\" data-theme=\"b\" href=\"home.html\" data-icon=\"forward\" data-iconpos=\"right\" data-index=\"" + i + "\">" +
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

        if (this.questions.length > ++this.currentIndex) {
            this.render();
        } else {
            this.result();
        }

    },

    result: function () {

        alert("Resultado!");

    },

    init: function () {

        var questions = new Array();

        questions = [
            new Question(
                "Teste questão 1",
                [
                    new Alternative(
                        "Alternativa1",
                        1,
                        1,
                        1
                    ),
                    new Alternative(
                        "Alternativa2",
                        1,
                        1,
                        1
                    ),
                    new Alternative(
                        "Alternativa3",
                        1,
                        1,
                        1
                    ),
                    new Alternative(
                        "Alternativa4",
                        1,
                        1,
                        1
                    )
                ]
            ),
            new Question(
                "Teste Questão 2",
                [
                    new Alternative(
                        "Alternativa1",
                        1,
                        1,
                        1
                    ),
                    new Alternative(
                        "Alternativa2",
                        1,
                        1,
                        1
                    ),
                    new Alternative(
                        "Alternativa3",
                        1,
                        1,
                        1
                    ),
                    new Alternative(
                        "Alternativa4",
                        1,
                        1,
                        1
                    )
                ]
            )
        ]

        //questions[0].text = "Teste questão 1";

        this.questions = questions;

        this.render();

    }

}

$(document).on("pageinit", "#page1", function(event) {

    //App.init();


});