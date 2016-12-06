app.directive("teamListItem", function () {
    function Club() {
        this.name = "";
        this.code = "";
        this.league = "";
        return this;
    }
    return {
        restrict: 'AE',
        templateUrl: 'partials/directives/team-list-item.directive.html',
        scope: {
            club: '='
        },
        link: function ($scope, element, attrs) {
            $scope.club = $scope.club || new Club();
        }
    }
})