import { motion } from "framer-motion";
import { Leaf, Sparkles, HeartHandshake, Soup } from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "100% Vegetarian",
    text: "A wide variety of freshly prepared vegetarian dishes - pure, clean & authentic.",
  },
  {
    icon: Sparkles,
    title: "Traditional, Modern Touch",
    text: "Classic chaat recipes reimagined in a clean, welcoming environment.",
  },
  {
    icon: Soup,
    title: "Freshly Made",
    text: "Everything is prepared to order so every bite bursts with flavour.",
  },
  {
    icon: HeartHandshake,
    title: "Made With Love",
    text: "From our heart to your plate - street food served with genuine pride.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24">
      <div className="container grid items-start gap-14 lg:grid-cols-2">
        {/* Left Column: Heading, Description and Boxes */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <div>
            <span className="font-script text-3xl text-chili">Our story</span>
            <h2 className="mt-2 font-display text-4xl font-black leading-tight text-masala lg:text-5xl">
              A little corner of India's
              <span className="text-saffron"> bazaars</span> in Abu Dhabi
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-masala/70">
              Chaat Chaska is a popular destination for authentic Indian street
              food, offering a vibrant and flavourful dining experience in the
              heart of Abu Dhabi. Tucked into the Madinat Zayed area, we've built
              a formidable reputation for delivering traditional chaat with a
              modern touch - in a clean and welcoming environment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron/15 text-chili">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-masala">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-masala/65">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Quote Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-full"
        >
          <div className="h-full overflow-hidden rounded-3xl border border-border bg-[#FDF8F3] shadow-soft">
            <img 
              src="/images/quote.jpg" 
              alt="Quote by Ratan Tata" 
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
