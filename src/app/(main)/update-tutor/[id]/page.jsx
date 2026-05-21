"use client";

import {
    use,
    useEffect,
    useState,
} from "react";

import {
    Button,
    Form,
    Input,
    Label,
    TextArea,
} from "@heroui/react";

import {
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    useContext,
} from "react";

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

const UpdateTutorPage = ({ params }) => {

    const { id } =
        use(params);

    const { user } =
        useContext(
            AuthContext
        );

    const [loading, setLoading] =
        useState(true);

    const [formData, setFormData] =
        useState({
            name: "",
            photo: "",
            subject: "",
            availableDays: "",
            timeSlot: "",
            fee: "",
            totalSlot: "",
            sessionStartDate: "",
            experience: "",
            location: "",
            mode: "",
            description: "",
        });

    // FETCH SINGLE TUTOR
    useEffect(() => {

        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`
        )
            .then((res) =>
                res.json()
            )
            .then((data) => {

                setFormData({
                    name:
                        data?.name ||
                        "",

                    photo:
                        data?.photo ||
                        "",

                    subject:
                        data?.subject ||
                        "",

                    availableDays:
                        data?.availableDays ||
                        "",

                    timeSlot:
                        data?.timeSlot ||
                        "",

                    fee:
                        data?.fee ||
                        "",

                    totalSlot:
                        data?.totalSlot ||
                        "",

                    sessionStartDate:
                        data?.sessionStartDate ||
                        "",

                    experience:
                        data?.experience ||
                        "",

                    location:
                        data?.location ||
                        "",

                    mode:
                        data?.mode ||
                        "",

                    description:
                        data?.description ||
                        "",
                });

                setLoading(false);
            });

    }, [id]);

    // HANDLE CHANGE
    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // UPDATE TUTOR
    const handleUpdateTutor =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "access-token"
                    );

                const updatedTutor =
                {

                    ...formData,

                    email:
                        user?.email,

                    fee: parseInt(
                        formData.fee
                    ),

                    totalSlot:
                        parseInt(
                            formData.totalSlot
                        ),
                };

                const res =
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
                        {
                            method:
                                "PUT",

                            headers: {

                                "content-type":
                                    "application/json",

                                authorization:
                                    `Bearer ${token}`,
                            },

                            body: JSON.stringify(
                                updatedTutor
                            ),
                        }
                    );

                const data =
                    await res.json();

                if (
                    data.modifiedCount >
                    0
                ) {

                    toast.success(
                        "Tutor Updated Successfully",
                        {
                            position:
                                "top-center",

                            autoClose:
                                2000,
                        }
                    );

                    // REDIRECT
                    setTimeout(
                        () => {

                            window.location.href =
                                "/my-tutors";

                        },
                        2000
                    );

                } else {

                    toast.error(
                        "No Changes Made"
                    );
                }

            } catch (error) {

                console.log(
                    error
                );

                toast.error(
                    "Failed To Update Tutor"
                );
            }
        };

    // LOADING
    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }

    return (

        <div className="container mx-auto px-4 py-16">

            <div className="max-w-5xl mx-auto bg-base-100 shadow-2xl rounded-3xl p-8 md:p-12 border border-base-300">

                {/* HEADING */}
                <div className="text-center mb-12">

                    <h1 className="text-4xl md:text-6xl font-bold">

                        Update Tutor

                    </h1>

                    <p className="text-base-content/70 mt-4 text-lg">

                        Update your tutoring information easily.

                    </p>

                </div>

                {/* FORM */}
                <Form
                    onSubmit={handleUpdateTutor}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                >

                    {/* NAME */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Tutor Name

                        </Label>

                        <Input
                            className="w-full"
                            placeholder="Tutor Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>

                    {/* PHOTO */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Photo URL

                        </Label>

                        <Input
                            className="w-full"
                            placeholder="Photo URL"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                        />

                    </div>

                    {/* SUBJECT */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Subject

                        </Label>

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full h-14 px-4 rounded-xl border border-base-300 bg-base-100"
                        >

                            {
                                subjects.map(
                                    (
                                        subject
                                    ) => (
                                        <option
                                            key={
                                                subject
                                            }
                                            value={
                                                subject
                                            }
                                        >
                                            {
                                                subject
                                            }
                                        </option>
                                    )
                                )
                            }

                        </select>

                    </div>

                    {/* AVAILABLE DAYS */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Available Days

                        </Label>

                        <Input
                            className="w-full"
                            placeholder="Sun - Thu"
                            name="availableDays"
                            value={formData.availableDays}
                            onChange={handleChange}
                        />

                    </div>

                    {/* TIME SLOT */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Time Slot

                        </Label>

                        <Input
                            className="w-full"
                            placeholder="5PM - 8PM"
                            name="timeSlot"
                            value={formData.timeSlot}
                            onChange={handleChange}
                        />

                    </div>

                    {/* FEE */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Hourly Fee

                        </Label>

                        <Input
                            type="number"
                            className="w-full"
                            placeholder="Fee"
                            name="fee"
                            value={formData.fee}
                            onChange={handleChange}
                        />

                    </div>

                    {/* TOTAL SLOT */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Total Slot

                        </Label>

                        <Input
                            type="number"
                            className="w-full"
                            placeholder="Slot"
                            name="totalSlot"
                            value={formData.totalSlot}
                            onChange={handleChange}
                        />

                    </div>

                    {/* SESSION DATE */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Session Date

                        </Label>

                        <Input
                            type="date"
                            className="w-full"
                            name="sessionStartDate"
                            value={formData.sessionStartDate}
                            onChange={handleChange}
                        />

                    </div>

                    {/* EXPERIENCE */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Experience

                        </Label>

                        <Input
                            className="w-full"
                            placeholder="Experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                        />

                    </div>

                    {/* LOCATION */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Location

                        </Label>

                        <Input
                            className="w-full"
                            placeholder="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                    </div>

                    {/* MODE */}
                    <div className="w-full">

                        <Label className="mb-2">

                            Teaching Mode

                        </Label>

                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="w-full h-14 px-4 rounded-xl border border-base-300 bg-base-100"
                        >

                            {
                                teachingModes.map(
                                    (
                                        mode
                                    ) => (
                                        <option
                                            key={
                                                mode
                                            }
                                            value={
                                                mode
                                            }
                                        >
                                            {
                                                mode
                                            }
                                        </option>
                                    )
                                )
                            }

                        </select>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="md:col-span-2 w-full">

                        <Label className="mb-2">

                            Description

                        </Label>

                        <TextArea
                            className="w-full"
                            placeholder="Write description..."
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>

                    {/* BUTTON */}
                    <div className="md:col-span-2 w-full pt-4">

                        <Button
                            type="submit"
                            className="w-full btn btn-primary text-white text-lg"
                        >

                            Update Tutor

                        </Button>

                    </div>

                </Form>

            </div>

            {/* TOAST */}
            <ToastContainer position="top-center" />

        </div>
    );
};

export default UpdateTutorPage;