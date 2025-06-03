import React, { useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import CartModal from './Cart'; // Import the Cart modal if you have it

export default function Home() {
  const [isCartVisible, setIsCartVisible] = useState(false);  // State to control cart visibility
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products');
  };

  const carouselData = [
    {
      src: 'https://t3.ftcdn.net/jpg/07/91/20/84/360_F_791208487_FvPUDOvneQYY13BMM4GfG1L55NkdoiQF.jpg',
      title: "Blockbuster Biryani's",
      desc: 'Spice up your day with our sizzling biryani delights!',
    },
    {
      src: 'https://images.slurrp.com/prodrich_article/87w4wsgr262.webp?impolicy=slurrp-20210601&width=800&height=500',
      title: 'Amazing Starters',
      desc: 'Crispy, crunchy, and packed with flavor – try our starters now!',
    },
    {
      src: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?fm=jpg&q=60&w=1000&h=560&fit=crop',
      title: 'Delicious Pizza\'s',
      desc: 'Cheesy slices baked to perfection – pizza cravings satisfied!',
    },
    {
      src: 'https://img.freepik.com/premium-photo/burger-fries_1156651-705.jpg?semt=ais_hybrid&w=740',
      title: 'Juicy Burgers & Crispy Fries',
      desc: 'Sink your teeth into our mouth-watering burgers and golden fries!',
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: '#ff6347',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <NavigationBar />
      </div>

      {/* Cart Modal */}
      {isCartVisible && <CartModal onClose={() => setIsCartVisible(false)} />}

      {/* Carousel Container */}
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Centered Button */}
        {!isCartVisible && ( // Only show the button if the cart is not visible
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
            }}
          >
            <Button
              onClick={handleExploreClick}
              style={{
                backgroundColor: '#66bb6a',
                borderColor: '#66bb6a',
                padding: '1rem 2.5rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                borderRadius: '30px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1b5e20';
                e.target.style.borderColor = '#1b5e20';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#66bb6a';
                e.target.style.borderColor = '#66bb6a';
              }}
            >
              Explore Now
            </Button>
          </div>
        )}

        {/* Carousel */}
        <Carousel
          style={{ height: '100%' }}
          controls={true}
          indicators={true}
          interval={400}
          fade
        >
          {carouselData.map((slide, idx) => (
            <Carousel.Item key={idx} style={{ height: '100%' }}>
              <img
                className="d-block w-100"
                src={slide.src}
                alt={slide.title}
                style={{
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                  filter: 'brightness(0.85)',
                }}
              />
              <Carousel.Caption
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  width: '90%',
                  maxWidth: '600px',
                  zIndex: 1000,
                }}
              >
                <h3 style={{ color: '#fff', fontSize: '2.5rem' }}>{slide.title}</h3>
                <p style={{ color: '#fff', fontSize: '1.2rem' }}>{slide.desc}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
