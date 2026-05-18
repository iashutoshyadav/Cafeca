import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Envelope, MapPin, Clock, ShareNetwork, Coffee, X } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservation, setReservation] = useState({ name: '', phone: '', date: '', time: '', guests: 1 });
  const [bookingStatus, setBookingStatus] = useState('Book a Table');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReservation = async (e) => {
    e.preventDefault();
    if (!reservation.name || !reservation.phone || !reservation.date || !reservation.time) {
      setBookingStatus('Fill All Fields');
      setTimeout(() => setBookingStatus('Book a Table'), 3000);
      return;
    }

    setBookingStatus('Booking...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('Sending reservation:', reservation);
      const response = await axios.post(`${apiUrl}/reservations`, reservation);
      console.log('Success:', response.data);
      setBookingStatus('See You Soon!');
      setReservation({ name: '', phone: '', date: '', time: '', guests: 1 });
      setShowSuccessPopup(true);
      setTimeout(() => {
        setBookingStatus('Book a Table');
        setIsModalOpen(false); // Auto-close modal after successful reservation
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Reservation Error:', error.response?.data || error.message);
      setBookingStatus('Server Error');
      setTimeout(() => setBookingStatus('Book a Table'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6 md:px-16 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center relative">
          <Link to="/" className="absolute left-0 top-0 hidden md:flex items-center gap-2 text-mocha/40 hover:text-mocha transition-all uppercase tracking-widest text-[10px] font-bold group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Sanctuary
          </Link>
          <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-6 block">Find Us & Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-heading mb-8">The Sanctuary Contact</h1>
          <div className="w-16 h-[1px] bg-mocha/20 mx-auto"></div>
        </div>

        {/* Detailed Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">

          {/* Detailed Info Column */}
          <div className="space-y-12">
            <div>
              <span className="uppercase tracking-[0.3em] text-[9px] font-bold text-caramel mb-3 block">Reach Out Directly</span>
              <h2 className="text-3xl md:text-4xl font-heading mb-8">Visitor Channels</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-6 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <h4 className="font-bold text-dark mb-1 text-sm">Call Our Sanctuary</h4>
                  <p className="text-mocha/60 text-xs font-light">+91 XXXXX XXXXX</p>
                  <p className="text-mocha/30 text-[9px] uppercase tracking-widest font-bold mt-2">Reservations & Inquiries</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-6 shadow-sm">
                    <Envelope size={24} />
                  </div>
                  <h4 className="font-bold text-dark mb-1 text-sm">Email Address</h4>
                  <p className="text-mocha/60 text-xs font-light">hello@cafeca.com</p>
                  <p className="text-mocha/30 text-[9px] uppercase tracking-widest font-bold mt-2">Corporate & Events</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-6 shadow-sm">
                    <Clock size={24} />
                  </div>
                  <h4 className="font-bold text-dark mb-1 text-sm">Operating Hours</h4>
                  <p className="text-mocha/60 text-xs font-light">Mon - Fri: 7am - 9pm</p>
                  <p className="text-mocha/60 text-xs font-light">Sat - Sun: 8am - 10pm</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-6 shadow-sm">
                    <ShareNetwork size={24} />
                  </div>
                  <h4 className="font-bold text-dark mb-1 text-sm">Follow Our Feed</h4>
                  <div className="flex gap-4 text-mocha/60 text-xs font-light mt-1">
                    <a href="#" className="hover:text-mocha hover:underline">Instagram</a>
                    <span>•</span>
                    <a href="#" className="hover:text-mocha hover:underline">Pinterest</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel & Directions Guide */}
            <div className="bg-white p-10 rounded-[3rem] border border-latte/5 shadow-soft">
              <h3 className="text-xl font-heading mb-6 flex items-center gap-3">
                <MapPin size={24} className="text-caramel" />
                <span>How to Find Us</span>
              </h3>
              <div className="space-y-4 text-mocha/70 text-sm font-light leading-relaxed">
                <p>
                  <strong>Address:</strong> Hauz Khas Village, South Delhi, New Delhi, India 110016.
                </p>
                <p>
                  <strong>By Metro:</strong> The nearest transit stop is <strong>Green Park Metro Station</strong> or <strong>Hauz Khas Metro Station</strong> (Yellow Line). From there, we are a short 5-minute auto-rickshaw ride away, nestled deep within the green lanes of the historic village.
                </p>
                <p>
                  <strong>Parking:</strong> Valet parking is available at the entrance of Hauz Khas Village. We highly recommend using ride-sharing services during busy weekend hours.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map Column */}
          <div className="space-y-6">
            <div className="rounded-[4rem] overflow-hidden shadow-soft-lg h-[550px] border border-latte/10 bg-white p-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6548175782977!2d77.1917711!3d28.5393278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce27072998a4d%3A0xc4f5e714f31c26f0!2sHauz%20Khas%20Village%2C%20New%20Delhi%2C%20Delhi%20110016!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '3.5rem' }}
                allowFullScreen=""
                loading="lazy"
                title="Cafeca Delhi Location Map"
              ></iframe>
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="bg-mocha text-cream rounded-[4rem] p-12 md:p-24 text-center shadow-soft-lg">
          <h3 className="text-3xl md:text-4xl font-heading mb-6 text-cream">Reserve your slow moment.</h3>
          <p className="text-cream/60 font-light text-sm mb-12 max-w-lg mx-auto leading-relaxed">
            Whether it's a quiet morning workspace, a slow weekend espresso flight, or a focused afternoon meeting, we save our best tables for reservations.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-premium btn-premium-primary !bg-cream !text-mocha hover:!bg-white hover:shadow-soft-lg min-w-[250px] tracking-widest uppercase text-xs py-5"
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Luxury Table Booking Pop-Up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-dark/60 backdrop-blur-md transition-all duration-500">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setIsModalOpen(false)} // Close when clicking backdrop
          />
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-soft-lg border border-latte/5 relative z-10 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide animate-scale-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-mocha/40 hover:text-mocha hover:scale-110 transition-all p-2 rounded-full hover:bg-cream"
              title="Close modal"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <Coffee size={40} className="text-mocha/20 mx-auto mb-3" />
              <h3 className="text-2xl font-heading mb-1 text-dark">Book Your Moment</h3>
              <p className="text-mocha/40 text-xs">Join us for a slow coffee experience at Hauz Khas.</p>
            </div>

            <form onSubmit={handleReservation} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-latte ml-4">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Julian Grey"
                  required
                  value={reservation.name}
                  onChange={e => setReservation({ ...reservation, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-latte ml-4">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  value={reservation.phone}
                  onChange={e => setReservation({ ...reservation, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-latte ml-4">Date</label>
                  <input
                    type="date"
                    required
                    value={reservation.date}
                    onChange={e => setReservation({ ...reservation, date: e.target.value })}
                    onClick={(e) => { try { e.target.showPicker(); } catch (err) {} }}
                    className="cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-latte ml-4">Time</label>
                  <input
                    type="time"
                    required
                    value={reservation.time}
                    onChange={e => setReservation({ ...reservation, time: e.target.value })}
                    onClick={(e) => { try { e.target.showPicker(); } catch (err) {} }}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-latte ml-4">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={reservation.guests}
                  onChange={e => setReservation({ ...reservation, guests: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-premium btn-premium-primary w-full mt-4 !rounded-3xl tracking-widest text-xs py-4.5 uppercase shadow-soft"
              >
                {bookingStatus}
              </button>
            </form>
          </div>
        </div>
      )}
      {showSuccessPopup && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 z-[20000] w-[90%] md:w-auto max-w-sm animate-fade-in">
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-soft-lg border border-latte/10 flex items-center gap-4 animate-scale-in">
            <div className="w-12 h-12 bg-mocha text-cream rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <Coffee size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-heading text-lg font-bold text-dark mb-0.5">Thanks for Booking!</h4>
              <p className="text-mocha/60 text-xs font-light">We can't wait to see you at the sanctuary soon.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
