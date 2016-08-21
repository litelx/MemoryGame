"use strict";

$(document).ready(function(){

    var counter = [];
    var player = 1;
    var score = 0;
    var stop = false;
    $("#pl1").addClass("back1");

    var pictures = { //lMwghZ
      0: "http://goo.gl/qG4ZYg",
      1: "http://goo.gl/2a8AY5",
      2: "http://goo.gl/9crCuv",
      3: "http://goo.gl/0Cs445",
      4: "https://goo.gl/DNTKq5",
      5: "https://goo.gl/CrnkHE",
      6: "http://goo.gl/UjNrX7",
      7: "http://goo.gl/lqnFYX",
      8: "http://goo.gl/MXh1mx"
    };

    var elems = $('img');
    for (var i = 0; i < elems.length; i++){
        elems[i].setAttribute("src", pictures[0]);
    }

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
    var layout = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    shuffle(layout);
    
    $('td').click( function (){

        stop = false;
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        var pic =  $(this).children("img");

        if (pic.attr("src") === pictures[0] && counter.length < 2){
            $(this).children("img").slideUp();
            var src = pictures[layout[4*row + col]];
            pic.attr("src", src).slideDown();
            counter.push($(this));

            if (counter.length === 2)
            {
                var match_1 = counter.pop();
                var match_2 = counter.pop();
                if (match_1.children("img").attr("src") === match_2.children("img").attr("src"))
                {
                    score = Number($("#score" + player).text());
                    score++;
                    $("#score" + player).text(score);
                }
                else{
                    counter.push(match_1);
                    counter.push(match_2);
                }
            }
            var over = Number($("#score1").text()) +  Number($("#score2").text());
            if (over === layout.length / 2){
                $("#winner").attr("class", "winner");
                $("#cur_player").text("");
                blink("h3", -1, 100);

                if (Number($("#score1").text()) > Number($("#score2").text())){
                    $("#winner").text("Player 1 is the winner!");
                    return;
                }

                if (Number($("#score1").text()) < Number($("#score2").text())){
                    $("#winner").text("Player 2 is the winner!");
                    return;
                }
                $("#winner").text("It's a tie!, play again!");

            }
            return;
        }
        var match_1 = counter.pop();
        var match_2 = counter.pop();
        if (match_1.children("img").attr("src") !== match_2.children("img").attr("src")){
            match_1.children("img").attr("src", pictures[0]);
            match_2.children("img").attr("src", pictures[0]);
            $("#pl" + player).removeClass("back" + player);
            player = ((player - 1) ^ 1) + 1;
            $("#pl" + player).addClass("back" + player);
            $("#cur_player").text(player);
        }

    });

    $('#start').click( function (){
        for (var i = 0; i < elems.length; i++){
            elems[i].setAttribute("src", pictures[0]);
        }
        shuffle(layout);
        counter = [];
        player = 1;
        score = 0;
        $("#score1").text(score);
        $("#score2").text(score);
        $("#winner").attr("class", "status");
        $("#winner").text("Player");
        $("#cur_player").text(player);
        $("#pl2").removeClass("back2");
        $("#pl1").addClass("back1");
        stop = true;
    });

    function blink(elem, times, speed) {
        if (stop)
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
