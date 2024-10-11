import React, { useState } from 'react';
import './Gallery.css'; 

const images = {
    all: [
        { src: 'src/assets/images/Luxurious Master Suite with a Canopy Bed.jpeg', alt: 'King Suite ' },
        { src: 'src/assets/images/Hotel style bedroom decoration.jpeg', alt: 'King Suite ' },
        { src: 'src/assets/images/Bedroom.jpeg', alt: 'Queen Suite ' },
        { src: 'src/assets/images/Uptown Queen Bed.jpeg', alt: 'Queen Suite ' },
        { src: 'src/assets/images/JW Marriott Hotel Chandigarh.jpeg', alt: 'Presidential Suite ' },
        { src: 'src/assets/images/CORDIS, SHANGHAI, HONGQIAO - Hotel Reviews, Photos, Rate Comparison - Tripadvisor.jpeg', alt: 'Presidential Suite ' },
        { src: 'src/assets/images/Butler service.jpeg', alt: 'Butler service'},
        { src: 'src/assets/images/10 Things Housekeepers Wish They Could Tell You, But Can’t!.jpeg', alt: ''},
        { src: 'src/assets/images/Boosting Employee Engagement and Retention in the Hospitality Industry.jpeg', alt: 'Reception'},
        { src: 'src/assets/images/WELLNESS&POOL MIX Ceramic Pool liner By Appiani.jpeg', alt: 'Pool Area' },
        { src: 'src/assets/images/Launch — Vida Design.jpeg', alt: 'Gym Area' },
        { src: 'src/assets/images/Love the idea of having showers in the room to….jpeg', alt: 'Spa area' },
        { src: 'src/assets/images/Spa - Sauna - Hammam - Relaxing.jpeg', alt: 'Body massage' },
    ],
    king: [
        { src: 'src/assets/images/Luxurious Master Suite with a Canopy Bed.jpeg', alt: 'King Suite ' },
        { src: 'src/assets/images/Hotel style bedroom decoration.jpeg', alt: 'King Suite ' },
        { src: 'src/assets/images/Luxury bathroom ideas – 10 modern ways to turn your space into a spa-like retreat.jpeg', alt: 'Bathroom'},
        { src: 'src/assets/images/6 ideas para colocar e integrar la televisión en el salón · 6 ideas to decorate with your TV - Vintage & Chic_ Pequeñas historias de decoración.jpeg', alt: 'Tv room'},
    ],
    amneties:[
        {src: 'src/assets/images/WELLNESS&POOL MIX Ceramic Pool liner By Appiani.jpeg', alt: 'Pool Area'},
        {src: 'src/assets/images/Launch — Vida Design.jpeg', alt: 'Gym Area'},
        {src: 'src/assets/images/Love the idea of having showers in the room to….jpeg', alt: 'Spa area'},
        {src: 'src/assets/images/Spa - Sauna - Hammam - Relaxing.jpeg', alt: 'Body massage'}

    ],
    queen: [
        { src: 'src/assets/images/Bedroom.jpeg', alt: 'Queen Suite ' },
        { src: 'src/assets/images/Uptown Queen Bed.jpeg', alt: 'Queen Suite ' },
    ],
    presidential: [
        { src: 'src/assets/images/JW Marriott Hotel Chandigarh.jpeg', alt: 'Presidential Suite ' },
        { src: 'src/assets/images/CORDIS, SHANGHAI, HONGQIAO - Hotel Reviews, Photos, Rate Comparison - Tripadvisor.jpeg', alt: 'Presidential Suite ' },
    ],
    
};

const Gallery = () => {
    const [category, setCategory] = useState('all');

    const showAll = () => setCategory('all');
    const showCategory = (cat) => setCategory(cat);

    return (
        <div className="gallery-container">
            <header>
                {/* <h1>Dreamscape Gallery</h1> */}
                <img src="src/assets/images/Screenshot__2_-removebg-preview.png" alt="Logo" className="logo" />
            </header>

            <nav className="gallery-nav">
                <button onClick={showAll}>Show All</button>
                <button onClick={() => showCategory('king')}>King Suite</button>
                <button onClick={() => showCategory('queen')}>Queen Suite</button>
                <button onClick={() => showCategory('presidential')}>Presidential Suite</button>
                <button onClick={() => showCategory('amneties')}>Amneties</button>
            </nav>

            <div className="gallery-images">
                {images[category].map((image, index) => (
                    <div key={index} className="image-wrapper">
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
