(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('MainController', MainController);

    MainController.$inject = ['mainFactory'];

    /* @ngInject */
    function MainController(mainFactory) {
        var vm = this;
        vm.title = 'MainController';
        vm.getW = getW;


        activate();

        ////////////////

        function activate() {
            getW('Tokyo');
        }

        vm.search = [];

        function addrecord(name, time) {
            vm.search.unshift({ 'name': name, 'time': time, });
        }

        function getW(city) {
            mainFactory.searchN(city).then(function(result) {
                vm.weatherInfo = result.data;
                vm.weatherInfo.main.temp = Math.round(((vm.weatherInfo.main.temp * 9 / 5) - 459.67) * 100) / 100;
                vm.weatherInfo.main.temp_min = Math.round(((vm.weatherInfo.main.temp_min * 9 / 5) - 459.67) * 100) / 100;
                vm.weatherInfo.main.temp_max = Math.round(((vm.weatherInfo.main.temp_max * 9 / 5) - 459.67) * 100) / 100;
                vm.citysearch = city;
                vm.date = new Date();
                vm.time = vm.date.getHours() + ":" + vm.date.getMinutes() + ":" + vm.date.getSeconds();
                var currentTime = new Date()
                vm.day = vm.date.getMonth() + 1 + "/" + vm.date.getDate() + "/" + vm.date.getFullYear();
                vm.fulltime = " " + vm.day + " " + vm.time;
                addrecord(vm.weatherInfo.name, vm.fulltime);
                if (vm.search.length > 5) { vm.search.pop(); }
            })

        }


    }
})();
