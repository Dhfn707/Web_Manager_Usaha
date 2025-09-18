function ProductCard({ product, onClick }) {
  return (
    <div
      className="p-4 rounded-xl cursor-pointer text-white bg-blue-900 bg-opacity-80 hover:bg-opacity-90 transition-all duration-300 backdrop-blur-md border border-white border-opacity-30"
      onClick={onClick}
    >
      <img
        src={`http://127.0.0.1:8000/${product.gambar_path}`} 
        alt={product.nama}
        className="h-32 w-full object-cover rounded"
      />
      <h2 className="font-semibold mt-2">{product.nama}</h2>
      <p>Kategori: {product.kategori}</p>
      <p>Rp.{product.harga.toLocaleString()}</p>
      <p>Stok: {product.stok}</p>
    </div>
  )
}

export default ProductCard
