(function() {
    'use strict';

    angular
        .module('myApp.core')
        .service('DataService', DataService);

    DataService.$inject = ['$resource'];

    /* @ngInject */
    function DataService($resource) {
        var url= 'http://www.randomtext.me/api/';
        var randomTextResourceObj = $resource(url);
        this.getRandomText = getRandomText;

        function getRandomText() {
            return randomTextResourceObj.get({}).$promise
                     .then(getRandomTextComplete)
                     .catch(getRandomTextFailed);
        }

        function getRandomTextComplete(response){
            return response.text_out;
        }

        function getRandomTextFailed(error){
            console.log(error);
        }
    }
})();