"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signInSchema } from "@/lib/schemas/auth";
import { SignInFormValues } from "@/lib/types";
import { cn, isEmpty } from "@/lib/utils";
import { useToggleShowPassword } from "@/lib/hooks/useToggleShowPassword";
import { signIn } from "@/lib/actions/auth";

export default function SignInForm() {
  const router = useRouter();
  const { showPassword, showPasswordHandler } = useToggleShowPassword();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    // console.log(data);

    const { error } = await signIn(data);

    if (error) {
      toast.error(
        <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>,
        {
          duration: 3000,
        }
      );
    } else {
      toast.success("Login successful");
      form.reset();
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative mx-auto max-w-sm flex flex-col">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 pt-0">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder=""
                      {...field}
                      type="email"
                      className="!mt-0"
                      autoComplete="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline hover:text-foreground/50"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <FormControl>
                    <div className="flex items-center !mt-0">
                      <Input
                        id="password"
                        {...field}
                        className="rounded-e-none"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                      />
                      <Button
                        asChild
                        onClick={() => showPasswordHandler()}
                        className="text-muted-foreground p-0 h-10 w-10 m-0 rounded-s-none bg-transparent hover:bg-muted border border-input border-s-0"
                      >
                        <div>
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 m-0" />
                          ) : (
                            <Eye className="h-5 w-5 m-0" />
                          )}
                        </div>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="!mt-0">
                    Contact us if you forgot your password.
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </Form>

      {/* Error message*/}
      <div className="mx-auto px-6 w-full max-w-sm flex flex-col absolute -bottom-24 inset-x-0">
        <div
          className={cn(
            "hidden",
            form.formState.isSubmitSuccessful && "hidden",
            !isEmpty(form.formState.errors) && "block "
          )}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {Object.values(form.formState.errors).map((error) => (
                <p key={error.message} className="text-xs">
                  {error.message}
                </p>
              ))}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
