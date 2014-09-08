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
}
