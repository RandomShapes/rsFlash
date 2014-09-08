function rsFlashRun($templateCache) {
    $templateCache.put('rs-flash-template.html', '<div ng-show="flash" class="alert {{flashType}}" ng-class="{\'rs-flash-in\': flash,\'rs-flash-out\': !flash}" role="alert">{{flash}}</div>');
}