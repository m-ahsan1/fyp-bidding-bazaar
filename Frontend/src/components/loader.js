import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

function Loader() {
    const controls = useAnimation();
    const isLoading = useSelector((state) => state.loading.isLoading);

    useEffect(() => {
        if (isLoading) {
            controls.start({
                opacity: 0.5,
                transition: { duration: 1 },
            });
        } else {
            controls.start({
                opacity: 0,
                transition: { duration: 1 },
            });
        }
    }, [isLoading, controls]);

    return (
        <motion.div
            className="fixed bg-black h-screen top-0 left-0 w-full h-full flex justify-center items-center z-10"
            animate={controls}
        >
            <div className="p-4 rounded-md">
                <div className="flex justify-center">
                    <>
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0],
                                transition: { duration: 1, repeat: Infinity },
                            }}
                        />
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0],
                                transition: { duration: 1, repeat: Infinity, delay: 0.2 },
                            }}
                        />
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0],
                                transition: { duration: 1, repeat: Infinity, delay: 0.4 },
                            }}
                        />
                    </>
                </div>
            </div>
        </motion.div>
    );
}

export default Loader;
