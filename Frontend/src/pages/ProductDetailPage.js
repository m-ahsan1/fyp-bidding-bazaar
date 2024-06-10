import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageDisplay from "../components/imageDisplay";

const TestPage = () => {
    const { id } = useParams();
    // const id = '6665a55af43373da95474a66'
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/listings/${id}`);
                setCarData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const images = carData.images.map((img) => img.base64);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-12 space-y-8 md:space-y-0 md:space-x-12 bg-gray-50 min-h-screen">
                <div className="w-full md:w-1/2">
                    <ImageDisplay images={images} />
                </div>
                <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                    <div className="space-y-6">
                        <h4 className="text-sm font-semibold text-orange-500 uppercase">{carData.company}</h4>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">{carData.title}</h1>
                        <p className="text-gray-600">{carData.description}</p>
                        <div className="space-y-2">
                            <p className="text-gray-600"><strong>Engine:</strong> {carData.engine}</p>
                            <p className="text-gray-600"><strong>Mileage:</strong> {carData.mileage} km</p>
                            <p className="text-gray-600"><strong>Model Year:</strong> {carData.modelYear}</p>
                            <p className="text-gray-600"><strong>End Time:</strong> {'carData.time_end'}</p>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Current Bid: ${carData.currentBid}</span>
                        <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow transition duration-300"
                                onClick={() => { }}
                            >
                                <span className="font-semibold">Place a Bid</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestPage;
