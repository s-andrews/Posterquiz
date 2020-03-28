$(document).ready(function(){


    // Load in the posters and place them in the document
    $.getJSON('posters.json', function(posters) {
        //posters is the JSON string
        posterdiv = $("#posters")

        usedIndices = new Set()

        for (i=0; i < posters.length; i++) {
            usedIndices.add(posters[i]["index"])
            console.log("Added "+posters[i]["index"])
            posterdiv.append("<div class=\"poster text-center\"><h3>Poster "+(i+1)+"</h3> <img width=\"300\" height=\"auto\" src=\""+posters[i]["file"]+"\" ><br> <span class=\"answerlabel\">Answer:</span> <select class=\"answers\"></select></div>")
        }

        
        


        $.getJSON('suggestions.json', function(suggestions) {

            allanswers = $(".answers")

            allanswers.append("<option value=\"\"></option>")

            for (i=0; i < suggestions.length; i++) {
                if (usedIndices.has(parseInt(suggestions[i]["index"]))) {
                    allanswers.append("<option value=\""+suggestions[i]["index"]+"\">"+suggestions[i]["name"]+"</option>")
                }
            }
            
            allanswers.select2({width: "10em"})
        });
    

    });


    // Make the answers button work
    $("#answercheck").click( function() {
        $("#fadediv").show();
        answers = $(".answers");

        $.getJSON('posters.json', function(posters) {
            //posters is the JSON string
            posterdiv = $("#posters")
            answerlabels = $(".answerlabel")
    
            score = 0;

            for (i=0; i < posters.length; i++) {
                answer = answers.eq(i).val()
                if (answer == posters[i]["index"]) {
                    answerlabels.eq(i).removeClass("wrong")
                    answerlabels.eq(i).addClass("correct")
                    score += 1
                }
                else {
                    answerlabels.eq(i).removeClass("correct")
                    answerlabels.eq(i).addClass("wrong")

                }
            }

            // Set the colours and scores
            if (score < 5) {
                $("#answerdiv").css("background-color","red")
                $("#sarkycomment").text("You are immune to the marketers influence")
            }
            else if (score < 14) {
                $("#answerdiv").css("background-color","orange")
                $("#sarkycomment").text("You're paying attention then.")
            }
            else {
                $("#answerdiv").css("background-color","green")
                $("#sarkycomment").text("You are a salesman's dream. Do you want to buy a timeshare?")

            }

            $("#finalscore").text(score)

            $("#answerdiv").slideDown();
        });
    });

    // Let them try again if they want to alter their answers
    $('#changeanswers').click (function() {
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
    })

    // Reset everything when they opt to play again
    $('#playagain').click (function() {

        answers = $(".answers");
        $('#answerdiv').slideUp();
        $("#fadediv").fadeOut();
        window.scrollTo(0, 0);

        setTimeout(location.reload.bind(location), 500);
    })

  }); 