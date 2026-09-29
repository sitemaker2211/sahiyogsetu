const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Choose a Service', description: 'Select from our wide range of verified local services' },
    { number: '02', title: 'Enter Your Requirement', description: 'Tell us what you need and when you need it' },
    { number: '03', title: 'Find a Verified Worker', description: 'We match you with trusted, verified workers' },
    { number: '04', title: 'Book the Service', description: 'Confirm your booking with transparent pricing' },
    { number: '05', title: 'Pay & Give Feedback', description: 'Complete payment and rate your experience' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="bg-white rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-shadow border border-gray-200 hover:border-accent-blue/30">
            <div className="text-accent-blue text-3xl font-bold mb-3">{step.number}</div>
            <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-accent-blue text-2xl">
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
