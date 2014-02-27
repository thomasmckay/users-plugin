/**
 * Copyright 2013-2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
*/

/**
 * @ngdoc object
 * @name  Users.users.controller:NewUserController
 *
 * @requires $scope
 * @requires $q
 * @requires FormUtils
 * @requires User
 * @requires Organization
 * @requires CurrentOrganization
 * @requires ContentView
 *
 * @description
 *   Controls the creation of an empty User object for use by sub-controllers.
 */
angular.module('Users.users').controller('NewUserController',
    ['$scope', '$q', 'FormUtils', 'User', 'Organization', 'CurrentOrganization', 'ContentView',
    function ($scope, $q, FormUtils, User, Organization, CurrentOrganization, ContentView) {

        $scope.user = $scope.user || new User();
        $scope.panel = {loading: false};
        $scope.organization = CurrentOrganization;

        $scope.$watch('user.name', function () {
            if ($scope.userForm.name) {
                $scope.userForm.name.$setValidity('server', true);
            }
        });

        $scope.save = function (user) {
            user['organization_id'] = CurrentOrganization;
            user.$save(success, error);
        };

        function success(response) {
            $scope.table.addRow(response);
            $scope.transitionTo('users.details.info', {userId: $scope.user.id});
        }

        function error(response) {
            $scope.working = false;
            angular.forEach(response.data.errors, function (errors, field) {
                $scope.userForm[field].$setValidity('server', false);
                $scope.userForm[field].$error.messages = errors;
            });
        }

    }]
);
