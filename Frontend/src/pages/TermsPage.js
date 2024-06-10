import React from 'react';
import Navbar from '../components/Navbar';
import Subbar from '../components/Subbar';
import Footer from '../components/footer';

const TermsOfService = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                        <h1 className="text-4xl font-bold">Terms of Service</h1>
                        <p className="mt-1 text-lg">Effective Date: June 10, 2024</p>
                    </div>
                    <div className="p-6 space-y-8">

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">1. Introduction</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Welcome to Bidding Bazaar. By using our website, you agree to comply with and be bound by the following terms and conditions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">2. User Accounts</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">3. Auction Rules</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                All bids placed on Bidding Bazaar are binding. Ensure you understand the auction rules before participating.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">4. AI-Based Price Predictions</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Our AI-based price predictions are provided for informational purposes only and should not be relied upon as definitive valuations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">5. Limitation of Liability</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Bidding Bazaar will not be liable for any damages arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">6. Changes to Terms</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                We reserve the right to modify these terms at any time. Any changes will be posted on this page, and your continued use of the site constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800">7. Contact Information</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us at support@biddingbazaar.pk.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfService;
