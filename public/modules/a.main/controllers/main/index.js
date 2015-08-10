angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$http',

    function (scope, http) {
        scope.data = {};
        scope.result = null;

        scope.sendRequest = function () {
            http.post('/send', scope.data).then(function (result) {
                scope.result = result.data;
            });
        };
    }
]);