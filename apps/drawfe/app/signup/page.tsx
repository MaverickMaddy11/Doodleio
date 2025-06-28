"use client";
import { AuthPage } from "@/components/AuthPage";
import axios from "axios";
import { HTTP_BACKEND } from "../config";

export default function fn() {
  return (
    <div>
      <AuthPage isSignin={false} />
    </div>
  );
}
