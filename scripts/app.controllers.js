app.controller("MainCtrl", function ($scope, $http, MainFactory) {
    $scope.main = MainFactory.bindToScope($scope);
    $scope.main.getLeagues();
});

app.controller("LeagueCtrl", function ($scope, $http, MainFactory, $routeParams, $q) {
    $scope.main = MainFactory.bindToScope($scope);
    $scope.getLeague = function (leagues) {
        $scope.league = leagues.filter(function (league) {
            return league.name.EncodeURI() == $routeParams.leagueName;
        })[0];
        $scope.filteredClubs = $scope.main.clubs.filter(function (club) {
            return club.league == $scope.league.code;
        });
        $q.all($scope.main.getLeagueMatches($scope.league.code)).then(function (data) {
            //team view
            if ($routeParams.teamName) {
                $scope.main.matches = $scope.main.matches.filter(function (match) {
                    return match.team1.code == $scope.club.code || match.team2.code == $scope.club.code;
                });
            }
            console.log($scope.main.matches.length);
        });
    }
    if (!$scope.main.leagues || $scope.main.leagues.isEmpty()) {
        $scope.main.getLeagues().then($scope.getLeague);
    }
    else $scope.getLeague($scope.main.leagues); //get the default league for the route

    //team view
    if ($routeParams.teamName) {
        $scope.club = $scope.main.clubs.filter(function (club) {
            return club.name.EncodeURI() == $routeParams.teamName;
        })[0];
        $scope.randomClub = $scope.main.clubs.where('league', $scope.league.code).random();
    }
});