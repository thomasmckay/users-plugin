/**
 * Copyright 2013-2014 Red Hat, Inc.

 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc factory
 * @name  Users.users.factory:User
 *
 * @requires $resource
 *
 * @description
 *   Provides a $resource for activation keys.
 */
angular.module('Users.users').factory('User',
    ['$resource', function ($resource) {
        return $resource('/../api/v2/users/:id/:action/:action2', {id: '@id'}, {
            get: {method: 'GET', params: {fields: 'full'}},
            query: {method: 'GET', isArray: false, url: '/../users/api/index'},
            update: {method: 'PUT'},
            roles: {method: 'GET',
                        transformResponse: function (data) {
                            var user = angular.fromJson(data);
                            return {results: user.roles};
                        }
            },
            xavailableRoles: {method: 'GET', params: {action: 'roles', action2: 'available'}},
            availableRoles: {method: 'GET', url: '/../api/v2/roles',
                        transformResponse: function (data) {
                            var results = angular.fromJson(data);
                            return {results: results.results};
                        }
            },
            removeRoles: {method: 'PUT', isArray: false, params: {action: 'roles'}},
            addRoles: {method: 'POST', isArray: false, params: {action: 'roles'}},
        });
    }]
);
