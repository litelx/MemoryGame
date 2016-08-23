"use strict";

$(document).ready(function(){

    var uncovered = [];
    var player = 1;
    var score = 0;
    var stop_blink = false;
    var layout = [];
    var lst = [ 5, 4, 4 ];
    var difficulty_dic = { 1: 'Easy', 2: 'Normal', 3: 'Hard' }; // 5, 8, 12 --- 10, 16, 24

    var pictures = { //lMwghZ
      0: "http://goo.gl/qG4ZYg",
      1: "http://goo.gl/2a8AY5",
      2: "http://goo.gl/9crCuv",
      3: "http://goo.gl/0Cs445",
      4: "https://goo.gl/DNTKq5",
      5: "https://goo.gl/CrnkHE",
      6: "http://goo.gl/UjNrX7",
      7: "http://goo.gl/lqnFYX",
      8: "http://goo.gl/MXh1mx",
      9: "https://goo.gl/OvFUK0",
      10: "http://goo.gl/6RrHhN",
      11: "http://goo.gl/exPpsu",
      12: "http://goo.gl/spl43w",
    };

    $('div[name=menu]').append('Num of players: <select name="num_players"></select>');
    $('div[name=menu]').append('  Difficulty: <select name="difficulty"></select>');
    $('div[name=menu]').append('<nav>');
    $('div[name=menu]').append('<button class="btn btn-success">start new game</button>');

    for (var i = 2; i < 6; i++){
        $('select[name=num_players]').append('<option value="'+i+'">'+i+'</option>');
    }

    for (var i = 1; i <= Object.keys(difficulty_dic).length; i++){
        $('select[name=difficulty]').append('<option value="'+i+'">'+difficulty_dic[i]+'</option>');
    }

    $('select').change(function() {

        layout = [];
        $('table').empty();
        $('nav').empty();

        var difficulty = $('select[name=difficulty]').val();

        var players = $('select[name=num_players]').val();
        for (var i = 1; i <= players; i++){
            $('nav').append('<h5 id="pl'+i+'" class="back'+i+'">Player '+i+' matches: <span id="score'+i+'">0</span></h5>');
        }

        var incriment = 1;
        for (var i = 1; i <= difficulty*2; i++){
            $('table').append('<tr class="bg-success"></tr>');
            for (var j = 0; j < lst[difficulty-1]; j++){
                $('table tr:nth-child('+i+')').append('<td> <img class="cell"> </td>');
                layout.push(incriment);
                if (layout.length % 2 == 0)
                {
                    incriment++;
                }
            }
        }

        init();
        stop_blink = true;

        var total = 0;
        var max = 0;
        var winner = [];
        $("h3").removeAttr('class');

        $('td').click( function (){
            stop_blink = false;

            var col = $(this).parent().children().index($(this));
            var row = $(this).parent().parent().children().index($(this).parent());
            var pic =  $(this).children("img");

            if (pic.attr("src") === pictures[0] && uncovered.length < 2){
                $(this).children("img").slideUp();
                var src = pictures[layout[lst[difficulty-1]*row + col]];
                pic.attr("src", src).slideDown();
                uncovered.push($(this));

                if (uncovered.length < 2){
                    return;
                }

                if (uncovered[0].children("img").attr("src") === uncovered[1].children("img").attr("src"))
                {
                    score = Number($("#score" + player).text());
                    score++;
                    $("#score" + player).text(score);
                    total++;
                    if (score > max)
                    {
                        max = score;
                        winner = [];
                        winner.push(player);
                    }
                    else if (score === max ){
                            winner.push(player);
                    }
                    if (total === layout.length / 2){
                        $("h3").removeAttr('class');
                        $("h3").addClass("back" + winner[0]);
                        blink("h3", -1, 100);
                        $("h3").text("Player "+winner[0]+" is the winner!");
                        if (winner.length > 1){
                            $("h3").text("The winners are player "+winner[0]+" and player "+ winner[1] +"!");
                        }
                    }
                    uncovered = [];
                }
                return;
            }

            if (total === layout.length / 2)
                return;

            uncovered[0].children("img").attr("src", pictures[0]);
            uncovered[1].children("img").attr("src", pictures[0]);
            $("h3").removeAttr('class');
            player = (player % players) + 1;
            $("h3").text("player " + player).addClass("back" + player);
            uncovered = [];
            return;
        });

        $('button').click( function (){
            $("h3").removeAttr('class');
            init();
            stop_blink = true;
        });

        function init() {
            total = 0;
            max = 0;
            winner = [];
            var elems = $('img');
            for (var i = 0; i < elems.length; i++){
                elems[i].setAttribute("src", pictures[0]);
            }
            shuffle(layout);
            uncovered = [];
            score = 0;
            for (var i = 1; i <= players; i++){
                $("#score" + i).text(score);
            }
            $("#winner").attr("class", "status");
            player = 1;
            $("h3").text("player " + player).addClass("back" + player);
            stop_blink = false;

        }
    });

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    function blink(elem, times, speed) {
        if (stop_blink)
        {
            times = 0;
            $(elem).removeClass("blink");
        }
        if (times > 0 || times < 0) {
            if ($(elem).hasClass("blink")) $(elem).removeClass("blink");
            else $(elem).addClass("blink");
        }

        clearTimeout(function () {
            blink(elem, times, speed);
        });

        if (times > 0 || times < 0) {
            setTimeout(function () {
                blink(elem, times, speed);
            }, speed);
            times -= .5;
        }
    }

});
