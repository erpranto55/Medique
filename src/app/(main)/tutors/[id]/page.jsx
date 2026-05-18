import tutors from "@/data/tutors";
import Image from "next/image";
import Link from "next/link";

const TutorDetailsPage = async ({ params }) => {

    const { id } = await params;

    const tutor = tutors.find(
        (item) => item.id === parseInt(id)
    );

    // NOT FOUND
    if (!tutor) {
        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-5xl font-bold mb-4">
                        Tutor Not Found
                    </h1>

                    <Link
                        href="/tutors"
                        className="btn btn-primary"
                    >
                        Back To Tutors
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-5">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* IMAGE */}
                {/* IMAGE */}
                <div className="relative w-full h-162.5 bg-base-200 rounded-3xl overflow-hidden shadow-xl">

                    <Image
                        src={tutor.image}
                        alt={tutor.name}
                        fill
                        className="object-contain"
                    />

                </div>

                {/* CONTENT */}
                <div className="space-y-6">

                    <div className="badge badge-primary badge-lg">
                        {tutor.subject}
                    </div>

                    <h1 className="text-5xl font-bold">
                        {tutor.name}
                    </h1>

                    <p className="text-lg text-base-content/70 leading-8">
                        Experienced tutor helping students improve
                        their learning skills through personalized
                        academic support and smart teaching methods.
                    </p>

                    {/* INFO */}
                    <div className="space-y-4 text-lg">

                        <p>
                            <span className="font-bold">
                                Experience:
                            </span>{" "}
                            {tutor.experience}
                        </p>

                        <p>
                            <span className="font-bold">
                                Location:
                            </span>{" "}
                            {tutor.location}
                        </p>

                        <p>
                            <span className="font-bold">
                                Hourly Fee:
                            </span>{" "}
                            ${tutor.fee}
                        </p>

                        <p>
                            <span className="font-bold">
                                Available Days:
                            </span>{" "}
                            Sun - Thu
                        </p>

                        <p>
                            <span className="font-bold">
                                Time:
                            </span>{" "}
                            5:00 PM - 8:00 PM
                        </p>

                        <p>
                            <span className="font-bold">
                                Teaching Mode:
                            </span>{" "}
                            Online & Offline
                        </p>

                    </div>

                    {/* BUTTON */}
                    <div className="pt-4">

                        <button className="btn btn-primary btn-lg">
                            Book Session
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetailsPage;