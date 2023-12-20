import React from 'react';
import rifqiImage from './img/rifqi.jpg'; 
import dimas from './img/dimas.png';
import haya from './img/haya.png';
import jidan from './img/jidan.png';
import lisa from './img/lisa.png';
import bian from './img/bian.png';

const AboutUs = () => {
  const developers = [
    {
      id: 1,
      name: 'Rifqi Habib Ur Rahman',
      position: 'Frontend Developer & Backend developer',
      photo: rifqiImage, // Replace with actual photo URL
    },
    {
      id: 2,
      name: 'Luthfansya Haikal Ismulia',
      position: 'Frontend Developer',
      photo: haya, // Replace with actual photo URL
    },
    {
        id: 3,
        name: 'Thelissa Levana Zheng',
        position: 'Frontend Developer',
        photo: lisa, // Replace with actual photo URL
    },
    {
        id: 4,
        name: 'Dimas Bagus Nandito',
        position: 'UI Design',
        photo: dimas, // Replace with actual photo URL
    },
    {
        id: 5,
        name: 'Muhammad Fabiansyah Abubakar',
        position: 'UI Design',
        photo: bian, // Replace with actual photo URL
    },
    {
        id: 6,
        name: 'Muhammad Danish Zidane',
        position: 'UI & UX',
        photo: jidan, // Replace with actual photo URL
      },
    // Add more developers similarly
  ];

  return (
    <div className="margin">
    <div className="about-us">
      <div className="aboutcard">
      <h2>Our Team</h2>
        <div className="developer-cards">
          {developers.map((developer) => (
            <div key={developer.id} className="developer-card">
              <div className="photo-container">
                <img src={developer.photo} alt={developer.name} />
              </div>
              <h3>{developer.name}</h3>
              <p>{developer.position}</p>
            </div>
          ))}
        </div>
      </div>

            
      <div className="aboutcard">
      <div className="paddingabout">
      <div className="why-we-created">
        <h2>Why We Created This Website</h2>
        <p>
        At our core, we strive to simplify and enhance everyday experiences. 
        Our collective passion for seamless user interaction and accessible information led us to craft this weather checklist website. 
        We envisioned a platform that transcends mere weather updates—a tool that not only provides forecasts but empowers users to plan and organize their activities efficiently. 
          {/* Add your explanation here */}
        </p>
      </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default AboutUs;
