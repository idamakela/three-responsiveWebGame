$(function() {
    let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let words = [
        "STAKE",
        "SUITE",
        "AGILE",
        "QUEST",
        "ANGEL",
        "GRAVE",
        "SPARE",
        "GAME",
        "SCORE",
        "DROWN"
    ];
    
    let letterButtons = [];
    let answer = "";
    let answerLetters = [];
    let userInput = "";
    let userStatus = "";
    let maxWrong = 0;
    let remainingLetters = 0;

    $(".cancel-restart").hide();
    $(".progress").hide();
    $("#start-button").click(gameFunction);

    $("#cancel-button").click(function() {
        location.reload(true);
    });


    
    $("#restart-button").click(function() {
        //clear everything
        maxWrong = 0;
        remainingLetters = 0;
        clearArray(answerLetters);
        $(".answer").hide();
        $(".progress").hide();
        $(".keyboard").hide();

        gameFunction();
    });




    function gameFunction() {
        $(".cancel-restart").show();
        $(".progress").show();
        $(".start-game").hide();

        answer = randomWord(words);
        maxWrong = answer.length + 2;
        remainingLetters = answer.length;

        for (let i = 0; i < answer.length; i++) {
            answerLetters[i]  = "_";
        }

        $(".answer").append(answerLetters.join(" "));
        $(".progress").html("<h3>Select a letter! <br><br> You have " + maxWrong + " lives left." + "</h3>")

        createKeyboard(alphabet, letterButtons);

        $(".keyboard button").on("click",  testUserInput);
    }

    function testUserInput() {
        $(this).attr("disabled", "true");
        userInput = $(this).text();

        if (answer.includes(userInput)) {                  
            for (let j = 0; j < answer.length; j++) {
                if (answer[j] === userInput) {
                    answerLetters[j] = userInput;
                    $(".answer").text(answerLetters.join(" "));
                }
            }
            remainingLetters--;
            $(".progress").html("<h3>Right guess! <br><br> Try another one! <br><br> You have " + maxWrong + " lives left." + "</h3>")
        } else {
            maxWrong--;
            $(".progress").html("<h3>Wrong guess! <br><br> Guess again! <br><br> You have " + maxWrong + " lives left." + "</h3>")
        }
        
        if (maxWrong === 0) {
            $(".progress").html("<h3>You Lost! <br><br> The answer was: " + answer.toUpperCase() + "<h3>")
            $(".keyboard button").attr("disabled", "true")
            userStatus = "lost";
        } 

        if (remainingLetters === 0) {
            $(".progress").html("<h3>Congratulations! <br><br> You have won the game! <br><br> The answer was: " + answer.toUpperCase() + "<h3>");
            $(".keyboard button").attr("disabled", "true")
            userStatus = "won";
        }

    }

    function createKeyboard(targetArray, newArray) {
        isThisArray(targetArray);
        isThisArray(newArray);

        for(i = 0; i < targetArray.length; i++) {
            newArray.push("<button>" + targetArray[i] + "</button>");
        }

        $(".keyboard").html(newArray.join(""));
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

    function clearArray(targetArray) {
        while (targetArray.length > 0) {
            targetArray.pop();
        }
    }

    function reset() {

    }
});