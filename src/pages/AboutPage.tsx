import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white text-gray-800 py-12 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          About Us
        </h2>

        {/* Intro Paragraph */}
        <p className="text-lg text-gray-600 mb-8">
          At <span className="font-semibold">LUMORA</span>, we believe jewelry is
          more than just an accessory – it’s a reflection of your story, emotions,
          and timeless memories.
        </p>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">💎 Our Craftsmanship</h3>
            <p className="text-gray-600">
              We work with skilled artisans who blend traditional techniques with
              modern designs, ensuring each piece is unique and radiant.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">✨ Our Promise</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>100% authentic & ethically sourced materials</li>
              <li>Premium quality with lasting shine</li>
              <li>Designs that celebrate love & individuality</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🌍 Our Vision</h3>
            <p className="text-gray-600">
              To make luxury meaningful & accessible, offering jewelry that doesn’t
              just sparkle but connects to your heart.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <p className="mt-10 text-lg text-gray-700 italic">
          We don’t just sell jewelry – we help you treasure moments, celebrate
          milestones, and carry memories that last forever. ❤️
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
