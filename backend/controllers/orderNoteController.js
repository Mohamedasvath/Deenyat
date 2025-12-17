import OrderNote from "../models/orderNote.js";
import PDFDocument from "pdfkit";

// ==========================
// CREATE
// ==========================
export const createNote = async (req, res) => {
  try {
    const note = await OrderNote.create(req.body);
    res.json({ success: true, note });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ==========================
// GET ALL
// ==========================
export const getNotes = async (req, res) => {
  try {
    const notes = await OrderNote.find().sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ==========================
// UPDATE
// ==========================
export const updateNote = async (req, res) => {
  try {
    const note = await OrderNote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, note });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ==========================
// DELETE
// ==========================
export const deleteNote = async (req, res) => {
  try {
    await OrderNote.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// ==========================
// MONTHLY PDF (FIXED)
// ==========================
export const generateMonthlyPDF = async (req, res) => {
  try {
    let { month, year } = req.query;

    // If no month/year provided, use current month
    const today = new Date();
    month = month ? parseInt(month) : today.getMonth() + 1;
    year = year ? parseInt(year) : today.getFullYear();

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const notes = await OrderNote.find({
      createdAt: { $gte: start, $lte: end },
    });

    // Set headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report-${month}-${year}.pdf`
    );

    const doc = new PDFDocument();
    doc.pipe(res); // Stream PDF to browser

    doc.fontSize(24).text("Monthly Order Report", { underline: true });
    doc.moveDown();

    if (!notes.length) {
      doc.fontSize(16).text("No orders found for this month.");
      doc.end();
      return;
    }

    notes.forEach((n, i) => {
      doc.fontSize(14).text(`${i + 1}. ${n.customerName}`);
      doc.text(`Address: ${n.address}`);
      doc.text(`Product: ${n.productName}`);
      doc.text(`Qty: ${n.quantity}`);
      doc.text(`Price: ₹${n.price}`);
      doc.text(`Total: ₹${n.total}`);
      doc.text("--------------------------------------");
      doc.moveDown();
    });

    doc.end();
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
