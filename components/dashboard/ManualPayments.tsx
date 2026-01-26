"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useState } from "react";
import ButtonReuseable from "../reusable/CustomButton";

const ManualPayments: React.FC = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [offSystemType, setOffSystemType] = useState("");
  const [offSystemDescription, setOffSystemDescription] = useState("");
  const [offSystemAmount, setOffSystemAmount] = useState("");

  const handleInvoice = () => {
    // TODO: wire up invoice action
    alert("Invoice through Stripe: " + amount);
  };

  const handleRecordPayment = () => {
    // TODO: wire up record payment action
    alert("Record payment: " + offSystemAmount + " (" + offSystemType + ")");
  };

  return (
    <div className="">
      {/* Two-column cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left card */}
        <div className="bg-whiteColor rounded-lg border border-gray2Color p-3 md:p-6  ">
          <h3 className="font-medium text-lg md:text-xl text-headerColor mb-1">
            You can manually charge through Stripe here:
          </h3>
          <p className="text-sm md:text-base text-descriptionColor mb-4">
            Client has not entered Stripe information.
          </p>

          <Link
            className="text-sm md:text-base text-blueColor underline break-words"
            href="#"
          >
            https://nanniescoasttocoast.enginehire.io/reset-password-request/20
          </Link>

          <p className="mt-1.5 text-sm  text-secondaryColor max-w-[521px]">
            This is a public payment link. Client can access this link to input
            their payment information without logging in
          </p>

          <div className="mt-10  ">
            <h4 className="font-medium text-headerColor text-lg md:text-xl">
              Stripe Payment Records
            </h4>
            <p className="text-sm md:text-base text-descriptionColor mt-1">
              Enter Stripe API Keys in integration tab to view payment records
            </p>
          </div>
        </div>

        {/* Right card - forms */}
        <div className="bg-whiteColor rounded-lg border p-3 md:p-6  border-gray2Color ">
          <h3 className="font-semibold text-lg md:text-xl text-headerColor mb-4">
            You can manually send Stripe invoices here:
          </h3>
          <p className="text-sm text-headerColor font-medium mb-1.5 max-w-[521px]">
            Client has not entered stripe information. Invoices can be sent but
            invoices can not be automatically collected
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-2 md:p-3 border rounded-lg resize-none h-20 focus:!border-blackColor focus-visible:!border-blackColor focus:outline-none focus:ring-1 focus:ring-blackColor"
            placeholder="  Description of charge (this description will be included on the
            user's receipt)"
          />

          <div className="flex flex-col md:flex-row w-full gap-3 items-center mt-5.5">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$00"
              className="flex-1 bg-bgColor w-full border rounded-md px-3 py-2.5 focus:!border-blackColor focus-visible:!border-blackColor focus:outline-none focus:ring-1 focus:ring-blackColor"
            />
            <ButtonReuseable
              onClick={handleInvoice}
              title="Invoice Through Stripe"
              className="bg-black text-white w-full md:w-auto px-4 py-2 rounded"
            />
          </div>

          <div className="mt-10">
            <h4 className="font-medium text-lg md:text-xl text-headerColor mb-2">
              Record an off system Payment:
            </h4>
            <p className="text-sm  text-headerColor max-w-[520px] mb-3">
              This is for recording a payment on the system that is not tied to
              an on system payment processor (Cash, Check, etc...)
            </p>
          </div>

          <Select
            value={offSystemType}
            onValueChange={(v) => setOffSystemType(v)}
          >
            <SelectTrigger className="w-full h-11! bg-bgColor rounded-md! md:h-12! mt-2">
              <SelectValue placeholder="Select Payment Type Here" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="check">Check</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-4">
            <textarea
              value={offSystemDescription}
              placeholder=" Description of charge (this description will be included on the
            user's receipt)"
              onChange={(e) => setOffSystemDescription(e.target.value)}
              className="w-full mt-2 p-2 md:p-3 border rounded-lg resize-none h-20 focus:!border-blackColor focus-visible:!border-blackColor focus:outline-none focus:ring-1 focus:ring-blackColor"
            />
          </div>

          <div className="flex flex-col md:flex-row w-full gap-3 items-center mt-4">
            <input
              value={offSystemAmount}
              onChange={(e) => setOffSystemAmount(e.target.value)}
              placeholder="$00"
              className="flex-1 bg-bgColor w-full border rounded-md px-3 py-2.5 focus:!border-blackColor focus-visible:!border-blackColor focus:outline-none focus:ring-1 focus:ring-blackColor"
            />
            <ButtonReuseable
              onClick={handleRecordPayment}
              title="Record Payment"
              className="bg-black text-white w-full md:w-auto px-4 py-2 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-8  ">
        <h4 className="font-medium text-headerColor text-lg md:text-xl">
          Stripe Payment Records
        </h4>
        <p className="text-sm md:text-base text-descriptionColor mt-1">
          Enter Stripe API Keys in integration tab to view payment records
        </p>
      </div>
    </div>
  );
};

export default ManualPayments;
