import { useState } from "react"

function ProductModal({ product, onClose, onUpdateStock }) {
  const [stock, setStock] = useState(product.stok)

  const handleDecrease = () => {
    if (stock > 0) {
      const newStock = stock - 1
      setStock(newStock)
      onUpdateStock(product.id, newStock)

      fetch(`http://127.0.0.1:8000/api/barang/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ stok: newStock })
      })
      .then(response => {
        if (!response.ok) {
          console.error('Update stok gagal:', response.status)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
    }
  }

  return (
    // Overlay dengan blur background yang transparan
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      onClick={onClose} // Tutup modal ketika klik area luar
    >
      {/* Modal container dengan glassmorphism effect */}
      <div 
        className="bg-white bg-opacity-95 backdrop-blur-md text-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-white border-opacity-50 transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent modal close ketika klik di dalam modal
      >
        {/* Header dengan close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.nama}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Image container dengan styling yang lebih baik */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <img
          src={`http://127.0.0.1:8000/${product.gambar_path}`}  // ✅ Benar!
          alt={product.nama}
          className="h-40 w-full object-cover"
          onError={(e) => {
    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'
            }}
          />
          {/* Badge untuk stok rendah */}
          {stock < 10 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Stok Rendah
            </div>
          )}
        </div>
        
        {/* Product details dengan styling yang lebih rapi */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Kategori:</span>
            <span className="font-semibold text-blue-600 capitalize">{product.kategori}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Harga:</span>
            <span className="font-bold text-green-600 text-lg">Rp {product.harga.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Barcode:</span>
            <span className="font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded text-sm">{product.barcode}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Stok:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                stock > 20 ? 'bg-green-500' : 
                stock > 10 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="font-bold text-xl">{stock}</span>
            </div>
          </div>
        </div>

        {/* Action buttons dengan styling yang lebih menarik */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={handleDecrease}
            disabled={stock <= 0}
          >
            {stock <= 0 ? 'Stok Habis' : 'Kurangi Stok'}
          </button>
          
          <button
            className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal