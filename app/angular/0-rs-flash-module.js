angular.module('rs-flash', [])
    .provider('$rsFlash', $rsFlash)
    .directive('rsFlash', rsFlash)
    .run(rsFlashRun);