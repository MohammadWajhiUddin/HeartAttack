import Api from "../index";
import { endPoints, requestType } from "../Variables/index";

// export const sendCode = (params) => {
//     return Api(endPoints.sendCode, params, requestType.POST)
// }

export const registerUser = (params) => {
    return Api(endPoints.registerUser, params, requestType.POST)
}

export const loginUser = (params) => {
    return Api(endPoints.loginUser, params, requestType.POST)
}

export const adduserhealthlogs = (params) => {
    return Api(endPoints.adduserhealthlogs, params, requestType.POST)
}

export const getHealthlogdata = (_id) => {
    return Api(`${endPoints.getHealthlogdata}/${_id}`, null, requestType.GET)
}
// export const resetPasswordUser = (params) => {
//     return Api(endPoints.resetPassword, params, requestType.POST)
// }

// export const getAllUsers = () => {
//     return Api(endPoints.getAllUsers, null, requestType.GET)
// }

// export const getAllOrganizations = () => {
//     return Api(endPoints.getAllOrganizations, null, requestType.GET)
// }