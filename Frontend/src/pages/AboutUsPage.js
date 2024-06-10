import React from 'react';

const AboutUs = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
                        <h1 className="text-4xl font-bold">About Us</h1>
                    </div>
                    <div className="p-8 space-y-8">

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                At Bidding Bazaar, our mission is to revolutionize the car auction industry in Pakistan by providing a transparent, convenient, and secure online platform. We aim to empower buyers and sellers with advanced technology and data-driven insights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Founded in 2024, Bidding Bazaar emerged from a passion for cars and technology. Our founders recognized the need for a more efficient and fair vehicle auction process and set out to create a platform that leverages AI and cutting-edge technology to transform the industry.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
                            <ul className="mt-4 text-gray-600 leading-relaxed list-disc list-inside">
                                <li>Innovative AI-based price predictions for accurate vehicle valuations</li>
                                <li>User-friendly platform with seamless navigation</li>
                                <li>Commitment to transparency and security</li>
                                <li>Exceptional customer support and service</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">Meet the Team</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Our team consists of passionate professionals from diverse backgrounds in technology, automotive industry, and customer service. Together, we are dedicated to delivering the best online auction experience for our users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Have questions or need assistance? Reach out to our friendly support team at <a href="mailto:support@biddingbazaar.pk" className="text-blue-500 underline">support@biddingbazaar.pk</a>.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
