"use client";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {RegisterSchema} from "@/validators/auth";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {cn} from "@/libs/utils";
import {ArrowRight} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {motion} from "framer-motion";
import {Toaster} from "@/components/ui/toaster";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import OauthForm from "@/components/form/OauthForm";
import {Separator} from "@/components/ui/separator";

type InputType = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const {toast} = useToast();
  const [formStep, setFormStep] = React.useState(0);
  const router = useRouter();
  const form = useForm<InputType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      comfirmPassword: "",
    },
  });

  function onError(errors) {
    console.log("Form errors:", errors);
    toast({
      title: "Error in zod validation",
      description: "Check the console for more information",
      variant: "destructive",
    });
  }

  async function onSubmit(data: InputType) {
    event.preventDefault();
    if (data.comfirmPassword !== data.password) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      console.log("response on submit", response);
      if (!response.ok) {
        throw (
          new Error("Something went wrong!") ||
          toast({
            title: Error && "Something went wrong in fetch",
            variant: "destructive",
          })
        );
      }
      const userData = await response.json();
      console.log("userData on submit", userData);
      toast({
        title: "User has been registered!",
        variant: "default",
      });

      signIn("credentials", {
        email: userData.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast({
            title: callback.error,
            variant: "destructive",
          });
          return;
        }
        // setTimeout(() => {
        //   router.push("/dashboard");
        // }, 2000);
      });
    } catch (error) {
      toast({
        title: error.message || "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Toaster />
      {/* // my style div */}
      <div className="flex justify-center">
        <Card className="w-[318px] mt-28 md:w-[500px] max-w-screen-md">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>This is the card description.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-3 relative overflow-x-hidden"
              >
                <motion.div
                  className={cn("space-y-3", {
                    // hidden: formStep === 1,
                  })}
                  // formStep == 0 => translateX == 0
                  // formStep == 1 => translateX == -100%
                  animate={{
                    translateX: `-${formStep * 100}%`,
                  }}
                  transition={{
                    ease: "easeInOut",
                  }}
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </motion.div>
                <motion.div
                  className={cn("space-y-3 absolute right-0 left-0 top-0", {
                    hidden: formStep === 0,
                  })}
                  animate={{
                    //formStep == 0 => translateX == 100%
                    //formStep == 1 => translateX == 0
                    translateX: `${100 - formStep * 100}%`,
                  }}
                  // defult style prevents the animation from running on page load.
                  style={{
                    translateX: `${100 - formStep * 100}%`,
                  }}
                  transition={{
                    ease: "easeInOut",
                  }}
                >
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
                  {/* Comfirm Password */}
                  <FormField
                    control={form.control}
                    name="comfirmPassword"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Comfirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Comfirm your password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <div className="flex gap-2 py-4">
                  <Button
                    type="submit"
                    className={cn({
                      hidden: formStep === 0,
                    })}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    className={cn({
                      hidden: formStep === 1,
                    })}
                    variant={"outline"}
                    onClick={() => {
                      form.trigger(["email", "name"]);
                      const emailState = form.getFieldState("email");
                      const nameState = form.getFieldState("name");

                      if (!emailState.isDirty || emailState.invalid) return;
                      if (!nameState.isDirty || nameState.invalid) return;
                      setFormStep(1);
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setFormStep(0);
                    }}
                    className={cn({
                      hidden: formStep === 0,
                    })}
                    variant={"outline"}
                  >
                    Go Back
                  </Button>
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
