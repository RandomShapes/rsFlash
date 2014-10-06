(function(angular) { 

angular.module('rs-flash', [])
    .provider('$rsFlash', $rsFlash)
    .directive('rsFlash', rsFlash)
    .run(rsFlashRun);
var FLASH_EVENTS = {
    show: "$rs-flash-show",
    hide: "$rs-flash-hide"
};

var types = {
    success: "alert-success",
    info: "alert-info",
    warning: "alert-warning",
    danger: "alert-danger"
};

var config = {
    timeout: null,
    static: false
};
function rsFlash() {
	return {
		restrict: "E",
		templateUrl: 'rs-flash-template.html',
	};
}
function $rsFlash() {
    this.type = types;
    this.config = config;

    this.setTypes = function(newTypes) {
        angular.extend(types, newTypes);
    };

    /* @ngInject */
    this.$get = function rsFlashFactory($rootScope, $timeout, $anchorScroll, $location) {
        initFlash();

        return {
            create: create,
            clear: clear,
            type: this.type
        };
    	
        ////////////////////
		function initFlash() {
            $rootScope.rsFlash = {
                message: "ggg",
                type: "alert-info",
                show: !config.static
            };
        }
        
        function create(message) {
            var flashType = arguments[1] || this.type.info;
    		$rootScope.rsFlash.message = message;
            $rootScope.rsFlash.type = flashType;
            $rootScope.rsFlash.show = true;
    		$rootScope.$broadcast(FLASH_EVENTS.show);
            $location.hash('flash');
            $anchorScroll();

            if(config.timeout) {
                $timeout(clear, config.timeout);
            }
        }

        function clear() {
            if(!config.static) {
                $rootScope.rsFlash.message = "";
            }
            $rootScope.rsFlash.show = false;
            $rootScope.$broadcast(FLASH_EVENTS.hide);
        }
    };
    this.$get.$inject = ["$rootScope", "$timeout", "$anchorScroll", "$location"];
}

function rsFlashRun($templateCache) {
    if (!config.static) {
        $templateCache.put('rs-flash-template.html', '<div ng-show="rsFlash.show" id="flash" class="rs-flash alert {{rsFlash.type}}" ng-class="{\'rs-flash-in\': rsFlash.show,\'rs-flash-out\': !rsFlash.show}" role="alert">{{rsFlash.message}}</div>');
    } else {
        $templateCache.put('rs-flash-template.html', '<div id="flash" class="rs-flash alert {{rsFlash.type}}" ng-class="{\'rs-flash-in\': rsFlash.show,\'rs-flash-out\': !rsFlash.show}" role="alert">{{rsFlash.message}}</div>');
    }
}
rsFlashRun.$inject = ["$templateCache"]; 

})(angular);