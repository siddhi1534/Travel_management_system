import React, { useState } from "react";
import "./App.css";

import banner from "./assets/banner.jpg";
import mountain from "./assets/mountain.jpg";
import beach from "./assets/beach.jpg";
import desert from "./assets/desert.jpg";
import city from "./assets/city.jpg";
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
  const [price, setPrice] = useState(null);

  const sliderImages = [
    { img: banner, quote: "Explore the unexpected with Travel Bug" },
    { img: mountain, quote: "Climb mountains not so the world can see you, but so you can see the world" },
    { img: beach, quote: "Let the waves hit your feet, and the worries wash away" },
    { img: desert, quote: "Feel the silence of the desert whisper stories of old" },
    { img: city, quote: "Find your adventure in the city that never sleeps" },
  ];

  const featuredDestinations = [
    { name: "Paris", img: paris },
    { name: "Maldives", img: maldives },
    { name: "Tokyo", img: tokyo },
    { name: "Cape Town", img: capetown },
    { name: "Rome", img: rome },
  ];

  const handleSliderNext = () => {
    setSliderIndex((sliderIndex + 1) % sliderImages.length);
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSignedIn(true);
    setView("booking");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSignedIn(true);
    setView("booking");
  };

  const handleChange = (e) => {
    const updatedDetails = { ...bookingDetails, [e.target.name]: e.target.value };
    setBookingDetails(updatedDetails);
    estimatePrice(updatedDetails);
  };

  const estimatePrice = (details) => {
    let basePrices = {
      Flights: 5000,
      Hotels: 3000,
      "Homestays and Villas": 2500,
      Trains: 1500,
      Buses: 1000,
      Cabs: 1200,
    };

    let type = details.bookingType;
    let people = parseInt(details.people) || 0;
    let addOns = details.addOns ? details.addOns.split(",") : [];

    let base = basePrices[type] || 0;
    let addOnCost = addOns.length * 500;
    let total = (base + addOnCost) * people;

    let discount = total * 0.2;
    let finalPrice = total - discount;

    setPrice(finalPrice);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src={logo} alt="Travel Bug Logo" className="logo" />
        <div>
          <h1 className="title">Travel Bug</h1>
          <p className="tagline">Your Personalized Tour Guide</p>
        </div>
      </div>

      {view === "landing" && (
        <>
          <div className="top-buttons">
            <button className="small-button" onClick={() => { setIsNewUser(false); setView("signin"); }}>Sign In</button>
            <button className="small-button" onClick={() => { setIsNewUser(true); setView("signup"); }}>Sign Up</button>
          </div>

          <div className="slider-container">
            <img src={sliderImages[sliderIndex].img} className="slider-image" alt="travel" />
            <p className="slider-quote">“{sliderImages[sliderIndex].quote}”</p>
            <button className="next-button" onClick={handleSliderNext}>→</button>
          </div>

          <button className="book-now" onClick={() => setView("signin")}>Book Now</button>

          <h3>Featured Destinations</h3>
          <div className="featured-carousel">
            {featuredDestinations.map((dest, idx) => (
              <div key={idx} className="featured-card">
                <img src={dest.img} alt={dest.name} />
                <p>{dest.name}</p>
              </div>
            ))}
          </div>

          <h3>Live Offers</h3>
          <div className="offers-banner">🔥 30% off on all bookings this week!</div>
        </>
      )}

      {view === "signin" && (
        <>
          <h3>Sign In</h3>
          <form onSubmit={handleSignIn}>
            <input name="email" type="email" placeholder="Email" required onChange={handleInputChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
            <button className="book-now">Sign In</button>
          </form>
          <p className="switch-auth">New to Travel Bug? <span onClick={() => { setIsNewUser(true); setView("signup"); }}>Create account</span></p>
        </>
      )}

      {view === "signup" && (
        <>
          <h3>Sign Up</h3>
          <form onSubmit={handleSignUp}>
            <input name="name" type="text" placeholder="Name" required onChange={handleInputChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleInputChange} />
            <input name="age" type="number" placeholder="Age" required onChange={handleInputChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
            <button className="book-now">Sign Up</button>
          </form>
          <p className="switch-auth">Already have an account? <span onClick={() => { setIsNewUser(false); setView("signin"); }}>Sign In</span></p>
        </>
      )}

      {view === "booking" && isSignedIn && (
        <>
          <div className="top-buttons">
            <button className="small-button" onClick={() => { setView("landing"); setIsSignedIn(false); }}>🏠 Home</button>
          </div>

          <h3>Book Your Travel</h3>
          {!bookingSuccess ? (
            <form onSubmit={handleBooking}>
              <input name="destination" type="text" placeholder="Enter Destination" required onChange={handleChange} />
              <select name="bookingType" className="custom-select" required onChange={handleChange}>
                <option value="">Select Booking Type</option>
                <option value="Flights">Flights</option>
                <option value="Hotels">Hotels</option>
                <option value="Homestays and Villas">Homestays and Villas</option>
                <option value="Trains">Trains</option>
                <option value="Buses">Buses</option>
                <option value="Cabs">Cabs</option>
              </select>
              <input name="date" type="date" required onChange={handleChange} />
              <input name="people" type="number" placeholder="No. of People" required onChange={handleChange} />
              <input name="addOns" type="text" placeholder="Add-ons (comma separated)" onChange={handleChange} />
              {price !== null && <p className="price-estimate">Estimated Price: ₹{price}</p>}
              <button type="submit" className="book-now">Confirm Booking</button>
            </form>
          ) : (
            <div className="booking-success">
              <h3>🎉 Booking Successful!</h3>
              <p><strong>Type:</strong> {bookingDetails.bookingType}</p>
              <p><strong>Destination:</strong> {bookingDetails.destination}</p>
              <p><strong>Date:</strong> {bookingDetails.date}</p>
              <p><strong>People:</strong> {bookingDetails.people}</p>
              <p><strong>Add-ons:</strong> {bookingDetails.addOns || "None"}</p>
              <p><strong>Total Price:</strong> ₹{price}</p>
              <button className="book-now" onClick={() => setView("landing")}>Back to Home</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
