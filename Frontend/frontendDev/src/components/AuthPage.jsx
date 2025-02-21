"use client";

import { useState } from "react";
import './css/AuthPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <h1>GameVault</h1>
      <p>Your gaming adventure starts here</p>

      <div>
        <button onClick={() => setIsLogin(true)} className="auth-button">
          Login
        </button>
        <button onClick={() => setIsLogin(false)} className="auth-button">
          Sign Up
        </button>
      </div>

      <form className="auth-form">
        {!isLogin && (
          <div>
            <label>Username</label>
            <input type="text" placeholder="Choose your username" />
          </div>
        )}

        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="auth-submit-button">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
}
