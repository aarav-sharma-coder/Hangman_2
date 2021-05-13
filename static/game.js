$(document).ready(function () {
    getTemplates()
});

function getTemplates(){
    $.ajax({
        url: "/get_template",
        type: "get",
        success: function(result){
            fillBlanks(result.word)
        },
        error: function(result){
            alert(result.responseJSON.message)
        }
    })
}

function fillBlanks(result) {
    //Make sure blanks are empty to begin with
    $("#blanks").empty();

    //Show blanks uisng <span>
    for (let i = 0; i < result.inputs; i++) {
        let input_html = `<span class="fill_blanks" id="input_${i}">_ </span>`
        $("#blanks").append(input_html)
    }

    //Show Hint
    $("#hint").html(result.category)

    var gameOver=false
    //Fill blanks only if the character match is found
    $(".clickable").click(function () {
        var correctGuess = false;      

        //Get the id of the button clicked
        let id = $(this).attr("id");

        //Get the life 
        var life = parseInt($("#life").text())

        //Loop through all the letters 
        for (var i = 0; i < result.word.length; i++) {
            //Check if the character matches the id of the button
            if (result.word.charAt(i).toLowerCase() == id) {
                //Check if the life is still left and blank is is empty/already filled
                if (life > 0 && ($(".fill_blanks").eq(i).html() == "_ " || $(".fill_blanks").eq(i).html() == id)) {

                    //fill blanks
                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    //Check if the word guess is complete
                    if ($("#blanks").text().trim() === result.word.toLowerCase()) {
                        $("#result").text("You Win!!")
                        correctGuess = true;
                        gameOver=true
                    }
                }                
            }
            
        }
       
        if (life > 0 && correctGuess!=true && gameOver!=true) {           
            life = life - 1
            $("#life").text(life)
        }
        else if (life<1) {
            $("#result").text("You Lost!!")
        }
    })
}
