function rsFlashRun($templateCache) {
    $templateCache.put('rs-flash-template.html', '<div ng-show="flash" class="alert {{flashType}}" role="alert">{{flash}}</div>');
}