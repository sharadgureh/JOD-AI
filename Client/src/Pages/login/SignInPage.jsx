import { SignIn, useAuth } from "@clerk/clerk-react";
import "./signin.css";
import { Navigate } from "react-router-dom";

function SignInPage() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="sign-in">
    <div>
    <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl='/dashboard'/>
    <div className="bg"></div>
    </div>
    </div>
  )
}

export default SignInPage