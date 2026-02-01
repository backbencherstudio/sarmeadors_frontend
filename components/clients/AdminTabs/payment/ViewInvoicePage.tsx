import invoiceImage from "@/public/payment/invoice-Logo.png";
import Image from "next/image";
export default function ViewInvoicePage() {
  return (
    <div className="py-10 px-4">
      <div className="max-w-[929px] mx-auto bg-white rounded-xs shadow-lg p-10">
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

        <section className="overflow-hidden border border-grayColor1 rounded-t-lg">
          <table className="min-w-full text-sm">
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
                <td className="px-6 py-4">
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
            <input
              placeholder="1234  254  2541  5254"
              className="px-4 py-3 border rounded w-full"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                placeholder="MM / YY"
                className="px-4 py-3 border rounded col-span-2"
              />
              <input placeholder="CVC" className="px-4 py-3 border rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Stripe</div>
              <button className="bg-black text-white px-6 py-2 rounded">
                Pay
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
