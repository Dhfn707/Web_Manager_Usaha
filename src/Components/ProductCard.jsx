function ProductCard({ product, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="bg-gray-100 h-47 flex items-center justify-center">
        <img
          src={`http://127.0.0.1:8000/${product.gambar_path}`} 
          alt={product.nama}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">
          {product.nama}
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          {product.kategori}
        </p>
        <p className="font-semibold text-blue-600 text-sm mb-1">
          Rp {product.harga.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">
          Stok: {product.stok}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;