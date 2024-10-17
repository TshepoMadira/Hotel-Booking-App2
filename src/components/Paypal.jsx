import React, { useRef, useEffect } from 'react';

const Paypal = ({ amount, onSuccess }) => {
    const paypalRef = useRef();

    useEffect(() => {
        const addPayPalScript = () => {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=AT9h3ZvyeWdP5yEjwbJ8nNG3E7lL2KhfMu174zbk0EYXjY7YCpmo3jb9K6gwIPQzYA_dY--bsVa9_JfX`; 
            script.async = true;
            script.onload = () => {
               
                if (window.paypal) {
                    window.paypal
                        .Buttons({
                            createOrder: (data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: amount, 
                                            },
                                        },
                                    ],
                                });
                            },
                            onApprove: (data, actions) => {
                                return actions.order.capture().then((details) => {
                                    onSuccess(details); 
                                });
                            },
                            onError: (err) => {
                                console.error("Error during PayPal transaction:", err);
                            },
                        })
                        .render(paypalRef.current);
                } else {
                    console.error('PayPal script did not load.');
                }
            };
            script.onerror = () => {
                console.error('Error loading PayPal script.');
            };
            document.body.appendChild(script);
        };

        if (!window.paypal) {
            addPayPalScript();
        } else {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount, 
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then((details) => {
                            onSuccess(details); 
                        });
                    },
                    onError: (err) => {
                        console.error("Error during PayPal transaction:", err);
                    },
                })
                .render(paypalRef.current);
        }
    }, [amount, onSuccess]);

    return <div ref={paypalRef}></div>;
};

export default Paypal;