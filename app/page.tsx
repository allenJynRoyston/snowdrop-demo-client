import React, { useState, useEffect } from 'react';

export default function HomePage() {
  return (
    <div className='w-full border'>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-20 rounded-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to A GENERIC BANK</h1>
          <p className="text-lg md:text-xl mb-8">We provide top-notch services with only a minor chance of getting hacked or ripping you off entirely - not bad if we're being honest.</p>
          <a href="#contact" className="bg-yellow-400 text-gray-900 p-4 font-bold  rounded hover:bg-yellow-300 transition duration-300">Get Started</a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-8">
            We are a team of dedicated professionals committed to syphoning as much money off you as legally possible, but without raising any red flags. 
            Our mission is to do this for as long as humanly possible while enriching ourselves to the fullest extent that is legally permissiable.
            <br></br>
            🍀 Lucky you! 🍀
            <br></br>
            But hey look a puppy!
          </p>
          <img src="https://placedog.net/500" alt="About Us" className="mx-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-700 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-300">Our Fabulous Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Service 1: The Game Changer</h3>
              <p className="text-gray-700">We’re not just talking big; we’re delivering big. Experience service that’s anything but ordinary.  But also, super big.  Did we say big enough?</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Service 2: The VIP Treatment</h3>
              <p className="text-gray-700">Step into the VIP lane with us. We roll out the red carpet and sprinkle a bit of magic. Money is basically magic in the 20th century.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Service 3: We're All Hot</h3>
              <p className="text-gray-700">Have you been in a bank lately?  Why do they only hire hot people?  But no seriously we're all ridicoulsly all good looking for some reason.  Questionable hiring practices run rampant here.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-8">Feel free to reach out to us but dont expect us to, like, help you or anything.  #sorrynotsorry</p>
          <form action="#" method="POST" className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-left text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-left text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-left text-gray-700">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">(Pleasa don't) send me a message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center px-4">
          <p>&copy; 2024 Totally Generic Bank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
