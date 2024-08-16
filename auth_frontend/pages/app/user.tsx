import React from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";
import { useUser } from "../../utils";
import { getCookie } from "cookies-next";

const User: NextPage = () => {
    const router = useRouter();

    const { user } = useUser();
    
    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-5">
                <div className="w-full max-w-8xl m-auto">
                    <h3 className="my-5 text-3xl font-semibold text-primary">Authenticated User Details</h3>
                    {user && (
                        <div className="text-left space-y-2 font-medium text-lg break-all">
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Permissions: {user.permissions.join(", ")}</p>
                            <p>Salted and Hashed Password: <span className="text-primary">{user.password}</span></p>
                            <p>Encrypted Access Token: <span className="text-primary">{getCookie("access_token")}</span></p>
                        </div>
                    )}

                    <div className="flex space-x-6 mt-6">
                        <button onClick={() => router.push("/")} className="bg-primary w-full text-white rounded p-3">
                            Home
                        </button>
                        <button onClick={() => router.push("/auth/logout")} className="bg-primary w-full text-white rounded p-3">
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default User;
