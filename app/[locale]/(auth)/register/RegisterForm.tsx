"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SignupProps = {
  headingText: string;
  fullNameLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  languageLabel: string;
  arabicSelect: string;
  englishSelect: string;
  frenchSelect: string;
  germanSelect: string;
  chineseSelect: string;
  buttonText: string;
  signinText: string;
  signinLink: string;
  validationMessages: {
    fullName: string;
    invalidEmail: string;
    passwordMin: string;
    confirmPassswordMin: string;
    languagePreferred: string;
    refinePassword: string;
  };
};

export default function SignupForm({
  headingText,
  fullNameLabel,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  confirmPasswordLabel,
  confirmPasswordPlaceholder,
  languageLabel,
  arabicSelect,
  englishSelect,
  frenchSelect,
  germanSelect,
  chineseSelect,
  buttonText,
  signinText,
  signinLink,
  validationMessages,
}: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signupSchema = useMemo(
    () =>
      z
        .object({
          full_name: z
            .string()
            .min(2, { message: validationMessages.fullName }),
          email: z.string().email({ message: validationMessages.invalidEmail }),
          password: z
            .string()
            .min(8, { message: validationMessages.passwordMin }),
          confirmPassword: z
            .string()
            .min(8, { message: validationMessages.confirmPasswordMin }),
          preferredLanguage: z
            .string()
            .min(1, { message: validationMessages.languagePreferred }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: validationMessages.refinePassword,
          path: ["confirmPassword"],
        }),
    [validationMessages],
  );
  type SignupSchema = z.infer<typeof signupSchema>;

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      preferredLanguage: "en",
    },
  });

  function onSubmit(values: SignupSchema) {
    console.log("Form submitted:", values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="max-w-md w-full">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl lg:text-3xl text-primary">
              {headingText}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">
                        {fullNameLabel}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="rounded-[10px] w-full py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
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
                          type="email"
                          placeholder={emailPlaceholder}
                          className="rounded-[10px] w-full py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
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
                            type={showPassword ? "text" : "password"}
                            placeholder={passwordPlaceholder}
                            className="rounded-[10px] w-full py-6"
                          />
                          <button
                            type="button"
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
                      <FormLabel className="text-base font-bold">
                        {confirmPasswordLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder={confirmPasswordPlaceholder}
                            className="rounded-[10px] w-full py-6"
                          />
                          <button
                            type="button"
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

                {/* Preferred Language */}
                <FormField
                  control={form.control}
                  name="preferredLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">
                        {languageLabel}
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="rounded-[10px] w-full py-6">
                            <SelectValue>{englishSelect}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">{arabicSelect}</SelectItem>
                            <SelectItem value="en">{englishSelect}</SelectItem>
                            <SelectItem value="fr">{frenchSelect}</SelectItem>
                            <SelectItem value="de">{germanSelect}</SelectItem>
                            <SelectItem value="zh">{chineseSelect}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="rounded-[10px] w-full py-6 font-bold cursor-pointer mt-5"
                >
                  {" "}
                  {buttonText}
                </Button>
              </form>

              <div className="flex flex-row items-center justify-center gap-2 text-base mt-5">
                <p>
                  {signinText}
                  <Link href="/login">
                    <span className="text-primary"> {signinLink}</span>
                  </Link>
                </p>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
