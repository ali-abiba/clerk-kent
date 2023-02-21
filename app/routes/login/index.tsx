import { SignIn } from "@clerk/clerk-react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { LoaderFunction } from "@remix-run/node";

export default function Login() {
    return  (
        <SignIn redirectUrl={'/'}/>
    )
}