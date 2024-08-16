import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";

import { authRegister } from "../../api";
import { CardLayout, InputField } from "../../components";

import type { NextPage } from "next";
import type { AxiosError, AxiosResponse } from "axios";
import { withoutAuth } from "../../utils";

const Register: NextPage = () => {
    const router = useRouter();

    const HandleSubmit = (e: any) => {
        e.preventDefault();

        toast.loading("Loading... Please wait", { autoClose: false });

        mutate(formData);
    };

    const { mutate, isLoading } = useMutation(authRegister, {
        onSuccess: (response: AxiosResponse) => {
            toast.dismiss();
            toast.success("Registration Successful");

            setCookie("access_token", response.data.data.access_token);

            router.push("/app/user");
        },
        onError: (error: AxiosError) => {
            toast.dismiss();
            toast.error(error.response ? error.response.data.message : error.message);
        }
    });

    const [formData, setFormData] = React.useState<any>({
        name: "",
        email: "",
        password: "",
        permissions: [],
        confirmPassword: ""
    });

    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-5">
                <div className="max-w-8xl m-auto">
                    <h3 className="my-5 text-5xl text-center font-semibold tracking-wider">Registration</h3>

                    <CardLayout>
                        <form id="loginForm" className="mb-0 space-y-6" method="POST" onSubmit={HandleSubmit}>
                            <InputField
                                label="Name"
                                value={formData.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                type="text"
                                required={true}
                                name="name"
                            />

                            <InputField
                                label="Email Address"
                                value={formData.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                type="email"
                                required={true}
                                name="email"
                            />

                            <InputField
                                label="Permissions (comma separated)"
                                value={formData.permissions}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, permissions: e.target.value.split(",") })}
                                type="text"
                                required={true}
                                name="permissions"
                            />

                            <InputField
                                label="Password"
                                value={formData.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                type="password"
                                required={true}
                                name="password"
                            />

                            <InputField
                                label="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                type="password"
                                required={true}
                                name="password"
                            />

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-4 px-4 rounded shadow-sm text-md font-semibold text-white bg-primary hover:bg-secondary mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="text-sm text-center mt-3">
                            Already have an account{" "}
                            <button
                                onClick={() => {
                                    return router.push("/auth/login");
                                }}
                                className="text-primary"
                            >
                                Login
                            </button>
                        </p>
                    </CardLayout>
                </div>
            </main>
        </>
    );
};

export default withoutAuth(Register);
