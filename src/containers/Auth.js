import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isSignIn ? (
        <SignIn onToggle={toggleForm} />
      ) : (
        <SignUp onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Auth;
