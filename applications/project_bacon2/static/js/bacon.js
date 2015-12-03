/**
 * bacon.js
 * Purpose: Find a path from user chosen key word and target word
 * @author Neil Gorham ngorham2@gmail.com
 * @version 1.0 11/09/2015
 */

//WordNode constructor
function WordNode(data) {
    this.word = data;
    this.next = null;
}

//bacon constructor
function Bacon(keyWord, targetWord) {
    //member variables
    this.keyWord = keyWord.toLowerCase(); //user key word string
    this.targetWord = new WordNode(targetWord.toLowerCase()); //user target word
    this.wList = []; //array of dictionary of string words
    this.container = []; //array of wordNode arrays
    this.path = []; //array of wordNodes of path from targetWord to keyWord
    this.searchStatus = false; //boolean of search results
    this.load();
    this.run();
}

Bacon.prototype = {
    constructor: Bacon,

    //load the dictionary from a file
    load: function(){
        var lines = $('#wordList').html();
        lines = lines.split('\n');
        for(var i = 0; i <  lines.length; i++)
            this.wList.push(new WordNode(lines[i].trim()));
    },

    //Main process
    run: function(){
        $(".bacometer").fadeOut();
        $results = $("#results");
        $results.html("");
        $loading = $(document.createElement('p'));
        $loading.addClass("loading animate pulse infinite");
        $results.append($loading);
        console.log('run called');
        var first = []; //empty array of wordNodes
        first.push(new WordNode(this.keyWord));
        this.removeFromWordList(this.keyWord);
        this.container.push(first);
        this.searchStatus = this.search(this.container[0]);
        this.setPath();
        this.print();
    },

    //Remove word from wList
    removeFromWordList: function(word){
        for(var i = 0; i < this.wList.length; i++){
            if(this.wList[i].word == word){
                this.wList.splice(i, 1);
                break;
            }
        }
    },

    //Find adjacent words to the targetWord in wordList list
    search: function(list){
        if(typeof list == 'undefined' || list.length <= 0) return false;
        var temp = []; //empty wordNode list
        var count = 0; //count of matching characters between two words
        for(var i = 0; i < list.length; i++){ //wordNode list
            for(var j = 0; j < this.wList.length; j++){ //wordList strings
                for(var k = 0; k < list[i].word.length; k++){
                    //Compare characters between two words
                    if(list[i].word.indexOf(this.wList[j].word.charAt(k)) != -1
                        && list[i].word.charAt(k) == this.wList[j].word.charAt(k)){
                        count++; //count matching characters
                    }
                }
                if(count >= (list[i].word.length - 1)){
                    this.wList[j].next = list[i];
                    temp.push(this.wList[j]);
                    this.wList.splice(j, 1);
                }
                count = 0; //rest count
            }
        }
        if(temp.length <= 0) return false;
        this.container.push(temp);
        if(this.isBacon(temp)) return true;
        return this.search(temp);
    },

    //Links targetWord to keyWord
    //Traverse through linked words,
    //return true if path from targetWord to keyWord exists
    isBacon: function(list){
        for(var i = 0; i < list.length; i++){
            if(list[i].word == this.targetWord.word) {
                //if targetWord is in list, set targetWord.next reference
                this.targetWord.next = list[i].next;
            }
        }
        var temp = this.targetWord;
        while(temp != null){
            if(temp.word == this.container[0][0].word){
                //Traverse linked wordNodes  until keyWord is found
                return true;
            }
            temp = temp.next;
        }
        return false;
    },

    //Set path from targetWord to keyWord
    //or set path of most elements form targetWord to keyWord
    setPath: function(){
        var temp = null; //targetWord reference
        if(this.searchStatus){
            temp = this.targetWord;
        } else {
            //last list in container
            var list = this.container[this.container.length - 1];
            var min = 130; //min distance between targetWord and list words
            var minIndex = -1; //index of wordNode with min distance from the targetWord
            var n = 0; //place holder for min value
            for(var i = 0; i < list.length; i++){
                n = 0;
                for(var j = 0; j < list[i].length; j++){
                    n += Math.abs((this.targetWord.word.charCodeAt(j) - 96) - (list[i].word.charCodeAt(j) - 96));
                }
                if(n < min){
                    min = n;
                    minIndex = i;
                }
            }
            temp = list[minIndex];
        }
        while(temp != null){
            this.path.push(temp);
            temp = temp.next;
        }
    },

    //Print path from targetWord to keyWord
    print: function(){
            $results = $("#results");
            $results.html("");

            var text = '';
            var listel;
            var list;
            var baconHappy = true;
            var textNode = $(document.createElement('p'));
            textNode.addClass("message");

            if(this.searchStatus){

                text = 'A path from ' + this.keyWord + ' to ' + this.targetWord.word;
                textNode.append(text);

                $results.append(textNode);
                list = $(document.createElement('ul'));
                $results.append(list);
                for(var i = this.path.length - 1; i >= 0; i--){
                    var txt = this.path[i].word;
                    (function(i,text){
                        setTimeout(function(){
                            listEl = $(document.createElement('li'));
                            listEl.addClass("result-item list-group-item").addClass("bounceIn animated");
                            var t = document.createTextNode(text);
                            listEl.append(t);
                            list.append(listEl);
                         },300*i);
                    })(i,txt);
                }

                text += '</ul>\n';
                console.log(text);
            }else{
                text += 'Sorry! No path from ' + this.keyWord + ' to ' + this.targetWord.word + '<br >\n';
                text += 'Closest Path\n';
                baconHappy = false;

                textNode.append(text);
                $results.append(textNode);
                var list = $(document.createElement('ul'));
                list.addClass('result-list list-group');
                $results.append(list);

                for(var i = this.path.length - 1; i >= 0; i--){
                    var txt = this.path[i].word;
                    (function(i,text){
                        setTimeout(function(){
                            listEl = $(document.createElement('li'));
                            listEl.addClass("result-item list-group-item").addClass("bounceIn animated");
                            var t = document.createTextNode(text);
                            listEl.append(t);
                            list.append(listEl);
                         },400*i);
                    })(i,txt);
                }
            }
            if(baconHappy)
                $(".bacometer").attr('src',"../static/images/kbhappy.jpg")
            else
                $(".bacometer").attr('src',"../static/images/kbsad.jpg")
            $(".bacometer").fadeIn();
    //        .html(text);.html(text);
        }
}
