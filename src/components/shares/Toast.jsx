import React, { useEffect } from "react";
import './Toast.css';

export default function Toast({mensaje, onClose}) {
    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [mensaje, onClose]);

    if (!mensaje) return null;
    return (
        <div className="toast-magico">
            {mensaje}
        </div>
    );
}