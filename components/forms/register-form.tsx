"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { time } from "@/utils/GetTime";
import { image } from "@/utils/GetImage";
import toast from "react-hot-toast";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const FormSchema = z
    .object({
        name: z
            .string()
            .min(1, {
                message: "Name cannot be empty.",
            })
            .min(2, {
                message: "Name cannot be less than 2 characters.",
            })
            .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), {
                message: "Name should contain only alphabets",
            })
            .refine((value) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(value), {
                message: "Please enter both firstname and lastname",
            }),
        username: z
            .string()
            .min(1, {
                message: "Username cannot be empty.",
            })
            .min(3, {
                message: "Username must be at least 3 characters.",
            })
            .max(20, {
                message: "Username must be at most 20 characters.",
            })
            .refine(
                (data) => /^(?!.*--)[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(data),
                {
                    message:
                        "Invalid username. Only lowercase letters, numbers, and hyphens(-) are allowed in between.",
                }
            ),
        email: z.string().email({
            message: "Invalid email address.",
        }),
        password: z
            .string()
            .min(1, {
                message: "Password cannot be empty.",
            })
            .min(8, {
                message: "Passwords must be at least 8 characters long.",
            })
            .refine(
                (data) =>
                    /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(
                        data
                    ),
                {
                    message:
                        "Make a strong password.",
                }
            ),
        cpassword: z.string(),
    })
    .refine((data) => data.password === data.cpassword, {
        message: "Passwords do not match",
        path: ["cpassword"],
    });

export function RegisterForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const { name, username, email, password } = values;
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    time,
                    image,
                    password,
                }),
            });
            if (res.status === 409) {
                form.setError("username", {
                    type: "manual",
                    message: "Username already registered",
                });
            }
            if (res.status === 400) {
                form.setError("email", {
                    type: "manual",
                    message: "Email already registered",
                });
            }
            if (res.status === 200) {
                toast.success("Signed up");
                router.push("/auth/login");
            }
        } catch (error) {}
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-2 py-2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    id="name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState?.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Create username"
                                    id="username"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Ex: test, test123 & test-user
                            </FormDescription>
                            <FormMessage>
                                {fieldState?.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    id="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState?.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Create password atleast 8 characters"
                                        id="password"
                                        {...field}
                                    />
                                    {showPassword ? (
                                        <EyeIcon
                                            size={18}
                                            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 bg-background"
                                            onClick={() => {
                                                showPassword
                                                    ? setShowPassword(false)
                                                    : setShowPassword(true);
                                            }}
                                        />
                                    ) : (
                                        <EyeOffIcon
                                            size={18}
                                            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 bg-background"
                                            onClick={() => {
                                                showPassword
                                                    ? setShowPassword(false)
                                                    : setShowPassword(true);
                                            }}
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                Password should contain both number & alphabets.
                            </FormDescription>
                            <FormMessage>
                                {fieldState?.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="cpassword"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm password"
                                    id="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {fieldState?.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col space-y-2 items-center">
                    <Button variant="blue" size="auth" type="submit">
                        Register
                    </Button>
                    <p className="text-[var(--grey-fg)]">OR</p>
                    <Button variant="blue" size="auth" type="button" asChild>
                        <Link href="/auth/login">Login</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
