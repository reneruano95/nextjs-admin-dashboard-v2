import InvoiceForm from "@/components/invoices/invoice-form";

export default function Invoices() {
  return (
    <div className="flex flex-col md:flex-row flex-1 w-full items-center justify-center overflow-y-auto">
      <div className="min-h-screen md:min-h-full md:h-full w-full md:w-1/2 pb-1 md:pb-0 md:pr-1">
        <div className="bg-secondary h-full w-full rounded-md">
          <InvoiceForm />
        </div>
      </div>
      <div className="min-h-60 md:h-full w-full md:w-1/2 pt-1 md:pt-0 md:pl-1">
        <div className="bg-secondary h-full w-full rounded-md"></div>
      </div>
    </div>
  );
}
