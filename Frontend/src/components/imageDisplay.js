import React, { useState } from "react";
import LightBox from "./lightBox";

const ImageDisplay = ({ images }) => {
    const [image, setImage] = useState(0);
    const [lightBoxVisible, setLightBoxVisible] = useState(false);

    return (
        <div className="sneakers-div flex flex-col justify-around h-[600px] mx-auto">
            <div className="sneakers-col1 relative">
                <svg
                    onClick={() => {
                        setImage((image - 1 + images.length) % images.length);
                    }}
                    className="mobile-prev hidden absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer"
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 1 3 9l8 8"
                        stroke="#1D2026"
                        strokeWidth="3"
                        fill="none"
                        fillRule="evenodd"
                    />
                </svg>
                <img
                    className="big-sneaker block w-full max-w-[440px] mx-auto rounded-2xl cursor-pointer"
                    alt="img"
                    onClick={() => setLightBoxVisible(true)}
                    src={images[image]}
                />
                <svg
                    onClick={() => {
                        setImage((image + 1) % images.length);
                    }}
                    className="mobile-next hidden absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
                    width="13"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m2 1 8 8-8 8"
                        stroke="#1D2026"
                        strokeWidth="3"
                        fill="none"
                        fillRule="evenodd"
                    />
                </svg>
            </div>
            <div className="sneakers-col2 flex justify-between w-full max-w-[440px] mx-auto">
                {images.map((icon, index) => (
                    <div
                        key={index}
                        className={`small-sneaker-div ${image === index ? "active-sneaker border-2 border-orange-500 h-[84px]" : "h-[80px]"
                            } bg-white rounded-lg`}
                    >
                        <img
                            alt="img"
                            className="small-sneaker cursor-pointer w-full max-w-[80px] rounded-md hover:opacity-80"
                            onClick={() => setImage(index)}
                            src={icon}
                        />
                    </div>
                ))}
            </div>
            {lightBoxVisible && (
                <div className="shadow fixed top-0 left-0 w-full h-full bg-black opacity-75 z-10"></div>
            )}
            {lightBoxVisible && (
                <LightBox
                    image={images[image]}
                    onClose={() => setLightBoxVisible(false)}
                />
            )}
        </div>
    );
};

export default ImageDisplay;
