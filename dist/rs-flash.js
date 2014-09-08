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
function rsFlash() {
	return {
		restrict: "E",
		templateUrl: 'rs-flash-template.html',
	};
}
function $rsFlash() {
    this.types = types;

    this.setTypes = function(newTypes) {
        angular.extend(types, newTypes);
    };

    /* @ngInject */
    this.$get = function rsFlashFactory($rootScope) {
        return {
            create: create,
            clear: clear
        };
    	
        ////////////////////
    	
    	function create(message) {
    		var flashType = arguments[1] || this.type.info;
    		$rootScope.flash = message;
    		$rootScope.flashType = flashType;
    		$rootScope.$broadcast(FLASH_EVENTS.show);
    	}

    	function clear() {
    		$rootScope.flash = "";
    		$rootScope.$broadcast(FLASH_EVENTS.hide);
    	}
    };
    this.$get.$inject = ["$rootScope"];
}

function rsFlashRun($templateCache) {
    $templateCache.put('rs-flash-template.html', '<div ng-show="flash" class="alert {{flashType}}" role="alert">{{flash}}</div>');
}
rsFlashRun.$inject = ["$templateCache"]; 

})(angular);