import React, { useState, useEffect, useRef } from 'react';
import { Robot, Trash, X, Microphone, PaperPlaneRight, ChatCircleDots } from '@phosphor-icons/react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to the Cafeca sanctuary! I'm your AI concierge. How can I help you find your perfect moment today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClear = () => {
    setMessages([
      { text: "Welcome to the Cafeca sanctuary! I'm your AI concierge. How can I help you find your perfect moment today?", sender: 'ai' }
    ]);
  };

  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('coffee') || q.includes('espresso') || q.includes('latte') || q.includes('cappuccino') || q.includes('brew')) {
      return "Our absolute best-seller and crowd favorite is the Velvet Latte (₹350)—a handcrafted espresso with steamed cream and caramel silk. If you prefer something robust and slow-steeped, we highly recommend our Artisan Brew (₹320), slow-steeped for 18 hours, or the airy, frothy Cloud Cappuccino (₹380)!";
    } else if (q.includes('tea') || q.includes('matcha') || q.includes('earl grey')) {
      return "For tea lovers, we highly recommend our premium-grade Japanese Matcha Zen (₹390) with a hint of honey, or the soothing Earl Grey Mist (₹310) with delicate lavender notes.";
    } else if (q.includes('dessert') || q.includes('sweet') || q.includes('croissant') || q.includes('tart') || q.includes('cake') || q.includes('pastry')) {
      return "You must try our signature Golden Croissant (₹300) with its flaky, butter-rich layers baked to honey-gold perfection, or our delicious seasonal Berry Tart (₹420)!";
    } else if (q.includes('snack') || q.includes('avocado') || q.includes('toast') || q.includes('fries') || q.includes('truffle')) {
      return "Try our popular Avocado Toast (₹480) served on sourdough with sea salt and chili flakes, or our delicious Truffle Fries (₹350) tossed in truffle oil and parmesan!";
    } else if (q.includes('best') || q.includes('recommend') || q.includes('suggest') || q.includes('popular') || q.includes('special') || q.includes('favorite')) {
      return "Our signature favorites are the Velvet Latte (₹350), the slow-steeped Artisan Brew (₹320), and our flaky Golden Croissant (₹300). They are crafted to absolute perfection!";
    } else if (q.includes('menu') || q.includes('food') || q.includes('drink')) {
      return "Explore our signature specials: the Velvet Latte, Golden Croissant, and our Artisan 18-hour Brew. They are crafted for comfort!";
    } else if (q.includes('price') || q.includes('cost')) {
      return "Our signature delights range from ₹300 to ₹500. We believe in premium quality for every moment.";
    } else if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('time')) {
      return "We are here for you Mon-Fri (7am-9pm) and Sat-Sun (8am-10pm).";
    } else if (q.includes('book') || q.includes('reserv') || q.includes('table')) {
      return "You can 'Book Your Moment' directly in our contact section. We can't wait to see you!";
    } else if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('location') || q.includes('address')) {
      return "You can reach our sanctuary at hello@cafeca.com or +91 XXXXX XXXXX. We are located at Hauz Khas Village, New Delhi. For detailed directions (including metro stations & valet parking) or to book a table directly, check out our Contact page! Click 'Contact' in the menu bar.";
    } else if (q.includes('about') || q.includes('story') || q.includes('history') || q.includes('philosophy') || q.includes('genesis')) {
      return "You can learn all about our journey, from direct trade organic sourcing in Coorg to our micro-batch roasting and slow-brew rituals, on our detailed About page! Click 'About' in the menu bar to read our full story.";
    } else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return "Hello! Welcome to the warm atmosphere of Cafeca. How can I assist you today?";
    } else {
      return "I'm here to help you with our menu, hours, or reservations. How can I make your experience more beautiful?";
    }
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages([...newMessages, { text: response, sender: 'ai' }]);
      if (isListening) speakResponse(response);
    }, 500);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    setIsListening(true);
    setIsOpen(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const newMessages = [...messages, { text: transcript, sender: 'user' }];
      setMessages(newMessages);
      
      setTimeout(() => {
        const response = getAIResponse(transcript);
        setMessages([...newMessages, { text: response, sender: 'ai' }]);
        speakResponse(response);
      }, 500);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
        <div className={`w-[350px] h-[500px] bg-cream border border-latte/10 rounded-[32px] mb-5 flex flex-col overflow-hidden shadow-soft-lg transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-90 pointer-events-none translate-y-10'}`}>
          <div className="p-6 bg-off-white border-b border-latte/10 flex justify-between items-center">
            <div className="flex items-center gap-3 font-heading font-semibold text-dark">
              <Robot weight="fill" size={28} className="text-mocha" />
              <span>Concierge</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleClear} title="Clear Chat" className="text-mocha/40 hover:text-mocha transition-colors"><Trash size={20} /></button>
              <button onClick={() => setIsOpen(false)} className="text-mocha/40 hover:text-mocha transition-colors"><X size={20} /></button>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-cream">
            {messages.map((msg, index) => (
              <div key={index} className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed animate-fade-in-up break-words ${msg.sender === 'ai' ? 'bg-off-white self-start rounded-bl-none text-mocha shadow-sm' : 'bg-mocha text-cream self-end rounded-br-none font-medium shadow-soft'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-6 border-t border-latte/10 flex gap-4 items-center bg-off-white">
            <button 
              className={`text-mocha/40 transition-all hover:scale-110 hover:text-mocha ${isListening ? 'text-caramel animate-pulse' : ''}`} 
              onClick={startVoiceRecognition}
              title="Speak to AI"
            >
              <Microphone size={24} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-5 py-3 bg-white border border-latte/10 rounded-2xl text-dark text-sm focus:outline-none focus:border-mocha/30"
            />
            <button onClick={handleSend} className="text-mocha/40 hover:text-mocha transition-transform hover:scale-110"><PaperPlaneRight weight="fill" size={24} /></button>
          </div>
        </div>
        
        <button 
          className="w-16 h-16 rounded-2xl bg-mocha text-cream border-none flex items-center justify-center cursor-pointer shadow-soft-lg transition-all duration-500 hover:scale-110 hover:-rotate-6" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChatCircleDots weight="fill" size={32} />
        </button>
      </div>

      <div className={`fixed bottom-28 right-[400px] bg-mocha text-cream px-6 py-3 rounded-full font-medium opacity-0 pointer-events-none transition-all duration-500 z-[10000] shadow-soft-lg ${isListening ? 'opacity-100 -translate-y-2' : ''}`}>
        Listening to your thoughts...
      </div>
    </>
  );
};

export default AIChatbot;
