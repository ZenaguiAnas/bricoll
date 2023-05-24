import type {Metadata} from 'next';

// These styles apply to every route in the application
import "../styles/globals.css"
import React from "react";

export const metadata: Metadata = {
    title: 'Bricol',
    description: 'Your next freelancer job',
};

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}