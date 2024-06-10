import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/Navbar';
import Subbar from '../components/Subbar';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <Subbar />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        <h1 className="text-4xl font-bold">Privacy Policy</h1>
                        <p className="mt-1 text-lg">Effective Date: June 10, 2024</p>
                    </div>
                    <div className="p-8 space-y-8">

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">1. Introduction</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Bidding Bazaar values your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">2. Information Collection</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                            </p>
                            <ul className="mt-4 text-gray-600 leading-relaxed list-disc list-inside">
                                <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                                <li>Derivative Data: Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">3. Use of Information</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                            </p>
                            <ul className="mt-4 text-gray-600 leading-relaxed list-disc list-inside">
                                <li>Create and manage your account.</li>
                                <li>Process your transactions and deliver the services you have requested.</li>
                                <li>Improve the content and functionality of our Site.</li>
                                <li>Send you administrative information, such as updates and security alerts.</li>
                                <li>Request feedback and contact you about your use of the Site.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">4. Disclosure of Information</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                            </p>
                            <ul className="mt-4 text-gray-600 leading-relaxed list-disc list-inside">
                                <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                                <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                                <li>With Your Consent: We may disclose your personal information for any other purpose with your consent.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">5. Security of Your Information</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">6. Policy for Children</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">7. Changes to This Privacy Policy</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Effective Date" at the top of this Privacy Policy. You are encouraged to review this Privacy Policy periodically to stay informed of updates.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800">8. Contact Us</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                If you have questions or comments about this Privacy Policy, please contact us at:
                                <br />
                                Email: <a href="mailto:support@biddingbazaar.pk" className="text-blue-500 underline">support@biddingbazaar.pk</a>
                                <br />
                                Address: Bidding Bazaar, 852-B Milaad St, Block B Faisal Town, Lahore, Punjab, Pakitan
                            </p>
                        </section>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
