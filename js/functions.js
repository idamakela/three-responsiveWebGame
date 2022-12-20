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
    
    let buttons = [];
    let answer = "";
    let answerLetters = [];
    let userInput = "";
    let userGuessed = [];
    let userStatus = "";

    $("#start-button").click(gameFunction);
    $(".cancel-restart").hide();

    function gameFunction() {
        $(".cancel-restart").show();

        let answer = randomWord(words);

        for (let i = 0; i < answer.length; i++) {
            answerLetters[i]  = "_";
        }

        $(".answer").append(answerLetters.join(" "));

        let remainingLetters = answer.length;
        let maxWrong = answer.length + 2;


        //new html
        $(".start-game").hide();
        createKeyboard(alphabet);

    }


    function createKeyboard(targetArray) {
        isThisArray(targetArray);

        for(i = 0; i < targetArray.length; i++) {
            buttons.push("<button>" + targetArray[i] + "</button>");
        }

        $(".keyboard").html(buttons.join(""));
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