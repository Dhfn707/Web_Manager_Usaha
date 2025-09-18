import { useEffect, useState } from "react"
import ProductCard from "../Components/ProductCard"
import ProductModal from "../Components/ProductModal"

function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchBarcode, setSearchBarcode] = useState("")
  
  // Ambil data dari API backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/barang")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch(err => console.error(err))
  }, [])

  // Filter produk berdasarkan search dan kategori
  useEffect(() => {
    let filtered = products

    // Filter berdasarkan nama produk
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nama.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter berdasarkan kategori
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.kategori.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter berdasarkan barcode
    if (searchBarcode) {
      filtered = filtered.filter(product =>
        product.barcode.toLowerCase().includes(searchBarcode.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, searchBarcode])

  // Dapatkan daftar kategori unik
  const categories = [...new Set(products.map(product => product.kategori))]

  // Reset semua filter
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSearchBarcode("")
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-800 via-blue-500 to-blue-100 min-h-screen text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">ManagerUsaha</h1>
        
        {/* Divider line */}
        <div className="w-full h-px bg-white bg-opacity-30 mb-6"></div>
        
        {/* Search and Filter Section */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white border-opacity-30">
          <h2 className="text-lg font-semibold mb-4 text-center">Pencarian & Filter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            {/* Search by name */}
            <div className="relative">
              <label className="block text-sm font-medium mb-3 opacity-90">Cari Nama Produk</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Masukkan nama produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 rounded-lg border-2 border-white border-opacity-50 focus:outline-none focus:border-blue-400 focus:bg-opacity-100 transition-all duration-300 shadow-lg"
                />
              </div>
            </div>

            {/* Filter by category */}
            <div className="relative">
              <label className="block text-sm font-medium mb-3 opacity-90">Filter Kategori</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 text-gray-800 rounded-lg border-2 border-white border-opacity-50 focus:outline-none focus:border-blue-400 focus:bg-opacity-100 transition-all duration-300 appearance-none cursor-pointer shadow-lg"
                >
                  <option value="" className="bg-white text-gray-800">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize bg-white text-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Search by barcode */}
            <div className="relative">
              <label className="block text-sm font-medium mb-3 opacity-90">Cari Barcode</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Masukkan barcode..."
                  value={searchBarcode}
                  onChange={(e) => setSearchBarcode(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 rounded-lg border-2 border-white border-opacity-50 focus:outline-none focus:border-blue-400 focus:bg-opacity-100 transition-all duration-300 shadow-lg"
                />
              </div>
            </div>

            {/* Reset button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Search results info */}
          <div className="text-center text-sm opacity-80">
            {filteredProducts.length === products.length 
              ? `Menampilkan semua ${products.length} produk`
              : `Ditemukan ${filteredProducts.length} dari ${products.length} produk`
            }
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-30">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Produk Tidak Ditemukan</h3>
                <p className="opacity-80 mb-4">
                  Tidak ada produk yang cocok dengan pencarian Anda.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-blue-500 bg-opacity-80 hover:bg-opacity-100 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Reset Pencarian
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal muncul kalau ada produk yang diklik */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdateStock={(id, newStock) => {
            setProducts(prev =>
              prev.map(p =>
                p.id === id ? { ...p, stok: newStock } : p
              )
            )
          }}
        />
      )}
    </div>
  )
}

export default Home