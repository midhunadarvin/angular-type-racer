(function() {
    'use strict';

    angular
        .module('myApp.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['DataService', '$timeout', 'Alertify'];

    /* @ngInject */
    function HomeController(DataService, $timeout, Alertify) {
        var vm = this;
        vm.changeStatus = changeStatus;
        vm.startTimer = startTimer;
        vm.resetTimer = resetTimer;
        vm.receivedData = [];
        vm.paragraph = [];
        vm.enteredData = '';
        vm.currentPosition = 0;
        vm.isRunning = false;
        vm.grossWPM = null;

        vm.carStyle = {
            position: 'relative',
            left: vm.currentPosition+'%'
        }

        vm.totalLetters = 0;

        activate();
        // Controller Activate Function
        function activate() {
            fetchRandomText();
        }
        // Fetch the random text paragraph from API
        function fetchRandomText() {
            DataService.getRandomText().then(onReceiveRandomText);
        }
        // Handler Function for the fetch random text API Response
        function onReceiveRandomText(data){
            data = strip(data);                 // Strip the HTML Tags from the API Response

            var regEx = /\r?\n|\r/g;            // Regex for line-breaks and new-lines
            data = data.replace(regEx, ' ');    // Replace the line-breaks and new-lines with space

            data = data.trim();                        // Remove any outlying spaces from data string

            // Initialize the variables
            vm.receivedData = [];
            vm.paragraph = [];
            vm.totalLetters = 0;

            // Convert the received string to a array of substrings/words
            vm.receivedData = data.split(" ");

            // Create a new array of objects from the receviedData with the status for each word
            vm.receivedData.forEach(function(val,index){
                if(val != ''){
                    var item = {};
                    vm.totalLetters += val.length;
                    item.word = val;
                    item.status = 0;
                    vm.paragraph.push(item);
                }
            });

         
        }

        // Handle the keypress event in the input box.
        function changeStatus(event){
            // Get the keyCode of the key pressed
            var keyCode = (window.event ? event.keyCode : event.which);

            // Check if the key pressed is 'space'
            if(keyCode == 32){
                // If the current position has reached the end, stop the Timer
                if((vm.currentPosition >= vm.paragraph.length - 1) && (vm.paragraph[vm.currentPosition].status == 1)){
                    stopTimer();
                    return;
                };

                // Check if the entered Data is correct and change the status
                // and apply css style to the car image
                if(vm.enteredData == vm.paragraph[vm.currentPosition].word){
                    vm.paragraph[vm.currentPosition].status = 1;
                    vm.currentPosition++;
                    vm.enteredData = '';

                    vm.carStyle.left = (vm.currentPosition/vm.paragraph.length)*90+'%';

                    if(vm.currentPosition >= vm.paragraph.length){
                        stopTimer();
                        return;
                    }
                };
            }else{

                // Error Handling when keys are pressed too fast..
                if(hasWhiteSpace(vm.enteredData)){
                    var tempArray = vm.enteredData.split(" ");
                    vm.enteredData = tempArray[0];

                    if(vm.enteredData == vm.paragraph[vm.currentPosition].word){
                        vm.paragraph[vm.currentPosition].status = 1;
                        vm.currentPosition++;
                        vm.enteredData = '';

                        vm.carStyle.left = (vm.currentPosition/vm.paragraph.length)*90+'%';

                        if(vm.currentPosition >= vm.paragraph.length){
                            stopTimer();
                            return;
                        }
                    }else{
                      return;  
                    }
                    
                }
                // Check whether the input entered matches the current Index word and 
                // show error if the word entered is wrong
                if(vm.enteredData.length >= vm.paragraph[vm.currentPosition].word.length && vm.enteredData != vm.paragraph[vm.currentPosition].word){
                    vm.paragraph[vm.currentPosition].status = 2;
                }else{
                    var testString = vm.paragraph[vm.currentPosition].word.substring(0, vm.enteredData.length);
                    if(vm.enteredData == testString){
                        vm.paragraph[vm.currentPosition].status = 0;
                    }else{
                        vm.paragraph[vm.currentPosition].status = 2;
                    }
                    
                }
            }
        }

        // Start the Timer and Focus to the input element
        function startTimer(){
            vm.startTime = new Date();
            angular.element('timer')[0].start();
            $timeout(function(){
                angular.element("#test-input")[0].focus();
            },100);
            
            vm.isRunning = true;
        }

        // Reset the Timer and Reinitialize the variables
        function resetTimer(){
            angular.element('timer')[0].stop();
            angular.element('timer')[0].start();
            angular.element('timer')[0].stop();
            fetchRandomText();
            vm.grossWPM = null;
            vm.enteredData = '';
            vm.currentPosition = 0;
            vm.carStyle.left = (vm.currentPosition/vm.paragraph.length)*90+'%';
            vm.isRunning = false;
        }

        // Stop the Timer and Calculate the Typing Speed
        function stopTimer(){
            vm.endTime = new Date();
            angular.element('timer')[0].stop();
            var totalTime = vm.endTime - vm.startTime;
            totalTime = totalTime/60000;
            var grossWPM = (vm.totalLetters/5)/totalTime;
            vm.grossWPM = Math.round(grossWPM * 100) / 100; 
            var message = "Congratulations : Your typing speed is "+vm.grossWPM;    
            //alert("Congratulations : Your typing speed is "+vm.grossWPM);
            console.log(Alertify)
            Alertify.alert('This is an alert');
        }

        // Check if the element has white space
        function hasWhiteSpace(s) {
          return s.indexOf(' ') >= 0;
        }
        // Strip the html tags from the text data
        function strip(html){
           var tmp = document.createElement("DIV");
           tmp.innerHTML = html;
           return tmp.textContent || tmp.innerText || "";
        }
    }
})();