import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Sparkle, GlobeHemisphereWest, Coffee, X } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AboutPage = () => {
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
          <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-6 block">Our Genesis & Philosophy</span>
          <h1 className="text-5xl md:text-7xl font-heading mb-8">The Sanctuary Story</h1>
          <div className="w-16 h-[1px] bg-mocha/20 mx-auto"></div>
        </div>

        {/* Narrative Section 1: The Genesis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-soft-lg group">
            <img
              src="/images/exterior_light.png"
              loading="lazy"
              alt="Café Architecture"
              className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-mocha/10 mix-blend-multiply"></div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-caramel">
              <Sparkle weight="fill" size={20} />
              <span className="uppercase tracking-widest text-xs font-bold text-latte">Est. 2018</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading leading-tight">Born in Contrast, <br /><span className="italic font-normal">Cultivated in Peace.</span></h2>
            <p className="text-mocha/80 font-light leading-relaxed">
              CAFÉCA was born out of a simple, rebellious desire: to counter the frantic pace of modern urban life. In 2018, surrounded by the fast-moving streets of New Delhi, our founders envisioned a sanctuary where time slows down, natural light floods the spaces, and coffee is prepared not as a commodity, but as a deliberate act of mindfulness.
            </p>
            <p className="text-mocha/80 font-light leading-relaxed">
              We chose the iconic Hauz Khas Village as our home—a vibrant historic enclave where ancient stone structures meet contemporary art. Here, we stripped away all the visual and sensory noise to craft a minimalist architectural retreat. Every arch, textured plaster wall, and ash wood table was intentionally curated to put the spotlight where it belongs: on the cup, the conversation, and your inner peace.
            </p>
          </div>
        </div>

        {/* Brand Pillars / Micro-Interactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          <div className="bg-white p-12 rounded-[3rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-500">
            <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-8 shadow-sm">
              <GlobeHemisphereWest size={28} />
            </div>
            <h3 className="text-2xl font-heading mb-4">direct sourcing</h3>
            <p className="text-mocha/70 text-sm font-light leading-relaxed">
              We cultivate direct partnerships with independent organic estate owners in Coorg, the Araku Valley, and Ethiopia. By bypassing major aggregators, we ensure that farmers receive 100% fair-trade premium margins while we secure top 1% grade Arabica beans.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-500">
            <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-8 shadow-sm">
              <Coffee size={28} />
            </div>
            <h3 className="text-2xl font-heading mb-4">micro-batch roasting</h3>
            <p className="text-mocha/70 text-sm font-light leading-relaxed">
              Our beans are roasted locally in our custom 5kg cast-iron drum roaster. Operating in small batches allows our lead roasters to track heat variables with extreme precision, drawing out the unique floral, chocolate, and citrus signatures of each estate's terroir.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-500">
            <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-mocha mb-8 shadow-sm">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-heading mb-4">sensory ritual</h3>
            <p className="text-mocha/70 text-sm font-light leading-relaxed">
              For us, coffee brewing is a performative art. From measuring water salinity to precise temperature curves and 18-hour cold extractions, we treat every single pour as a sensory ritual designed to give your day its most mindful moment.
            </p>
          </div>
        </div>

        {/* Narrative Section 2: Meticulous Sourcing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-6 lg:order-2">
            <div className="flex items-center gap-3 text-caramel">
              <Heart weight="fill" size={20} />
              <span className="uppercase tracking-widest text-xs font-bold text-latte">Quality Rituals</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading leading-tight">Pure Single-Origins, <br /><span className="italic font-normal">Slow Brew Philosophy.</span></h2>
            <p className="text-mocha/80 font-light leading-relaxed">
              We focus strictly on single-origin profiles. You won't find generic blended beans at CAFÉCA. Instead, you'll taste the crisp citrus notes of high-altitude Ethiopian Yirgacheffe, the smooth, dark chocolate finish of Coorg’s shade-grown estates, or the rich spicy complexity of Araku beans.
            </p>
            <p className="text-mocha/80 font-light leading-relaxed">
              Our specialty baristas are certified experts trained in manual extraction. We custom-grind every single cup on-demand using titanium flat-burr grinders. Whether you prefer a clean V60 pour-over, a vacuum siphon extraction, or our luxurious milk-based recipes, we guarantee your brew is adjusted to absolute extraction perfection.
            </p>
          </div>
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-soft-lg group lg:order-1">
            <img
              src="/images/coffee_light.png"
              loading="lazy"
              alt="Artisanal Brew Process"
              className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-mocha/10 mix-blend-multiply"></div>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="bg-mocha text-cream rounded-[4rem] px-8 py-16 md:p-20 text-center mb-32 shadow-soft-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-5xl font-heading mb-3 text-cream">100%</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/50">Direct & Ethical Trade</p>
            </div>
            <div>
              <h3 className="text-5xl font-heading mb-3 text-cream">5kg</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/50">Roast Batch Precision</p>
            </div>
            <div>
              <h3 className="text-5xl font-heading mb-3 text-cream">8+</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/50">Single-Origin Profiles</p>
            </div>
            <div>
              <h3 className="text-5xl font-heading mb-3 text-cream">50k+</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/50">Slow Moments Served</p>
            </div>
          </div>
        </div>

        {/* Meet Our Artisans */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-4 block">The Hands Behind the Craft</span>
            <h2 className="text-3xl md:text-4xl font-heading">Our Coffee Artisans</h2>
            <div className="w-12 h-[1px] bg-caramel mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Artisan 1 */}
            <div className="bg-white rounded-[3rem] overflow-hidden border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-500 flex flex-col">
              <div className="h-72 bg-off-white overflow-hidden relative">
                <img
                  src="/images/artisan_brew.png"
                  loading="lazy"
                  alt="Elena Rostova - Master Roaster"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8 text-center flex-1">
                <span className="uppercase tracking-widest text-[9px] font-bold text-caramel mb-2 block">Master Roaster</span>
                <h4 className="text-2xl font-heading mb-4">Elena Rostova</h4>
                <p className="text-mocha/70 text-sm font-light leading-relaxed">
                  Elena boasts over 12 years of roasting experience in Zurich and Copenhagen. She curates our customized micro-roasts, ensuring the flavor integrity of each bag is beautifully unlocked.
                </p>
              </div>
            </div>

            {/* Artisan 2 */}
            <div className="bg-white rounded-[3rem] overflow-hidden border border-latte/5 shadow-soft hover:shadow-soft-lg transition-all duration-500 flex flex-col">
              <div className="h-72 bg-off-white overflow-hidden relative">
                <img
                  src="/images/cappuccino_froth.png"
                  loading="lazy"
                  alt="Karan Mehta - Head Barista"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8 text-center flex-1">
                <span className="uppercase tracking-widest text-[9px] font-bold text-caramel mb-2 block">Head Barista</span>
                <h4 className="text-2xl font-heading mb-4">Karan Mehta</h4>
                <p className="text-mocha/70 text-sm font-light leading-relaxed">
                  A former national barista finalist, Karan manages our manual bar. He is deeply passionate about precise extraction variables, milk textures, and coffee education.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-heading mb-6">Experience our sanctuary in person.</h3>
          <p className="text-mocha/50 font-light text-sm mb-10 max-w-lg mx-auto">
            Find your moment of quietude and taste our exquisite, micro-batch coffee creations.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-premium btn-premium-primary min-w-[250px] tracking-widest uppercase text-xs py-5"
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

export default AboutPage;
