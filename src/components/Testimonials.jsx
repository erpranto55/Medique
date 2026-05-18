import Image from "next/image";

const reviews = [
    {
        id: 1,
        name: "Ariana Rahman",
        image:
            "https://randomuser.me/api/portraits/women/65.jpg",
        review:
            "MediQueue helped me find an amazing math tutor. The booking process was smooth and easy.",
    },

    {
        id: 2,
        name: "Rakib Hasan",
        image:
            "https://randomuser.me/api/portraits/men/32.jpg",
        review:
            "I love the clean interface and flexible scheduling system. Highly recommended for students.",
    },

    {
        id: 3,
        name: "Nusrat Jahan",
        image:
            "https://randomuser.me/api/portraits/women/45.jpg",
        review:
            "The platform made online tutoring simple and organized. Great experience overall.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-20">

            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold mb-4">
                        What Students Say
                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Hear from students who successfully improved
                        their learning experience using MediQueue.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">

                    {
                        reviews.map((review) => (

                            <div
                                key={review.id}
                                className="card bg-base-100 shadow-xl"
                            >

                                <div className="card-body items-center text-center">

                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        height={500}
                                        width={500}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />

                                    <h3 className="text-xl font-semibold mt-4">
                                        {review.name}
                                    </h3>

                                    <p className="text-base-content/70 leading-7">
                                        &quot;{review.review}&quot;
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    );
};

export default Testimonials;