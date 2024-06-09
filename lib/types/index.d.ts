import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth";

declare interface SignInFormValues extends z.infer<typeof signInSchema> {}
declare interface SignUpFormValues extends z.infer<typeof signUpSchema> {}

declare interface GroupMenuItem {
  groupLabel: string;
  children: MenuItem[];
}
declare interface MenuItem {
  label: string;
  href: string;
  active?: boolean;
  icon: FC<SVGProps<SVGSVGElement>>;
}
