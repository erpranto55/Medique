"use client";

import { useState } from "react";

import Image from "next/image";

import {
    Button,
} from "@heroui/react";

import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const initialTutors = [
    {
        id: 1,
        name: "Michael Brown",
        subject: "Physics",
        fee: 30,
        location: "Chittagong",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    {
        id: 2,
        name: "Sarah Johnson",
        subject: "Mathematics",
        fee: 25,
        location: "Dhaka",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
];

const MyTutorsPage = () => {

    const [tutors, setTutors] =
        useState(initialTutors);

    const [selectedTutor, setSelectedTutor] =
        useState(null);

    // DELETE
    const handleDelete = (id) => {

        const remainingTutors =
            tutors.filter(
                (tutor) => tutor.id !== id
            );

        setTutors(remainingTutors);

        document
            .getElementById("delete_modal")
            .close();
    };

    // UPDATE
    const handleUpdate = (e) => {

        e.preventDefault();

        const form = e.target;

        const updatedTutor = {
            ...selectedTutor,
            name: form.name.value,
            subject: form.subject.value,
            location: form.location.value,
            fee: form.fee.value,
        };

        const updatedTutors =
            tutors.map((tutor) =>
                tutor.id === selectedTutor.id
                    ? updatedTutor
                    : tutor
            );

        setTutors(updatedTutors);

        document
            .getElementById("update_modal")
            .close();
    };

    return (
        <div className="container mx-auto px-4 py-16">

            {/* Heading */}
            <div className="text-center mb-12">

                <h1 className="text-4xl md:text-5xl font-bold">
                    My Tutors
                </h1>

                <p className="text-base-content/70 mt-4 text-lg">
                    Manage your tutoring services
                    easily from here.
                </p>

            </div>

            {/* EMPTY STATE */}
            {
                tutors.length === 0 && (

                    <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-16 text-center">

                        <h2 className="text-3xl font-bold">
                            No Tutors Found
                        </h2>

                        <p className="text-base-content/70 mt-4">
                            You have not added any
                            tutoring services yet.
                        </p>

                    </div>
                )
            }

            {/* TABLE */}
            {
                tutors.length > 0 && (

                    <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-2xl border border-base-300">

                        <table className="table">

                            {/* HEAD */}
                            <thead>

                                <tr className="text-base">

                                    <th>
                                        Tutor
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Fee
                                    </th>

                                    <th className="text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            {/* BODY */}
                            <tbody>

                                {
                                    tutors.map((tutor) => (

                                        <tr
                                            key={tutor.id}
                                        >

                                            {/* Tutor */}
                                            <td>

                                                <div className="flex items-center gap-4">

                                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden">

                                                        <Image
                                                            src={tutor.image}
                                                            alt={tutor.name}
                                                            fill
                                                            className="object-cover"
                                                        />

                                                    </div>

                                                    <h2 className="font-bold text-lg">
                                                        {tutor.name}
                                                    </h2>

                                                </div>

                                            </td>

                                            {/* Subject */}
                                            <td>
                                                {tutor.subject}
                                            </td>

                                            {/* Location */}
                                            <td>
                                                {tutor.location}
                                            </td>

                                            {/* Fee */}
                                            <td>
                                                ${tutor.fee}
                                            </td>

                                            {/* Actions */}
                                            <td>

                                                <div className="flex items-center justify-center gap-3">

                                                    {/* UPDATE */}
                                                    <Button
                                                        onPress={() => {

                                                            setSelectedTutor(
                                                                tutor
                                                            );

                                                            document
                                                                .getElementById(
                                                                    "update_modal"
                                                                )
                                                                .showModal();
                                                        }}
                                                        className="btn btn-primary btn-sm text-white"
                                                    >

                                                        <FaEdit />

                                                        Update

                                                    </Button>

                                                    {/* DELETE */}
                                                    <Button
                                                        onPress={() => {

                                                            setSelectedTutor(
                                                                tutor
                                                            );

                                                            document
                                                                .getElementById(
                                                                    "delete_modal"
                                                                )
                                                                .showModal();
                                                        }}
                                                        className="btn btn-error btn-sm text-white"
                                                    >

                                                        <FaTrash />

                                                        Delete

                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                )
            }

            {/* UPDATE MODAL */}
            <dialog
                id="update_modal"
                className="modal"
            >

                <div className="modal-box max-w-2xl">

                    <h3 className="font-bold text-3xl mb-8">
                        Update Tutor
                    </h3>

                    {
                        selectedTutor && (

                            <form
                                onSubmit={handleUpdate}
                                className="space-y-5"
                            >

                                {/* Name */}
                                <div>

                                    <label className="font-semibold block mb-2">
                                        Tutor Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={
                                            selectedTutor.name
                                        }
                                        className="input input-bordered w-full"
                                    />

                                </div>

                                {/* Subject */}
                                <div>

                                    <label className="font-semibold block mb-2">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        name="subject"
                                        defaultValue={
                                            selectedTutor.subject
                                        }
                                        className="input input-bordered w-full"
                                    />

                                </div>

                                {/* Location */}
                                <div>

                                    <label className="font-semibold block mb-2">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={
                                            selectedTutor.location
                                        }
                                        className="input input-bordered w-full"
                                    />

                                </div>

                                {/* Fee */}
                                <div>

                                    <label className="font-semibold block mb-2">
                                        Hourly Fee
                                    </label>

                                    <input
                                        type="number"
                                        name="fee"
                                        defaultValue={
                                            selectedTutor.fee
                                        }
                                        className="input input-bordered w-full"
                                    />

                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-4 pt-4">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "update_modal"
                                                )
                                                .close()
                                        }
                                        className="btn"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save Changes
                                    </button>

                                </div>

                            </form>
                        )
                    }

                </div>

            </dialog>

            {/* DELETE MODAL */}
            <dialog
                id="delete_modal"
                className="modal"
            >

                <div className="modal-box">

                    <h3 className="font-bold text-2xl">
                        Delete Tutor
                    </h3>

                    <p className="py-6 text-base-content/70">

                        Are you sure you want to
                        delete this tutor?

                    </p>

                    <div className="flex justify-end gap-4">

                        <button
                            onClick={() =>
                                document
                                    .getElementById(
                                        "delete_modal"
                                    )
                                    .close()
                            }
                            className="btn"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() =>
                                handleDelete(
                                    selectedTutor.id
                                )
                            }
                            className="btn btn-error text-white"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </dialog>
        </div>
    );
};

export default MyTutorsPage;