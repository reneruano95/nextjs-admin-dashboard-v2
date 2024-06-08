import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth";

declare interface SignInFormValues extends z.infer<typeof signInSchema> {}
declare interface SignUpFormValues extends z.infer<typeof signUpSchema> {}
