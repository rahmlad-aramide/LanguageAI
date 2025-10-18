"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import Link from "next/link";

type LoginProps = {
  headingText: string;
  bodyText: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  rememberText: string;
  forgotPasswordLink: string;
  buttonText: string;
  registerText: string;
  registerLink: string;
};

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});
type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm({
  headingText,
  bodyText,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  rememberText,
  forgotPasswordLink,
  buttonText,
  registerText,
  registerLink,
}: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchema) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary text-xl md:text-2xl lg:text-3xl">
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
                {/* email or phone number */}
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
                          placeholder={emailPlaceholder}
                          className="rounded-[10px] w-full py-6"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">
                        {passwordLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder={passwordPlaceholder}
                            className="rounded-[10px] w-full py-6"
                            type={showPassword ? "text" : "password"}
                          />

                          <div
                            className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Container for remember + forgot password */}
                <div className="w-full flex items-center justify-between">
                  {/* Keep me logged in */}
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setRemember(!remember)}
                  >
                    {remember ? (
                      <FaCheckSquare className="text-xl text-primary" />
                    ) : (
                      <FaRegSquare className="text-xl" />
                    )}
                    <span className="text-base">{rememberText}</span>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm md:text-base text-primary hover:underline"
                  >
                    {forgotPasswordLink}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="rounded-[10px] w-full py-6 font-bold cursor-pointer"
                >
                  {buttonText}
                </Button>
              </form>
            </Form>

            <div className="flex flex-row items-center justify-center gap-2 text-sm md:text-base mt-8">
              <p>{registerText}</p>
              <Link href="/register">
                <span className="text-primary">{registerLink}</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
