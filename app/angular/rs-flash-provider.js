function $rsFlash() {
    this.type = types;
    this.config = config;

    this.setTypes = function(newTypes) {
        angular.extend(types, newTypes);
    };

    /* @ngInject */
    this.$get = function rsFlashFactory($rootScope, $timeout) {
        return {
            create: create,
            clear: clear,
            type: this.type
        };
    	
        ////////////////////
    	
    	function create(message) {
    		var flashType = arguments[1] || this.type.info;
    		$rootScope.flash = message;
    		$rootScope.flashType = flashType;
    		$rootScope.$broadcast(FLASH_EVENTS.show);

            if(config.timeout) {
                $timeout(clear, config.timeout);
            }
        }

        function clear() {
            $rootScope.flash = "";
            $rootScope.$broadcast(FLASH_EVENTS.hide);
        }
    };
}
