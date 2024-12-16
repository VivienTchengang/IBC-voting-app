import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { registerUser } from "../../services/api.service";

export function Register() {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state?.message) {
            alert(state.message);
        }
    }, [state]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const { email, password } = Object.fromEntries(
                new FormData(e.target as HTMLFormElement).entries()
            );

            const response = await registerUser(
                String(email),
                String(password)
            );

            const { error } = response;

            if (error) throw new Error(error);

            alert("User created successfully");
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center">
            {/* Image GIF */}
            <div className="ice-box w-11/12 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="ice-box-top h-1/2 bg-gradient-to-b from-blue-100 to-blue-50 flex items-center justify-center">
                    <img
                        src="https://media.giphy.com/media/Md4HxVVdO3fCagcUBI/giphy.gif"
                        alt="A funny cat GIF"
                        className="object-contain h-full w-full"
                    />
                </div>
                {/* Formulaire */}
                <div className="ice-box-bottom h-1/2 flex flex-col items-center justify-center p-6">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-4"
                    >
                        <input
                            name="email"
                            className="h-10 px-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                        />
                        <input
                            name="password"
                            className="h-10 px-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                        />
                        <button
                            className={`h-10 bg-blue-500 text-white rounded-lg transition-all duration-300 ${
                                loading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-blue-600"
                            }`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating user..." : "Register 🧊"}
                        </button>
                    </form>
                    <a href="/" className="underline mt-4">
                        Already have an account? Login
                    </a>
                </div>
            </div>
        </section>
    );
}
