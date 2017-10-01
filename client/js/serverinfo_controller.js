/**
 * Defines methods used throughout results, selection, and server_dates pages
 */

angular.module('server_info').controller('serverinfo_controller', function ($scope, $rootScope){

    $scope.save_form = false;
    $scope.save_costs = false;

    $scope.form_saved = function () {
        $scope.save_form = true;
    };
    //Checks to make sure that radio boxes for various fields is set to "Yes" before explanation field becomes available
    $scope.load_test = function()
    {
        if ($rootScope.servervars.load_balancing == "No")
        {
            return true;
        }
        return false;
    };


    //Sets flag for info form to say that it has been saved
    $scope.write_form = function () {
        $rootScope.server_details.form_saved = true;
    };

    $scope.write_costs = function ()
    {
        $rootScope.server_details.costs_saved = true;
        $scope.save_costs = true;
    };

});