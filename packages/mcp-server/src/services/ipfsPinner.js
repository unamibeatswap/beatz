const fs = require('fs');
const path = require('path');
const PinataClient = require('./pinataClient');

class IpfsPinner {
  constructor(web3Token) {
    this.token = web3Token || null;
    this.pinataJwt = process.env.PINATA_JWT || null;
    this.isEnabled = !!(this.token || this.pinataJwt);
    
    // Prefer Pinata over web3.storage due to security vulnerabilities
    if (this.pinataJwt) {
      this.client = new PinataClient(this.pinataJwt);
      this.clientType = 'pinata';
    } else if (this.token) {
      try {
        const { Web3Storage, File } = require('web3.storage');
        this.Web3Storage = Web3Storage;
        this.File = File;
        this.client = new Web3Storage({ token: this.token });
        this.clientType = 'web3storage';
        console.warn('Using web3.storage - consider migrating to Pinata for security');
      } catch (e) {
        console.warn('web3.storage not available - pinning disabled');
        this.isEnabled = false;
      }
    }
  }

  async pinJSON(obj) {
    if (!this.isEnabled) {
      return { ipfsHash: 'QmDevMock' + Math.random().toString(16).slice(2, 12) };
    }
    
    if (this.clientType === 'pinata') {
      return await this.client.pinJSON(obj);
    }
    
    // Fallback to web3.storage (deprecated due to CVEs)
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const file = new this.File([blob], 'metadata.json');
    const cid = await this.client.put([file], { wrapWithDirectory: false });
    return { ipfsHash: cid };
  }

  async pinFile(filePath, originalName) {
    if (!this.isEnabled) {
      return { ipfsHash: 'QmDevMock' + Math.random().toString(16).slice(2, 8) };
    }
    
    if (this.clientType === 'pinata') {
      return await this.client.pinFile(filePath, originalName);
    }
    
    // Fallback to web3.storage (deprecated due to CVEs)
    const buffer = fs.readFileSync(filePath);
    const file = new this.File([buffer], originalName || path.basename(filePath));
    const cid = await this.client.put([file], { wrapWithDirectory: false });
    return { ipfsHash: cid };
  }
}

module.exports = IpfsPinner;
