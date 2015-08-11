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

function bootstrap() {
    setTimeout(function () {
        angular.bootstrap(document, [app.name]);
        log('Angular bootstrapped');
    });
}

(function jxcoreCheck() {
    if (typeof jxcore === 'undefined') {
        log('Still not loaded.');
        setTimeout(jxcoreCheck, 1000);
    } else if (jxcore === 'fake') {
        bootstrap();
        log('JXCore is not loaded, it\'s a website.');
    } else {
        log('JXCore is loaded.');
        jxcore('log').register(log);
        jxcore.isReady(function () {
            log('JXCore is ready.');
            jxcore('app.js').loadMainFile(function(ret, err) {
                if (err) {
                    log('JXCore error: ' + JSON.stringify(err));
                } else {
                    log('JXCore main file is loaded.');
                    bootstrap();
                }
            });
        });
    }
})();

function log(txt) {
    var e = document.createElement('div');
    e.innerHTML = txt;
    document.body.appendChild(e);
}