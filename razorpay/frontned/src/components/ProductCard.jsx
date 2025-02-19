/* eslint-disable no-unused-vars */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ProductCard() {
    const [amount, setamount] = useState(350);
    const backend_url=import.meta.env.VITE_BACKEND_HOST_URL

    // handlePayment Function
    const handlePayment = async () => {
        try {
            const res = await axios.post(`${backend_url}/api/payment/order`, {
                amount
            }, {
                headers: {
                    "content-type": "application/json"
                }
            });

            const data = res.data;
            // console.log(data.data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "rajj",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                // console.log("response is", response)
                try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }, {
                        headers: {
                            'content-type': 'application/json'
                        }
                    });

                    const verifyData = res.data;

                    if (verifyData.message) {
                        toast.success(verifyData.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <Card className="mt-6 w-96 bg-[#222f3e] text-white">
            {/* CardHeader */}
            <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                {/* Image  */}
                <img
                    src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
                    alt="card-image"
                />
            </CardHeader>

            {/* CardBody */}
            <CardBody>
                {/* Typography For Title */}
                <Typography variant="h5" className="mb-2">
                    My First Product
                </Typography>

                {/* Typography For Price  */}
                <Typography>
                    ₹350 <span className=" line-through">₹699</span>
                </Typography>
            </CardBody>

            {/* CardFooter  */}
            <CardFooter className="pt-0">
                {/* Buy Now Button  */}
                <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">Buy Now</Button>
                <Toaster/>
            </CardFooter>
        </Card>
    );
}