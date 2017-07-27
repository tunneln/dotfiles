/*
 * @author vkallada.
 */

"use strict";

leftPanelMod.controller("LeftPanelController",["$rootScope","$scope",function($rootScope,$scope){

	$scope.isAdmin=$rootScope.isAdmin;

	/* Left side Menu Items */
	$scope.PIT2menus = [{
		menuHeader: "Documents",
		menuItems: [{
			menuItem: "User's Guide",
			menuLink: "viewUsersGuide"
		}, /*{
			menuItem: 'View Test Plan',
			menuLink: 'viewTestPlan'
		},*/ {
			menuItem: "FAQ",
			menuLink: "faq"
		}]
	}, {
		menuHeader: "Certificate Management",
		menuItems: [{
			menuItem: "Request Testing Certificate",
			menuLink: "requestCertificateHome"
		}]
	} ,
	{
		menuHeader: "Test Case Management",
		menuItems: [{
			menuItem: "Required Test Cases", //"CTH Run ACS Test"(Old name)
			menuLink: "RequiredTestCases"		// CTHrunACSTest
		},{
			menuItem: "Optional Test Cases", //"Run ACS Test"(Old name)
			menuLink: "OptionalTestCases"	//PIT2runACSTest
		},{
			menuItem: "Testing History",
			menuLink: "PIT2reviewTestActivity"
		},{
			menuItem: "Testing Status",
			menuLink: "PIT2reviewRequiredResults"
		}]
	},{
		menuHeader: "Compliance Section",
		menuItems: [{
			menuItem: "Conclude Testing",
			menuLink: "concludeTesting"
		},{
			menuItem: "Compliance Letter",
			menuLink: "complianceLetter"
		}]
	},
	{
		menuHeader: "Vendor Management",
		menuItems:[{
			menuItem: "Pending Requests",
			menuLink: "vendorLog"
		}]
		
	},{
		menuHeader: "ACS Administer Tests",
		menuItems: [{
			menuItem: "AReq Browser",
			menuLink: "acsAReq"
		}, {
			menuItem: "CReq Browser",
			menuLink: "acsCReq"
		}, {
			menuItem: "AReq InApp",
			menuLink: "acsAReqInApp"
		}, {
			menuItem: "CReq InApp",
			menuLink: "acsCReqInApp"
		}]
	},{
		menuHeader: "3DS Server Administer Tests",
		menuItems: [{
			menuItem: "ARes Browser",
			menuLink: "mpiARes"
		}, {
			menuItem: "CRes Browser",
			menuLink: "mpiCRes"
		}, {
			menuItem: "ARes InApp",
			menuLink: "mpiAResInApp"
		}, {
			menuItem: "CRes InApp",
			menuLink: "mpiCResInApp"
		}]
	},{
		menuHeader: "ACS Simulator Tests",
		menuItems: [{
			menuItem: "ACS Simulator ARes Browser",
			menuLink: "ACSSARes"
		}, {
			menuItem: "ACS Simulator CRes Browser",
			menuLink: "ACSSCRes"
		}, {
			menuItem: "ACS Simulator ARes InApp",
			menuLink: "ACSSAResInApp"
		}, {
			menuItem: "ACS Simulator CRes InApp",
			menuLink: "ACSSCResInApp"
		}/*, {
				menuItem: "ACS Simulator RReq Browser",
				menuLink: "ACSSRreq"
			}, {
				menuItem: "ACS Simulator RReq InApp",
				menuLink: "ACSSRreqInApp"
			}*/]
	},{
		menuHeader: "Other Test Cases",
		menuItems: [{
			menuItem: "Validate CAVV",
			menuLink: "ValidateCAVV"
		}/*,{
			menuItem: "VCMS Testing",
			menuLink: "VCMSTesting"
		}*/]
	}/*,{
		menuHeader: "Going Live",
		menuItems: [{
			menuItem: "Request Production Certificate",
			menuLink: "ReqProdCert"
		}]
	},{
		menuHeader: "Compliance Letter",
		menuItems: [{
			menuItem: "Generate Compliance Letter",
			menuLink: "ComplLetterReqs"
		}]
	}*/]



}]); // End of Controller





