$(function() {
    let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let words = [
        "stake",
        "suite",
        "agile",
        "guest",
        "angel",
        "grave",
        "spare",
        "game",
        "score",
        "drown"
    ];
    
    let letterButtons = [];
    let answer = "";
    let answerLetters = [];
    let userInput = "";
    let userGuessed = [];
    let userStatus = "";
    let startMessage = "Select a letter!";
    let wrongMessage = "Wrong guess! <br><br> Guess again!";
    let rightMessage = "Right guess! <br><br> Try another one!";

    $("#start-button").click(gameFunction);
    $(".cancel-restart").hide();
    $(".progress").hide();

    function gameFunction() {
        $(".cancel-restart").show();
        $(".progress").show();
        $(".start-game").hide();

        let answer = randomWord(words);
        let remainingLetters = answer.length;
        let maxWrong = answer.length + 2;

        for (let i = 0; i < answer.length; i++) {
            answerLetters[i]  = "_";
        }

        $(".answer").append(answerLetters.join(" "));
        $(".progress").html("<h3>" + startMessage + "<br><br> You have " + maxWrong + " lives left." + "</h3>")



        createKeyboard(alphabet);

        $(".keyboard button").click(function() {
            $(this).css("background-color", "#5f7590b0");
            $(this).css("color", "#FFFFFF");
            $(this).attr("disabled", "true");
            userGuessed.push($(this).text());

            //ERROR: dosent read userinput
            userInput = $(this).text();
        });



        $("#cancel-button").click(function() {
            location.reload(true);
        });

        //game loop
        while (remainingLetters > 0) {        
            if (answer.toUpperCase().includes(userInput)) {

                for (let j = 0; j < answer.length; j++) {

                    if (answer[j] === userInput) {
                        answerLetters[j] = userInput;
                    }
                }

                remainingLetters--;                
                $(".progress").html("<h3>" + rightMessage + "<br><br> You have " + maxWrong + " lives left." + "</h3>")

            } else {
                maxWrong--;
                $(".progress").html("<h3>" + wrongMessage + "<br><br> You have " + maxWrong + " lives left." + "</h3>")
            }

            if (maxWrong === 0) {
                $(".progress").html("<h3>You Lost! <br><br> The answer was: " + answer.toUpperCase() + "<h3>")
                userStatus = "lost";
                break; 
            } 
        }

        if (remainingLetters === 0) {
            $(".progress").html("<h3>Congratulations! <br><br> You have won the game! <br><br> The answer was: " + answer.toUpperCase() + "<h3>");
            userStatus = "won";
        }
    }




    function createKeyboard(targetArray) {
        isThisArray(targetArray);

        for(i = 0; i < targetArray.length; i++) {
            letterButtons.push('<button class=' + '"' + targetArray[i] + '"' + '>' + targetArray[i] + '</button>');
        }

        $(".keyboard").html(letterButtons.join(""));


    }

    function isThisArray(targetArray) {
        if (Array.isArray(targetArray)) {
        } else {
            alert("Broken game");
        }
    }

    function randomWord(targetArray) {
        return targetArray[Math.floor(Math.random() * targetArray.length)];
    }
});