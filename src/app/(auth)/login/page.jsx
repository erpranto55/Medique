// "use client";

// import React, { useState } from "react";
// import {
//     Button,
//     Description,
//     FieldError,
//     Form,
//     Input,
//     InputGroup,
//     Label,
//     TextField,
// } from "@heroui/react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { authClient } from "@/lib/auth-client";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {

//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm()

//     const [isShowPassword, setIsShowPassword] = useState(false);

//     const handleLogInFunc = async (data) => {

//         const { email, password } = data;

//         const { data: res, error } = await authClient.signIn.email({
//             email,
//             password,
//             rememberMe: true,
//             callbackURL: "/",
//         });

//         // SUCCESS 
//         if (res) {
//             toast.success("Login successful!");

//             setTimeout(() => {
//                 router.push("/");
//             }, 1500);
//         }

//         // ERROR
//         if (error) {

//             if (
//                 error.message?.toLowerCase().includes("invalid") ||
//                 error.message?.toLowerCase().includes("credential")
//             ) {
//                 toast.error("Invalid email or password!");
//             } else {
//                 toast.error(error.message || "Login failed");
//             }

//             return;
//         }
//     };
//     // console.log(watch("email"));

//     return (
//         <div className="container mx-auto min-h-screen flex items-center justify-center px-4">
//             <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl min-h-[60vh]">

//                 <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//                     Login Your Account
//                 </h2>

//                 <hr className="text-slate-300 my-6" />

//                 <Form className="flex flex-col gap-5" onSubmit={handleSubmit(handleLogInFunc)}>

//                     {/* Email Field */}
//                     <TextField
//                         isRequired
//                         name="email"
//                         type="email"
//                         validate={(value) => {
//                             if (
//                                 !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
//                             ) {
//                                 return "Please enter a valid email address";
//                             }

//                             return null;
//                         }}
//                     >
//                         <Label>Email address</Label>

//                         <Input
//                             placeholder="Your Email"
//                             className="mt-1"
//                             {...register("email")}
//                         />

//                         <FieldError />
//                     </TextField>

//                     {/* Password Field */}
//                     <TextField
//                         isRequired
//                         minLength={8}
//                         name="password"
//                         type={isShowPassword ? "text" : "password"}
//                         validate={(value) => {

//                             if (value.length === 0) {
//                                 return "Password field is Required";
//                             }
//                             if (value.length < 8) {
//                                 return "Password must be at least 8 characters";
//                             }

//                             if (!/[A-Z]/.test(value)) {
//                                 return "Password must contain at least one uppercase letter";
//                             }

//                             if (!/[0-9]/.test(value)) {
//                                 return "Password must contain at least one number";
//                             }

//                             return null;
//                         }}
//                     >
//                         <Label>Password</Label>

//                         <InputGroup>
//                             <InputGroup.Input
//                                 className="w-full"
//                                 placeholder="Your Password"
//                                 type={isShowPassword ? "text" : "password"}
//                                 {...register("password")}
//                             />
//                             <InputGroup.Suffix className="pr-0">
//                                 <Button
//                                     isIconOnly
//                                     aria-label={isShowPassword ? "Hide password" : "Show password"}
//                                     size="sm"
//                                     variant="ghost"
//                                     onPress={() => setIsShowPassword(!isShowPassword)}
//                                 >
//                                     {isShowPassword ? <FaEye className="size-4" /> : <FaEyeSlash className="size-4" />}
//                                 </Button>
//                             </InputGroup.Suffix>
//                         </InputGroup>

//                         <FieldError />
//                     </TextField>

//                     {/* Buttons */}
//                     <div className="flex gap-3 pt-2">

//                         <Button
//                             type="submit"
//                             className="w-full bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300"
//                         >
//                             Login
//                         </Button>


//                     </div>
//                 </Form>
//                 <div className="flex gap-2 items-center justify-center mt-5">
//                     <h2 className="text-sm text-slate-700">Don&apos;t Have An Account ? </h2>
//                     <Link href="/register">
//                         <h2 className="text-red-600 font-bold">
//                             Register
//                         </h2 >
//                     </Link >
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default LoginPage;