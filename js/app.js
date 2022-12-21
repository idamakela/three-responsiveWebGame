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
        let maxWrong = answer.length + 2;
        let remainingLetters = answer.length;

        //ERROR: does not wanna change when right letter input
        for (let i = 0; i < answer.length; i++) {
            answerLetters[i]  = "_";
        }

        $(".answer").append(answerLetters.join(" "));
        $(".progress").html("<h3>" + startMessage + "<br><br> You have " + maxWrong + " lives left." + "</h3>")


        //keyboard, userinput and test user input
        createKeyboard(alphabet, letterButtons);

        $(".keyboard button").on("click", function() {
            $(this).attr("disabled", "true");
            userGuessed.push($(this).text());
            userInput = $(this).text();


    
            //game loop
            //while (remainingLetters > 0) {       
    
                if (answer.includes(userInput)) {                  
                    for (let j = 0; j < answer.length; j++) {
                        if (answer[j] === userInput) {
                            answerLetters[j] = userInput;
                            //$(".answer").append(answerLetters[j])
                            $(".answer").append(userInput);
                        }
                    }

                    console.log(answerLetters + typeof(answerLetters))


                    remainingLetters--;                
                    $(".progress").html("<h3>" + rightMessage + "<br><br> You have " + maxWrong + " lives left." + "</h3>")
                } else {
                    maxWrong--;
                    $(".progress").html("<h3>" + wrongMessage + "<br><br> You have " + maxWrong + " lives left." + "</h3>")
                }
                if (maxWrong === 0) {
                    $(".progress").html("<h3>You Lost! <br><br> The answer was: " + answer.toUpperCase() + "<h3>")
                    userStatus = "lost";
                    //break; 
                } 
            //}
    
            if (remainingLetters === 0) {
                $(".progress").html("<h3>Congratulations! <br><br> You have won the game! <br><br> The answer was: " + answer.toUpperCase() + "<h3>");
                userStatus = "won";
            }
        });
        

        //cancel and restart button
        $("#cancel-button").click(function() {
            location.reload(true);
        });

    }


    function testUserInput() {
        $(this).attr("disabled", "true");
        userGuessed.push($(this).text());
        
        userInput = $(this).text();

        let remainingLetters = answer.length;

        console.log(userInput)


        //game loop
        while (remainingLetters > 0) {    

            //ERROR: userinput is five but should not have a value
            console.log(userInput + typeof(userInput))

            console.log(answer)


            if (answer.toUpperCase().includes(userInput)) {

                for (let j = 0; j < answer.length; j++) {

                    if (answer[j] === userInput) {
                        answerLetters[j] = userInput;
                    } else {
                        console.log("BROKEN")
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



    function createKeyboard(targetArray, newArray) {
        isThisArray(targetArray);
        isThisArray(newArray);

        for(i = 0; i < targetArray.length; i++) {
            newArray.push('<button class=' + '"' + targetArray[i] + '"' + '>' + targetArray[i] + '</button>');
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





});