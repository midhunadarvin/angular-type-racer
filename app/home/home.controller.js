(function() {
    'use strict';

    angular
        .module('myApp.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['DataService', '$timeout'];

    /* @ngInject */
    function HomeController(DataService, $timeout) {
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

        function activate() {
            fetchRandomText();
        }

        function fetchRandomText() {
            DataService.getRandomText().then(onReceiveRandomText);
        }

        function onReceiveRandomText(data){
            var regEx = /\r?\n|\r/g;
            data = strip(data);
            data = data.replace(regEx, ' ');
            data.trim();
            //console.log(data);

            vm.receivedData = [];
            vm.paragraph = [];
            vm.totalLetters = 0;
            vm.receivedData = data.split(" ");
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

        function changeStatus(event){

            var keyCode = (window.event ? event.keyCode : event.which);

            if(keyCode == 32){
                //console.log(vm.enteredData.length);
                //console.log(vm.paragraph[vm.currentPosition].word.length);
                if((vm.currentPosition >= vm.paragraph.length - 1) && (vm.paragraph[vm.currentPosition].status == 1)){
                    stopTimer();
                    return;
                };

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

        function startTimer(){
            vm.startTime = new Date();

            angular.element('timer')[0].start();
            $timeout(function(){
                angular.element("#test-input")[0].focus();
            },100);
            
            vm.isRunning = true;
        }

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

        function stopTimer(){
            vm.endTime = new Date();
            angular.element('timer')[0].stop();
            var totalTime = vm.endTime - vm.startTime;
            totalTime = totalTime/60000;
            var grossWPM = (vm.totalLetters/5)/totalTime;
            vm.grossWPM = Math.round(grossWPM * 100) / 100; 
            alert("Congratulations : Your typing speed is "+vm.grossWPM);
            //vm.isRunning = false;
        }

        function strip(html){
           var tmp = document.createElement("DIV");
           tmp.innerHTML = html;
           return tmp.textContent || tmp.innerText || "";
        }
    }
})();