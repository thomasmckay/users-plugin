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
 * @name  Users.users.controller:UserDetailsController
 *
 * @requires $scope
 * @requires $state
 * @requires $q
 * @requires gettext
 * @requires User
 *
 * @description
 *   Provides the functionality for the activation key details action pane.
 */
angular.module('Users.users').controller('UserDetailsController',
    ['$scope', '$state', '$q', 'gettext', 'User',
    function ($scope, $state, $q, gettext, User) {
        $scope.successMessages = [];
        $scope.errorMessages = [];

        if ($scope.user) {
            $scope.panel = {loading: false};
        } else {
            $scope.panel = {loading: true};
        }

        $scope.user = User.get({id: $scope.$stateParams.userId}, function (user) {
            $scope.$broadcast('user.loaded', user);
            $scope.panel.loading = false;
        });

        $scope.save = function (user) {
            var deferred = $q.defer();

            user.$update(function (response) {
                deferred.resolve(response);
                $scope.successMessages.push(gettext('Activation Key updated'));
                $scope.table.replaceRow(response);
            }, function (response) {
                deferred.reject(response);
                $scope.errorMessages.push(gettext("An error occurred saving the Activation Key: ") + response.data.displayMessage);
            });
            return deferred.promise;
        };

        $scope.removeUser = function (user) {
            var id = user.id;

            user.$delete(function () {
                $scope.removeRow(id);
                $scope.transitionTo('users.index');
                $scope.successMessages.push(gettext('User removed.'));
            }, function (response) {
                $scope.errorMessages.push(gettext("An error occurred removing the User: ") + response.data.displayMessage);
            });
        };

    }]
);
