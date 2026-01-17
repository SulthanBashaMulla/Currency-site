import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeInSection, ScaleInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const products = [
  {
    id: 1,
    name: "Executive Chronograph",
    description: "Precision timepiece with sophisticated design for the modern professional.",
    image: product1,
    category: "Accessories",
  },
  {
    id: 2,
    name: "Heritage Briefcase",
    description: "Handcrafted leather briefcase combining elegance with functionality.",
    image: product2,
    category: "Leather Goods",
  },
  {
    id: 3,
    name: "Signature Pen",
    description: "Premium writing instrument for those who appreciate craftsmanship.",
    image: product3,
    category: "Writing",
  },
  {
    id: 4,
    name: "Classic Wallet",
    description: "Slim profile wallet crafted from the finest Italian leather.",
    image: product4,
    category: "Leather Goods",
  },
  {
    id: 5,
    name: "Aviator Sunglasses",
    description: "Timeless design with premium UV protection and polarized lenses.",
    image: product5,
    category: "Eyewear",
  },
  {
    id: 6,
    name: "Signature Fragrance",
    description: "Sophisticated scent crafted with rare essences from around the world.",
    image: product6,
    category: "Fragrance",
  },
];

const Catalogue = () => {
  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-gradient">Catalogue</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our curated collection of premium products crafted for excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ScaleInSection key={product.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              </ScaleInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Interested in Our <span className="text-gradient">Products</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us to learn more about our premium collection and exclusive offers.
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
