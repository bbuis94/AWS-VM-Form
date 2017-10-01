/**
 * Defines methods and variables shared across the web application
 *
 */
var server_info = angular.module('server_info', ["ngRoute"]);

    server_info.run(function ($rootScope) {
        //Defines objects for selected server types and input gathered from info form
        $rootScope.user_selections = [];
        $rootScope.servervars = {
            entry_name : "",
            first_name: "",
            last_name: "",
            number: "",
            email: "",
            project_name: "",
            use: "",
            ram: "",
            os_volume: "",
            data_volume: "",
            log_volume: "",
            projected_growth: "",
            selected_platform: "",
            location_name: "",
            host_purpose: "",
            host_type: "",
            host_cores: "",
            host_os: "",
            host_servicelevel: "",
            load_balance_ex: "",
            basic_monitoring: "No",
            additional_monitoring: "",
            load_balancing: "No",
            other_comments: "",
            other_volumes: "",
            applications: ""
        };


        //Sets flags that must all be true in order to view and download pdf
        $rootScope.server_details = {
            selection_saved: false,
            form_saved: false,
            costs_saved : false
        };

        //Defines objects for drop down menus in info form


        $rootScope.locations= [
            {location: "US East"},
            {location: "US West"},
            {location: "China"},
            {location: "Europe"},
            {location: "South America"},
            {location: "Asia Pacific"},
            {location: "Canada"}
        ];

        $rootScope.purposes= [
            {purpose: "Webserver"},
            {purpose: "DB server"},
            {purpose: "ETL"},
            {purpose: "File server"},
            {purpose: "Other"}
        ];


        $rootScope.core_options= [
            {cores: 1},
            {cores: 2},
            {cores: 4},
            {cores: 6},
            {cores: 8},
            {cores: 16}
        ];

        $rootScope.os_options= [
            {os: "Linux CentOS 6"},
            {os: "Linux CentOS 7"},
            {os: "Linux Ubuntu 17.04"},
            {os: "Windows Server 2012"},
            {os: "Other"}
        ];


//Defines types of servers that may be selected by the user
        $rootScope.server_types= [
            {type: "QA", quantity: "", checked: false, date:""},
            {type: "Pre-Production", quantity:"", checked: false, date:""},
            {type: "Development", quantity: "", checked: false, date:""},
            {type: "Production", quantity: "", checked: false, date:""},
            {type: "Other", quantity: "", checked: false, date:""}
        ];

//Defines the entries for cost estimations

        $rootScope.server_costs = {
            entry_name : "",
            cpu_cost : "",
            ram_cost : "",
            network_cost : "",
            bandwidth_cost : ""
        };

        $rootScope.add =function (server) {
            $rootScope.user_selections.push(server);
        };

        //Checks to make sure that a valid configuration has been selected before "Save Selection" button can be clicked
        $rootScope.check_selection = function () {
            if (!($rootScope.selection.selected_config >= 0))
            {
                return false;
            }
            return true;
        }

    });

    //Defines routes for 5 views in the application
    server_info.config(function ($routeProvider) {
        $routeProvider
            .when ("/", {
                templateUrl : "views/home.html"
            })
            .when ("/views/select", {
                templateUrl : "views/selection.html"
            })
            .when ("/views/form", {
                templateUrl: "views/form.html"
            })

            .when ("/views/results", {
                templateUrl: "views/results.html"
            })

            .when ("/views/costs", {
                templateUrl: "views/costs.html"
            })



    });
