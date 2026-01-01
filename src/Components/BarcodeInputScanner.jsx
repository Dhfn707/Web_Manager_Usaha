import { useState, useEffect, useRef } from 'react';

function BarcodeInputScanner({ products, onScanSuccess, onClose }) {
  const [scannedCode, setScannedCode] = useState('');
  const [status, setStatus] = useState('Siap untuk scan...');
  const inputRef = useRef(null);

  // Auto focus input saat komponen dimuat
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle perubahan input
  const handleInputChange = (e) => {
    setScannedCode(e.target.value);
  };

  // Handle ketika Enter ditekan
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && scannedCode.trim()) {
      searchProduct();
    }
  };

  // Fungsi pencarian produk
  const searchProduct = () => {
    const code = scannedCode.trim();
    
    if (!code) {
      setStatus('Masukkan barcode terlebih dahulu');
      return;
    }

    setStatus('Mencari produk...');
    console.log('Searching for barcode:', code);

    // Cari produk yang cocok
    const foundProduct = products.find(product => {
      return product.barcode && product.barcode.toString() === code;
    });

    if (foundProduct) {
      setStatus(`✅ Produk ditemukan: ${foundProduct.nama}`);
      console.log('Product found:', foundProduct);
      
      // Tunggu sebentar lalu buka modal produk
      setTimeout(() => {
        onScanSuccess(foundProduct);
      }, 1000);
      
    } else {
      setStatus(`❌ Produk dengan barcode "${code}" tidak ditemukan`);
      console.log('Product not found. Available barcodes:', products.map(p => p.barcode));
      
      // Reset setelah 3 detik
      setTimeout(() => {
        setScannedCode('');
        setStatus('Siap untuk scan...');
        inputRef.current?.focus();
      }, 3000);
    }
  };

  // Reset input
  const resetInput = () => {
    setScannedCode('');
    setStatus('Siap untuk scan...');
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0  bg-opacity-80 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">🔍 Scanner Barcode</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Status Display */}
        <div className="mb-4">
          <div className={`p-4 rounded-lg text-center font-medium ${
            status.includes('✅') 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : status.includes('❌') 
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
          }`}>
            {status}
          </div>
        </div>

        {/* Input Barcode */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Barcode:
          </label>
          <input
            ref={inputRef}
            type="text"
            value={scannedCode}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 text-lg font-mono text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Scan atau ketik barcode..."
            autoComplete="off"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1 text-center">
            Tekan Enter setelah input atau gunakan tombol Cari
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={searchProduct}
            disabled={!scannedCode.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            🔍 Cari Produk
          </button>
          
          <button
            onClick={resetInput}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            🔄 Reset
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            ❌ Tutup
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">📋 Cara Penggunaan:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Hubungkan scanner barcode ke komputer</li>
            <li>• Arahkan scanner ke barcode dan tekan trigger</li>
            <li>• Hasil scan akan muncul di input box</li>
            <li>• Tekan Enter atau klik "Cari Produk"</li>
            <li>• Atau ketik barcode manual</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BarcodeInputScanner;