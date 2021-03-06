/**
 * Copyright 2014 Red Hat, Inc.
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
 * @name  Users.users.controller:UserRolesController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires User
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the list operating systems details action pane.
 */
angular.module('Users.users').controller('UserRolesController',
    ['$scope', '$q', '$location', 'gettext', 'User', 'Nutupane',
    function ($scope, $q, $location, gettext, User, Nutupane) {
        var rolesPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'id':          $scope.$stateParams.userId,
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true
        };

        rolesPane = new Nutupane(User, params, 'roles');
        $scope.rolesTable = rolesPane.table;

        $scope.removeRoles = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                rolesToRemove = _.pluck($scope.rolesTable.getSelected(), 'id');

            data = {
                "user": {
                    "role_ids": rolesToRemove
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Removed %x roles from user "%y".')
                    .replace('%x', $scope.rolesTable.numSelected)
                    .replace('%y', $scope.user.name)];
                $scope.rolesTable.working = false;
                $scope.rolesTable.selectAll(false);
                rolesPane.refresh();
                $scope.user.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors;
                $scope.rolesTable.working = false;
            };

            $scope.rolesTable.working = true;
            User.removeRoles({id: $scope.user.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
