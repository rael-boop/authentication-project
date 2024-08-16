import React from "react";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { userGetCurrent } from "../api";

import type { AxiosResponse } from "axios";

const useUser = () => {
    const [userData, setUserData] = React.useState<null | object | any>(null);

    const { isLoading, isError } = useQuery(["auth-user"], userGetCurrent, {
        onSuccess: (response: AxiosResponse) => setUserData(response.data.data),
        onError: () => {
            const decodeJwt: JwtPayload = jwtDecode((getCookie("auth-token") as string) || "");
            delete decodeJwt.iat;
            delete decodeJwt.exp;
            setUserData(decodeJwt);
        }
    });

    return {
        isLoading,
        user: userData,
        isError
    };
};

export default useUser;
