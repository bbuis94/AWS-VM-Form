/**
 * Defines methods and variables used exclusively in the results.html page
 *
 */
var server_info = angular.module('server_info');
server_info.controller('pdf_controller', function ($scope, $rootScope){
    $scope.total_vms = 0;
    //Define the majority of content to be included in the pdf
    $scope.round = function(value, decimals)
    {
        return parseFloat(value).toFixed(decimals);
    };
    content =[
        {
            text: 'AWS SERVER/ ENVIRONMENT REQUEST FORM',
            style: 'title'
        },
        '\n',
        {
            text: 'Personal Information',
            style: 'header'
        },
        '\nRequester Name: ' + $rootScope.servervars.first_name + ' ' + $rootScope.servervars.last_name + '\n',
        'Phone Number: ' + $rootScope.servervars.number + '\n' +
        'Email: ' + $rootScope.servervars.email + '\n' +
        'Project Name: ' + $rootScope.servervars.project_name + '\n' +
        'Brief description of what this server/device will be used for: \n\n' + $rootScope.servervars.use +
        '\n\nType of Hosting/ Hosting Platform: ' + $rootScope.servervars.selected_platform + '\n' +
        'Desired Location: ' + $rootScope.servervars.location_name + '\n\n',
        {
            text: 'Server/Environment Information',
            style: 'header'
        },
        '\nHost(s) Purpose: ' + $rootScope.servervars.host_purpose + '\n' +
        'RAM : ' + $rootScope.servervars.ram + ' GB\n' +
        'Server CPU: ' + $rootScope.servervars.host_cores + ' cores\n' +
        'OS Volume : ' + $rootScope.servervars.os_volume + ' GB\n' +
        'Data Volume : ' + $rootScope.servervars.data_volume + ' GB\n' +
        'Log Volume : ' + $rootScope.servervars.log_volume + ' GB\n' +
        'Other Volumes : ' + '\n\n' + $rootScope.servervars.other_volumes + '\n\n' +
        'Projected Annual Disk Growth: ' + $rootScope.servervars.projected_growth + ' GB/year\n' +
        'Server Operating System: ' + $rootScope.servervars.host_os + '\n' +
        'List Application(s) and Versions: ' + '\n\n' + $rootScope.servervars.applications + '\n\n' +
        '\nThis Server Requires Load Balancing: ' + $rootScope.servervars.load_balancing + '\n' +
        'Load Balancing Explanation: ' + '\n\n' + $rootScope.servervars.load_balance_ex + '\n\n' +
        'Basic CloudWatch Monitoring (Uptime/Availability, CPU, RAM, Disk)? ' + $rootScope.servervars.basic_monitoring + '\n' +
        'Additional Monitoring Requirements: ' + '\n\n' + $rootScope.servervars.additional_monitoring + '\n\n'
    ];

    //Pushes all selected servers to the pdf content array
    angular.forEach($rootScope.user_selections, function (server) {
        content.push ('Server Type: ' + server.type + '\nQuantity: ' + server.quantity + '\nDate Requested By: ' + server.date + '\n\n');
        $scope.total_vms = $scope.total_vms + server.quantity;
    });
    content.push({
        text : 'Project Costs',
        style: 'header'
    });
    $scope.cpu_cost = $rootScope.servervars.host_cores*$rootScope.server_costs.cpu_cost*$scope.total_vms;
    $scope.cpu_cost = $scope.round($scope.cpu_cost,2);
    $scope.network_cost = $rootScope.servervars.host_cores*$rootScope.server_costs.network_cost*$scope.total_vms;
    $scope.network_cost = $scope.round($scope.network_cost,2);
    $scope.bandwidth_cost = $rootScope.servervars.host_cores*$rootScope.server_costs.bandwidth_cost*$scope.total_vms;
    $scope.bandwidth_cost = $scope.round($scope.bandwidth_cost,2);
    $scope.ram_cost = $rootScope.servervars.ram*$rootScope.server_costs.ram_cost*$scope.total_vms;
    $scope.ram_cost = $scope.round($scope.ram_cost,2);
    $scope.total_cost = $scope.cpu_cost + $scope.network_cost + $scope.bandwidth_cost + $scope.vmware_cost + $scope.ram_cost;
    $scope.total_cost = $scope.round($scope.total_cost,2);
    content.push('\nCPU Cost: $' + $scope.cpu_cost + '\n' +
        'Network Cost: $' + $scope.network_cost + '\n' +
        'Bandwidth, Power Cost: $' + $scope.bandwidth_cost + '\n' +
        'RAM Cost: $' + $scope.ram_cost + '\n' +
        'Total Cost: $' + $scope.total_cost + '\n'
    );
    content.push({
        text : '\n\nOther Comments',
        style: 'header'
    });
    content.push('\n\n' + $rootScope.servervars.other_comments);

    //Defines the styles for the pdf
    var docDefinition = {
        content: content,
        styles: {
            title: {
                bold: true,
                color: '#000',
                fontSize: 20,
                alignment: 'center'
            },
            header: {
                bold: true,
                color: '#000',
                fontSize: 15,
                alignment: 'left'
            }
        }
    };

    //Allows the user to open the pdf in a new window
    $scope.openPdf = function() {
        pdfMake.createPdf(docDefinition).open();
    };

    //Allows the user to download the pdf
    $scope.downloadPdf = function() {
        pdfMake.createPdf(docDefinition).download("New_VMRequest.pdf");
    };

    //Verifies that all mandatory steps have been performed before pdf is available
    $scope.check_saved = function ()
    {
        if ($rootScope.server_details.selection_saved == true && $rootScope.server_details.form_saved == true && $rootScope.server_details.costs_saved)
        {
            return false;
        }
        return true;
    };

});