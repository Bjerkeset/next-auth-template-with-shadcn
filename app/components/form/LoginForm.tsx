import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {LoginSchema, RegisterSchema} from "@/validators/auth";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {cn} from "@/libs/utils";
import {ArrowRight} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {motion} from "framer-motion";
import {Toaster} from "@/components/ui/toaster";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import OauthForm from "@/components/form/OauthForm";
import {Separator} from "@/components/ui/separator";

type InputType = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<InputType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // function onError(errors) {
  //   console.log("Form errors:", errors);
  //   toast({
  //     title: "Error in zod validation",
  //     description: "Check the console for more information",
  //     variant: "destructive",
  //   });
  // }

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", {...form.getValues(), redirect: false}).then(
      (callback) => {
        if (callback?.error) {
          toast({
            title: "Error signing in",
            description: callback.error,
            variant: "destructive",
          });
        }

        if (callback?.ok && !callback?.error) {
          toast({
            title: "Success!",
            description: "Logged in successfully!",
            variant: "default",
          });
        }
      }
    );
  };

  return (
    <div>
      <Toaster />
      {/* // my style div */}
      <div className="flex justify-center">
        <Card className="w-[318px] mt-28 md:w-[500px] max-w-screen-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>This is the card description.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={loginUser}
                className="space-y-3 relative overflow-x-hidden"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 justify-center">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardContent>
            <Separator />
            <OauthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
