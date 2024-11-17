import { roles } from "../../MiddleWare/auth.js";

export const endPoints={
    create:[roles.Admin],
    getAll:[roles.Admin],
    getById:[roles.Admin,roles.User],
    update:[roles.Admin],
    delete:[roles.Admin]
}