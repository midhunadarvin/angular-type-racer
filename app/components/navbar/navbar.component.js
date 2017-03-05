(function() {
    'use strict';

    angular
        .module('myApp')
        .component('navbar', {
            bindings: {

            },
            controller: NavbarController,
            templateUrl: 'components/navbar/navbar.html'

        });

    NavbarController.$inject = [];

    /* @ngInject */
    function NavbarController() {

    }
})();