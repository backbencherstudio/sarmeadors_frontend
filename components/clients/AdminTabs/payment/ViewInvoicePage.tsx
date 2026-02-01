"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Input } from "@/components/ui/input";
import monyIcon from "@/public/icon/Money.png";
import masterIcon from "@/public/icon/mastercard.png";
import visaIcon from "@/public/icon/visa.png";
import invoiceImage from "@/public/payment/invoice-Logo.png";
import Image from "next/image";
import React from "react";

export default function ViewInvoicePage() {
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");

  // formatting helpers (react-credit-cards style)
  function formatCreditCardNumber(value: string) {
    // keep digits only and limit to 16 digits
    const v = value.replace(/\D/g, "").slice(0, 16);
    // group by 4
    return v.replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpirationDate(value: string) {
    const v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2);
    if (v.length >= 1 && v.length <= 2) return v;
    return v;
  }

  function formatCVC(value: string) {
    return value.replace(/\D/g, "").slice(0, 4);
  }

  function onCardInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardNumber(formatCreditCardNumber(e.target.value));
  }

  function onExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExpiry(formatExpirationDate(e.target.value));
  }

  function onCvcChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvc(formatCVC(e.target.value));
  }
  return (
    <div className="py-10 ">
      <div className="max-w-[929px] mx-auto bg-white rounded-xs shadow-[1px_4px_15px_2px_rgba(0,0,0,0.1)] p-4 md:p-6 lg:p-10">
        <header className="text-center mb-14">
          {/* <h1 className="text-3xl tracking-widest font-extrabold uppercase">
            Coast To Coast Nannies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your journey to parenthood starts here
          </p> */}
          <Image
            src={invoiceImage}
            alt="Logo"
            width={650}
            height={70}
            className="mx-auto max-w-[650px] w-full mb-2"
          />
        </header>

        <section className=" space-y-8 mb-6">
          <div>
            <h3 className="font-semibold text-lg md:text-2xl ">Invoice:</h3>
            <div className="text-sm mt-4 space-y-2">
              <div className="text-base">
                <span className="text-secondaryColor">Status:</span>{" "}
                <span className="font-medium text-headerColor">Not Sent</span>
              </div>
              <div className="text-base">
                <span className="text-secondaryColor">Invoice No:</span>{" "}
                <span className="font-medium text-headerColor">5837</span>
              </div>
              <div className="text-base">
                <span className="text-secondaryColor">Invoice Name:</span>{" "}
                <span className="font-medium text-headerColor">Invoice #1</span>
              </div>
              <div className="text-base">
                <span className="text-secondaryColor">Date:</span>{" "}
                <span className="font-medium text-headerColor">
                  Sun Nov 30 2025
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg md:text-2xl">Bill to:</h3>
            <div className="text-base mt-4 text-secondaryColor space-y-1">
              <div className="">Sabrina Sultana</div>
              <div className="">sabrina.sultana.1928@gmail.com</div>
            </div>
          </div>
        </section>

        <section className="overflow-x-auto max-w-[800px] w-full mx-auto border border-grayColor1 rounded-t-lg">
          <table className="min-w-full w-full text-sm ">
            <thead>
              <tr className="bg-black  text-white ">
                <th className="px-6 rounded-l-lg! py-4 text-left">Items</th>
                <th className="px-6 py-5">Rate</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4 rounded-r-lg! text-left">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-grayColor1">
                <td className="px-6 py-4 break-words">
                  <div className="font-medium">
                    ShiftJob on sun Nov 23 2025 12:00 am-11:45 pm (Assigned)
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-medium">140</td>
                <td className="px-6 py-4 text-center font-medium">1</td>
                <td className="px-6 py-4 text-center font-medium">$40</td>
                <td className="px-6 py-4 text-left font-medium">$7,592.40</td>
              </tr>
            </tbody>
            <tbody>
              <tr className=" border-b border-grayColor1">
                <td className="px-6 py-3 text-secondaryColor" colSpan={4}>
                  Subtotal
                </td>
                <td className="px-6 py-3 text-right font-medium">$7,592.40</td>
              </tr>
              <tr className=" border-b border-grayColor1">
                <td className="px-6 py-3 font-medium" colSpan={4}>
                  Paid Amount
                </td>
                <td className="px-6 py-3 text-right font-medium ">$0.00</td>
              </tr>
              <tr className="bg-grayColor1">
                <td className="px-6 py-3" colSpan={4}>
                  <span className="font-medium text-base">Balance Due</span>
                </td>
                <td className="px-6 py-3 text-right font-medium text-base">
                  $7,592.40
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <p className="mb-4 border-t border-borderColor text-base font-medium pt-8">
            Please enter your payment information to pay for the invoice{" "}
            <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <Input
                placeholder="1234  254  2541  5254"
                value={cardNumber}
                onChange={onCardInputChange}
                className="px-4 h-12! md:h-13! bg-bgColor  border rounded-lg w-full"
              />
              <div className="absolute flex items-center gap-1.5 top-1/2 right-4 -translate-y-1/2">
                <Image
                  src={masterIcon}
                  alt="Money"
                  width={48}
                  height={28}
                  className="object-contain "
                />

                <Image
                  src={visaIcon}
                  alt="Visa"
                  width={36}
                  height={28}
                  className="object-contain "
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="MM / YY"
                value={expiry}
                onChange={onExpiryChange}
                className="px-4 h-12! md:h-13! bg-bgColor border rounded-lg col-span-2"
              />
              <Input
                placeholder="CVC"
                value={cvc}
                onChange={onCvcChange}
                className="px-4 h-12! md:h-13! bg-bgColor border rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-base md:text-lg font-bold ">Stripe</div>
              <Image
                src={monyIcon}
                alt="Stripe"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between">
              <ButtonReuseable title="Pay" className="px-12!" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
