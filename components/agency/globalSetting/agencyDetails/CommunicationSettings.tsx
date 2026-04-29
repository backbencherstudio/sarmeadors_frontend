"use client";

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";


// const FONTS = [
//     "Archivo", "Inter", "Roboto", "Open Sans", "Lato",
//     "Montserrat", "Poppins", "Raleway", "Nunito", "Source Sans Pro",
// ];

export default function CommunicationSettings() {
    const [logoHeight, setLogoHeight] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [taxId, setTaxId] = useState("");

    return (
        <CommonAccordion title="Communication Settings">
            {/* Logo Height */}
            <div>
                <label className="block text-base font-medium mb-1">Admin Email</label>
                <p>Primary email for your agency - this should be an email with your domain extension - @yourcompany.com, not gmail.com</p>
                <input
                    type="text"
                    value={logoHeight}
                    onChange={(e) => setLogoHeight(e.target.value)}
                    placeholder="sarah@nanniescoasttocoastcom"
                    className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
            </div>

            {/* Website Link */}
            <div>
                <label className="block text-base font-medium mb-1">Default From Email</label>
                <p>This is the fallback sending email for your agency if a specific email is not defined for a particular email.</p>
                <input
                    type="url"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    placeholder="sarah@nanniescoasttocoastcom"
                    className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
            </div>

            {/* Tax ID */}
            <div>
                <label className="block text-base font-medium mb-1">Default Reply Email</label>
                <p>This is the fallback email where email replies will go for your agency if a specific reply email is not defined for a particular outgoing email.</p>
                <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="sarah@nanniescoasttocoastcom"
                    className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
            </div>
        </CommonAccordion>
    );
}