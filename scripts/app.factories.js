app.factory("MainFactory", function ($http) {
    var obj = {
        leagues: [],
        clubs: [],
        matches: []
    };
    obj.getLeagues = function () {
        return $http.get("resources/leagues.json").success(function (leagues) {
            obj.leagues = leagues;
            obj.leagues.forEach(function (league) {
                league.clubs.forEach(function (clubsUrl) {
                    obj.getClubs(clubsUrl, league.code);
                });
            });
            //console.log(leagues);
        }).error(errorhandler);
    }
    obj.getLeague = function (code) {
        return obj.leagues.filter(function (league) {
            return league.code == code;
        })[0];
    }
    obj.getLeagueMatches = function (leagueCode) {
        var league = obj.getLeague(leagueCode);
        return league.matches.map(function (matchesUrl) {
            return $http.get(matchesUrl).success(function (data) {
                obj.matches = [];
                data.rounds.forEach(function (round) {
                    round.matches.forEach(function (match) {
                        match.round = round.name;
                        //match.date = new Date(match.date);
                    });
                });
                data = data.rounds.select("matches").flatten();
                obj.matches = obj.matches.concat(data);
            }).error(errorhandler);
        });
    }
    obj.getClubs = function (clubsUrl, leagueCode) {
        return $http.get(clubsUrl).success(function (data) {
            //console.log(clubsUrl, data);
            var league = obj.leagues.where("code", leagueCode).first();
            data.clubs.forEach(function (club) {
                club.league = leagueCode;
                if (!club.code || club.code == '') club.code = club.name.slice(0, 3).toUpperCase();
                club.getLeague = function () {
                    return obj.leagues.filter(function (league) {
                        return league.code == club.league;
                    })[0];
                }
            });
            data = data.clubs;
            obj.clubs = obj.clubs.concat(data).distinct("code");
            obj.clubs.sortBy("name");
            league.clubCount = obj.clubs.where("league", leagueCode).length;
        }).error(errorhandler);
    }
    obj.bindToScope = function ($scope) {
        $scope.Date = Date;
        $scope.Number = Number;
        $scope.String = String;
        $scope.Boolean = Boolean;
        $scope.Array = Array;
        return obj;
    }
    return obj;
});