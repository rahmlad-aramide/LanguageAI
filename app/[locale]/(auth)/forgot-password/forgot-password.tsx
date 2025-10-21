"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heart, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type ForgotPasswordFormProps = {
  headingText: string;
  bodyText: string;
  emailLabel: string;
  emailPlaceholder: string;
  validationMessages: {
    invalidEmail: string;
  };
};

export default function ForgotPasswordForm({
  headingText,
  bodyText,
  emailLabel,
  emailPlaceholder,
  validationMessages,
}: ForgotPasswordFormProps) {
  const schema = z.object({
    email: z.string().email({ message: validationMessages.invalidEmail }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      console.log("Email:", values.email);
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      console.error("Error sending reset link:", error);
      toast.error("Failed to send password reset link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-5">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl lg:text-3xl text-primary">
                  {headingText}
                </CardTitle>
                <CardDescription className="text-sm">
                  {bodyText}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            {emailLabel}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-[10px] w-full py-5"
                              placeholder={emailPlaceholder}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="rounded-[10px] w-full py-6 font-bold cursor-pointer"
                    >
                      Send Reset Link
                    </Button>
                  </form>
                </Form>

                <div className="text-center">
                  <p className="text-sm">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs">
            If you don&apos;t receive an email within a few minutes, please
            check your spam folder or contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
