import React from 'react';

const AboutUs = () => {
  const developers = [
    {
      id: 1,
      name: 'Rifqi Habib Ur Rahman',
      position: 'Frontend Developer & Backend developer',
      photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
    },
    {
      id: 2,
      name: 'Luthfansya Haikal Ismulia',
      position: 'Frontend Developer',
      photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
    },
    {
        id: 3,
        name: 'Thelissa Levana Zheng',
        position: 'Frontend Developer',
        photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
    },
    {
        id: 4,
        name: 'Dimas Bagus Nandito',
        position: 'UI Design',
        photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
    },
    {
        id: 5,
        name: 'Muhammad Fabiansyah Abubakar',
        position: 'UI Design',
        photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
    },
    {
        id: 6,
        name: 'Muhammad Danish Zidane',
        position: 'UI & UX',
        photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
      },
    // Add more developers similarly
  ];

  return (
    
    <div className="about-us">
      <h2>Our Team</h2>
      <div className="developer-cards">
        {developers.map((developer) => (
          <div key={developer.id} className="developer-card">
            <img src={developer.photo} alt={developer.name} />
            <h3>{developer.name}</h3>
            <p>{developer.position}</p>
          </div>
        ))}
      </div>

      <div className="card">
      <div className="why-we-created">
        <h2>Why We Created This Website</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          consectetur elit at nisi volutpat eleifend.
          {/* Add your explanation here */}
        </p>
      </div>
      </div>
    </div>
    
  );
};

export default AboutUs;
