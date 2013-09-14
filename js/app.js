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
        container.append("<div id='result_content' style='text-align: center;'>");
        container.append("<div id=\"chart1\" style=\"width:300px; height:300px;\"></div><pre class=\"code brush:js\"></pre>");
        container.append("</div>");

        $.jqplot.config.enablePlugins = true;
        var s1 = [science, biological, humanities];
        var ticks = ['Exatas', 'Biológicas', 'Humanas'];

        plot1 = $.jqplot('chart1', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: false },
                tickOptions: {
                    showTicks: false,        // wether or not to show the tick labels,
                    showTickMarks: false     // wether or not to show the tick marks
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },

            highlighter: { show: false }
        });

    },

    init: function () {

        var questions = new Array();

        questions = [
            new Question(
                "Quais são as qualidades que você mais admira em uma pessoa?",
                [
                    new Alternative(
                        "Inteligência, raciocínio",
                        3,
                        2,
                        1
                    ),
                    new Alternative(
                        "Carisma, capacidade de lidar com pessoas",
                        1,
                        3,
                        2
                    ),
                    new Alternative(
                        "Sabedoria, experiência de vida",
                        2,
                        1,
                        3
                    )
                ]
            ),
            new Question(
                "Quais são as qualidades que você mais admira em uma pessoa?",
                [
                    new Alternative(
                        "Inteligência, raciocínio",
                        3,
                        2,
                        1
                    ),
                    new Alternative(
                        "Carisma, capacidade de lidar com pessoas",
                        1,
                        3,
                        2
                    ),
                    new Alternative(
                        "Sabedoria, experiência de vida",
                        2,
                        1,
                        3
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