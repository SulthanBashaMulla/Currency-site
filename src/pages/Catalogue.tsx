import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { products, categories, type Product } from "@/data/products";

const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [filteredProducts]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <PageTransition>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Product <span className="text-gradient">Catalogue</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete collection of {products.length} premium hardware and fittings products.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, code, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg bg-card border-border rounded-xl focus:border-primary/50 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All ({products.length})
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category} ({categoryCount[category] || 0})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <FadeInSection className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="text-primary font-semibold">{filteredProducts.length}</span> of{" "}
              <span className="font-semibold">{products.length}</span> products
              {selectedCategory && (
                <span>
                  {" "}
                  in <span className="text-primary font-semibold">{selectedCategory}</span>
                </span>
              )}
              {searchQuery && (
                <span>
                  {" "}
                  matching "<span className="text-primary font-semibold">{searchQuery}</span>"
                </span>
              )}
            </p>
          </FadeInSection>

          {/* Empty State */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20"
              >
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow transition-all duration-300"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                  <div key={category} className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-gradient-primary rounded-full" />
                      {category}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({categoryProducts.length} items)
                      </span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <AnimatePresence>
                        {categoryProducts.map((product, index) => (
                          <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex flex-col h-full">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                                {product.name}
                              </h3>
                              <div className="mt-auto">
                                <p className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded inline-block">
                                  {product.code}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Need <span className="text-gradient">Assistance</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us for bulk orders, custom requirements, or any product inquiries.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#contact";
              }}
              className="inline-block px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
            >
              Get in Touch
            </a>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Catalogue;
