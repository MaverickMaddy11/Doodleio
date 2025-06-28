"use client ";
import { AuthPage } from "@/components/AuthPage";
import { HTTP_BACKEND } from "../config";
import axios from "axios";
import { sign } from "crypto";

export default function fn() {
  return (
    <div>
      <AuthPage isSignin={true} />
    </div>
  );
}
