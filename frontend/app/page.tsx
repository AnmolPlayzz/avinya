"use client";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Smart Campus Solutions for Student Empowerment
          </h1>
          <p className="text-lg">
            Reimagine the student experience by building an integrated platform
            that addresses common campus challenges using technology and
            automation.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Innovative Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI-Powered Canteen & Mess Management */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                AI-Powered Canteen & Mess Management
              </h3>
              <p className="text-gray-600">
                Use AI to predict food demand, suggest nutritious meals, and
                gather real-time feedback to reduce wastage and improve
                satisfaction.
              </p>
            </div>

            {/* Digital Lost & Found System */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Digital Lost & Found System
              </h3>
              <p className="text-gray-600">
                Implement a location-based digital portal where students can
                report and track lost or found items, fostering a more connected
                and responsible campus environment.
              </p>
            </div>

            {/* Automated Scholarship Finder */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Automated Scholarship Finder
              </h3>
              <p className="text-gray-600">
                Centralize information on government and private scholarships,
                automatically matching students based on their profile and
                sending timely notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-lg mb-6">
            Join us in creating a smarter, more efficient, and student-friendly
            campus.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-md hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;