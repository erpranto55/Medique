import {
    FaUserGraduate,
    FaClock,
    FaLaptopHouse,
} from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-base-200 rounded-3xl">

            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold mb-4">
                        Why Choose MediQueue?
                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70">
                        We provide a smart and reliable tutor booking
                        experience for students and educators.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">

                    {/* Card 1 */}
                    <div className="card bg-base-100 shadow-xl">

                        <div className="card-body items-center text-center">

                            <div className="text-5xl text-primary mb-4">
                                <FaUserGraduate />
                            </div>

                            <h3 className="text-2xl font-semibold">
                                Expert Tutors
                            </h3>

                            <p className="text-base-content/70">
                                Learn from experienced tutors across
                                multiple subjects and skill levels.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card bg-base-100 shadow-xl">

                        <div className="card-body items-center text-center">

                            <div className="text-5xl text-primary mb-4">
                                <FaClock />
                            </div>

                            <h3 className="text-2xl font-semibold">
                                Flexible Scheduling
                            </h3>

                            <p className="text-base-content/70">
                                Book sessions based on your preferred
                                day and available time slot.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card bg-base-100 shadow-xl">

                        <div className="card-body items-center text-center">

                            <div className="text-5xl text-primary mb-4">
                                <FaLaptopHouse />
                            </div>

                            <h3 className="text-2xl font-semibold">
                                Online & Offline
                            </h3>

                            <p className="text-base-content/70">
                                Attend tutoring sessions from home or
                                meet tutors physically when needed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;