(function() {
    'use strict';

    angular
        .module('myApp.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['DataService'];

    /* @ngInject */
    function HomeController(DataService) {
        var vm = this;
        vm.changeStatus = changeStatus;
        vm.startTimer = startTimer;
        vm.resetTimer = resetTimer;
        vm.receivedData = [];
        vm.paragraph = [];
        vm.enteredData = '';
        vm.currentPosition = 0;
        vm.isRunning = false;

        vm.totalLetters = 0;

        activate();

        function activate() {
            DataService.getRandomText().then(onReceiveRandomText);
        }

        function onReceiveRandomText(data){
            var regEx = /\r?\n|\r/g;
            data = strip(data);
            data = data.replace(regEx, ' ');
            data.trim();
            //console.log(data);


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
            //console.log(keyCode);

            if(keyCode == 32){
                console.log(vm.enteredData.length);
                console.log(vm.paragraph[vm.currentPosition].word.length);

                if(vm.currentPosition == vm.paragraph.length-1){
                    stopTimer();
                };

                if(vm.enteredData == vm.paragraph[vm.currentPosition].word){
                    vm.paragraph[vm.currentPosition].status = 1;
                    vm.currentPosition++;
                    vm.enteredData = '';
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
            
            // var oldVal = vm.currentPosition;
            // vm.currentPosition = vm.enteredData.length - 1;
            // var newVal = vm.currentPosition;

            // if (newVal < oldVal)
            //     vm.paragraph[oldVal].status = 0;

            // else {
            //     if (oldVal >= 0) {
            //         if (vm.enteredData[oldVal] === vm.paragraph[oldVal].word)
            //             vm.paragraph[oldVal].status = 1;
            //         else
            //             vm.paragraph[oldVal].status = 2;
            //     }
            // }
        }

        function startTimer(){
            vm.startTime = new Date();
            angular.element('timer')[0].start();
            vm.isRunning = true;
        }

        function resetTimer(){
            angular.element('timer')[0].stop();
            angular.element('timer')[0].start();
            angular.element('timer')[0].stop();
            vm.isRunning = false;
        }

        function stopTimer(){
            vm.endTime = new Date();
            angular.element('timer')[0].stop();
            //console.log(vm.endTime - vm.startTime);
            var totalTime = vm.endTime - vm.startTime;
            var grossWPM = (vm.totalLetters/5)/(totalTime/6000);
            grossWPM = Math.round(grossWPM * 100) / 100; 
            alert("Congratulations : Your typing speed is "+grossWPM);
            //vm.isRunning = false;
        }

        function strip(html){
           var tmp = document.createElement("DIV");
           tmp.innerHTML = html;
           return tmp.textContent || tmp.innerText || "";
        }
    }
})();