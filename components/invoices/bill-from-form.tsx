import { z } from "zod";
import { UseFormReturn, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InvoiceValues } from "@/lib/types";

export default function BillFromForm() {
  const { control } = useFormContext<InvoiceValues>();
  return (
    <div className="bg-secondary h-full w-full rounded-md">
      <FormField
        control={control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
