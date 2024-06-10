import { useState, useEffect } from "react";

const LightBox = ({ image, onClose }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-20"
            onClick={onClose}
        >
            <div
                className="flex flex-col justify-around h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 p-4">
                    <svg
                        onClick={onClose}
                        className="cursor-pointer"
                        width="14"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                            fill="#FFFFFF"
                            fillRule="evenodd"
                            className="hover:fill-orange-500"
                        />
                    </svg>
                </div>
                <div className="relative flex items-center">
                    <div
                        className={`mx-8 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                            } transition-transform duration-300`}
                    >
                        <img
                            alt="img"
                            className="max-w-[400px] rounded-xl"
                            src={image}
                            onClick={toggleZoom}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightBox;
