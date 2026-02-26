import React from "react";
import { jsPDF } from "jspdf";
import "./Invoice.css";

const Invoice = ({ orderData }) => {

  if (!orderData) {
    return (
      <div className="invoice-container">
        <div className="invoice-card">
          <h2 className="error-text">⚠️ Order Data Not Available</h2>
        </div>
      </div>
    );
  }

  // ✅ Safe Currency Formatter
  const formatCurrency = (amount) => {
    const value = Number(amount || 0);
    return `INR ${value.toFixed(2)}`;
  };

  const downloadInvoice = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    let y = 20;
    const margin = 15;
    const lineHeight = 8;

    // ================= HEADER =================
    pdf.setFontSize(20);
    pdf.setFont(undefined, "bold");
    pdf.text("Delicious Bites", margin, y);

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    pdf.text("Mumbai, India", margin, y + 6);
    pdf.text("Delicious Bites@gmail.com", margin, y + 12);

    pdf.setFontSize(22);
    pdf.setFont(undefined, "bold");
    pdf.text("INVOICE", pageWidth - margin, y, { align: "right" });

    y += 25;

    // ================= ORDER DETAILS =================
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");

    pdf.text(`Order #: ${orderData?.orderNumber || "-"}`, margin, y);
    pdf.text(
      `Date: ${new Date().toLocaleDateString()}`,
      pageWidth - margin,
      y,
      { align: "right" }
    );

    y += lineHeight;
    pdf.text(`Order ID: ${orderData?.orderId || "-"}`, margin, y);
    y += 15;

    // ================= BILLING =================
    pdf.setFont(undefined, "bold");
    pdf.text("Bill To:", margin, y);
    pdf.setFont(undefined, "normal");

    y += lineHeight;
    pdf.text(orderData?.customerName || "-", margin, y);
    y += lineHeight;
    pdf.text(orderData?.customerEmail || "-", margin, y);
    y += lineHeight;
    pdf.text(orderData?.customerPhone || "-", margin, y);

    y += 15;

    // ================= TABLE HEADER =================
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, y - 6, pageWidth - margin * 2, 10, "F");

    pdf.setFont(undefined, "bold");
    pdf.text("Item", margin + 5, y);
    pdf.text("Qty", pageWidth - 70, y);
    pdf.text("Price", pageWidth - 50, y);
    pdf.text("Total", pageWidth - 25, y);

    y += 10;
    pdf.setFont(undefined, "normal");

    // ================= ITEMS =================
    (orderData?.items || []).forEach((item) => {

      if (y > pageHeight - 30) {
        pdf.addPage();
        y = 20;
      }

      const name = item?.name || "-";
      const qty = Number(item?.quantity || 0);
      const price = Number(item?.price || 0);
      const total = qty * price;

      pdf.text(name, margin + 5, y);
      pdf.text(qty.toString(), pageWidth - 70, y);
      pdf.text(formatCurrency(price), pageWidth - 50, y);
      pdf.text(formatCurrency(total), pageWidth - 25, y);

      y += lineHeight;
    });

    y += 10;

    // ================= SUMMARY =================
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;

    const right = pageWidth - margin;

    pdf.text("Subtotal:", right - 50, y);
    pdf.text(formatCurrency(orderData?.subtotal), right, y, { align: "right" });
    y += lineHeight;

    if (Number(orderData?.discount || 0) > 0) {
      pdf.text("Discount:", right - 50, y);
      pdf.text(
        `- ${formatCurrency(orderData?.discount)}`,
        right,
        y,
        { align: "right" }
      );
      y += lineHeight;
    }

    pdf.text("Tax:", right - 50, y);
    pdf.text(formatCurrency(orderData?.tax), right, y, { align: "right" });
    y += lineHeight;

    pdf.text("Shipping:", right - 50, y);
    pdf.text(formatCurrency(orderData?.shippingCost), right, y, { align: "right" });
    y += lineHeight;

    pdf.setFont(undefined, "bold");
    pdf.setFontSize(13);
    pdf.text("Total:", right - 50, y);
    pdf.text(formatCurrency(orderData?.total), right, y, { align: "right" });

    // ================= FOOTER =================
    pdf.setFontSize(9);
    pdf.setFont(undefined, "normal");
    pdf.text(
      "Thank you for shopping with us!",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );

    pdf.save(`Invoice-${orderData?.orderNumber || "Invoice"}.pdf`);
  };

  return (
    <div className="invoice-container">
      <div className="invoice-card">

        <div className="invoice-header">
          <div>
            <h2>Delicious Bites</h2>
            <p>Mumbai, India</p>
          </div>

          <div className="invoice-title">
            <h1>INVOICE</h1>
            <p>#{orderData?.orderNumber}</p>
          </div>
        </div>

        <div className="invoice-body">

          <div className="billing">
            <h3>Billing Information</h3>
            <p><strong>Name:</strong> {orderData?.customerName}</p>
            <p><strong>Email:</strong> {orderData?.customerEmail}</p>
            <p><strong>Phone:</strong> {orderData?.customerPhone}</p>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {(orderData?.items || []).map((item, index) => {
                const qty = Number(item?.quantity || 0);
                const price = Number(item?.price || 0);
                return (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{qty}</td>
                    <td>{formatCurrency(price)}</td>
                    <td>{formatCurrency(qty * price)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="summary">
            <div>
              <span>Subtotal:</span>
              <span>{formatCurrency(orderData?.subtotal)}</span>
            </div>

            {Number(orderData?.discount || 0) > 0 && (
              <div className="discount">
                <span>Discount:</span>
                <span>- {formatCurrency(orderData?.discount)}</span>
              </div>
            )}

            <div>
              <span>Tax:</span>
              <span>{formatCurrency(orderData?.tax)}</span>
            </div>

            <div>
              <span>Shipping:</span>
              <span>{formatCurrency(orderData?.shippingCost)}</span>
            </div>

            <div className="total">
              <span>Total:</span>
              <span>{formatCurrency(orderData?.total)}</span>
            </div>
          </div>

        </div>

        <div className="invoice-actions">
          <button onClick={downloadInvoice}> Download PDF</button>
          <button onClick={() => window.print()}> Print</button>
        </div>

      </div>
    </div>
  );
};

export default Invoice;