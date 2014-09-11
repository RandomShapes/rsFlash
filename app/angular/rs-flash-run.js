function rsFlashRun($templateCache) {
    if (!config.static) {
        $templateCache.put('rs-flash-template.html', '<div ng-show="rsFlash.show" class="rs-flash alert {{rsFlash.type}}" ng-class="{\'rs-flash-in\': rsFlash.show,\'rs-flash-out\': !rsFlash.show}" role="alert">{{rsFlash.message}}</div>');
    } else {
        $templateCache.put('rs-flash-template.html', '<div class="rs-flash alert {{rsFlash.type}}" ng-class="{\'rs-flash-in\': rsFlash.show,\'rs-flash-out\': !rsFlash.show}" role="alert">{{rsFlash.message}}</div>');
    }
}