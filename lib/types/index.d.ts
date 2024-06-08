import { z } from "zod";
import { signUpSchema } from "../schemas/auth";

declare interface SignUpFormValues extends z.infer<typeof signUpSchema> {}
