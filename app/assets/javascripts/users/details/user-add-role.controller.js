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
 * @name  Users.users.controller:UserAddRolesController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires User
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for adding roles to an user.
 */
angular.module('Users.users').controller('UserAddRolesController',
    ['$scope', '$q', '$location', 'gettext', 'User', 'Nutupane',
    function ($scope, $q, $location, gettext, User, Nutupane) {
        var rolesPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true,
            'id':          $scope.$stateParams.userId
        };

        rolesPane = new Nutupane(User, params, 'availableRoles');
        $scope.rolesTable = rolesPane.table;

        $scope.addRoles = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                rolesToAdd = _.pluck($scope.rolesTable.getSelected(), 'id');

            data = {
                "user": {
                    "role_ids": rolesToAdd
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Added %x roles to user "%y".')
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
                $scope.errorMessages = error.data.errors['base'];
                $scope.rolesTable.working = false;
            };

            $scope.rolesTable.working = true;
            User.addRoles({id: $scope.user.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
