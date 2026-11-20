import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import About from "./About";
import Footer from "./Footer";
export default function LandingPage() {
    const slides = [
        {
            title: "Know where your money went",
            description: "Manage vehicles, drivers and daily remittances in one place.",
            button: "Try the profit calculator",
            link: "/profit-calculator",
            image: "/profit.jpg"
        },
        {
            title: "Know where your matatu is ",
            description: "Monitor daily collections and outstanding remittances.",
            button: "Manage remittance",
            link: "/remittances",
            image: "/remittance.jpg"
        },
        {
            title: "Never miss an expiry date",
            description: "Monitor vehicle servicing and maintenance schedules.",
            button: "Manage maintenance",
            link: "/maintenance",
            image: "/maintenance.jpg"
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((current) => (current + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="landing-page">
            <section className="hero" id="home" style={{backgroundImage: `url(${slides[currentSlide].image})`}}>
            <div className="hero-overlay">
                <div className="hero-content">
                    <p className="hero-label">
                        SMART SACCO MANAGEMENT
                    </p>

                    <h1>{slides[currentSlide].title}</h1>
                    <p className="hero-description">
                        {slides[currentSlide].description}
                    </p>
                    <Link to={slides[currentSlide].link} className="hero-button">
                    {slides[currentSlide].button}
                    </Link>
                    

                    <div className="slide-indicators">
                        {slides.map((slide, index) => (
                            <button
                                key={index}
                                className={currentSlide === index ? "active-dot" : ""}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            </section>
        
            <About />
            <section className="features-section" id="features">
                <h2>Everything your Sacco needs</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Vehicle Management</h3>
                        <p>Register and monitor your fleet</p>
                    </div>
                    <div className="feature-card">
                        <h3>Driver Managemnt</h3>
                        <p>Manage drivers and vehicle assignements</p>
                    </div>
                    <div className="feature-card">
                        <h3>Remittance Tracking</h3>
                        <p>Monitor daily collections and shortages</p>
                    </div>
                    <div className="feature-card">
                        <h3>Expense Management</h3>
                        <p>Keep track of your expenses</p>
                    </div>
                    <div className="feature-card">
                        <h3>Maintenance Management</h3>
                        <p>Monitor servicing and vehicle repairs</p>
                    </div>
                    <div className="feature-card">
                        <h3>Profit Calculator</h3>
                        <p>Estimate your Sacco's financial performance</p>
                    </div>
                </div>
            </section>
            <section className="contact-section" id="contact">
                <h2>Manage your Sacco smarter</h2>
                <p>Bring your fleet and finances under control with Sacco Track.</p>
                <a href="#home" className="hero-button">Back to top</a>
            </section>
           <Footer />
        </div>
    );
}
               
            