const BenefitCard = ({ title, benefits, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 hover:border-accent-saffron/50">
      <div className="w-16 h-16 bg-accent-saffron/10 rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <span className="text-accent-green mr-2 mt-1">✓</span>
            <span className="text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitCard;
