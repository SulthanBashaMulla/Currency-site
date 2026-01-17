import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeInSection, ScaleInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";
import { Linkedin, Mail } from "lucide-react";

import employee1 from "@/assets/employee-1.jpg";
import employee2 from "@/assets/employee-2.jpg";
import employee3 from "@/assets/employee-3.jpg";
import employee4 from "@/assets/employee-4.jpg";

const employees = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Chief Operations Officer",
    image: employee1,
    bio: "Leading operations with 15+ years of experience in strategic management.",
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Head of Product Development",
    image: employee2,
    bio: "Driving innovation and product excellence across all our offerings.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Creative Director",
    image: employee3,
    bio: "Crafting the visual identity that defines our premium brand experience.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Lead Engineer",
    image: employee4,
    bio: "Building the technical foundation that powers our solutions.",
  },
];

const Employees = () => {
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
              Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Meet the talented individuals who make excellence possible every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {employees.map((employee, index) => (
              <ScaleInSection key={employee.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <div className="flex gap-3">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href="#"
                          className="w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                        >
                          <Linkedin className="w-4 h-4 text-foreground" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href="#"
                          className="w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                        >
                          <Mail className="w-4 h-4 text-foreground" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
                      {employee.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">{employee.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {employee.bio}
                    </p>
                  </div>
                </motion.div>
              </ScaleInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Join Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for excellence. 
              If you think you'd be a great fit, we'd love to hear from you.
            </p>
            <a
              href="mailto:careers@premium.com"
              className="inline-block px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
            >
              View Open Positions
            </a>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Employees;
