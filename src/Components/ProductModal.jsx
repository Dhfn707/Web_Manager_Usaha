import { useState } from "react"

function ProductModal({ product, onClose, onUpdateStock }) {
  const [stock, setStock] = useState(product.stok)
  const [showConfirm, setShowConfirm] = useState(false)
  const [reduceAmount, setReduceAmount] = useState(1)

  const handleDecrease = () => {
    if (stock > 0 && reduceAmount > 0) {
      setShowConfirm(true)
    }
  }

  const confirmDecrease = () => {
    const newStock = Math.max(0, stock - reduceAmount)
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

    setShowConfirm(false)
    setReduceAmount(1)
  }

  const cancelDecrease = () => {
    setShowConfirm(false)
    setReduceAmount(1)
  }

  return (
    <div 
      className="fixed inset-0 bg-black-500 bg-opacity-50 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.nama}</h2>
              <p className="text-sm text-gray-500">{product.kategori}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl p-1"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Image */}
        <div className="px-6 pt-4">
          <img
            src={`http://127.0.0.1:8000/${product.gambar_path}`}
            alt={product.nama}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'
            }}
          />
        </div>
        
        {/* Product Info */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Harga</span>
            <span className="text-lg font-semibold text-gray-800">
              Rp {product.harga.toLocaleString('id-ID')}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Barcode</span>
            <span className="text-sm bg-gray-300 px-2 py-1 rounded font-mono">
              {product.barcode}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Stok tersisa</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-800">{stock}</span>
              {stock < 10 && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  Rendah
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 space-y-3">
          {!showConfirm ? (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Jumlah yang akan dikurangi:</label>
                <input
                  type="number"
                  min="1"
                  max={stock}
                  value={reduceAmount}
                  onChange={(e) => setReduceAmount(Math.min(parseInt(e.target.value) || 1, stock))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg   focus:border-transparent bg-white text-gray-800"
                />
              </div>
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  stock <= 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                onClick={handleDecrease}
                disabled={stock <= 0}
              >
                {stock <= 0 ? 'Stok Habis' : 'Kurangi Stok'}
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">
                  Apakah Anda yakin ingin mengurangi stok sebanyak <strong>{reduceAmount}</strong> item?
                </p>
                <p className="text-xs text-gray-500">
                  Stok akan berubah dari {stock} menjadi {Math.max(0, stock - reduceAmount)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={cancelDecrease}
                  className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDecrease}
                  className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Ya, Kurangi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductModal