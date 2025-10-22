"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardContent,
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PasswordResetFormProps = {
  headingText: string;
  bodyText: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  buttonText: string;
  isSuccessHeadingText: string;
  isSuccessBodyText: string;
  isSuccessLink: string;
  validationMessages: {
    passwordMin: string;
    confirmPasswordMin: string;
    refinePassword: string;
  };
};

export default function PasswordResetForm({
  headingText,
  bodyText,
  passwordLabel,
  confirmPasswordLabel,
  buttonText,
  isSuccessHeadingText,
  isSuccessBodyText,
  isSuccessLink,
  validationMessages,
}: PasswordResetFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const schema = z
    .object({
      password: z.string().min(8, { message: validationMessages.passwordMin }),
      confirmPassword: z
        .string()
        .min(8, { message: validationMessages.confirmPasswordMin }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: validationMessages.refinePassword,
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsResetSuccessful(true);
      toast.success("Password reset successful!", {
        description: "You can now log in with your new password.",
      });
    } catch (err) {
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    }
  };

  if (isResetSuccessful) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary text-xl lg:text-3xl font-semibold">
              {isSuccessHeadingText}
            </CardTitle>
            <CardDescription className="text-base">
              {isSuccessBodyText}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button asChild>
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                {isSuccessLink}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl lg:text-3xl">
              {headingText}
            </CardTitle>
            <CardDescription className="text-sm mb-2">
              {bodyText}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* New Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        {passwordLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="rounded-[10px] w-full py-6"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showPassword ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        {confirmPasswordLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                            className="rounded-[10px] w-full py-6"
                          />
                          <button
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="rounded-[10px] w-full py-6 font-bold cursor-pointer{"
                >
                  {buttonText}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
