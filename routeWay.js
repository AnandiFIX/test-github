var routeCollection =
    [

        {
            requestPath: '/',
            executeController: require('./controllers/StaticFileController').getStaticFileController(),
            responseFile: "index.html", format: "static"
        },
        {
            requestPath: '/addClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertClient"
        },
        {
            requestPath: '/createUrl',
            executeController: require('./controllers/UrlCreationController').UrlCreationController(),
            format: "postdata", methodName: "insertUrlKey"
        },
        {
            requestPath: '/addModule',
            executeController: require('./controllers/ModuleController').getModuleController(),
            format: "postdata", methodName: "insertModule"
        },
        {
            requestPath: '/addRole',
            executeController: require('./controllers/RoleController').getRoleController(),
            format: "postdata", methodName: "insertUserRole"
        },
        {
            requestPath: '/mapRoleWithClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertClientUserRole"
        },
        {
            requestPath: '/postRoleUserInsert',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertRoleUser"
        },
        {
            requestPath: '/mapModuleWithClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertModuleClient"
        },
        {
            requestPath: '/postModuleUrlMapInsert',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertModuleUrlMap"
        },
        {
            requestPath: '/postModuleClientUserRoleMapInsert',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertModuleClientUserRoleMap"
        },
        {
            requestPath: '/postModuleClientUserMapInsert',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertModuleClientUserMap"
        },
        {
            requestPath: '/postVendorInsert',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertVendor"
        },
        {
            requestPath: '/getModules',
            executeController: require('./controllers/ModuleController').getModuleController(),
            format: "json", methodName: "getModule"
        },
        {
            requestPath: '/getClient',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getClient"
        },
        {
            requestPath: '/getUrl',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getUrlKey"
        },
        {
            requestPath: '/getRole',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getRole"
        },
        {
            requestPath: '/getModulesByClientId',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getModulesByClientId"
        },
        {
            requestPath: '/getUrlByModuleClient',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getUrlByModuleClient"
        },
        {
            requestPath: '/getMappedModule',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getMappedModule"
        },
        {
            requestPath: '/getUsers',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getUsers"
        },
        {
            requestPath: '/insertUser',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertUser"
        },
        {
            requestPath: '/postClientShow',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "findClients"
        },
        {
            requestPath: '/getModuleUrl',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getModuleUrl"
        },
        {
            requestPath: '/getClientDetails',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getClientDetails"
        },
        {
            requestPath: '/getMappedURL',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getMappedURL"
        },
        {
            requestPath: '/getMappedRoleWithClient',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getMappedRoleWithClient"
        },
        {
            requestPath: '/login',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "login"
        }, {
        requestPath: '/getUserClientWise',
        executeController: require('./controllers/AdminUserController').AdminUserController(),
        format: "json",
        methodName: "getUserClientWise"
    }, {
        requestPath: '/getRoleClientWise',
        executeController: require('./controllers/RoleController').getRoleController(),
        format: "json",
        methodName: "getRoleClientWise"
    },
        {
            requestPath: '/addUserRoleMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertUserRoleMapping"
        },
        {
            requestPath: '/getUserRolesMap',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json",
            methodName: "getUserRolesMap"
        },
        {
            requestPath: '/mapModuleRole',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "mapModuleRole"
        },
        {
            requestPath: '/getModuleRolesMapping',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getModuleRolesMapping"
        },
        {
            requestPath: '/getActions',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getActions"
        },
        {
            requestPath: '/getUserdetails',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getUserdetails"
        }, {
        requestPath: '/createUsrActionMapping',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "createUsrActionMapping"
    },
        {
            requestPath: '/getUsrActionMapping',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getUsrActionMapping"
        },
        {
            requestPath: '/setAdminUserAuth',
            executeController: require('./controllers/AdminAuthController').getAdminAuthController(),
            format: "postdata", methodName: "setAdminUserAuth"
        },
        {
            requestPath: '/getUserAuthorization',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getUserAuthorization"
        },
        {
            requestPath: '/getAdminUserAuth',
            executeController: require('./controllers/AdminAuthController').getAdminAuthController(),
            format: "json", methodName: "getAdminUserAuth"
        }, {
        requestPath: '/deletePlatformModule',
        executeController: require('./controllers/ModuleController').getModuleController(),
        format: "postdata", methodName: "deletePlatformModule"
    },
        {
            requestPath: '/deleteUserRoleDB',
            executeController: require('./controllers/RoleController').getRoleController(),
            format: "postdata", methodName: "deleteUserRoleDB"
        },
        {
            requestPath: '/deleteUrl',
            executeController: require('./controllers/UrlCreationController').UrlCreationController(),
            format: "postdata", methodName: "deleteUrl"
        }, {
        requestPath: '/deleteUserFrmAdmin',
        executeController: require('./controllers/AdminUserController').AdminUserController(),
        format: "postdata", methodName: "deleteUserFrmAdmin"
    },
        {
            requestPath: '/deleteClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteClient"
        },
        {
            requestPath: '/deleteMapModuleWithClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteMapModuleWithClient"
        },
        {
            requestPath: '/deleteClientUserRole',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteClientUserRole"
        }, {
        requestPath: '/deleteUrlUserWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteUrlUserWise"
    },
        {
            requestPath: '/deleteUsrActionMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteUsrActionMapping"
        },
        {
            requestPath: '/deleteClientUserRoleMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteClientUserRoleMapping"
        },
        {
            requestPath: '/deleteMapModuleRole',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteMapModuleRole"
        },
        {
            requestPath: '/editModuleMst',
            executeController: require('./controllers/ModuleController').getModuleController(),
            format: "postdata", methodName: "editModuleMst"
        },
        {
            requestPath: '/editRoleMst',
            executeController: require('./controllers/RoleController').getRoleController(),
            format: "postdata", methodName: "editRoleMst"
        },
        {
            requestPath: '/editUrlMst',
            executeController: require('./controllers/UrlCreationController').UrlCreationController(),
            format: "postdata", methodName: "editUrlMst"
        },
        {
            requestPath: '/editUserMst',
            executeController: require('./controllers/AdminUserController').AdminUserController(),
            format: "postdata", methodName: "editUserMst"
        },
        {
            requestPath: '/getUserByRole',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getUserByRole"
        },
        {
            requestPath: '/mapModuleUserClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "mapModuleUserClient"
        },
        {
            requestPath: '/deleteModuleUserClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteModuleUserClient"
        },
        {
            requestPath: '/deleteAdminUserAuth',
            executeController: require('./controllers/AdminAuthController').getAdminAuthController(),
            format: "postdata", methodName: "deleteAdminUserAuth"
        },
        {
            requestPath: '/getMappedModuleUserClient',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMappedModuleUserClient"
        }
        ,
        {
            requestPath: '/getAdminModule',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getAdminModule"
        },
        {
            requestPath: '/getAdminUserAuthorization',
            executeController: require('./controllers/AdminAuthController').getAdminAuthController(),
            format: "json", methodName: "getAdminUserAuthorization"
        },
        {
            requestPath: '/insertVendorMst',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertVendorMst"
        },
        {
            requestPath: '/getVendorMst',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getVendorMst"
        },
        {
            requestPath: '/deleteVendorMst',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteVendorMst"
        },
        {
            requestPath: '/updateVendorMst',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateVendorMst"
        }, {
        requestPath: '/insertClientVendorUserMapping',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertClientVendorUserMapping"
    },
        {
            requestPath: '/getClientVendorUserMapping',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getClientVendorUserMapping"
        },
        {
            requestPath: '/deleteClientVendorUserMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteClientVendorUserMapping"
        },
        {
            requestPath: '/insertSupportGrpLevel',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertSupportGrpLevel"
        },
        {
            requestPath: '/insertSupportGroupVendorMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertSupportGroupVendorMapping"
        },
        {
            requestPath: '/insertSupportGroupSPOC',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertSupportGroupSPOC"
        }, {
        requestPath: '/deleteSupportGrpLevel',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteSupportGrpLevel"
    },
        {
            requestPath: '/deleteSupportGroupVendorMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteSupportGroupVendorMapping"
        },
        {
            requestPath: '/deleteSupportGroupSPOC',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteSupportGroupSPOC"
        },
        {
            requestPath: '/insertSupportGroupUserMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertSupportGroupUserMapping"
        },
        {
            requestPath: '/deleteSupportGroupUserMapping',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteSupportGroupUserMapping"
        }, {
        requestPath: '/getSupportGrpLevel',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGrpLevel"
    },
        {
            requestPath: '/getSupportGroupVendorMapping',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSupportGroupVendorMapping"
        },
        {
            requestPath: '/getSupportGroupSPOC',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSupportGroupSPOC"
        },
        {
            requestPath: '/getSupportGroupUserMapping',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSupportGroupUserMapping"
        },
        {
            requestPath: '/getSupportGroupByClientId',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSupportGroupByClientId"
        },
        {
            requestPath: '/getDynamicMenuDtls',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getDynamicMenuDtls"
        },
        {
            requestPath: '/mapRoleUserAction',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "mapRoleUserAction"
        },
        {
            requestPath: '/getUserWiseActions',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getUserWiseActions"
        }
        ,
        {
            requestPath: '/getRoleUserActionMap',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getRoleUserActionMap"
        },
        {
            requestPath: '/insertTicketProperty',
            executeController: require('./controllers/TicketPropertyController').TicketPropertyController(),
            format: "postdata", methodName: "insertTicketProperty"
        }, {
        requestPath: '/getTicketProperty',
        executeController: require('./controllers/TicketPropertyController').TicketPropertyController(),
        format: "json", methodName: "getTicketProperty"
    }, {
        requestPath: '/deleteRoleUserAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteRoleUserAction"
    }, {
        requestPath: '/getMenuDtlsClientWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMenuDtlsClientWise"
    }, {
        requestPath: '/insertMenuDtlsClientWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertMenuDtlsClientWise"
    }, {
        requestPath: '/getMenuCompleteDtlsClientWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMenuCompleteDtlsClientWise"
    }, {
        requestPath: '/updateMenuDtlsWithUrlClientWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateMenuDtlsWithUrlClientWise"
    }/*, {
        requestPath: '/getRoleUserActionMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getRoleUserActionMapping"
    }*/,
        {
            requestPath: '/insertAttributesHeaderMstClientWise',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertAttributesHeaderMstClientWise"
        },
        {
            requestPath: '/deleteAttributesHeaderMstClientWise',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteAttributesHeaderMstClientWise"
        },
        {
            requestPath: '/updateAttributesHeaderMstClientWise',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateAttributesHeaderMstClientWise"
        },
        {
            requestPath: '/getAttributesHeaderMstClientWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getAttributesHeaderMstClientWise"
        },
        {
            requestPath: '/insertTicketAttributesClientWise',
            executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
            format: "postdata", methodName: "insertTicketAttributesClientWise"
        },
        {
            requestPath: '/deleteTicketAttributesClientWise',
            executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
            format: "postdata", methodName: "deleteTicketAttributesClientWise"
        },
        {
            requestPath: '/getTicketAttributesClientWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTicketAttributesClientWise"
        }, {
        requestPath: '/getTicketAttrClientAttributesWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketAttrClientAttributesWise"
    },{
            requestPath: '/getTicketAttrClientAttributesWise_chr',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTicketAttrClientAttributesWise_chr"
        },
        {
            requestPath: '/getBusinessImpact',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getBusinessImpact"
        },
        {
            requestPath: '/getBusinessPriority',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getBusinessPriority"
        },
        {
            requestPath: '/getBusinessUrgency',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getBusinessUrgency"
        },
        {
            requestPath: '/insertBusinessImpact',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertBusinessImpact"
        },
        {
            requestPath: '/insertBusinessPriority',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertBusinessPriority"
        },
        {
            requestPath: '/insertBusinessUrgency',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertBusinessUrgency"
        },
        {
            requestPath: '/deleteBusinessImpact',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteBusinessImpact"
        },
        {
            requestPath: '/deleteBusinessPriority',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteBusinessPriority"
        },
        {
            requestPath: '/deleteBusinessUrgency',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteBusinessUrgency"
        },
        {
            requestPath: '/updateBusinessImpact',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateBusinessImpact"
        },
        {
            requestPath: '/updateBusinessPriority',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateBusinessPriority"
        },
        {
            requestPath: '/updateBusinessUrgency',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateBusinessUrgency"
        },
        {
            requestPath: '/insertMappingWithTicketAttrSuppGrp',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertMappingWithTicketAttrSuppGrp"
        },
        {
            requestPath: '/deleteMappingWithTicketAttrSuppGrp',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteMappingWithTicketAttrSuppGrp"
        },
        {
            requestPath: '/getMappingWithTicketAttrSuppGrp',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMappingWithTicketAttrSuppGrp"
        }
        ,
        {
            requestPath: '/getTicketType',
            executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
            format: "json", methodName: "getTicketType"
        },
        {
            requestPath: '/getSupportGroupByVendor',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSupportGroupByVendor"
        },
        {
            requestPath: '/updateSLADetails',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateSLADetails"
        },
        {
            requestPath: '/deleteSLADetails',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteSLADetails"
        },
        {
            requestPath: '/insertSLADetails',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertSLADetails"
        },
        {
            requestPath: '/getSLADetails',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSLADetails"
        },
        {
            requestPath: '/insertBusinessMatrix',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertBusinessMatrix"
        },
        {
            requestPath: '/deleteBusinessMatrix',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteBusinessMatrix"
        },
        {
            requestPath: '/getBusinessMatrix',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getBusinessMatrix"
        }, {
        requestPath: '/updateSupportGrpLevel',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateSupportGrpLevel"
    },
        {
            requestPath: '/getMetadataTable',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMetadataTable"
        }, {
        requestPath: '/mapTableAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapTableAction"
    }, {
        requestPath: '/getTableWiseActions',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableWiseActions"
    }, {
        requestPath: '/getTableActionMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableActionMap"
    }, {
        requestPath: '/deleteTableAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTableAction"
    }, {
        requestPath: '/deleteTableFieldAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTableFieldAction"
    }, {
        requestPath: '/getFieldByTable',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFieldByTable"
    }, {
        requestPath: '/mapTableFieldAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapTableFieldAction"
    },
        {
            requestPath: '/getTableFieldWiseActions',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTableFieldWiseActions"
        }, {
        requestPath: '/getTableFieldActionMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableFieldActionMap"
    }, {
        requestPath: '/mapTableUrl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapTableUrl"
    }, {
        requestPath: '/getTableUrlMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableUrlMap"
    }, {
        requestPath: '/deleteTableUrl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTableUrl"
    }, {
        requestPath: '/getUrlByTable',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUrlByTable"
    }, {
        requestPath: '/mapTableUserAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapTableUserAction"
    }, {
        requestPath: '/getTableUserWiseActions',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableUserWiseActions"
    }, {
        requestPath: '/getTableUserActionMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableUserActionMap"
    }, {
        requestPath: '/deleteTableUserAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTableUserAction"
    }, {
        requestPath: '/mapTableFieldUserAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapTableFieldUserAction"
    },
        {
            requestPath: '/getTableFieldUserWiseActions',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTableFieldUserWiseActions"
        }, {
        requestPath: '/getTableFieldUserActionMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTableFieldUserActionMap"
    }, {
        requestPath: '/deleteTableFieldUserAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTableFieldUserAction"
    },
        {
            requestPath: '/insertWorkFlow',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertWorkFlow"
        },
        {
            requestPath: '/updateWorkFlow',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateWorkFlow"
        },
        {
            requestPath: '/deleteWorkFlow',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteWorkFlow"
        },
        {
            requestPath: '/getWorkFlow',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getWorkFlow"
        },
        {
            requestPath: '/insertWorkFlowComponent',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertWorkFlowComponent"
        },
        {
            requestPath: '/deleteWorkFlowComponent',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteWorkFlowComponent"
        },
        {
            requestPath: '/getWorkFlowComponent',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getWorkFlowComponent"
        },
        {
            requestPath: '/insertWorkFlowComponentDetails',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertWorkFlowComponentDetails"
        },
        {
            requestPath: '/deleteWorkFlowComponentDetails',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteWorkFlowComponentDetails"
        },
        {
            requestPath: '/getWorkFlowComponentDetails',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getWorkFlowComponentDetails"
        },
        {
            requestPath: '/insertWFCClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertWFCClient"
        },
        {
            requestPath: '/deleteWFCClient',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteWFCClient"
        },
        {
            requestPath: '/getWFCClient',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getWFCClient"
        },
        {
            requestPath: '/getWFCClientByClientId',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getWFCClientByClientId"
        },
        {
            requestPath: '/searchZone',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "searchZone"
        },
        {
            requestPath: '/getComponentsByworkflowId',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getComponentsByworkflowId"
        }, {
        requestPath: '/getTicketCreateLoadingDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCreateLoadingDtls"
    },
    {
        requestPath: '/getAttributesParentWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAttributesParentWise"
    }, {
        requestPath: '/getBusinessPriorityImpactUrgencyBasis',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getBusinessPriorityImpactUrgencyBasis"
    }, {
        requestPath: '/getLastLevelCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getLastLevelCategory"
    }, {
        requestPath: '/getSupportGroupByCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupByCategory"
    }, {
        requestPath: '/getSupportGroupByCategory1',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupByCategory1"
    }, {
        requestPath: '/getUserByGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserByGroup"
    }, {
        requestPath: '/getUserByGroup1',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserByGroup1"
    }, {
        requestPath: '/getTicketByMe',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketByMe"
    },
        {
            requestPath: '/createTicket',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "createTicket"
        },
        {
            requestPath: '/getStatus',
            executeController: require('./controllers/StatusController').getStatusController(),
            format: "json", methodName: "getStatus"
        },
        {
            requestPath: '/updateTicketCategory',
            executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
            format: "postdata", methodName: "updateTicketCategory"
        },
        {
            requestPath: '/getMappedTicketType',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMappedTicketType"
        },
        {
            requestPath: '/getMappedStatus',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMappedStatus"
        },
        {
            requestPath: '/getNextAssigneeDtls',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getNextAssigneeDtls"
        },
        {
            requestPath: '/updateForwardedTicket',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateForwardedTicket"
        },
        {
            requestPath: '/getTicketCategoryDetails',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTicketCategoryDetails"
        }, {
        requestPath: '/getAssignedByMe',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAssignedByMe"
    },
        {
            requestPath: '/getMyForwardedTicketsInGroup',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMyForwardedTicketsInGroup"
        },
        {
            requestPath: '/getMyForwardedTickets',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMyForwardedTickets"
        },
        {
            requestPath: '/getCloseTicketInMyGroup',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getCloseTicketInMyGroup"
        },
        {
            requestPath: '/getMyCloseTicket',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMyCloseTicket"
        },
        {
            requestPath: '/getOpenTicketInMyGroup',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getOpenTicketInMyGroup"
        },
        {
            requestPath: '/getStatusForClient',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getStatusForClient"
        }, {
        requestPath: '/submitFeedbackTicketWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "submitFeedbackTicketWise"
    }, {
        requestPath: '/getUserClientWiseNotAssignInGrp',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserClientWiseNotAssignInGrp"
    }, {
        requestPath: '/getCommentsByTicketId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCommentsByTicketId"
    }, {
        requestPath: '/updateTicketStatus',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketStatus"
    },
        {
            requestPath: '/updateTicketStatusWithClose',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateTicketStatusWithClose"
        },
        {
            requestPath: '/updateFile',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateFile"
        }, {
        requestPath: '/submitSolutionsTicketWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "submitSolutionsTicketWise"
    },
        {
            requestPath: '/getSolutionsTicketWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSolutionsTicketWise"
        },
        {
            requestPath: '/getLogsTicketWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getLogsTicketWise"
        }, {
        requestPath: '/updateTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicket"
    },
        {
            requestPath: '/getAttachmentTicketWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getAttachmentTicketWise"
        },
        {
            requestPath: '/submitAttachmentTicketWise',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "submitAttachmentTicketWise"
        }, {
        requestPath: '/getSupportGrpWithoutVendor',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGrpWithoutVendor"
    }, {
        requestPath: '/getUserWithOrWithoutVendorMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserWithOrWithoutVendorMapping"
    }, {
        requestPath: '/getAdditionalFuncTicketTypeWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAdditionalFuncTicketTypeWise"
    }, {
        requestPath: '/getAdditionalFuncTicketTypeUserWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAdditionalFuncTicketTypeUserWise"
    }, {
        requestPath: '/getAdditionalFunc',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAdditionalFunc"
    }, {
        requestPath: '/insertAdditionalFuncTicketTypeUserWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertAdditionalFuncTicketTypeUserWise"
    }, {
        requestPath: '/getFirstLevelCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFirstLevelCategory"
    }, {
        requestPath: '/getFirstLevelCategoryByTicket',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFirstLevelCategoryByTicket"
    }, {
        requestPath: '/getDynamicMenuTicketTypeWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicMenuTicketTypeWise"
    }, {
        requestPath: '/insertWFCClientBackWard',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertWFCClientBackWard"
    }, {
        requestPath: '/getDynamicTabActionTicketTypeWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicTabActionTicketTypeWise"
    }, {
        requestPath: '/getWorkflowType',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getWorkflowType"
    }, {
        requestPath: '/deleteTicketExtandMstTbl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTicketExtandMstTbl"
    }, {
        requestPath: '/insertTicketExtandMstTbl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketExtandMstTbl"
    }, {
        requestPath: '/getTicketExtandMstTbl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketExtandMstTbl"
    }, {
        requestPath: '/getBackwardWorkFlowType',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getBackwardWorkFlowType"
    }, {
        requestPath: '/deleteDynamicTabActionTicketTypeWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteDynamicTabActionTicketTypeWise"
    }, {
        requestPath: '/getUrlByClient',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUrlByClient"
    }, {
        requestPath: '/getUnmappedLeafMenu',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUnmappedLeafMenu"
    }, {
        requestPath: '/getRoleUserActionMapping',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "getRoleUserActionMapping"
    }, {
        requestPath: '/getRemainingUrlDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getRemainingUrlDtls"
    }, {
        requestPath: '/mapNewUrlToModule',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapNewUrlToModule"
    }, {
        requestPath: '/getUrlSequence',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "getUrlSequence"
    }, {
        requestPath: '/updateMenuDtls',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateMenuDtls"
    }, {
        requestPath: '/insertHoliday',
        executeController: require('./controllers/HolidayController').getMethodController(),
        format: "postdata", methodName: "insertHoliday"
    }, {
        requestPath: '/insertSLAClientWiseDetails',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "postdata", methodName: "insertSLAClientWiseDetails"
    }, {
        requestPath: '/updateSLAClientWiseDetails',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "postdata", methodName: "updateSLAClientWiseDetails"
    }, {
        requestPath: '/deleteSLAClientWiseDetails',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "postdata", methodName: "deleteSLAClientWiseDetails"
    }, {
        requestPath: '/getSLAClientWiseDetails',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "json", methodName: "getSLAClientWiseDetails"
    }, {
        requestPath: '/updateHoliday',
        executeController: require('./controllers/HolidayController').getMethodController(),
        format: "postdata", methodName: "updateHoliday"
    }, {
        requestPath: '/getHoliday',
        executeController: require('./controllers/HolidayController').getMethodController(),
        format: "json", methodName: "getHoliday"
    }, {
        requestPath: '/getAllClients',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllClients"
    }, {
        requestPath: '/updateAdditionalFieldTicketWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateAdditionalFieldTicketWise"
    }, {
        requestPath: '/getTicketExtandDtlsTicketNFieldWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketExtandDtlsTicketNFieldWise"
    }, {
        requestPath: '/getTicketExtandDtlsTicketWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketExtandDtlsTicketWise"
    }, {
        requestPath: '/getTicketFieldsCatWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketFieldsCatWise"
    }, {
        requestPath: '/getAddionalFieldWithValue',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAddionalFieldWithValue"
    }, {
        requestPath: '/getCSatFormDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCSatFormDtls"
    }, {
        requestPath: '/insertCSatFormDtls',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertCSatFormDtls"
    }, {
        requestPath: '/updateCSatFormDtls',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateCSatFormDtls"
    }, {
        requestPath: '/deleteCSatFormDtls',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteCSatFormDtls"
    }, {
        requestPath: '/updateHolidayDateVal',
        executeController: require('./controllers/HolidayController').getMethodController(),
        format: "postdata", methodName: "updateHolidayDateVal"
    }, {
        requestPath: '/deleteHolidayDateVal',
        executeController: require('./controllers/HolidayController').getMethodController(),
        format: "postdata", methodName: "deleteHolidayDateVal"
    }, {
        requestPath: '/insertTicketEscalationDtlsSupportGrpWise',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketEscalationDtlsSupportGrpWise"
    }, {
        requestPath: '/getTicketEscalationDtlsSupportGrpWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketEscalationDtlsSupportGrpWise"
    }, {
        requestPath: '/getTicketIdConfigure',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketIdConfigure"
    }, {
        requestPath: '/insertTicketIdConfigure',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketIdConfigure"
    }, {
        requestPath: '/getClientWiseSupportGroupList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getClientWiseSupportGroupList"
    }, {
        requestPath: '/getMappedModuleUserClientCWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMappedModuleUserClientCWise"
    }, {
        requestPath: '/getModuleRolesMappingClientWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getModuleRolesMappingClientWise"
    }, {
        requestPath: '/insertTicketPriorityConfiguration',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketPriorityConfiguration"
    }, {
        requestPath: '/updateTicketPriorityConfiguration',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketPriorityConfiguration"
    }, {
        requestPath: '/deleteTicketPriorityConfiguration',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTicketPriorityConfiguration"
    }, {
        requestPath: '/getTicketPriorityConfiguration',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketPriorityConfiguration"
    }, {
        requestPath: '/getPriorityMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getPriorityMapping"
    }, {
        requestPath: '/updateReOpenTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateReOpenTicket"
    }, {
        requestPath: '/getPriorityCategoryWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getPriorityCategoryWise"
    }, {
        requestPath: '/getSlaRecalculationMstForm',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSlaRecalculationMstForm"
    }, {
        requestPath: '/insertSlaRecalculationMstForm',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertSlaRecalculationMstForm"
    }, {
        requestPath: '/getAttributesParentWiseWithPriority',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAttributesParentWiseWithPriority"
    }, {
        requestPath: '/getMenuDtlsAllClientWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMenuDtlsAllClientWise"
    }, {
        requestPath: '/getUsrActionMappingWithClientId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUsrActionMappingWithClientId"
    }, {
        requestPath: '/getRoleUserActionMapWithClientId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getRoleUserActionMapWithClientId"
    }, {
        requestPath: '/getAssetManagementMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetManagementMaster"
    }, {
        requestPath: '/addAssetManagementMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "insertAssetManagementMaster"
    }, {
        requestPath: '/deleteAssetManagementMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "deleteAssetManagementMaster"
    }, {
        requestPath: '/editAssetManagementMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "editAssetManagementMaster"
    }, {
        requestPath: '/getAssetManagementColumn',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetManagementColumn"
    }, {
        requestPath: '/addAssetManagementColumn',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "insertAssetManagementColumn"
    }, {
        requestPath: '/deleteAssetManagementColumn',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "deleteAssetManagementColumn"
    }, {
        requestPath: '/editAssetManagementColumn',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "editAssetManagementColumn"
    }, {
        requestPath: '/getAssetManagementValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetManagementValue"
    }, {
        requestPath: '/addAssetManagementValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "insertAssetManagementValue"
    }, {
        requestPath: '/deleteAssetManagementValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "deleteAssetManagementValue"
    }, {
        requestPath: '/editAssetManagementValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "editAssetManagementValue"
    }, {
        requestPath: '/getAttributesHeaderMstClientTicketTypeWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAttributesHeaderMstClientTicketTypeWise"
    },
        {
            requestPath: '/getRoleWiseActions',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getRoleWiseActions"
        }, {
        requestPath: '/mapRoleAction',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapRoleAction"
    }, {
        requestPath: '/getAssetDescription',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetDescription"
    }, {
        requestPath: '/addAssetDescription',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "insertAssetDescription"
    }, {
        requestPath: '/deleteAssetDescription',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "deleteAssetDescription"
    }, {
        requestPath: '/editAssetDescription',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "editAssetDescription"
    }, {
        requestPath: '/getAssetColumnByMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetColumnByMaster"
    }, {
        requestPath: '/getAssetDetailsByMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetDetailsByMaster"
    }, {
        requestPath: '/getAssetManagementData',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetManagementData"
    }, {
        requestPath: '/getAssetMasterByTicket',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetMasterByTicket"
    }, {
        requestPath: '/getTicketWiseAssetData',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getTicketWiseAssetData"
    }, {
        requestPath: '/deleteTicketAssetData',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "deleteTicketAssetData"
    }, {
        requestPath: '/insertAssetIds',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertAssetIds"
    }, {
        requestPath: '/deleteBackwardWorkFlow',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteBackwardWorkFlow"
    }, {
        requestPath: '/searchAssetManagementData',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "searchAssetManagementData"
    },
        {
            requestPath: '/getDynamicTabTicketTypeWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getDynamicTabTicketTypeWise"
        }, {
        requestPath: '/getDynamicActionTicketTypeWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicActionTicketTypeWise"
    }, {
        requestPath: '/getCategoryByTicketId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryByTicketId"
    }, {
        requestPath: '/getBusinessPriorityTicketTypeWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getBusinessPriorityTicketTypeWise"
    }, {
        requestPath: '/getWFCClientBackward',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getWFCClientBackward"
    },
        {
            requestPath: '/maintainAssetManagementData',
            executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
            format: "json", methodName: "maintainAssetManagementData"
        }, {
        requestPath: '/escalationByCreatorAfterResolve',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "escalationByCreatorAfterResolve"
    }, {
        requestPath: '/editAssetValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "editAssetValue"
    }, {
        requestPath: '/getAttributesHeaderMstClientWiseWithTicket',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAttributesHeaderMstClientWiseWithTicket"
    }, {
        requestPath: '/approveProblemTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "approveProblemTicket"
    }, {
        requestPath: '/getIncidentTicketDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getIncidentTicketDetails"
    }, {
        requestPath: '/changeTicketStatus',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "changeTicketStatus"
    }, {
        requestPath: '/getAllIncidentTicketDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllIncidentTicketDetails"
    }/*, {
        requestPath: '/getIncidentTicketDetailsProblemWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getIncidentTicketDetailsProblemWise"
    }*/, {
        requestPath: '/getMappedIncidentTicketDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMappedIncidentTicketDetails"
    }, {
        requestPath: '/healthCheck',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "healthCheck"
    }, {
        requestPath: '/getTicketById',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketById"
    }, {
        requestPath: '/deleteNewIncidentInProblem',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteNewIncidentInProblem"
    }, {
        requestPath: '/getSubTicketType',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSubTicketType"
    }, {
        requestPath: '/forwardProblemTicketAfterChangesToApprover',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "forwardProblemTicketAfterChangesToApprover"
    }, {
        requestPath: '/addNewIncidentInProblem',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "addNewIncidentInProblem"
    }, {
        requestPath: '/getDocuTicketDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDocuTicketDetails"
    }, {
        requestPath: '/getDocuActions',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getDocuActions"
    }, {
        requestPath: '/getUsersByMultiGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUsersByMultiGroup"
    }
        , {
        requestPath: '/uploadDocument',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "postdata", methodName: "uploadDocument"
    }, {
        requestPath: '/getDataByCategory',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getDataByCategory"
    }, {
        requestPath: '/getDataByEmail',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getDataByEmail"
    }, {
        requestPath: '/getDataByDate',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getDataByDate"
    }, {
        requestPath: '/getDataByText',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getDataByText"
    }, {
        requestPath: '/getDocumentDetails',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getDocumentDetails"
    }, {
        requestPath: '/getActionsByDocuId',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getActionsByDocuId"
    }, {
        requestPath: '/updateDocument',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "postdata", methodName: "updateDocument"
    }, {
        requestPath: '/getAttachmentByDocuId',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getAttachmentByDocuId"
    }, {
        requestPath: '/addDocuComment',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "postdata", methodName: "addDocuComment"
    }, {
        requestPath: '/getComments',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getComments"
    }, {
        requestPath: '/searchDocuId',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "searchDocuId"
    }, {
        requestPath: '/getGroupsByDocument',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getGroupsByDocument"
    }, {
        requestPath: '/getActionsByDocument',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "getActionsByDocument"
    }, {
        requestPath: '/addUserActionDocumentWise',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "postdata", methodName: "addUserActionDocumentWise"
    }, {
        requestPath: '/deleteActionDocumentWise',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "postdata", methodName: "deleteActionDocumentWise"
    }, {
        requestPath: '/deleteDocument',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "postdata", methodName: "deleteDocument"
    },
        {
            requestPath: '/getTicketTypeForTicketCreation',
            executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
            format: "json", methodName: "getTicketTypeForTicketCreation"
        },
        {
            requestPath: '/getSlaCompletionPercentage',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSlaCompletionPercentage"
        },
        {
            requestPath: '/getSalReport',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSalReport"
        }, {
        requestPath: '/autoSearch',
        executeController: require('./controllers/DocumentController').getDocumentController(),
        format: "json", methodName: "autoSearch"
    }, {
        requestPath: '/getSomeModules',
        executeController: require('./controllers/ModuleController').getModuleController(),
        format: "json",
        methodName: "getSomeModules"
    }, {
        requestPath: '/getSomeRoleClientWise',
        executeController: require('./controllers/RoleController').getRoleController(),
        format: "json",
        methodName: "getSomeRoleClientWise"
    }, {
        requestPath: '/getUserByClient',
        executeController: require('./controllers/AdminUserController').AdminUserController(),
        format: "json",
        methodName: "getUserByClient"
    }, {
        requestPath: '/getSomeTicketType',
        executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
        format: "json", methodName: "getSomeTicketType"
    }, {
        requestPath: '/getSomeStatus',
        executeController: require('./controllers/StatusController').getStatusController(),
        format: "json", methodName: "getSomeStatus"
    }, {
        requestPath: '/getSomeAssetManagementMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getSomeAssetManagementMaster"
    }, {
        requestPath: '/getSomeVendorMst',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSomeVendorMst"
    }, {
        requestPath: '/getApiTime',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getApiTime"
    }, {
        requestPath: '/insertApiTime',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertApiTime"
    }, {
        requestPath: '/getRSDBData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getRSDBData"
    }, {
        requestPath: '/getCategoryByTicketTypeNDynamicLevel',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryByTicketTypeNDynamicLevel"
    }, {
        requestPath: '/loginlt',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "loginlt"
    }, {
        requestPath: '/getLoginClientList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json",
        methodName: "getLoginClientList"
    }, {
        requestPath: '/generateToken',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "generateToken"
    }, {
        requestPath: '/tokenValidation',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "tokenValidation"
    }, {
        requestPath: '/insertWFCGeneratedFor',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertWFCGeneratedFor"
    }, {
        requestPath: '/getAttributesHeaderMstTicketTypewise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAttributesHeaderMstTicketTypewise"
    }, {
        requestPath: '/getTicketTypeForTicketCreation_LNT',
        executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
        format: "json", methodName: "getTicketTypeForTicketCreation_LNT"
    }, {
        requestPath: '/getWFCGeneratedDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getWFCGeneratedDetails"
    }, {
        requestPath: '/getTicketDetailForRSDB',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketDetailForRSDB"
    }, {
        requestPath: '/getTicketCreateLoadingDtls_lnt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCreateLoadingDtls_lnt"
    }, {
        requestPath: '/insertLNTEmployeeDtls',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertLNTEmployeeDtls"
    }, {
        requestPath: '/getLNTEmployeeDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getLNTEmployeeDtls"
    }, {
        requestPath: '/getWorkFlowWithPagination',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getWorkFlowWithPagination"
    }, {
        requestPath: '/getUserDetailsByLoginId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserDetailsByLoginId"
    }, {
        requestPath: '/submitUserReplyFotTicketIfo',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "submitUserReplyFotTicketIfo"
    }, {
        requestPath: '/insertUserSession',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertUserSession"
    }, {
        requestPath: '/searchTicket',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchTicket"
    }, {
        requestPath: '/getRequesterInfo',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getRequesterInfo"
    }, {
        requestPath: '/getStatusClientSSC',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getStatusClientSSC"
    }, {
        requestPath: '/getPriorityForLTSSC',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getPriorityForLTSSC"
    }, {
        requestPath: '/getOpenTicketInMyCategoryGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getOpenTicketInMyCategoryGroup"
    }
        , {
        requestPath: '/getLastCommentByTicketId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getLastCommentByTicketId"
    }, {
        requestPath: '/getCloseTicketInMyCategoryGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCloseTicketInMyCategoryGroup"
    }, {
        requestPath: '/getDashBoardDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDashBoardDtls"
    }, {
        requestPath: '/getFollowupUserLt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFollowupUserLt"
    }, {
        requestPath: '/checkIsLead',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "checkIsLead"
    }, // ========================================================
        {
            requestPath: '/getStatusByTicketTypeLt',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getStatusByTicketTypeLt"
        }, {
        requestPath: '/getSupportGroupByTicketTypeLt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupByTicketTypeLt"
    }, {
        requestPath: '/insertMailTemplateLt',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertMailTemplateLt"
    }, {
        requestPath: '/getMailTemplateLt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMailTemplateLt"
    }, {
        requestPath: '/deleteMailTemplateLt',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteMailTemplateLt"
    }, {
        requestPath: '/addFollowupLt',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "addFollowupLt"
    }, {
        requestPath: '/getFollowupLt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFollowupLt"
    }, {
        requestPath: '/deleteFollowUpLt',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteFollowUpLt"
    }, {
        requestPath: '/updateFollowupLt',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateFollowupLt"
    }, {
        requestPath: '/getDynamicMenuTicketDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicMenuTicketDtls"
    }, {
        requestPath: '/getDashBoardDtlsForTeamLead',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDashBoardDtlsForTeamLead"
    }, {
        requestPath: '/getDashBoardDtlsForLeader',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDashBoardDtlsForLeader"
    }, {
        requestPath: '/getAllLevelOneUser',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllLevelOneUser"
    }, {
        requestPath: '/insertEscalation',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertEscalation"
    }, {
        requestPath: '/deleteEscalation',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteEscalation"
    }, {
        requestPath: '/getEscalateDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getEscalateDetails"
    }, {
        requestPath: '/insertEscalationSupportGroup',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertEscalationSupportGroup"
    }, {
        requestPath: '/deleteEscalationSupportGroup',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteEscalationSupportGroup"
    }, {
        requestPath: '/getEscalationSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getEscalationSupportGroup"
    }, {
        requestPath: '/updateEscalationSupportGroup',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateEscalationSupportGroup"
    }, {
        requestPath: '/getFaqCategory',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "json", methodName: "getFaqCategory"
    }, {
        requestPath: '/getFaqDetails',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "json", methodName: "getFaqDetails"
    }, {
        requestPath: '/getFaqSearchData',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "json", methodName: "getFaqSearchData"
    }, {
        requestPath: '/checkOfflineNotificationData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "checkOfflineNotificationData"
    }, {
        requestPath: '/updateOfflineNotificationData',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateOfflineNotificationData"
    }, {
        requestPath: '/getAllFaqCategory',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "json", methodName: "getAllFaqCategory"
    }, {
        requestPath: '/insertFaqCategory',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "insertFaqCategory"
    }, {
        requestPath: '/deleteFaqCategory',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "deleteFaqCategory"
    }, {
        requestPath: '/updateFaqCategory',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "updateFaqCategory"
    }, {
        requestPath: '/getAllFaq',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "json", methodName: "getAllFaq"
    }, {
        requestPath: '/insertFaq',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "insertFaq"
    }, {
        requestPath: '/deleteFaq',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "deleteFaq"
    }, {
        requestPath: '/updateFaq',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "updateFaq"
    }, {
        requestPath: '/AdvancesearchTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "AdvancesearchTicket"
    }, {
        requestPath: '/checkOfflineDashNotification',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "checkOfflineDashNotification"
    }, {
        requestPath: '/getProblemTicketPrioritySSC',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getProblemTicketPrioritySSC"
    }, {
        requestPath: '/getCategoryListSupportGroupWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryListSupportGroupWise"
    }, {
        requestPath: '/getChatBotSearchTicket',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getChatBotSearchTicket"
    }, {
        requestPath: '/getStatusByTicketTypeIncidentLt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getStatusByTicketTypeIncidentLt"
    }, {
        requestPath: '/encryptData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "encryptData"
    }, {
        requestPath: '/decryptData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "decryptData"
    }, {
        requestPath: '/passwordEncryption',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "passwordEncryption"
    }, {
        requestPath: '/getTicketCreateLoadingDtlsForSearch',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCreateLoadingDtlsForSearch"
    }, {
        requestPath: '/searchTicketById',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "searchTicketById"
    }, {
        requestPath: '/getUrlList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUrlList"
    }, {
        requestPath: '/addClientSpecificUrl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "addClientSpecificUrl"
    }, {
        requestPath: '/getClientSpecificUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getClientSpecificUrl"
    }, {
        requestPath: '/deleteClientSpecificUrl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteClientSpecificUrl"
    }, {
        requestPath: '/getDistinctUrlKey',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDistinctUrlKey"
    }, {
        requestPath: '/getSscReport',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSscReport"
    }, {
        requestPath: '/getPSDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getPSDetails"
    }, {
        requestPath: '/getSscReportList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSscReportList"
    }, {
        requestPath: '/getMappedLeafMenu',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMappedLeafMenu"
    }, {
        requestPath: '/AdvancesearchForIncidentTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "AdvancesearchForIncidentTicket"
    }, {
        requestPath: '/getStatusByTicketTypeForIncident',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getStatusByTicketTypeForIncident"
    }, {
        requestPath: '/mapClientWiseFunctionality',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapClientWiseFunctionality"
    }, {
        requestPath: '/getFunctionalityByClient',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFunctionalityByClient"
    }, {
        requestPath: '/getFunctionalityDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFunctionalityDetails"
    }, {
        requestPath: '/deleteFunctionalityDetails',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteFunctionalityDetails"
    }, {
        requestPath: '/getDashBoardDtls_new',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDashBoardDtls_new"
    }, {
        requestPath: '/getTempSscReport',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTempSscReport"
    }, {
        requestPath: '/deleteChecklist',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "postdata", methodName: "deleteChecklist"
    }, {
        requestPath: '/addChecklist',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "postdata", methodName: "insertChecklist"
    }, {
        requestPath: '/getChecklist',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "json", methodName: "getChecklist"
    }, {
        requestPath: '/editChecklist',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "postdata", methodName: "editChecklist"
    }, {
        requestPath: '/insertEscalatePrcessConfig',
        executeController: require('./controllers/EscalatePrcessConfigController').getEscalatePrcessConfigController(),
        format: "postdata", methodName: "insertEscalatePrcessConfig"
    }, {
        requestPath: '/getEscalatePrcessConfig',
        executeController: require('./controllers/EscalatePrcessConfigController').getEscalatePrcessConfigController(),
        format: "json", methodName: "getEscalatePrcessConfig"
    }, {
        requestPath: '/deleteEscalatePrcessConfig',
        executeController: require('./controllers/EscalatePrcessConfigController').getEscalatePrcessConfigController(),
        format: "postdata", methodName: "deleteEscalatePrcessConfig"
    }, {
        requestPath: '/insertCsatRating',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "postdata", methodName: "insertCsatRating"
    }, {
        requestPath: '/getCsatRating',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "json", methodName: "getCsatRating"
    }, {
        requestPath: '/deleteCsatRating',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "postdata", methodName: "deleteCsatRating"
    }, {
        requestPath: '/editCsatRating',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "postdata", methodName: "editCsatRating"
    }, {
        requestPath: '/insertCsatQuestion',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "postdata", methodName: "insertCsatQuestion"
    }, {
        requestPath: '/deleteCsatQuestion',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "postdata", methodName: "deleteCsatQuestion"
    }, {
        requestPath: '/modifyCsatQuestion',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "postdata", methodName: "modifyCsatQuestion"
    }, {
        requestPath: '/getCsatQuestionList',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "json", methodName: "getCsatQuestionList"
    }, {
        requestPath: '/getAutoTicket',
        executeController: require('./controllers/AutoTicketController').getAutoTicketController(),
        format: "json", methodName: "getAutoTicket"
    }, {
        requestPath: '/deleteAutoTicket',
        executeController: require('./controllers/AutoTicketController').getAutoTicketController(),
        format: "postdata", methodName: "deleteAutoTicket"
    }, {
        requestPath: '/insertAutoTicket',
        executeController: require('./controllers/AutoTicketController').getAutoTicketController(),
        format: "postdata", methodName: "insertAutoTicket"
    }, {
        requestPath: '/editAutoTicket',
        executeController: require('./controllers/AutoTicketController').getAutoTicketController(),
        format: "postdata", methodName: "editAutoTicket"
    }, {
        requestPath: '/getCsatRatingList',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "json", methodName: "getCsatRatingList"
    }, {
        requestPath: '/getCsatQuestion',
        executeController: require('./controllers/CsatController').getCsatController(),
        format: "json", methodName: "getCsatQuestion"
    }, {
        requestPath: '/getChildTicketById',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getChildTicketById"
    }, {
        requestPath: '/insertChildTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertChildTicket"
    }, {
        requestPath: '/getCheckListDetails',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "json", methodName: "getCheckListDetails"
    }, {
        requestPath: '/insertTicketWiseCheckList',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "postdata", methodName: "insertTicketWiseCheckList"
    }, {
        requestPath: '/AdvancesearchTicketForCit',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "AdvancesearchTicketForCit"
    }, {
        requestPath: '/searchTicketByIdForCit',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "searchTicketByIdForCit"
    }, {
        requestPath: '/deleteChildTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteChildTicket"
    }, {
        requestPath: '/addAssetManagementAllValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "insertAssetManagementAllValue"
    }, {
        requestPath: '/getNewAssetDetailsByMaster',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getNewAssetDetailsByMaster"
    }, {
        requestPath: '/getAssetManagementDataTable',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetManagementDataTable"
    }, {
        requestPath: '/getParentTicketById',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getParentTicketById"
    }, {
        requestPath: '/getAssetReportDataTable',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetReportDataTable"
    },
    {
        requestPath: '/addAssetValidation',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "insertaddAssetValidation"
    }, {
        requestPath: '/allAssetValidation',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "allAssetValidation"
    }, {
        requestPath: '/editAssetValidation',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "editAssetValidation"
    }, {
        requestPath: '/deleteAssetValidation',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "postdata", methodName: "deleteAssetValidation"
    },{
        requestPath: '/getAssetColumnByMasterForValue',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetColumnByMasterForValue"
    }, {
        requestPath: '/getAssetIdByTicket',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAssetIdByTicket"
    },{
        requestPath: '/getAllLevelOneAndLevelTwoUser',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllLevelOneAndLevelTwoUser"
    },{
        requestPath: '/updateAdditionalFieldValue',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateAdditionalFieldValue"
    }, {
        requestPath: '/insertDashboard',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertDashboard"
    },{
        requestPath: '/getCreateTicketData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCreateTicketData"
    },{
        requestPath: '/getDashboardCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDashboardCategory"
    },{
        requestPath: '/getCreateTicketDataWithGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCreateTicketDataWithGroup"
    }, {
        requestPath: '/getTicketCreateLoadingDtlsWithGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCreateLoadingDtlsWithGroup"
    }, {
        requestPath: '/getSelectedDashboardCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSelectedDashboardCategory"
    },{
        requestPath: '/insertTicketAutoClosureTime',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketAutoClosureTime"
    },{
        requestPath: '/getTicketAutoClosureTime',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketAutoClosureTime"
    },{
        requestPath: '/updateTicketAutoClosureTime',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketAutoClosureTime"
    },
    {
        requestPath: '/getMultipleAttributesParentWiseForLnTCHR',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getMultipleAttributesParentWiseForLnTCHR"
    },
    {
        requestPath: '/getCategoryByGroupForLnTCHR',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryByGroupForLnTCHR"
    },{
        requestPath: '/deleteTicketFunc',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTicketFunc"
    },{
        requestPath: '/updateTicketFunc',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketFunc"
    },{
        requestPath: '/insertTicketFunc',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketFunc"
    },{
        requestPath: '/getTicketFunc',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketFunc"
    },{
        requestPath: '/getDynamicTotCountMenuTicketDtls',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicTotCountMenuTicketDtls"
    },{
        requestPath: '/getScheduleTicket',
        executeController: require('./controllers/AutoTicketController').getAutoTicketController(),
        format: "json", methodName: "getScheduleTicket"
    },{
        requestPath: '/getEmailTicketSenderType',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "getEmailTicketSenderType"
    },{
        requestPath: '/addEmailTicketKeyword',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "postdata", methodName: "insertEmailTicketKeyword"
    }, {
        requestPath: '/allEmailTicketKeyword',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "allEmailTicketKeyword"
    },{
        requestPath: '/editEmailTicketKeyword',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "postdata", methodName: "editEmailTicketKeyword"
    },{
        requestPath: '/deleteEmailTicketKeyword',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "postdata", methodName: "deleteEmailTicketKeyword"
    },{
        requestPath: '/getEmailTicketServiceUser',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "getEmailTicketServiceUser"
    },{
        requestPath: '/getEmailTicketCreateLoadingDtls',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "getEmailTicketCreateLoadingDtls"
    },{
        requestPath: '/getEmailTicketFieldsCatWise',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "getEmailTicketFieldsCatWise"
    },{
        requestPath: '/getEmailTicketAttributesParentWiseWithPriority',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "getEmailTicketAttributesParentWiseWithPriority"
    }, {
        requestPath: '/getEmailTicketBusinessPriorityTicketTypeWise',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "json", methodName: "getEmailTicketBusinessPriorityTicketTypeWise"
    },{
        requestPath: '/getChecklistQuestion',
        executeController: require('./controllers/ChecklistController').getChecklistController(),
        format: "json", methodName: "getChecklistQuestion"
    },{
        requestPath: '/getAssetByTicket',
        executeController: require('./controllers/AssetManagementController').getAssetManagementController(),
        format: "json", methodName: "getAssetByTicket"
    },{
        requestPath: '/updateTicketAttributesClientWise',
        executeController: require('./controllers/TicketTypeController').getTicketTypeController(),
        format: "postdata", methodName: "updateTicketAttributesClientWise"
    },{
        requestPath: '/updateTicketNotificationMst',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketNotificationMst"
    },{
        requestPath: '/getTicketCategoryDetailsWithGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCategoryDetailsWithGroup"
    },{
        requestPath: '/getTicketActivityMst',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketActivityMst"
    },{
        requestPath: '/getTicketActivityNoficationMst',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketActivityNoficationMst"
    },{
        requestPath: '/insertTicketActivityNoficationMst',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertTicketActivityNoficationMst"
    },{
        requestPath: '/deleteTicketActivityNoficationMst',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteTicketActivityNoficationMst"
    },{
        requestPath: '/getFileUploadLogs',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getFileUploadLogs"
    },{
        requestPath: '/updateTicketMenuConfig',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketMenuConfig"
    },{
        requestPath: '/PasswordChange',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "PasswordChange"
    },{
        requestPath: '/getAllRoles',
        executeController: require('./controllers/RoleController').getRoleController(),
        format: "json", methodName: "getAllRoles"
    }, {
        requestPath: '/updateTicketMenu',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateTicketMenu"
    },{
        requestPath: '/insertEscalationWorkflow',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertEscalationWorkflow"
    },{
        requestPath: '/deleteEscalationWorkflow',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteEscalationWorkflow"
    },{
        requestPath: '/getEscalationWorkflow',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getEscalationWorkflow"
    },{
        requestPath: '/generateTempSscReport',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "generateTempSscReport"
    },{
        requestPath: '/generateSscReport',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "generateSscReport"
    },{
        requestPath: '/getPriorityClientWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getPriorityClientWise"
    },{
        requestPath: '/searchUserDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchUserDetails"
    },{
        requestPath: '/getLatestWFCRId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getLatestWFCRId"
    },{
        requestPath: '/getTicketByPlannedDateTime',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketByPlannedDateTime"
    },{
        requestPath: '/getAdditionalFieldTypeList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAdditionalFieldTypeList"
    },{
        requestPath: '/getSLAComplainceReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getSLAComplainceReport"
    },{
        requestPath: '/getCSATReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getCSATReport"
    },{
        requestPath: '/getEscalationReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getEscalationReport"
    },{
        requestPath: '/getProductivityReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getProductivityReport"
    },{
        requestPath: '/getProductivityTeam',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getProductivityTeam"
    },{
        requestPath: '/getTicketByIdMinimal',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketByIdMinimal"
    },{
        requestPath: '/getPlannedDateTimeByTicketId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getPlannedDateTimeByTicketId"
    },{
        requestPath: '/getTrendReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getTrendReport"
    },{
        requestPath: '/getUserByGroupCHR',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserByGroupCHR"
    },{
        requestPath: '/getUserByGroup1CHR',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserByGroup1CHR"
    },{
        requestPath: '/getSupportGroupLevelWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupLevelWise"
    },{
        requestPath: '/mapPsnoWithGroup',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "mapPsnoWithGroup"
    },{
        requestPath: '/getSupportGroupUserMappingCategoryWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupUserMappingCategoryWise"
    },{
        requestPath: '/getTicketStatusForCHRselfAssign',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketStatusForCHRselfAssign"
    },{
        requestPath: '/getTicketCreateLoadingDtls_lntchr',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCreateLoadingDtls_lntchr"
    },{
        requestPath: '/getTicketCategoryDetails_lntchr',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCategoryDetails_lntchr"
    },{
        requestPath: '/getHeatmapReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getHeatmapReport"
    },{
        requestPath: '/getUserGroupRoleDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserGroupRoleDetails"
    },{
        requestPath: '/searchAllUser',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllUser"
    },{
        requestPath: '/getCategoryGroupMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryGroupMapping"
    },{
        requestPath: '/getTrendBarReport',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getTrendBarReport"
    },{
        requestPath: '/getReportCategory',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getReportCategory"
    },{
        requestPath: '/getCatfromUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCatfromUrl"
    },{
        requestPath: '/getTicketCreateLoadingDtls_citapps',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCreateLoadingDtls_citapps"
    },{
        requestPath: '/getReportStatus',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getReportStatus"
    },{
        requestPath: '/getReportFilters',
        executeController: require('./controllers/ReportConfiguratorController').getReportConfiguratorController(),
        format: "json", methodName: "getReportFilters"
    },{
        requestPath: '/addStatusSeq',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "addStatusSeq"
    },{
        requestPath: '/getstatusSeqData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getstatusSeqData"
    },{
        requestPath: '/deleteStatusSeq',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteStatusSeq"
    },{
        requestPath: '/getSupportGroupNotMapInCatagory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupNotMapInCatagory"
    },{
        requestPath: '/getLntChrEndUser',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getLntChrEndUser"
    },{
        requestPath: '/getAttrHeader',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAttrHeader"
    },{
        requestPath: '/insertMappingCategoryWithSupportGrp',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertMappingCategoryWithSupportGrp"
    },{
        requestPath: '/getSubClient',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSubClient"
    },{
        requestPath: '/getHolidayBySupGrp',
        executeController: require('./controllers/HolidayController').getMethodController(),
        format: "json", methodName: "getHolidayBySupGrp"
    },{
        requestPath: '/getSLAClientWiseDetailsBySupGrp',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "json", methodName: "getSLAClientWiseDetailsBySupGrp"
    },{
        requestPath: '/insertSupportGroupWiseWorkingHour',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertSupportGroupWiseWorkingHour"
    },{
        requestPath: '/checkSupportGroupManagerialView',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "checkSupportGroupManagerialView"
    },{
        requestPath: '/insertSlaCalculation',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertSlaCalculation"
    },{
        requestPath: '/deleteSlaCalculation',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteSlaCalculation"
    },{
        requestPath: '/getSlaCalculation',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSlaCalculation"
    },{
        requestPath: '/getSlaCalculationDoneByList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSlaCalculationDoneByList"
    },{
        requestPath: '/calculateSupportGroupWorkingHour',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "calculateSupportGroupWorkingHour"
    },{
        requestPath: '/getClientWiseSlaClient',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "json", methodName: "getClientWiseSlaClient"
    },{
        requestPath: '/getClietSpecificUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getClietSpecificUrl"
    },{
        requestPath: '/getTicketDetail',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketDetail"
    },{
        requestPath: '/uploadFaq',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "uploadFaq"
    },{
        requestPath: '/insertFaqDocumentLog',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "insertFaqDocumentLog"
    },{
        requestPath: '/deleteFaqDocumentLog',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "postdata", methodName: "deleteFaqDocumentLog"
    },{
        requestPath: '/getFaqDocumentLog',
        executeController: require('./controllers/FaqController').getFaqController(),
        format: "json", methodName: "getFaqDocumentLog"
    },{
        requestPath: '/addSupportGroupSpecificUrl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "addSupportGroupSpecificUrl"
    },{
        requestPath: '/getSupportGroupSpecificUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupSpecificUrl"
    },{
        requestPath: '/getUrlBySupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUrlBySupportGroup"
    },{
        requestPath: '/getActiveCategoryDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getActiveCategoryDetails"
    },{
        requestPath: '/getTicketDetailsById',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketDetailsById"
    },{
        requestPath: '/getAnyTicketById',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAnyTicketById"
    }, {
        requestPath: '/addNotification',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "addNotification"
    },{
        requestPath: '/deleteNotification',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteNotification"
    },{
        requestPath: '/getNotifiationMaster',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getNotifiationMaster"
    },{
        requestPath: '/searchTicketByIdForChr',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "searchTicketByIdForChr"
    },{
        requestPath: '/getCategoryReportUserWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryReportUserWise"
    },{
        requestPath: '/searchUserDetailsByPsNo',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchUserDetailsByPsNo"
    },
        // ===============================================not upload in uat======================================

        {
        requestPath: '/searchAnalystByPsNo',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAnalystByPsNo"
    },{
        requestPath: '/updateClient',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateClient"
    },{
        requestPath: '/updateFlowStatus',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateFlowStatus"
    },{
        requestPath: '/searchAllRoles',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllRoles"
    },{
        requestPath: '/searchAllSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllSupportGroup"
    },{
        requestPath: '/searchAllRoleActionMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllRoleActionMap"
    },{
        requestPath: '/searchAllModuleRoleMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllModuleRoleMap"
    },{
        requestPath: '/searchAllMapRoleWithUser',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllMapRoleWithUser"
    },{
        requestPath: '/searchAllModuleRoleUserMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllModuleRoleUserMap"
    },{
        requestPath: '/searchAllMapUserWithSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllMapUserWithSupportGroup"
    },{
        requestPath: '/searchAllRoleUserActionMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllRoleUserActionMap"
    },{
        requestPath: '/searchAllSupportGroupHolidays',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllSupportGroupHolidays"
    },{
        requestPath: '/searchAllSupportGroupSlaClient',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllSupportGroupSlaClient"
    },{
        requestPath: '/searchAllCategorySlaMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllCategorySlaMap"
    },{
        requestPath: '/searchAllLevelOfCategories',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllLevelOfCategories"
    },{
        requestPath: '/searchAllCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllCategory"
    },{
        requestPath: '/searchAllMapClientWithCategoryLevel',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllMapClientWithCategoryLevel"
    },{
        requestPath: '/searchAllMapCategoryWithGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllMapCategoryWithGroup"
    },{
        requestPath: '/searchAllReportFields',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllReportFields"
    },{
        requestPath: '/searchAllViewTicketMenuConfiguration',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllViewTicketMenuConfiguration"
    },{
        requestPath: '/searchAllBusinessImpact',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllBusinessImpact"
    },{
        requestPath: '/searchAllBusinessUrgency',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllBusinessUrgency"
    },{
        requestPath: '/searchAllPriority',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllPriority"
    },{
        requestPath: '/searchAllSlaClient',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllSlaClient"
    },{
        requestPath: '/searchAllStatus',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllStatus"
    },{
        requestPath: '/searchAllBusinessMatrix',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllBusinessMatrix"
    },{
        requestPath: '/searchAllEscalation',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllEscalation"
    },{
        requestPath: '/searchAllFollowUp',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllFollowUp"
    },{
        requestPath: '/searchAllFileUploadLogs',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllFileUploadLogs"
    },{
        requestPath: '/searchAllClient',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllClient"
    },{
        requestPath: '/searchAllModule',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllModule"
    },{
        requestPath: '/searchAllCreateMenu',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllCreateMenu"
    },{
        requestPath: '/searchAllTicketCheckList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllTicketCheckList"
    },{
        requestPath: '/searchAllModulePageUrlMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllModulePageUrlMapping"
    },{
        requestPath: '/searchAllModulePageUrlMappingStupa',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllModulePageUrlMappingStupa"
    },{
        requestPath: '/searchAllRoleMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllRoleMapping"
    },{
        requestPath: '/searchAllClientAdminRoleMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllClientAdminRoleMapping"
    },{
        requestPath: '/searchAllTicketStatusFlow',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllTicketStatusFlow"
    },{
        requestPath: '/searchAllEscalateMaster',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllEscalateMaster"
    },{
        requestPath: '/searchAllRoleUserActionMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllRoleUserActionMapping"
    },

    // ================================excel export==============================================
    {
        requestPath: '/getAllRoleData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllRoleData"
    },{
        requestPath: '/getAllSupportGroupData',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllSupportGroupData"
    },{
        requestPath: '/getAllBusinessImpact',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllBusinessImpact"
    },{
        requestPath: '/getAllBusinessUrgency',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllBusinessUrgency"
    },{
        requestPath: '/getAllPriority',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllPriority"
    },{
        requestPath: '/getAllMapCategoryWithGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllMapCategoryWithGroup"
    },{
        requestPath: '/getAllReportFields',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllReportFields"
    },{
        requestPath: '/getAllViewTicketMenuConfiguration',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllViewTicketMenuConfiguration"
    },{
        requestPath: '/getAllLevelOfCategories',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllLevelOfCategories"
    },{
        requestPath: '/getAllCategory',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllCategory"
    },{
        requestPath: '/getAllMapClientWithCategoryLevel',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllMapClientWithCategoryLevel"
    },{
        requestPath: '/getAllModuleRoleUserMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllModuleRoleUserMap"
    },{
        requestPath: '/getAllSlaClient',
        executeController: require('./controllers/SlaController').getMethodController(),
        format: "json", methodName: "getAllSlaClient"
    },{
        requestPath: '/getAllBusinessMatrix',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllBusinessMatrix"
    },{
        requestPath: '/getAllStatus',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllStatus"
    },{
        requestPath: '/getAllFollowUp',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllFollowUp"
    },{
        requestPath: '/getAllFileUploadLogs',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllFileUploadLogs"
    },{
        requestPath: '/getAllTicketCheckList',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllTicketCheckList"
    },{
        requestPath: '/getAllEscalateMaster',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllEscalateMaster"
    },{
        requestPath: '/getAllAutoTicketConfig',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllAutoTicketConfig"
    },{
        requestPath: '/getAllTicketStatusFlow',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllTicketStatusFlow"
    },{
        requestPath: '/getAllSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllSupportGroup"
    },{
        requestPath: '/getAllSupportGroupHolidays',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllSupportGroupHolidays"
    },{
        requestPath: '/getAllModuleRoleMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllModuleRoleMap"
    },{
        requestPath: '/getAllEscalation',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllEscalation"
    },{
        requestPath: '/getAllMapUserWithSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllMapUserWithSupportGroup"
    },{
        requestPath: '/getAllUserandSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllUserandSupportGroup"
    },{
        requestPath: '/getAllCategoryandSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllCategoryandSupportGroup"
    },

        // ==================================================not upload in uat======================================================================
        {
        requestPath: '/getAllMenus',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllMenus"
    },{
        requestPath: '/getAllUrlWithMenus',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllUrlWithMenus"
    },{
        requestPath: '/searchAllPlatformUserAuth',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllPlatformUserAuth"
    },{
        requestPath: '/getAllClientStatus',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllClientStatus"
    },{
        requestPath: '/searchAllClientStatus',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllClientStatus"
    },{
        requestPath: '/getAllClientSpecificUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllClientSpecificUrl"
    },{
        requestPath: '/searchAllClientSpecificUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllClientSpecificUrl"
    }, {
        requestPath: '/getAllModulePageUrl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllModulePageUrl"
    },{
        requestPath: '/searchAllMenuConfiguration',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllMenuConfiguration"
    },{
        requestPath: '/searchAllModuleUserRoleMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchAllModuleUserRoleMapping"
    },{
        requestPath: '/getAllForwardWorkflow',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllForwardWorkflow"
    },{
        requestPath: '/getAllBackwardWorkflow',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllBackwardWorkflow"
    },{
        requestPath: '/getAllModulePageUrlMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllModulePageUrlMapping"
    },{
        requestPath: '/searchSupportGroupUserMappingCategoryWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "searchSupportGroupUserMappingCategoryWise"
    },{
        requestPath: '/getCountQuery',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCountQuery"
    },{
        requestPath: '/getSubClientType',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSubClientType"
    },{
        requestPath: '/deleteSupportGroupSpecificUrl',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteSupportGroupSpecificUrl"
    },{
        requestPath: '/getSupportGroupByClientIdOrMasterClientId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupByClientIdOrMasterClientId"
    },{
        requestPath: '/getTicketCategoryDetailsDynamic',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketCategoryDetailsDynamic"
    },{
        requestPath: '/AdvancesearchIncidentTicket',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "AdvancesearchIncidentTicket"
    },{
        requestPath: '/getIncidentTicketTypeId',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getIncidentTicketTypeId"
    },{
        requestPath: '/getDynamicMenuTicketDtls_new',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicMenuTicketDtls_new"
    },{
        requestPath: '/getDynamicTotCountMenuTicketDtls_new',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getDynamicTotCountMenuTicketDtls_new"
    },{
        requestPath: '/getAllSupportGroupUserMap',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getAllSupportGroupUserMap"
    },{
        requestPath: '/getCategoryReportSupportGroupWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryReportSupportGroupWise"
    },{
        requestPath: '/getUserSupportGroup',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserSupportGroup"
    },{
        requestPath: '/insertEmailFeedback',
        executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
        format: "postdata", methodName: "insertEmailFeedback"
    },{
        requestPath: '/getAllTicketDetails',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json",methodName: "getAllTicketDetails"
    },{
        requestPath: '/insertEmailConfig',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertEmailConfig"
    },{
        requestPath: '/insertSedularConfig',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertSedularConfig"
    },{
        requestPath: '/deleteSedularConfig',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteSedularConfig"
    },{
        requestPath: '/getSlaViolationMaster',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSlaViolationMaster"
    },{
        requestPath: '/updateSlaViolationMaster',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateSlaViolationMaster"
    },{
        requestPath: '/getSupportGroupCount',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getSupportGroupCount"
    },{
        requestPath: '/downloadFile',
        executeController: require('./controllers/PostController').getPostController(),
        format: "json", methodName: "downloadFile"
    }, {
        requestPath: '/getBRAIOurl',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getBRAIOurl"
    }, {
        requestPath: '/getallBraioMapping',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getallBraioMapping"
    }, {
        requestPath: '/updateBraioMapping',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "updateBraioMapping"
    }, {
        requestPath: '/insertBraioMapping',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertBraioMapping"
    }, {
        requestPath: '/deleteBraioMapping',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteBraioMapping"
    }, {
        requestPath: '/getLastLevelCategoryByTicketType',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getLastLevelCategoryByTicketType"
    },{
        requestPath: '/getAllTicketDetailsExtended',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json",methodName: "getAllTicketDetailsExtended"
    }, {
        requestPath: '/getUserDetailsByLoginIdDecrypt',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getUserDetailsByLoginIdDecrypt"
    }, {
        requestPath: '/deleteDashboardCat',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteDashboardCat"
    }, {
        requestPath: '/insertDashboardCat',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "insertDashboardCat"
    }, {
        requestPath: '/deleteAllDashboardCat',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "deleteAllDashboardCat"
    }, {
        requestPath: '/changeUserPassword',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "changeUserPassword"
    }, {
        requestPath: '/searchCitDataForExport',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "searchCitDataForExport"
    }, {
        requestPath: '/searchSscDataForExport',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "searchSscDataForExport"
    }, {
        requestPath: '/getTicketsStatusWise',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getTicketsStatusWise"
    }, {
        requestPath: '/AdvancesearchTicketForChr',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "AdvancesearchTicketForChr"
    }, {
        requestPath: '/searchAllChrDataForExport',
        executeController: require('./controllers/PostController').getPostController(),
        format: "postdata", methodName: "searchAllChrDataForExport"
    }, {
        requestPath: '/getResolutionTime',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getResolutionTime"
    }, {
        requestPath: '/getCategoryIc',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryIc"
    }, {
        requestPath: '/getCategoryLevel',
        executeController: require('./controllers/MethodController').getMethodController(),
        format: "json", methodName: "getCategoryLevel"
    },{
            requestPath: '/updateMailTemplateLt',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateMailTemplateLt"
     },{
            requestPath: '/getTicketCategoryDetails_SSC',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTicketCategoryDetails_SSC"
     },{
            requestPath: '/getCategoryListSupportGroupWiseForParentId',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getCategoryListSupportGroupWiseForParentId"
      }, {
            requestPath: '/getEmailAttrMaster',
            executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
            format: "json", methodName: "getEmailAttrMaster"
      }, {
            requestPath: '/deleteEmailAttribute',
            executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
            format: "postdata", methodName: "deleteEmailAttribute"
      }, {
            requestPath: '/AddEmailAttr',
            executeController: require('./controllers/EmailTicketController').getEmailTicketController(),
            format: "postdata", methodName: "AddEmailAttr"
      }, {
            requestPath: '/getAttributesParentWiseWithPriorityBasedOnSpGrp',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getAttributesParentWiseWithPriorityBasedOnSpGrp"
        }, {
            requestPath: '/getAllUsersByLevel',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getAllUsersByLevel"
        }, {
            requestPath: '/addApproverEnduserMaster',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "addApproverEnduserMaster"
        }, {
            requestPath: '/deleteApproverEnduserMaster',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "deleteApproverEnduserMaster"
        }, {
            requestPath: '/getApproverEnduserMaster',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getApproverEnduserMaster"
        }, {
            requestPath: '/getMappedChildTicketDetails',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getMappedChildTicketDetails"
        }, {
            requestPath: '/checkAllChildInCloseStatus',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "checkAllChildInCloseStatus"
        }, {
            requestPath: '/getTktWrkFlowDtl',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTktWrkFlowDtl"
        }, {
            requestPath: '/insertTktAdditionalPermission',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "insertTktAdditionalPermission"
        }, {
            requestPath: '/getTktAdditionalPermission',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getTktAdditionalPermission"
        }, {
            requestPath: '/updateTktAdditionalPermission',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateTktAdditionalPermission"
        }, {
            requestPath: '/getBHODDetaisl',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getBHODDetaisl"
       }, {
            requestPath: '/updateIncdntTcktStusForProbWthClose',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "updateIncdntTcktStusForProbWthClose"
        }, {
            requestPath: '/changeIncidentTicketStatusForProblem',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "changeIncidentTicketStatusForProblem"
        }, {
            requestPath: '/getoptimizedreportTicketDetailsReportByids',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getoptimizedreportTicketDetailsReportByids"
        }, {
            requestPath: '/getUserTicketCount',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getUserTicketCount"
        }, {
            requestPath: '/getNextStatus',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getNextStatus"
        }, {
            requestPath: '/custome_parent_child_attr_byId',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "custome_parent_child_attr_byId"
        },
        {
            requestPath: '/createBulkAssignmentTicket',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "createBulkAssignmentTicket"
        },
        {
            requestPath: '/getSupportGroupByLevelWise',
            executeController: require('./controllers/MethodController').getMethodController(),
            format: "json", methodName: "getSupportGroupByLevelWise"
        },
        // written by sai for fi approval filtering
        {
            requestPath: '/permissionApproval',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "permissionApproval"
        },
        // written by sai for forwardbasis
        {
            requestPath: '/forwardbasis',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "forwardbasis"
        },

        {
            requestPath: '/createTicketEmail',
            executeController: require('./controllers/PostController').getPostController(),
            format: "postdata", methodName: "createTicketEmail"
        },

        
    ];

/**
 * The route configuration will be available to the framework by calling this function
 * @constructor
 */

function collection() {
    this.routeCollection = routeCollection;
}

var getRouteCollection = function () {
    return new collection();
};


module.exports.getRouteCollection = getRouteCollection;



