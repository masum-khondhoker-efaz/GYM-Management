import {LoginService, LogoutService, RegisterService} from "../service/UsersService.js";


export const Register = async (req, res) => {
    let result = await RegisterService(req);
    return res.status(result.statusCode).json(result);
}


export const Login = async (req, res) => {
    let result = await LoginService(req);

    if (result.statusCode === 200) {
        let options = {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            sameSite: "none",
            secure: true
        };

        res.cookie('Token', result.data.token, options);
    }

    return res.status(result.statusCode).json(result);
}

export const Logout = async (req, res) => {
    let result = await LogoutService(res);
    return res.json(result);
}

