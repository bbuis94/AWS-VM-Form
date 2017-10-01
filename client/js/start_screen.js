/**
 * Defines methods and variables used exclusively in the select servers page
 *
 */
angular.module('server_info').controller('start_screen', function ($scope, $rootScope)
{
// Updates the checked field in each server object that type is selected
    $scope.saved=false;
    $scope.update_check = function (server) {
        if (server.check) {
            server.checked = true;
        }
        else
        {
            server.checked= false;
        }

    };

    //Adds all servers types with a specified quantity to the user selections array and sets flags to state
    //that servers have been selected, but dates for the servers must be still selected
    $scope.addItems= function () {
        $rootScope.user_selections = [];
       angular.forEach($rootScope.server_types, function(server)
       {
          if (server.checked == true && server.quantity > 0)
          {
                $rootScope.add(server);
          }
       });
       $rootScope.server_details.selection_saved = true;
        $scope.saved=true;
    };

    //The server selections cannot be saved unless a checked server type has a specified quantity and vice-versa
    $scope.check_added = function() {
        var not_checked = true;
        angular.forEach($rootScope.server_types, function (server) {
            if (server.checked==true && server.quantity > 0 && server.date.length > 0) {
                not_checked = false;
            }
            else if (server.quantity > 0 && (!server.checked || !(server.date.length >0)) )
            {
                not_checked = true;
            }
            else if (server.checked && (!(server.quantity > 0) || !(server.date.length >0)))
            {
                not_checked = true;
            }
            else if (server.date.length > 0 && (!server.checked || !(server.quantity >0)))
            {
                not_checked = true;
            }
        });

        return not_checked;
    };


});