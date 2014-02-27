/**
 Copyright 2013-2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc module
 * @name  User.users
 *
 * @description
 *   Module for activation keys related functionality.
 */
angular.module('Users.users', [
    'ngResource',
    'ui.router',
    'Bastion.utils',
    'Bastion.widgets'
]);

angular.module('Users.users').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('users', {
        abstract: true,
        controller: 'UsersController',
        templateUrl: 'users/views/users.html'
    })
    .state('users.index', {
        url: '/users',
        views: {
            'table': {
                templateUrl: 'users/views/users-table-full.html'
            }
        }
    })
    .state('users.new', {
        url: '/users/new',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'users/views/users-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewUserController',
                templateUrl: 'users/new/views/user-new.html'
            }
        }
    });

    $stateProvider.state("users.details", {
        abstract: true,
        url: '/users/:userId',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'users/views/users-table-collapsed.html'
            },
            'action-panel': {
                controller: 'UserDetailsController',
                templateUrl: 'users/details/views/user-details.html'
            }
        }
    })
    .state('users.details.info', {
        url: '/info',
        collapsed: true,
        controller: 'UserDetailsInfoController',
        templateUrl: 'users/details/views/user-info.html'
    });

    $stateProvider.state('users.details.roles', {
        abstract: true,
        collapsed: true,
        templateUrl: 'users/details/views/user-roles.html'
    })
    .state('users.details.roles.list', {
        url: '/roles',
        collapsed: true,
        controller: 'UserRolesController',
        templateUrl: 'users/details/views/user-roles-table.html'
    })
    .state('users.details.roles.add', {
        url: '/roles/add',
        collapsed: true,
        controller: 'UserAddRolesController',
        templateUrl: 'users/details/views/user-roles-table.html'
    });

}]);
