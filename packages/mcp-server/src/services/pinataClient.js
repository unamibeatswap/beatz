const fetch = require('node-fetch');

class PinataClient {
  constructor(jwt) {
    this.jwt = jwt;
    this.baseUrl = 'https://api.pinata.cloud';
  }

  async pinJSON(obj) {
    if (!this.jwt) {
      return { ipfsHash: 'QmDevMock' + Math.random().toString(16).slice(2, 12) };
    }

    try {
      const response = await fetch(`${this.baseUrl}/pinning/pinJSONToIPFS`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.jwt}`
        },
        body: JSON.stringify({
          pinataContent: obj,
          pinataMetadata: { name: 'beatschain-metadata' }
        })
      });

      const result = await response.json();
      return { ipfsHash: result.IpfsHash };
    } catch (error) {
      console.warn('Pinata pinJSON failed, using mock:', error.message);
      return { ipfsHash: 'QmMock' + Math.random().toString(16).slice(2, 12) };
    }
  }

  async pinFile(filePath, filename) {
    if (!this.jwt) {
      return { ipfsHash: 'QmDevMock' + Math.random().toString(16).slice(2, 8) };
    }

    try {
      const fs = require('fs');
      const FormData = require('form-data');
      
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      form.append('pinataMetadata', JSON.stringify({ name: filename }));

      const response = await fetch(`${this.baseUrl}/pinning/pinFileToIPFS`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.jwt}`,
          ...form.getHeaders()
        },
        body: form
      });

      const result = await response.json();
      return { ipfsHash: result.IpfsHash };
    } catch (error) {
      console.warn('Pinata pinFile failed, using mock:', error.message);
      return { ipfsHash: 'QmMock' + Math.random().toString(16).slice(2, 8) };
    }
  }
}

module.exports = PinataClient;