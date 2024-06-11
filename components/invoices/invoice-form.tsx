"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BillFromForm from "./bill-from-form";
import { InvoiceValues } from "@/lib/types";
import { invoiceSchema } from "@/lib/schemas/invoices";

export default function InvoiceForm() {
  const form = useForm<InvoiceValues>({
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessCity: "",
      businessPostalCode: "",
      businessCountry: "",
      businessEmail: "",
      businessPhone: "",
      businessWebsite: "",
      businessOwner: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      clientCity: "",
      clientPostalCode: "",
      clientCountry: "",
      clientPhone: "",
    },
    resolver: zodResolver(invoiceSchema),
  });

  function onSubmit(data: InvoiceValues) {
    console.log(data);
  }
  return (
    <div className="z-10">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BillFromForm />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
