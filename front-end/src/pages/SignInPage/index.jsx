import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <div>
      SignIn
      <button onClick={handleSignUp}>SignUp</button>
    </div>
  );
}
