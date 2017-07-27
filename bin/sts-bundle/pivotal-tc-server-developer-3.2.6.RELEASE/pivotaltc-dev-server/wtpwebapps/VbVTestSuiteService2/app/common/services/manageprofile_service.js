/*
 *	@author vkallada 
 */

'use strict';

manageProfileMod.service("ManageProfileService",["$http","$rootScope",function($http,$rootScope){

	var users = [];
	/* @method : Method to get the user data 
	 * @param : loggedInUser email
	 * @returns : Retrieved user details from Database 
	 */ 
	this.getUserData = function(email){
		return $http.get($rootScope.contextPath+"/user/editEnrolledUser",{
			params : {
				'email' : email
			}});
	} // End of getUserData method.

	this.updateUser = function(updatedData){
		return $http.post($rootScope.contextPath+"/user/updateEnrolledUser",updatedData);
	}

}]);