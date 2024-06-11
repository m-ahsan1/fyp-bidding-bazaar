import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageDisplay from "../components/imageDisplay";
import { auth } from "../firebase";
import { deleteListing, setSold } from "../redux/slices/listingSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
    const { type, id } = useParams();
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seller, setSeller] = useState(null);

    const dispatch = useDispatch();
    const Navigate = useNavigate();

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

    const handleDelete = () => {
        dispatch(deleteListing(id));
    };

    const markAsSold = () => {
        console.log("Marking as sold");
        dispatch(setSold(id));
        toast.success("Car marked as sold successfully!", {
            position: toast.POSITION.TOP_CENTER,
        });
        Navigate(-1)
    }

    const getSeller = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/user/${carData.uid}`);
            setSeller(response.data);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

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
                            <p className="text-gray-600"><strong>Engine:</strong> {carData.engine} cc</p>
                            <p className="text-gray-600"><strong>Mileage:</strong> {carData.mileage} km</p>
                            <p className="text-gray-600"><strong>Model Year:</strong> {carData.modelYear}</p>
                            <p className="text-gray-600"><strong>Color:</strong> {carData.color}</p>
                            <p className="text-gray-600"><strong>City:</strong> {carData.city}</p>
                            <p className="text-gray-600"><strong>Transmissiom:</strong> {carData.transmission}</p>
                            <p className="text-gray-600"><strong>Registration Number:</strong> {carData.regno}</p>

                        </div>
                        <span className="text-2xl font-bold text-gray-900">Price: {carData.price} PKR</span>
                        {auth.currentUser.uid === carData.uid && <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow transition duration-300"
                                onClick={handleDelete}
                            >
                                <span className="font-semibold">Delete</span>
                            </button>
                            {!carData.isSold &&
                                <button
                                    className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow transition duration-300"
                                    onClick={markAsSold}
                                >
                                    <span className="font-semibold">Mark as Sold</span>
                                </button>
                            }
                            {carData.isSold &&
                                <div className="bg-green-500 text-white py-3 px-6 rounded-lg shadow transition duration-300">
                                    <span className="font-semibold">Sold</span>
                                </div>
                            }
                        </div>}
                        {auth.currentUser.uid !== carData.uid && <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow transition duration-300"
                                onClick={getSeller}
                            >
                                <span className="font-semibold">Contact Seller</span>
                            </button>
                            {seller && <div className="flex flex-col space-y-2">
                                <p className="text-gray-600"><strong>Name:</strong> {seller.username}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {seller.email}</p>
                                <p className="text-gray-600"><strong>Phone:</strong> {seller.phone}</p>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
