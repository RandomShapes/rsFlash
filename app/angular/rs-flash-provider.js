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
                message: "",
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
}
