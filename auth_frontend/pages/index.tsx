import React from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <>
             <main className="flex min-h-screen flex-col items-center p-5">
                <div className="w-full max-w-8xl m-auto">
                    <h3 className="my-5 text-3xl text-center font-semibold">Authentication System Application</h3>
                    
                    <div className="flex space-x-6">
                        <button onClick={() => router.push("/auth/login")} className="bg-primary w-full text-white rounded p-3">
                            Login / Generate Access Token
                        </button>
                        <button onClick={() => router.push("/auth/register")} className="bg-primary w-full text-white rounded p-3">
                            Register
                        </button>
                        <button onClick={() => router.push("/app/user")} className="bg-primary w-full text-white rounded p-3">
                            View Profile
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

export default Home;
