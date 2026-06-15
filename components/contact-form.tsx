"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialState: FormState = { success: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" />
            {state.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message..." />
            {state.errors?.message && (
              <p className="text-sm text-destructive">{state.errors.message[0]}</p>
            )}
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Sending..." : "Send Message"}
          </Button>
          {state.message && (
            <p className={cn("text-sm", state.success ? "text-green-600" : "text-destructive")}>
              {state.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
