/**
 * Handles insertions and queries to mongodb database
 */

angular.module('server_info').controller('dbcontroller', function ($scope, $rootScope, $http, $location, $routeParams){
    $scope.config_flag=false;
    $scope.cost_flag = false;
    $scope.selection_id = "";
    $scope.costselection_id = "";
    $scope.configCounter = 0;
    $scope.costCounter = 0;
    $scope.saved_config = false;
    $scope.saved_cost = false;

    $scope.incrementConfig = function () {
        $scope.config_flag = false;
        if ($scope.configCounter == 2)
        {
            $scope.configCounter = 1;
        }
        else
        {
            $scope.configCounter +=1;
            if ($scope.configCounter == 2)
            {
                $scope.config_flag = true;
            }
        }
    };

    $scope.incrementCost = function () {
        $scope.cost_flag = false;
        if ($scope.costCounter == 2)
        {
            $scope.costCounter = 1;
        }
        else
        {
            $scope.costCounter +=1;
            if ($scope.costCounter == 2)
            {
                $scope.cost_flag = true;
            }
        }
    };
    $scope.getConfigs = function(){
        $http.get('/api/configs').success(function(response){
            $scope.configs = response;
        });
    };

    $scope.getConfig = function(){
        var id = $scope.selection_id;
        $http.get('/api/configs/'+id).success(function(response){
            $scope.config = response;
        });
        console.log($scope.config);
        delete $scope.config['_id'];
        $rootScope.servervars = $scope.config;
        $rootScope.server_details.form_saved = true;
    };


    $scope.addConfig = function(){
        $scope.entry_name = prompt ("Enter the name that you want your server request form configuration to be saved as.");
        $rootScope.servervars.entry_name = $scope.entry_name;
        $scope.config = $rootScope.servervars;
        $http.post('/api/configs/', $scope.config);
        console.log($scope.config);
        $scope.saved_config = true;
    };

    $scope.checkLoadedConfig = function ()
    {
        if ($scope.selection_id.length == 0)
        {
            return true;
        }
    };

    $scope.getCosts = function(){
        $http.get('/api/costs').success(function(response){
            $scope.costs = response;
        });
    };

    $scope.getCost = function(){
        var id = $scope.costselection_id;
        $http.get('/api/costs/'+id).success(function(response){
            $scope.cost = response;
        });
        console.log($scope.cost);
        delete $scope.cost['_id'];
        $rootScope.server_costs = $scope.cost;
        $rootScope.server_details.costs_saved = true;
    };

    $scope.addCost = function(){
        $scope.entry_name = prompt ("Enter the name that you want your server cost estimation configuration to be saved as.");
        $rootScope.server_costs.entry_name = $scope.entry_name;
        $scope.cost = $rootScope.server_costs;
        $http.post('/api/costs/', $scope.cost);
        console.log($scope.cost);
        $scope.saved_cost = true;
    };

    $scope.checkLoadedCost = function ()
    {
        if ($scope.costselection_id.length == 0)
        {
            return true;
        }
    };

});