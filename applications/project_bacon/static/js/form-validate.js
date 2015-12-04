/**
 * form-validate.js
 * Validates game name form data for The Game of Bacon
 *
 * @author Neil Gorham
 * @version 1.0 12/3/2015
 */

//Global Variables
var gameName = $("#game_name");
var gameNameError = $("#game_nameError");
var gameNameSubmit = $("#game_nameSubmit");
var gameNameMsg = "Please enter a valid game name";

//Onfocus fn
gameName.focus(function(){
    gameNameError.html("");
    gameName.css("border-width", "1px");
    gameName.css("border-color", "#CCC");
    gameNameSubmit.css("display", "none");
});

//Onblur fn
gameName.blur(function(){
    var match = /^[a-zA-Z]{5}$/;
    if((gameName.prop("value").length <= 4  || gameName.prop("value").length > 5)
        || !(match.test(gameName.prop("value")))){
        gameNameError.html(gameNameMsg);
        gameName.css("border-color", "#F00");
        gameName.css("border-width", "2px");
    } else {
        //Check if game has been made
        var games = ractive.get('games');
        var game_names = ractive.get('game_names');
        for (var game_id in games) {
            if (gameName.prop("value") == games[game_id]['word']) {
                gameNameError.html("Game name used");
                gameName.css("border-color", "#F00");
                gameName.css("border-width", "2px");
                return;
            } else {
                gameNameError.html("");
            }
        }
        //Check if game is in game_names
        for(var i = 0; i < game_names.length; i++){
            if(gameName.prop("value") != game_names[i]){
                gameNameError.html("Word is not in the Word List");
                gameName.css("border-color", "#F00");
                gameName.css("border-width", "2px");
            } else {
                gameNameError.html("");
                gameName.css("border-width", "1px");
                gameName.css("border-color", "#CCC");
                gameNameSubmit.css("display", "inline");
                break;
            }
        }
        //gameNameSubmit.css("display", "inline");
    }
});