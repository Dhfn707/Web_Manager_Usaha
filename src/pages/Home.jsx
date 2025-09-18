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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ManagerUsaha</h1>
          <p className="text-gray-600">Kelola inventori dengan mudah</p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search by name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Produk
              </label>
              <input
                type="text"
                placeholder="Nama produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter by category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua kategori</option>
                {categories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Search by barcode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barcode
              </label>
              <input
                type="text"
                placeholder="Scan atau ketik barcode..."
                value={searchBarcode}
                onChange={(e) => setSearchBarcode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Reset button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Search results info */}
          <div className="text-sm text-gray-500 text-center">
            {filteredProducts.length === products.length 
              ? `${products.length} produk`
              : `${filteredProducts.length} dari ${products.length} produk`
            }
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Produk tidak ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau reset filter
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
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