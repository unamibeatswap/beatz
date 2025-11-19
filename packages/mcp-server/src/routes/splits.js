const express = require('express');
const crypto = require('crypto');
const { ethers } = require('ethers');

const router = express.Router();

// POST /api/splits/generate
// Accepts JSON describing contributors and splits, returns a generated PDF placeholder (mock)
router.post('/splits/generate', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.contributors) return res.status(400).json({ success: false, message: 'contributors required' });

    // In a real implementation: render HTML template -> PDF (puppeteer/pdfkit), store buffer to IPFS
    const manifestHash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

    return res.json({ success: true, manifestHash, message: 'stub: PDF generated (mock), integrate real PDF generation' });
  } catch (err) {
    console.error('splits.generate error', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/splits/sign
// Accepts { manifestHash, signature, signer } and verifies an Ethereum signature
router.post('/splits/sign', async (req, res) => {
  try {
    const { manifestHash, signature, signer } = req.body || {};
    if (!manifestHash || !signature || !signer) return res.status(400).json({ success: false, message: 'manifestHash, signature, signer required' });

    const messageBytes = ethers.utils.toUtf8Bytes(manifestHash);
    const msgHash = ethers.utils.hashMessage(messageBytes);
    const recovered = ethers.utils.recoverAddress(msgHash, signature);

    if (recovered.toLowerCase() !== signer.toLowerCase()) {
      return res.status(400).json({ success: false, message: 'signature verification failed', recovered });
    }

    // Store signature record to DB / IPFS in real impl. For now return success
    return res.json({ success: true, manifestHash, signer, signature, recovered });
  } catch (err) {
    console.error('splits.sign error', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
