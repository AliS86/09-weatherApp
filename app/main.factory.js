(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('mainFactory', mainFactory);

    mainFactory.$inject = ['$http', '$q'];

    

    /* @ngInject */
    function mainFactory($http, $q) {
        var service = {
            searchN: searchN

        };
        return service;

        ////////////////
        function searchN(city) {
           var defer = $q.defer();

           $http({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather",
                params: {
                    appid: 'bdee93d98c121cf1a903ad9927b94bff',
                    q: city
                }
                })
           .then(function(response){
           	if(typeof response.data === 'object') {
           		defer.resolve(response)
           	}
           	else {
           		defer.reject("There is no data");
           	}
           	},
           	function(error){
           		defer.reject(error);
           	}); 
           return defer.promise;
       }
   }
})();
