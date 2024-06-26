"use server";

import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";
import { SignInFormValues, SignUpFormValues } from "../types";
import { createClient } from "../supabase/server";

export async function signIn(
  data: SignInFormValues
): Promise<AuthTokenResponsePassword> {
  const supabase = createClient();
  const { email, password } = data;

  let result;
  try {
    result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error) {
    throw error;
  }

  return JSON.parse(JSON.stringify(result));
}

export async function signUp(data: SignUpFormValues): Promise<AuthResponse> {
  const supabase = createClient();
  const { email, password, firstName, lastName } = data;

  const newUsername = email.split("@")[0];

  let result;
  try {
    result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          avatar_url: "",
          first_name: firstName,
          last_name: lastName,
          organization: "",
          organization_role: "",
          app: "dashboard-v2",
          website: "",
          username: newUsername,
        },
      },
    });
  } catch (error) {
    throw error;
  }

  return JSON.parse(JSON.stringify(result));
}

export async function signOut(): Promise<AuthError | null> {
  const supabase = createClient();

  let result;
  try {
    result = await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }

  let { error } = result;

  return JSON.parse(JSON.stringify(error));
}
