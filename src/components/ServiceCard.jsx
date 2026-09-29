const ServiceCard = ({ icon, name, description, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center border border-gray-200 hover:border-accent-blue/50">
      <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">{name}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <button
        onClick={() => onBook(name)}
        className="bg-primary hover:bg-government-dark text-white px-6 py-2 rounded-full font-medium transition-colors w-full border-2 border-primary hover:border-government-dark"
      >
        Book Now
      </button>
    </div>
  );
};

export default ServiceCard;
