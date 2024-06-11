import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth";
import {
  billFromSchema,
  billToSchema,
  invoiceSchema,
} from "../schemas/invoices";

declare interface SignInFormValues extends z.infer<typeof signInSchema> {}
declare interface SignUpFormValues extends z.infer<typeof signUpSchema> {}

declare interface GroupMenuItem {
  groupLabel: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  children: MenuItem[];
}
declare interface MenuItem {
  label: string;
  href: string;
  active?: boolean;
  icon: FC<SVGProps<SVGSVGElement>>;
  description?: string;
}

declare interface BillFromValues extends z.infer<typeof billFromSchema> {}
declare interface BillToValues extends z.infer<typeof billToSchema> {}
declare interface InvoiceValues extends z.infer<typeof invoiceSchema> {}
