"use strict";

$(document).ready(function(){

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

    $('p').append('Number of players: ', $('<select/>').attr("id","num_players"));
    $('p').append(' Difficulty: ', $('<select/>').attr("id","difficulty"));
    $('#menu').append('<nav>');
    $('#menu').append($('<button/>').text('Different board').attr("class","btn btn-success").attr("id","board"));
    $('#menu').append($('<button/>').text('Start a game').attr("class","btn btn-success").attr("id","begin"));
    $('#board').hide();
    

    for (var i = 2; i < 6; i++){
        $('#num_players').append($('<option/>').text(i).val(i));
    }

    $.each( difficulty_dic, function( key, value ) {
        $('#difficulty').append($('<option/>').text(value).val(key));
    });

    $('select').click(function() {
        $('#begin').show();
    });

    $('#board').click(function() {
        $('p').show();
        $('#board').hide();
        $('#begin').text('Start a game').show();
    });

    $('#begin').click(function() {
        $('p').hide();
        $('#begin').text('Start a game').hide();
        $('#board').show();

        var uncovered = [];
        layout = [];
        $('table').empty();
        $('nav').empty();

        var difficulty = $('#difficulty').val();

        var players = $('#num_players').val();
        for (var i = 1; i <= players; i++){
            $('nav').append($('<h5/>').attr("id", 'pl'+i).attr('class', 'back'+i).text('Player '+i+' matches: ').append($('<span/>').attr('id','score'+i).text('0')));
        }

        var increment = 1;
        for (var i = 1; i <= difficulty*2; i++){
            $('table').append($('<tr/>').attr('class',"bg-success"));
            for (var j = 0; j < lst[difficulty-1]; j++){
                $('table tr:nth-child('+i+')').append($('<td/>').attr('class', lst[difficulty-1]*(i-1)+j).append($('<img/>').attr('class', "cell")));
                layout.push(increment);
                if (layout.length % 2 == 0)
                {
                    increment++;
                }
            }
        }

        init();
        stop_blink = true;

        var total = 0;
        var max = 0;
        var winner = [];
        $("h3").removeAttr('class');
        $("h3").addClass("back" + player);

        $('td').click( function (){
            stop_blink = false;
            var pic =  $(this).children("img");
            if (pic.attr("src") !== pictures[0])
                return;

            if (uncovered.length < 2){  //pic.attr("src") === pictures[0] &&
                $(this).children("img").slideUp();
                var src = pictures[layout[$(this).attr("class")]];
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
                        $("h3").addClass("back" + winner[0]).text("Player "+winner[0]+" is the winner!");
                        blink("h3", -1, 100);
                        if (winner.length > 1){
                            $("h3").text("The winners are player "+winner[0]+" and player "+ winner[1] +"!");
                        }
//                        $('#board').hide;
                        $('#begin').text("start again").show();
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

        function init() {
            total = 0;
            max = 0;
            winner = [];

            $( "img" ).each(function() {
                $( this ).attr("src", pictures[0]);
            });

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
