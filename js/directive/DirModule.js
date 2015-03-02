var dirModule = angular.module('app.dir', [])
    .directive('ntDir', function factory ( $log ){
        var directiveDefinitionObject = {

            // use templateUrl to attach external html files
            templateUrl: '<div class=" well">dynamisches Template</div>',
            replace: true,
            restrict: 'A',
            link: function( scope, element, attrs){
                $log.log ( element );
            }
        };
        return directiveDefinitionObject;
    });
