var app = angular
	.module(module.name, [
        'ui.router',
        'ngResource',
        'ngSanitize',
        'ngAnimate'
    ].concat(module.dependencies))
	.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
		function(stateProvider, urlRouterProvider, locationProvider){
			stateProvider.state(module.name, {
				url: '',
				template: '<div ui-view class="lang-ka"></div>',
				abstract: true
			});
			locationProvider.html5Mode(false).hashPrefix('!');
		}
	]);

var bootstrapped = false;
function bootstrap() {
    if (bootstrapped) {
        return;
    }
    angular.bootstrap(document, [app.name]);
    bootstrapped = true;
    console.log('Angular bootstrapped');
}

document.addEventListener("deviceready", bootstrap, false);
angular.element(bootstrap); 