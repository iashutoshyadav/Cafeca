import React, { useState } from 'react';
import { Phone, Envelope, MapPin, Coffee } from '@phosphor-icons/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [reservation, setReservation] = useState({ name: '', phone: '', date: '', time: '', guests: 1 });
  const [bookingStatus, setBookingStatus] = useState('Book a Table');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Reservation Error:', error.response?.data || error.message);
      setBookingStatus('Server Error');
      setTimeout(() => setBookingStatus('Book a Table'), 3000);
    }
  };

  return (
    <section id="contact" className="section-spacing bg-cream reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Details & Map */}
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-6 block">Find Us</span>
            <h2 className="text-4xl md:text-5xl mb-10 leading-tight font-heading">Visit the <br /><span className="italic font-normal">Sanctuary.</span></h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-mocha shadow-sm flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Our Location</h4>
                  <p className="text-mocha/60 text-sm">Hauz Khas Village, New Delhi, India 110016</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-mocha shadow-sm flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Phone Number</h4>
                  <p className="text-mocha/60 text-sm">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-mocha shadow-sm flex-shrink-0">
                  <Envelope size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Email Address</h4>
                  <p className="text-mocha/60 text-sm">hello@cafeca.com</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Link
                to="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-premium-outline tracking-widest uppercase text-xs w-full sm:w-auto"
              >
                Discover Full Contact Info
              </Link>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-[40px] overflow-hidden shadow-soft-lg h-80 border border-latte/10 bg-off-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6548175782977!2d77.1917711!3d28.5393278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce27072998a4d%3A0xc4f5e714f31c26f0!2sHauz%20Khas%20Village%2C%20New%20Delhi%2C%20Delhi%20110016!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Cafeca Delhi Location"
              ></iframe>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="reveal" style={{ transitionDelay: '400ms' }}>
            <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-soft border border-latte/5">
              <div className="text-center mb-10">
                <Coffee size={40} className="text-mocha/20 mx-auto mb-4" />
                <h3 className="text-2xl font-heading mb-2">Book Your Moment</h3>
                <p className="text-mocha/40 text-sm">Join us for a slow coffee experience.</p>
              </div>

              <form onSubmit={handleReservation} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-latte ml-4">Full Name</label>
                  <input type="text" placeholder="e.g. Julian Grey" required value={reservation.name} onChange={e => setReservation({ ...reservation, name: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-latte ml-4">Contact Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" required value={reservation.phone} onChange={e => setReservation({ ...reservation, phone: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-latte ml-4">Date</label>
                    <input 
                      type="date" 
                      required 
                      value={reservation.date} 
                      onChange={e => setReservation({ ...reservation, date: e.target.value })} 
                      onClick={(e) => { try { e.target.showPicker(); } catch (err) {} }}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-latte ml-4">Time</label>
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

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-latte ml-4">Number of Guests</label>
                  <input type="number" min="1" max="10" required value={reservation.guests} onChange={e => setReservation({ ...reservation, guests: e.target.value })} />
                </div>

                <button type="submit" className="btn-premium btn-premium-primary w-full mt-6 !rounded-3xl tracking-widest text-xs py-5 uppercase">
                  {bookingStatus}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
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
    </section>
  );
};

export default Contact;
