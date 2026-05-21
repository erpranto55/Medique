const FAQ = () => {

    return (

        <section className="py-20 bg-base-200">

            <div className="container mx-auto px-4">

                {/* HEADING */}
                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Find answers to common questions
                        about MediQueue and tutoring sessions.
                    </p>

                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto space-y-4">

                    <div className="collapse collapse-plus bg-base-100 shadow-md">

                        <input type="radio" name="faq" defaultChecked />

                        <div className="collapse-title text-xl font-semibold">

                            How can I book a tutor session?

                        </div>

                        <div className="collapse-content">

                            <p className="text-base-content/70 leading-7">

                                Simply browse tutors, view their details,
                                and click the booking button to schedule
                                your session instantly.

                            </p>

                        </div>

                    </div>

                    <div className="collapse collapse-plus bg-base-100 shadow-md">

                        <input type="radio" name="faq" />

                        <div className="collapse-title text-xl font-semibold">

                            Can I update my tutor information later?

                        </div>

                        <div className="collapse-content">

                            <p className="text-base-content/70 leading-7">

                                Yes. Tutors can easily update their
                                profile, pricing, and availability
                                anytime from the My Tutors section.

                            </p>

                        </div>

                    </div>

                    <div className="collapse collapse-plus bg-base-100 shadow-md">

                        <input type="radio" name="faq" />

                        <div className="collapse-title text-xl font-semibold">

                            Is MediQueue free for students?

                        </div>

                        <div className="collapse-content">

                            <p className="text-base-content/70 leading-7">

                                Yes. Students can browse tutors and
                                explore the platform completely free.
                                Payment depends on tutor session fees.

                            </p>

                        </div>

                    </div>

                    <div className="collapse collapse-plus bg-base-100 shadow-md">

                        <input type="radio" name="faq" />

                        <div className="collapse-title text-xl font-semibold">

                            Can I cancel a booked session?

                        </div>

                        <div className="collapse-content">

                            <p className="text-base-content/70 leading-7">

                                Yes. Users can cancel booked sessions
                                anytime from the My Bookings page.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default FAQ;