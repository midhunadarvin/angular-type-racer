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
        vm.receivedData = [];
        vm.paragraph = [];
        vm.enteredData = '';
        vm.currentPosition = 0;

        activate();

        function activate() {
            DataService.getRandomText().then(onReceiveRandomText);
        }

        function onReceiveRandomText(data){
            var regEx = /\r?\n|\r/g;
            data = strip(data);
            data = data.replace(regEx, ' ');
            //console.log(data);


            vm.receivedData = data.split(" ");
            vm.receivedData.forEach(function(val,index){
                var item = {};
                item.word = val;
                item.status = 0;
                vm.paragraph.push(item);
            });
        }

        function changeStatus(){
            
            var oldVal = vm.currentPosition;
            vm.currentPosition = vm.enteredData.length - 1;
            var newVal = vm.currentPosition;

            if (newVal < oldVal)
                vm.paragraph[oldVal].status = 0;

            else {
                if (oldVal >= 0) {
                    if (vm.enteredData[oldVal] === vm.paragraph[oldVal].word)
                        vm.paragraph[oldVal].status = 1;
                    else
                        vm.paragraph[oldVal].status = 2;
                }
            }
        }

        function strip(html){
           var tmp = document.createElement("DIV");
           tmp.innerHTML = html;
           return tmp.textContent || tmp.innerText || "";
        }
    }
})();