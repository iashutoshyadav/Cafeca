import React, { useState, useEffect, useRef } from 'react';
import { Robot, Trash, X, Microphone, PaperPlaneRight, ChatCircleDots, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import axios from 'axios';

const SUGGESTED_PROMPTS = [
  { text: "What is on your signature menu?", label: "📖 Menu" },
  { text: "Where is the cafe located?", label: "📍 Address" },
  { text: "What are your opening hours?", label: "🕒 Opening Hours" },
  { text: "What is your contact information?", label: "📞 Contact Info" },
  { text: "What are today's specials and recommendations?", label: "✨ Today's Specials" },
  { text: "How can I book a table?", label: "📅 Book a Table" }
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to the Cafeca sanctuary! I'm your AI concierge. How can I help you find your perfect moment today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClear = () => {
    stopSpeaking();
    setMessages([
      { text: "Welcome to the Cafeca sanctuary! I'm your AI concierge. How can I help you find your perfect moment today?", sender: 'ai' }
    ]);
  };

  // Local fallback response generator for offline or non-API use
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
      
      // Query natural/premium voice options
      const voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Karen')) && 
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));
      
      if (premiumVoice) utterance.voice = premiumVoice;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;
    
    const userMessage = textToSend.trim();
    const newMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    stopSpeaking();

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/chat`, {
        message: userMessage,
        history: messages
      });
      
      const replyText = response.data.reply;
      setMessages([...newMessages, { text: replyText, sender: 'ai' }]);
      if (!isMuted) speakResponse(replyText);
    } catch (error) {
      console.warn('API chat failed. Using high-quality offline rules fallback.', error);
      const replyText = getAIResponse(userMessage);
      setMessages([...newMessages, { text: replyText, sender: 'ai' }]);
      if (!isMuted) speakResponse(replyText);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    handleSendMessage(input);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    // Stop speaking while recording voice
    stopSpeaking();

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.lang = 'en-US';

    setIsListening(true);
    setIsOpen(true);
    setInput('Listening...');
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
      setInput('');
    };

    recognition.onend = () => {
      setIsListening(false);
      setInput(prev => prev === 'Listening...' ? '' : prev);
    };
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
        <div className={`w-[350px] h-[500px] bg-cream border border-latte/10 rounded-[32px] mb-5 flex flex-col overflow-hidden shadow-soft-lg transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-90 pointer-events-none translate-y-10'}`}>
          
          {/* Header */}
          <div className="p-6 bg-off-white border-b border-latte/10 flex justify-between items-center">
            <div className="flex items-center gap-3 font-heading font-semibold text-dark">
              <Robot weight="fill" size={28} className="text-mocha animate-pulse" />
              <span>Concierge</span>
              {isSpeaking && (
                <div className="flex items-end gap-[2px] ml-1 h-3">
                  <span className="w-[3px] bg-caramel rounded-full animate-[pulse_0.6s_infinite] inline-block h-2" style={{ animationDelay: '0.1s' }} />
                  <span className="w-[3px] bg-caramel rounded-full animate-[pulse_0.6s_infinite] inline-block h-3.5" style={{ animationDelay: '0.3s' }} />
                  <span className="w-[3px] bg-caramel rounded-full animate-[pulse_0.6s_infinite] inline-block h-2.5" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setIsMuted(!isMuted);
                }} 
                title={isMuted ? "Unmute Voice Reading" : "Mute Voice Reading"} 
                className={`transition-colors duration-300 ${isMuted ? 'text-mocha/30 hover:text-mocha' : 'text-caramel hover:text-mocha-dark'}`}
              >
                {isMuted ? <SpeakerSlash size={20} /> : <SpeakerHigh size={20} weight={isSpeaking ? "fill" : "regular"} />}
              </button>
              <button onClick={handleClear} title="Clear Chat" className="text-mocha/40 hover:text-mocha transition-colors"><Trash size={20} /></button>
              <button onClick={() => setIsOpen(false)} className="text-mocha/40 hover:text-mocha transition-colors"><X size={20} /></button>
            </div>
          </div>
          
          {/* Chat Container */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-cream">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed animate-fade-in-up break-words relative group ${
                  msg.sender === 'ai' 
                    ? 'bg-off-white self-start rounded-bl-none text-mocha shadow-sm' 
                    : 'bg-mocha text-cream self-end rounded-br-none font-medium shadow-soft'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Suggested Prompt Chips */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-col gap-3 animate-fade-in-up mt-1 max-w-[95%]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-mocha/50 ml-1">Suggested Questions</span>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt.text)}
                      className="px-3.5 py-2.5 bg-white hover:bg-mocha hover:text-cream border border-latte/15 rounded-2xl text-xs text-mocha/70 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer text-left font-medium"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Elegant Typing Indicator */}
            {isTyping && (
              <div className="max-w-[85%] p-4 rounded-3xl bg-off-white self-start rounded-bl-none shadow-sm flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 bg-mocha/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-mocha/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-mocha/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Box */}
          <div className="p-6 border-t border-latte/10 flex gap-4 items-center bg-off-white">
            <button 
              className={`relative p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isListening 
                  ? 'bg-caramel/15 text-caramel scale-110 shadow-soft' 
                  : 'text-mocha/40 hover:text-mocha'
              }`} 
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              title={isListening ? "Stop listening" : "Speak to AI"}
            >
              {isListening && (
                <span className="absolute inset-0 rounded-full bg-caramel/20 animate-ping pointer-events-none" />
              )}
              <Microphone size={24} weight={isListening ? "fill" : "regular"} />
            </button>
            
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              disabled={isListening}
              className="flex-1 px-5 py-3 bg-white border border-latte/10 rounded-2xl text-dark text-sm focus:outline-none focus:border-mocha/30 disabled:opacity-50"
            />
            
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isListening} 
              className="text-mocha/40 hover:text-mocha transition-transform hover:scale-110 disabled:opacity-30 disabled:pointer-events-none"
            >
              <PaperPlaneRight weight="fill" size={24} />
            </button>
          </div>
        </div>
        
        {/* Floating Bubble Icon */}
        <button 
          className="w-16 h-16 rounded-2xl bg-mocha text-cream border-none flex items-center justify-center cursor-pointer shadow-soft-lg transition-all duration-500 hover:scale-110 hover:-rotate-6" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChatCircleDots weight="fill" size={32} />
        </button>
      </div>

      {/* Speech overlay banner */}
      <div className={`fixed bottom-28 right-[400px] bg-mocha text-cream px-6 py-3 rounded-full font-medium opacity-0 pointer-events-none transition-all duration-500 z-[10000] shadow-soft-lg flex items-center gap-3 ${
        isListening ? 'opacity-100 -translate-y-2 pointer-events-auto' : ''
      }`}>
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-caramel opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-caramel"></span>
        </span>
        <span>Listening to your thoughts...</span>
      </div>
    </>
  );
};

export default AIChatbot;
