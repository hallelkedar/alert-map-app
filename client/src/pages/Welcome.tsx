import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const Welcome = ({ current = "login" }) => {
  const [currentPage, setCurrent] = useState(current);

  return (
    <div style={{ marginTop: "100px" }}>
      {currentPage === "login" && (
        <div>
          <button onClick={() => setCurrent("register")}>
            Don't have account? sign up
          </button>
          <LoginForm />
        </div>
      )}

      {currentPage === "register" && (
        <div>
          <button onClick={() => setCurrent("login")}>
            Have any account? login
          </button>
          <RegisterForm />
        </div>
      )}
    </div>
  );
};
