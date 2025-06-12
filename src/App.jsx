import React, { useState } from "react";
import "./App.css";

import banner from "./assets/banner.webp";
import mountain from "./assets/mountain.webp";
import beach from "./assets/beach.webp";
import desert from "./assets/desert.webp";
import city from "./assets/city.webp";

import paris from "./assets/paris.jpg";
import maldives from "./assets/maldives.jpg";
import tokyo from "./assets/tokyo.jpg";
import capetown from "./assets/capetown.jpg";
import rome from "./assets/rome.jpg";

import logo from "./assets/logo.png";

function App() {
  const [view, setView] = useState("landing");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "", age: "" });
  const [bookingDetails, setBookingDetails] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  const sliderImages = [
    { img: banner, quote: "Explore the unexpected with Travel Bug" },
    { img: mountain, quote: "Climb mountains to see the world, not to be seen" },
    { img: beach, quote: "Let the waves wash your worries away" },
    { img: desert, quote: "Silence of the desert tells ancient stories" },
    { img: city, quote: "Discover your journey in the city lights" },
  ];

  const featuredDestinations = [
    { name: "Paris", img: paris },
    { name: "Maldives", img: maldives },
    { name: "Tokyo", img: tokyo },
    { name: "Cape Town", img: capetown },
    { name: "Rome", img: rome },
  ];

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSignedIn(true);
    setView("landing");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSignedIn(true);
    setView("landing");
  };

  const handleSliderNext = () => {
    setSliderIndex((sliderIndex + 1) % sliderImages.length);
  };

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleFeaturedClick = (destination) => {
    if (!isSignedIn) {
      setView("signin");
      return;
    }
    setBookingDetails({ destination });
    setView("booking");
  };

  const calculatePrice = () => {
    const basePrice = 1000;
    const perPerson = 500;
    const addOnCost = bookingDetails.addOns ? bookingDetails.addOns.split(',').length * 200 : 0;
    const people = Number(bookingDetails.people) || 1;
    const nights = Number(bookingDetails.nights) || 1;
    const discount = 0.2; // 20%
    const total = (basePrice + (perPerson * people + addOnCost) * nights) * (1 - discount);
    return total;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="app-wrapper">
      <div className="header">
        <img src={logo} alt="Travel Bug Logo" className="logo" />
        <div className="branding">
          <h1 className="title">Travel Bug</h1>
          <p className="tagline">Your Personalized Tour Guide</p>
        </div>
        <div className="top-buttons">
          {isSignedIn ? (
            <div className="user-info">
              <span>Hello, {user.name}</span>
              <div className="user-initials" style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#f97316",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10px",
                fontWeight: "bold"
              }}>{getInitials(user.name)}</div>
            </div>
          ) : (
            <>
              <button onClick={() => { setIsNewUser(false); setView("signin"); }}>Sign In</button>
              <button onClick={() => { setIsNewUser(true); setView("signup"); }}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      {view === "landing" && (
        <div className="glass-container">
          <div className="slider-container">
            <img src={sliderImages[sliderIndex].img} className="slider-image" alt="slide" />
            <p className="slider-quote">“{sliderImages[sliderIndex].quote}”</p>
            <button className="next-button" onClick={handleSliderNext}>→</button>
          </div>

          <h3>Featured Destinations</h3>
          <div className="featured-carousel">
            {featuredDestinations.map((dest, idx) => (
              <div key={idx} className="featured-card" onClick={() => handleFeaturedClick(dest.name)}>
                <img src={dest.img} alt={dest.name} />
                <p>{dest.name}</p>
              </div>
            ))}
          </div>

          <h3>Live Offers</h3>
          <div className="offers-banner">🔥 30% OFF on all bookings this week!</div>
        </div>
      )}

      {view === "signin" && (
        <div className="glass-container">
          <h3>Sign In</h3>
          <form onSubmit={handleSignIn}>
            <input name="name" type="text" placeholder="Name" required onChange={handleInputChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleInputChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
            <button className="book-now">Sign In</button>
          </form>
          <p className="switch-auth">New to Travel Bug? <span onClick={() => { setIsNewUser(true); setView("signup"); }}>Create account</span></p>
        </div>
      )}

      {view === "signup" && (
        <div className="glass-container">
          <h3>Sign Up</h3>
          <form onSubmit={handleSignUp}>
            <input name="name" type="text" placeholder="Name" required onChange={handleInputChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleInputChange} />
            <input name="age" type="number" placeholder="Age" required onChange={handleInputChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
            <button className="book-now">Sign Up</button>
          </form>
          <p className="switch-auth">Already have an account? <span onClick={() => { setIsNewUser(false); setView("signin"); }}>Sign In</span></p>
        </div>
      )}

      {view === "booking" && isSignedIn && (
        <div className="glass-container">
          <div className="top-buttons">
            <button onClick={() => { setView("landing"); }}>🏠 Home</button>
          </div>

          <h3>Book Your Travel</h3>
          {!bookingSuccess ? (
            <form onSubmit={handleBooking}>
              <input name="destination" type="text" placeholder="Destination" value={bookingDetails.destination || ""} disabled />
              <select name="bookingType" className="custom-select" required onChange={handleChange}>
                <option value="">Select Booking Type</option>
                <option>Flights</option>
                <option>Hotels</option>
                <option>Homestays and Villas</option>
                <option>Trains</option>
                <option>Buses</option>
                <option>Cabs</option>
              </select>
              <input name="date" type="date" required onChange={handleChange} />
              <input name="people" type="number" placeholder="Number of People" required onChange={handleChange} />
              <input name="nights" type="number" placeholder="Number of Night Stays" required onChange={handleChange} />
              <input name="addOns" type="text" placeholder="Add-ons (comma separated)" onChange={handleChange} />

              <div className="price-estimate">
                <strong>Estimated Price: ₹{calculatePrice()}</strong>
              </div>

              <button className="book-now">Confirm Booking</button>
            </form>
          ) : (
            <div className="booking-success">
              <h3>🎉 Booking Successful!</h3>
              <p><strong>Type:</strong> {bookingDetails.bookingType}</p>
              <p><strong>Destination:</strong> {bookingDetails.destination}</p>
              <p><strong>Date:</strong> {bookingDetails.date}</p>
              <p><strong>People:</strong> {bookingDetails.people}</p>
              <p><strong>Night Stays:</strong> {bookingDetails.nights}</p>
              <p><strong>Add-ons:</strong> {bookingDetails.addOns || "None"}</p>
              <p><strong>Total Price:</strong> ₹{calculatePrice()}</p>
              <button className="book-now" onClick={() => setView("landing")}>Back to Home</button>
            </div>
          )}
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Travel Bug. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
