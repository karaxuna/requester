angular.module(module.name).directive(current.name, [
    '$sce',
    '$parse',
    'text2htmlSrvc',

    function(sce, parse, text2htmlSrvc){
        return {
            restrict: 'A',
            compile: function () {
                return function (scope, element, attr) {
                    var parsed = parse(attr[current.name]);
                    scope.$watch(function () {
                        var text = parsed(scope) || '';
                        var html = text2htmlSrvc.parse(text);
                        var trusted = sce.getTrustedHtml(html);
                        return trusted;
                    }, function (trusted) {
                        element.html(trusted);
                    });
                };
            }
        };
    }
]);