import React from "react";
import { jsPDF as PDF } from "jspdf";
import "./Invoice.css";

const Invoice = ({ orderData }) => {
  // Fallback for missing data
  if (!orderData) {
    return (
      <div className="invoice-container">
        <div className="invoice-card">
          <div className="invoice-header">
            <h1>⚠️ Order Data Not Available</h1>
          </div>
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            <p>Sorry, we couldn't load your order details. Please contact support.</p>
          </div>
        </div>
      </div>
    );
  }

  const downloadInvoice = () => {
    const pdf = new PDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    let yPosition = 20;
    const lineHeight = 8;
    const margin = 15;

    // Header
    pdf.setFontSize(24);
    pdf.text("INVOICE", margin, yPosition);
    yPosition += 15;

    // Order Number and Date
    pdf.setFontSize(11);
    pdf.text(`Order #: ${orderData.orderNumber}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Order ID: ${orderData.orderId}`, margin, yPosition);
    yPosition += 10;

    // Customer Details
    pdf.setFontSize(12);
    pdf.text("Bill To:", margin, yPosition);
    yPosition += lineHeight;
    pdf.setFontSize(11);
    pdf.text(`Name: ${orderData.customerName}`, margin + 5, yPosition);
    yPosition += lineHeight;
    pdf.text(`Email: ${orderData.customerEmail}`, margin + 5, yPosition);
    yPosition += lineHeight;
    pdf.text(`Phone: ${orderData.customerPhone}`, margin + 5, yPosition);
    yPosition += 10;

    // Items Table Header
    pdf.setFontSize(12);
    pdf.setFillColor(200, 200, 200);
    pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, lineHeight, "F");
    pdf.text("Item", margin + 5, yPosition);
    pdf.text("Qty", pageWidth - margin - 50, yPosition);
    pdf.text("Price", pageWidth - margin - 30, yPosition);
    pdf.text("Total", pageWidth - margin - 10, yPosition);
    yPosition += lineHeight;

    // Items
    pdf.setFontSize(11);
    orderData.items.forEach((item) => {
      const itemTotal = (item.price * item.quantity).toFixed(2);
      pdf.text(item.name, margin + 5, yPosition);
      pdf.text(item.quantity.toString(), pageWidth - margin - 50, yPosition);
      pdf.text(`₹${item.price.toFixed(2)}`, pageWidth - margin - 30, yPosition);
      pdf.text(`₹${itemTotal}`, pageWidth - margin - 10, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 5;

    // Summary
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += lineHeight;

    const summaryX = pageWidth - margin - 40;
    pdf.setFontSize(11);
    pdf.text("Subtotal:", summaryX, yPosition);
    pdf.text(`₹${orderData.subtotal.toFixed(2)}`, pageWidth - margin - 10, yPosition, {
      align: "right"
    });
    yPosition += lineHeight;

    if (orderData.discount > 0) {
      pdf.text("Discount:", summaryX, yPosition);
      pdf.text(`-₹${orderData.discount.toFixed(2)}`, pageWidth - margin - 10, yPosition, {
        align: "right"
      });
      yPosition += lineHeight;
    }

    pdf.text("Tax (8%):", summaryX, yPosition);
    pdf.text(`₹${orderData.tax.toFixed(2)}`, pageWidth - margin - 10, yPosition, {
      align: "right"
    });
    yPosition += lineHeight;

    pdf.text("Shipping:", summaryX, yPosition);
    pdf.text(`₹${orderData.shippingCost.toFixed(2)}`, pageWidth - margin - 10, yPosition, {
      align: "right"
    });
    yPosition += lineHeight;

    pdf.setFontSize(12);
    pdf.setFont(undefined, "bold");
    pdf.text("Total:", summaryX, yPosition);
    pdf.text(`₹${orderData.total.toFixed(2)}`, pageWidth - margin - 10, yPosition, {
      align: "right"
    });

    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    pdf.text("Payment Method: " + orderData.paymentMethod, margin, yPosition);
    yPosition += lineHeight;
    pdf.text("Payment Status: " + orderData.paymentStatus, margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(9);
    pdf.text("Thank you for your order!", margin, pageHeight - 20, { align: "center" });

    pdf.save(`Invoice-${orderData.orderNumber}.pdf`);
  };

  return (
    <div className="invoice-container">
      <div className="invoice-card">
        <div className="invoice-header">
          <h1>📄 Invoice</h1>
        </div>

        <div className="invoice-content">
          <div className="invoice-section order-header">
            <div className="header-item">
              <span className="label">Order #:</span>
              <span className="value">{orderData.orderNumber}</span>
            </div>
            <div className="header-item">
              <span className="label">Order ID:</span>
              <span className="value">{orderData.orderId}</span>
            </div>
            <div className="header-item">
              <span className="label">Date:</span>
              <span className="value">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="invoice-section customer-info">
            <h3>Billing Information</h3>
            <p><strong>Name:</strong> {orderData.customerName}</p>
            <p><strong>Email:</strong> {orderData.customerEmail}</p>
            <p><strong>Phone:</strong> {orderData.customerPhone}</p>
          </div>

          <div className="invoice-section items-section">
            <h3>Order Items</h3>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items && orderData.items.length > 0 ? (
                  orderData.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name || 'N/A'}</td>
                      <td>{item.quantity || 0}</td>
                      <td>₹{(item.price || 0).toFixed(2)}</td>
                      <td>₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>No items</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="invoice-section summary-section">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{(orderData.subtotal || 0).toFixed(2)}</span>
            </div>
            {(orderData.discount || 0) > 0 && (
              <div className="summary-row discount">
                <span>Discount ({orderData.discountCode || 'N/A'}):</span>
                <span>-₹{(orderData.discount || 0).toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Tax (8%):</span>
              <span>₹{(orderData.tax || 0).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹{(orderData.shippingCost || 0).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{(orderData.total || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="invoice-section payment-info">
            <h3>Payment Details</h3>
            <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
            <p><strong>Payment Status:</strong> <span className="status-badge">{orderData.paymentStatus?.toUpperCase()}</span></p>
            <p><strong>Order Status:</strong> <span className="status-badge pending">{orderData.status?.toUpperCase() || 'PENDING'}</span></p>
          </div>
        </div>

        <div className="invoice-actions">
          <button className="btn-download" onClick={downloadInvoice}>
            📥 Download Invoice
          </button>
          <button className="btn-print" onClick={() => window.print()}>
            🖨️ Print
          </button>
        </div>

        <div className="invoice-footer">
          <p>Thank you for your order! Your order has been received and is being prepared.</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
