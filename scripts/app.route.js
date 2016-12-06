app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: "/partials/home.html",
            controller: "MainCtrl"
        })
        .when("/:leagueName", {
            templateUrl: "/partials/league.html",
            controller: "LeagueCtrl"
        })
        .when("/:leagueName/:teamName", {
            templateUrl: "/partials/club.html",
            controller: "LeagueCtrl"
        })
});