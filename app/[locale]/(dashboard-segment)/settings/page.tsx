"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function AccountSettingsPage() {
  const t = useTranslations("AccountSettings");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 space-y-8"
    >
      <h1 className="text-2xl font-semibold">{t("ProfileSettings")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("AccountDetails")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{t("Name")}</Label>
            <Input value="Olamide" readOnly />
          </div>

          <div>
            <Label>{t("Email")}</Label>
            <Input value="olamide@example.com" readOnly />
          </div>

          <div>
            <Label>{t("ChangePassword")}</Label>
            <Input type="password" placeholder="********" />
          </div>

          <Button>{t("SaveChanges")}</Button>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">{t("DangerZone")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">{t("DeleteAccount")}</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
