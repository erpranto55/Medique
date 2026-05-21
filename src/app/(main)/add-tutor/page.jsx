"use client";

import React, {
    useEffect,
    useContext,
} from "react";

import {
    Button,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";

import {
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";

import axios from "axios";

import PrivateRoute from "@/routes/PrivateRoute";

import {
    AuthContext,
} from "@/providers/AuthProvider";

const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "ICT",
];

const teachingModes = [
    "Online",
    "Offline",
    "Both",
];

const AddTutorPage = () => {

    useEffect(() => {

        document.title =
            "Add Tutor | MediQueue";

    }, []);

    const { user } =
        useContext(AuthContext);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    // SUBMIT
    const handleAddTutor =
        async (data) => {

            try {

                const tutorInfo = {

                    ...data,

                    email:
                        user?.email,

                    createdAt:
                        new Date(),
                };

                const res =
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/tutors`,
                        tutorInfo
                    );

                if (
                    res.data
                        .insertedId
                ) {

                    toast.success(
                        "Tutor Added Successfully!",
                        {
                            position:
                                "top-center",

                            autoClose:
                                2000,
                        }
                    );

                    reset();

                    // REDIRECT
                    setTimeout(() => {

                        window.location.href =
                            "/my-tutors";

                    }, 2000);
                }

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed To Add Tutor"
                );
            }
        };

    return (

        <PrivateRoute>

            <div className="container mx-auto px-4 py-16">

                <div className="max-w-5xl mx-auto bg-base-100 shadow-2xl rounded-3xl p-8 md:p-12 border border-base-300">

                    {/* Heading */}
                    <div className="text-center mb-12">

                        <h1 className="text-4xl md:text-6xl font-bold">

                            Add Tutor

                        </h1>

                        <p className="text-base-content/70 mt-4 text-lg">

                            Add your tutoring service and connect
                            with students easily through MediQueue.

                        </p>

                    </div>

                    {/* Form */}
                    <Form
                        onSubmit={handleSubmit(handleAddTutor)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                    >

                        {/* Tutor Name */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Tutor Name
                                </Label>

                                <Input
                                    className="w-full"
                                    placeholder="Tutor Name"
                                    {...register("name")}
                                />

                            </TextField>

                        </div>

                        {/* Photo URL */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Photo URL
                                </Label>

                                <Input
                                    className="w-full"
                                    placeholder="Photo URL"
                                    {...register("photo")}
                                />

                            </TextField>

                        </div>

                        {/* Subject */}
                        <div className="w-full">

                            <Label className="mb-2 block">

                                Subject

                            </Label>

                            <select
                                className="w-full h-14 px-4 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                {...register("subject")}
                            >

                                <option value="">
                                    Select Subject
                                </option>

                                {
                                    subjects.map((subject) => (
                                        <option
                                            key={subject}
                                            value={subject}
                                        >
                                            {subject}
                                        </option>
                                    ))
                                }

                            </select>

                        </div>

                        {/* Available Days */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Available Days
                                </Label>

                                <Input
                                    className="w-full"
                                    placeholder="Sun - Thu"
                                    {...register("days")}
                                />

                            </TextField>

                        </div>

                        {/* Time Slot */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Time Slot
                                </Label>

                                <Input
                                    className="w-full"
                                    placeholder="5:00 PM - 8:00 PM"
                                    {...register("time")}
                                />

                            </TextField>

                        </div>

                        {/* Hourly Fee */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Hourly Fee
                                </Label>

                                <Input
                                    className="w-full"
                                    type="number"
                                    placeholder="Hourly Fee"
                                    {...register("fee")}
                                />

                            </TextField>

                        </div>

                        {/* Total Slot */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Total Slot
                                </Label>

                                <Input
                                    className="w-full"
                                    type="number"
                                    placeholder="Total Slot"
                                    {...register("slot")}
                                />

                            </TextField>

                        </div>

                        {/* Session Date */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Session Start Date
                                </Label>

                                <Input
                                    className="w-full"
                                    type="date"
                                    {...register("date")}
                                />

                            </TextField>

                        </div>

                        {/* Institution */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Institution & Experience
                                </Label>

                                <Input
                                    className="w-full"
                                    placeholder="Institution & Experience"
                                    {...register("institution")}
                                />

                            </TextField>

                        </div>

                        {/* Location */}
                        <div className="w-full">

                            <TextField
                                isRequired
                                className="w-full"
                            >

                                <Label>
                                    Location
                                </Label>

                                <Input
                                    className="w-full"
                                    placeholder="Area / City"
                                    {...register("location")}
                                />

                            </TextField>

                        </div>

                        {/* Teaching Mode */}
                        <div className="w-full">

                            <Label className="mb-2 block">

                                Teaching Mode

                            </Label>

                            <select
                                className="w-full h-14 px-4 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                {...register("mode")}
                            >

                                <option value="">
                                    Select Mode
                                </option>

                                {
                                    teachingModes.map((mode) => (
                                        <option
                                            key={mode}
                                            value={mode}
                                        >
                                            {mode}
                                        </option>
                                    ))
                                }

                            </select>

                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 w-full">

                            <Label className="mb-2 block">

                                Description

                            </Label>

                            <TextArea
                                className="w-full"
                                placeholder="Write about your tutoring experience..."
                                {...register("description")}
                            />

                        </div>

                        {/* Button */}
                        <div className="md:col-span-2 w-full pt-4">

                            <Button
                                type="submit"
                                className="w-full btn btn-primary text-white text-lg"
                            >

                                Add Tutor

                            </Button>

                        </div>

                    </Form>

                </div>

                <ToastContainer position="top-center" />

            </div>

        </PrivateRoute>
    );
};

export default AddTutorPage;