import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Map as MapIcon, 
  Search, 
  BookOpen, 
  Plus, 
  ChevronRight, 
  Clock,
  MapPin,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Settings,
  Languages,
  Camera,
  Heart,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

// --- Translations ---
const TRANSLATIONS = {
  en: {
    appName: "Jatre Namma Pride",
    tagline: "Your Digital Guide to Mahotsava",
    welcome: "Namaste!",
    welcomeSub: "Welcome to the Jatre",
    liveNow: "LIVE NOW",
    endsIn: "Ends in",
    grandChariot: "Grand Chariot Procession",
    mainTemple: "Main Temple Grounds",
    upcomingEvents: "Upcoming Events",
    schedule: "Schedule",
    safetyMap: "Safety Map",
    lostFound: "Lost & Found",
    culture: "Stories",
    needSupport: "Need Support?",
    contactHelpdesk: "Contact our 24/7 Jatre Helpdesk for emergencies.",
    callNow: "Call Now",
    back: "Back",
    reportNew: "Report New Item",
    postReport: "Post a Report",
    whatMissing: "What's missing?",
    description: "Description and location...",
    submit: "Submit",
    cancel: "Cancel",
    resolved: "RESOLVED",
    markResolved: "Mark as Resolved",
    legendTitle: "Legend of Jatre",
    guardianTitle: "The Village Guardian",
    didYouKnow: "Did you know?",
    splashText: "Experience the Divine",
    getStarted: "Get Started",
    skip: "Skip",
    onboarding1Title: "Stay Informed",
    onboarding1Desc: "Get real-time updates on chariot processions and cultural plays.",
    onboarding2Title: "Safe & Secure",
    onboarding2Desc: "Easily locate emergency camps and report lost belongings.",
    onboarding3Title: "Rich Heritage",
    onboarding3Desc: "Dive deep into the stories that make our jatre legendary.",
    searchItems: "Search lost items...",
    all: "All",
    lost: "Lost",
    found: "Found",
    itemDetail: "Item Detail",
    reportedOn: "Reported on",
    location: "Location",
    contactReporter: "Contact Reporter",
    medicalCamp: "Medical Camp B",
    mainArchway: "Main Archway • Open 24/7",
    getDirections: "Get Directions",
  },
  kn: {
    appName: "ಜಾತ್ರೆ ನಮ್ಮ ಹೆಮ್ಮೆ",
    tagline: "ಮಹೋತ್ಸವದ ಡಿಜಿಟಲ್ ಮಾರ್ಗದರ್ಶಿ",
    welcome: "ನಮಸ್ಕಾರ!",
    welcomeSub: "ಜಾತ್ರೆಗೆ ಸುಸ್ವಾಗತ",
    liveNow: "ಈಗ ನೇರಪ್ರಸಾರ",
    endsIn: "ಮುಕ್ತಾಯಗೊಳ್ಳಲು",
    grandChariot: "ಭವ್ಯ ರಥೋತ್ಸವ",
    mainTemple: "ಮುಖ್ಯ ದೇವಸ್ಥಾನದ ಆವರಣ",
    upcomingEvents: "ನಡೆಲಿರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
    schedule: "ವೇಳಾಪಟ್ಟಿ",
    safetyMap: "ಸುರಕ್ಷತಾ ನಕ್ಷೆ",
    lostFound: "ಕಳೆದುಹೋದ ಮತ್ತು ಸಿಕ್ಕ ವಸ್ತುಗಳು",
    culture: "ಸಂಸ್ಕೃತಿ",
    needSupport: "ಸಹಾಯ ಬೇಕೇ?",
    contactHelpdesk: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಾಗಿ ನಮ್ಮ 24/7 ಸಹಾಯವಾಣಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    callNow: "ಈಗ ಕರೆ ಮಾಡಿ",
    back: "ಹಿಂದಕ್ಕೆ",
    reportNew: "ಹೊಸ ವರದಿ",
    postReport: "ವರದಿ ಸಲ್ಲಿಸಿ",
    whatMissing: "ಏನು ಕಳೆದುಹೋಗಿದೆ?",
    description: "ವಿವರಣೆ ಮತ್ತು ಸ್ಥಳ...",
    submit: "ಸಲ್ಲಿಸು",
    cancel: "ರದ್ದುಮಾಡು",
    resolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
    markResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
    legendTitle: "ಜಾತ್ರೆಯ ದಂತಕಥೆ",
    guardianTitle: "ಗ್ರಾಮದ ರಕ್ಷಕ",
    didYouKnow: "ನಿಮಗೆ ತಿಳಿದಿದೆಯೇ?",
    splashText: "ದೈವಿಕ ಅನುಭವ ಪಡೆಯಿರಿ",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    skip: "ಬಿಟ್ಟುಬಿಡಿ",
    onboarding1Title: "ಮಾಹಿತಿ ಪಡೆಯಿರಿ",
    onboarding1Desc: "ರಥೋತ್ಸವ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ಕ್ಷಣ ಕ್ಷಣದ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
    onboarding2Title: "ಸುರಕ್ಷತೆ ಮೊದಲು",
    onboarding2Desc: "ತುರ್ತು ಶಿಬಿರಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ ಮತ್ತು ಕಳೆದುಹೋದ ವಸ್ತುಗಳನ್ನು ವರದಿ ಮಾಡಿ.",
    onboarding3Title: "ಶ್ರೀಮಂತ ಪರಂಪರೆ",
    onboarding3Desc: "ನಮ್ಮ ಜಾತ್ರೆಯನ್ನು ಪೌರಾಣಿಕವಾಗಿಸಿದ ಕಥೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.",
    searchItems: "ವಸ್ತುಗಳಿಗಾಗಿ ಹುಡುಕಿ...",
    all: "ಎಲ್ಲಾ",
    lost: "ಕಳೆದುಹೋದ",
    found: "ಸಿಕ್ಕಿದ",
    itemDetail: "ವಸ್ತುವಿನ ವಿವರ",
    reportedOn: "ವರದಿ ಮಾಡಿದ ದಿನಾಂಕ",
    location: "ಸ್ಥಳ",
    contactReporter: "ವರದಿಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    medicalCamp: "ವೈದ್ಯಕೀಯ ಶಿಬಿರ ಬಿ",
    mainArchway: "ಮುಖ್ಯ ದ್ವಾರ • 24/7 ತೆರೆದಿರುತ್ತದೆ",
    getDirections: "ದಾರಿಯನ್ನು ತಿಳಿಯಿರಿ",
  }
};

// --- Types ---
type Language = 'en' | 'kn';
type Screen = 'splash' | 'onboarding' | 'home' | 'events' | 'lost-found' | 'add-item' | 'detail' | 'map' | 'stories';

interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  type: 'LOST' | 'FOUND';
  status: 'ACTIVE' | 'RESOLVED';
  icon: string;
  location: string;
  time: string;
}

// --- Mock Data ---
const MOCK_EVENTS = [
  { id: '1', title_en: 'Grand Chariot Procession', title_kn: 'ಭವ್ಯ ರಥೋತ್ಸವ', desc_en: 'Main Temple Grounds', desc_kn: 'ಮುಖ್ಯ ದೇವಸ್ಥಾನದ ಆವರಣ', startTime: '10:00 AM', endTime: '12:00 PM', isLive: true },
  { id: '2', title_en: 'Yakshagana Play', title_kn: 'ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನ', desc_en: 'Cultural Stage A', desc_kn: 'ಸಾಂಸ್ಕೃತಿಕ ವೇದಿಕೆ ಎ', startTime: '2:00 PM', endTime: '5:00 PM', isLive: false },
  { id: '3', title_en: 'Fireworks Display', title_kn: 'ಬಾಣಬಿರುಸು ಪ್ರದರ್ಶನ', desc_en: 'Lake Side', desc_kn: 'ಕೆರೆಯ ದಂಡೆ', startTime: '8:00 PM', endTime: '9:00 PM', isLive: false },
];

const MOCK_LOST_FOUND: LostFoundItem[] = [
  { id: '1', title: 'Brown Leather Wallet', description: 'Found near Food Stall #42. Contains ID card.', type: 'FOUND', status: 'ACTIVE', icon: '👜', location: 'Food Stall Area', time: '2 hours ago' },
  { id: '2', title: 'Bike Keys (Hero)', description: 'Returned to owner at Desk B.', type: 'FOUND', status: 'RESOLVED', icon: '🔑', location: 'Parking Zone 1', time: '5 hours ago' },
  { id: '3', title: 'Blue Backpack', description: 'Left behind near the main stage.', type: 'LOST', status: 'ACTIVE', icon: '🎒', location: 'Main Stage', time: 'Just now' },
];

// --- Components ---

const Header = ({ title, subtitle, showLangToggle, onLangToggle }: { title: string, subtitle?: string, showLangToggle?: boolean, onLangToggle?: () => void }) => (
  <div className="bg-gradient-to-br from-[#D32F2F] to-[#E64A19] p-6 pt-12 text-white rounded-b-[40px] shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none translate-x-12 -translate-y-12">
      <div className="w-full h-full bg-white rounded-full filter blur-3xl"></div>
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div className="text-left">
        {subtitle && <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1 font-black">{subtitle}</p>}
        <h3 className="text-3xl font-black tracking-tighter leading-tight">{title}</h3>
      </div>
      {showLangToggle && (
        <button 
          onClick={onLangToggle}
          className="bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/20 active:scale-90 transition-transform"
        >
          <Languages size={20} />
        </button>
      )}
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeScreen, setActiveScreen] = useState<Screen>('splash');
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>(MOCK_LOST_FOUND);
  const [lostFoundFilter, setLostFoundFilter] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Form State for Adding Items
  const [newItemData, setNewItemData] = useState({
    title: '',
    description: '',
    type: 'LOST' as 'LOST' | 'FOUND',
    image: null as string | null
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (activeScreen === 'splash') {
      const timer = setTimeout(() => {
        setActiveScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'kn' : 'en');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItemData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitItem = () => {
    if (!newItemData.title || !newItemData.description) return;

    const newItem: LostFoundItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newItemData.title,
      description: newItemData.description,
      type: newItemData.type,
      status: 'ACTIVE',
      icon: newItemData.type === 'LOST' ? '🎒' : '👜', // Default icons
      location: 'Just reported',
      time: 'Just now'
    };

    setLostFoundItems(prev => [newItem, ...prev]);
    setActiveScreen('lost-found');
    // Reset form
    setNewItemData({
      title: '',
      description: '',
      type: 'LOST',
      image: null
    });
  };

  const onboardingSlides = [
    { title: t.onboarding1Title, desc: t.onboarding1Desc, icon: "🎭" },
    { title: t.onboarding2Title, desc: t.onboarding2Desc, icon: "🛡️" },
    { title: t.onboarding3Title, desc: t.onboarding3Desc, icon: "🛕" },
  ];

  const handleItemClick = (item: LostFoundItem) => {
    setSelectedItem(item);
    setActiveScreen('detail');
  };

  const filteredItems = lostFoundItems.filter(item => {
    if (lostFoundFilter === 'ALL') return true;
    return item.type === lostFoundFilter;
  });

  const renderScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return (
          <div className="h-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="z-10 flex flex-col items-center"
             >
               <div className="w-32 h-32 bg-gradient-to-br from-[#FFD600] to-[#E64A19] rounded-[40px] flex items-center justify-center shadow-2xl mb-6 transform rotate-12">
                  <span className="text-6xl">🛕</span>
               </div>
               <h1 className="text-4xl font-black text-[#2D2D2D] tracking-tighter mb-2">{t.appName}</h1>
               <p className="text-xs font-bold text-[#E64A19] tracking-[0.3em] uppercase">{t.splashText}</p>
             </motion.div>
             
             {/* Abstract Karnataka Flag Colors */}
             <div className="absolute top-0 w-full h-1/2 bg-[#FFD600] opacity-5 -skew-y-12 origin-top-left"></div>
             <div className="absolute bottom-0 w-full h-1/2 bg-[#D32F2F] opacity-5 skew-y-12 origin-bottom-right"></div>
          </div>
        );

      case 'onboarding':
        const slide = onboardingSlides[onboardingStep];
        return (
          <div className="h-full flex flex-col bg-white p-8">
            <div className="flex justify-between items-center mb-12">
              <div className="flex gap-1">
                {onboardingSlides.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${onboardingStep === i ? 'w-8 bg-[#E64A19]' : 'w-2 bg-gray-100'}`}></div>
                ))}
              </div>
              <button onClick={() => setActiveScreen('home')} className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.skip}</button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={onboardingStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="text-8xl mb-12 transform hover:scale-110 transition-transform cursor-default select-none">{slide.icon}</div>
                <h2 className="text-4xl font-black text-[#2D2D2D] mb-4 leading-tight">{slide.title}</h2>
                <p className="text-base text-gray-500 font-medium leading-relaxed max-w-xs">{slide.desc}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12">
              <button 
                onClick={() => {
                  if (onboardingStep < 2) setOnboardingStep(s => s + 1);
                  else setActiveScreen('home');
                }}
                className="w-full bg-[#E64A19] text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-orange-100 active:scale-95 transition-transform"
              >
                {onboardingStep === 2 ? t.getStarted : "Next"}
              </button>
            </div>
          </div>
        );

      case 'home':
        return (
          <div className="pb-24 text-left">
            <Header title={t.welcome} subtitle={t.welcomeSub} showLangToggle onLangToggle={toggleLang} />
            
            <div className="p-6 -mt-10">
              {/* Search Bar Placeholder */}
              <div className="bg-white rounded-2xl p-4 shadow-xl border border-orange-50 mb-8 flex items-center gap-3">
                 <Search size={20} className="text-gray-300" />
                 <input type="text" placeholder={t.searchItems} className="bg-transparent border-none outline-none text-sm w-full font-medium" />
              </div>

              {/* Live Card */}
              <div onClick={() => setActiveScreen('events')} className="bg-white rounded-[32px] p-6 shadow-2xl border border-orange-50 mb-8 relative overflow-hidden cursor-pointer group active:scale-95 transition-all">
                <div className="absolute top-0 right-0 bg-[#D32F2F] text-white text-[10px] font-black px-4 py-1.5 rounded-bl-[20px] z-10 flex items-center gap-1.5 animate-pulse">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div> {t.liveNow}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-wider">
                    <Clock size={12} /> {t.endsIn} 42m
                  </div>
                  <h4 className="text-2xl font-black text-[#2D2D2D] leading-tight group-hover:text-[#E64A19] transition-colors">{t.grandChariot}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-bold bg-gray-50 w-fit px-3 py-1 rounded-full">
                    <MapPin size={12} className="text-[#E64A19]" /> {t.mainTemple}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 text-8xl opacity-5 transform group-hover:rotate-12 transition-transform">🛕</div>
              </div>

              {/* Categorical Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div onClick={() => setActiveScreen('events')} className="bg-white p-5 rounded-[32px] shadow-sm border border-orange-100 flex flex-col items-start gap-3 cursor-pointer hover:shadow-xl transition-all border-b-4 border-b-[#FFD600]">
                    <div className="w-12 h-12 bg-orange-50 text-[#E64A19] rounded-2xl flex items-center justify-center"><Calendar size={24}/></div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#2D2D2D]">{t.schedule}</span>
                 </div>
                 <div onClick={() => setActiveScreen('map')} className="bg-white p-5 rounded-[32px] shadow-sm border border-blue-50 flex flex-col items-start gap-3 cursor-pointer hover:shadow-xl transition-all border-b-4 border-b-blue-500">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><MapIcon size={24}/></div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#2D2D2D]">{t.safetyMap}</span>
                 </div>
                 <div onClick={() => setActiveScreen('lost-found')} className="bg-white p-5 rounded-[32px] shadow-sm border border-yellow-50 flex flex-col items-start gap-3 cursor-pointer hover:shadow-xl transition-all border-b-4 border-b-yellow-500">
                    <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center"><Search size={24}/></div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#2D2D2D]">{t.lostFound}</span>
                 </div>
                 <div onClick={() => setActiveScreen('stories')} className="bg-white p-5 rounded-[32px] shadow-sm border border-purple-50 flex flex-col items-start gap-3 cursor-pointer hover:shadow-xl transition-all border-b-4 border-b-purple-500">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><BookOpen size={24}/></div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#2D2D2D]">{t.culture}</span>
                 </div>
              </div>

              {/* CTA Section */}
              <div className="bg-[#1A1A1A] p-8 rounded-[40px] text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#E64A19] blur-[60px] opacity-20"></div>
                 <h4 className="text-2xl font-black mb-2 leading-tight">{t.needSupport}</h4>
                 <p className="text-xs font-medium text-white/50 mb-6 leading-relaxed">{t.contactHelpdesk}</p>
                 <button className="flex items-center gap-3 bg-[#E64A19] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform">
                   <Phone size={14}/> {t.callNow}
                 </button>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="motion-content text-left">
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-4 flex items-center gap-4 border-b border-gray-100 z-50">
              <button onClick={() => setActiveScreen('home')} className="p-3 bg-gray-50 rounded-2xl text-[#E64A19]"><ArrowLeft size={20}/></button>
              <h3 className="font-black text-xl">{t.schedule}</h3>
            </div>
            <div className="p-6 space-y-6">
              {MOCK_EVENTS.map(event => (
                <div key={event.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-orange-50 relative overflow-hidden group hover:shadow-lg transition-all">
                   {event.isLive && (
                     <div className="absolute top-0 right-0 bg-[#D32F2F] text-white text-[8px] font-black px-4 py-1.5 rounded-bl-[16px] animate-pulse">LIVE</div>
                   )}
                   <div className="flex gap-4">
                     <div className="w-16 h-20 bg-[#FFF9F0] rounded-2xl flex flex-col items-center justify-center border border-orange-100 shrink-0">
                        <span className="text-lg font-black text-[#E64A19]">{event.startTime.split(':')[0]}</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase">{event.startTime.split(' ')[1]}</span>
                     </div>
                     <div className="flex-1">
                        <h4 className="text-lg font-black text-[#2D2D2D] leading-tight mb-2">
                          {lang === 'en' ? event.title_en : event.title_kn}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <MapPin size={12} className="text-[#E64A19]" /> 
                          {lang === 'en' ? event.desc_en : event.desc_kn}
                        </div>
                     </div>
                   </div>
                   <div className="mt-6 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-[10px] font-black text-[#E64A19] bg-orange-50 px-3 py-1.5 rounded-full">
                       <Clock size={12}/><span className="mt-0.5">{event.startTime} - {event.endTime}</span>
                     </div>
                     <button className="text-xs font-black text-[#2D2D2D] flex items-center gap-1 group-hover:text-[#E64A19] transition-colors">
                       Remind <ChevronRight size={14} />
                     </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'lost-found':
        return (
          <div className="motion-content text-left pb-24">
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-4 flex items-center gap-4 border-b border-gray-100 z-50">
              <button onClick={() => setActiveScreen('home')} className="p-3 bg-gray-50 rounded-2xl text-[#E64A19]"><ArrowLeft size={20}/></button>
              <h3 className="font-black text-xl">{t.lostFound}</h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Category Filter Pills */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                 {[
                   { label: t.all, value: 'ALL' },
                   { label: t.lost, value: 'LOST' },
                   { label: t.found, value: 'FOUND' }
                 ].map((cat, i) => (
                   <button 
                     key={i} 
                     onClick={() => setLostFoundFilter(cat.value as any)}
                     className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${lostFoundFilter === cat.value ? 'bg-[#E64A19] text-white shadow-lg shadow-orange-100' : 'bg-white border border-gray-100 text-gray-400'}`}
                   >
                     {cat.label}
                   </button>
                 ))}
              </div>

              {filteredItems.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => handleItemClick(item)}
                  className={`bg-white p-6 rounded-[32px] border transition-all cursor-pointer active:scale-95 ${item.status === 'RESOLVED' ? 'opacity-50 grayscale' : 'border-orange-50 shadow-sm hover:shadow-xl'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${item.type === 'LOST' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {item.type === 'LOST' ? t.lost : t.found}
                    </span>
                    {item.status === 'RESOLVED' && <span className="bg-green-100 text-green-600 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5"><CheckCircle2 size={12}/> {t.resolved}</span>}
                  </div>
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner shrink-0">{item.icon}</div>
                    <div className="flex-1 py-1">
                      <h4 className="text-lg font-black text-[#2D2D2D] leading-tight mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <Clock size={12} /> {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => setActiveScreen('add-item')}
                className="w-full bg-[#E64A19] text-white py-6 rounded-[32px] font-black text-xs shadow-2xl shadow-orange-100 flex items-center justify-center gap-3 uppercase tracking-[0.2em] mt-8"
              >
                <Plus size={18}/> {t.reportNew}
              </button>
            </div>
          </div>
        );

      case 'add-item':
        return (
          <div className="motion-content text-left bg-white h-full">
             <div className="p-4 flex items-center gap-4 border-b border-gray-100">
              <button onClick={() => setActiveScreen('lost-found')} className="p-3 bg-gray-50 rounded-2xl text-[#E64A19]"><ArrowLeft size={20}/></button>
              <h3 className="font-black text-xl">{t.postReport}</h3>
            </div>
            
            <div className="p-8 space-y-8">
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileUpload} 
                 className="hidden" 
                 accept="image/*"
               />
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="aspect-[16/9] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 gap-4 cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-colors overflow-hidden"
               >
                  {newItemData.image ? (
                    <img src={newItemData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera size={48} />
                      <span className="text-sm font-black uppercase tracking-widest">Add Photos</span>
                    </>
                  )}
               </div>

               <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 block">Item Type</label>
                    <div className="flex gap-3">
                       <button 
                         onClick={() => setNewItemData(prev => ({ ...prev, type: 'LOST' }))}
                         className={`flex-1 py-3 rounded-xl font-black text-xs border ${newItemData.type === 'LOST' ? 'bg-red-50 border-red-500 text-red-600' : 'bg-white border-gray-100 text-gray-300'}`}
                       >
                         LOST
                       </button>
                       <button 
                         onClick={() => setNewItemData(prev => ({ ...prev, type: 'FOUND' }))}
                         className={`flex-1 py-3 rounded-xl font-black text-xs border ${newItemData.type === 'FOUND' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-100 text-gray-300'}`}
                       >
                         FOUND
                       </button>
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 block">{t.whatMissing}</label>
                    <input 
                      type="text" 
                      value={newItemData.title}
                      onChange={(e) => setNewItemData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Black Sunglasses" 
                      className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none font-bold text-sm focus:ring-2 ring-[#E64A19] outline-none" 
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 block">{t.description}</label>
                    <textarea 
                      value={newItemData.description}
                      onChange={(e) => setNewItemData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Tell us more details..." 
                      className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none font-bold text-sm h-32 focus:ring-2 ring-[#E64A19] outline-none resize-none"
                    ></textarea>
                 </div>
               </div>

               <div className="flex gap-4 pt-4">
                 <button onClick={() => setActiveScreen('lost-found')} className="flex-1 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{t.cancel}</button>
                 <button 
                   onClick={handleSubmitItem} 
                   className={`flex-1 bg-[#E64A19] text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-orange-100 uppercase tracking-widest ${(!newItemData.title || !newItemData.description) ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                 >
                   {t.submit}
                 </button>
               </div>
            </div>
          </div>
        );

      case 'detail':
        if (!selectedItem) return null;
        return (
          <div className="motion-content text-left bg-[#FFF9F0] h-full flex flex-col">
            <div className="relative h-2/5">
               <div className="absolute inset-0 flex items-center justify-center text-9xl bg-white shadow-inner">
                  {selectedItem.icon}
               </div>
               <button onClick={() => setActiveScreen('lost-found')} className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-[#E64A19] shadow-lg"><ArrowLeft size={20}/></button>
               <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg ${selectedItem.type === 'LOST' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
                  {selectedItem.type === 'LOST' ? t.lost : t.found}
               </div>
            </div>
            
            <div className="flex-1 bg-white rounded-t-[48px] -mt-12 p-8 shadow-2xl relative z-10">
               <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
               
               <div className="flex justify-between items-start mb-6">
                 <h2 className="text-3xl font-black text-[#2D2D2D] leading-tight flex-1 mr-4">{selectedItem.title}</h2>
                 <button className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0 active:scale-90 transition-transform"><Heart size={20}/></button>
               </div>

               <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">{selectedItem.description}</p>

               <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-gray-50 p-5 rounded-3xl">
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">{t.reportedOn}</p>
                     <p className="text-sm font-black text-[#2D2D2D]">{selectedItem.time}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-3xl">
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">{t.location}</p>
                     <p className="text-sm font-black text-[#2D2D2D]">{selectedItem.location}</p>
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                 <button className="w-full bg-[#E64A19] text-white py-5 rounded-3xl font-black text-sm shadow-xl shadow-orange-100 uppercase tracking-[0.2em]">{t.contactReporter}</button>
                 {selectedItem.status === 'ACTIVE' && (
                   <button 
                     onClick={() => {
                       setLostFoundItems(prev => prev.map(i => i.id === selectedItem.id ? {...i, status: 'RESOLVED'} : i));
                       setActiveScreen('lost-found');
                     }}
                     className="w-full bg-green-50 text-green-600 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em]"
                   >
                     {t.markResolved}
                   </button>
                 )}
               </div>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="h-full flex flex-col motion-content">
            <div className="p-4 flex items-center gap-4 bg-white border-b border-gray-100">
              <button onClick={() => setActiveScreen('home')} className="p-3 bg-gray-50 rounded-2xl text-[#E64A19]"><ArrowLeft size={20}/></button>
              <h3 className="font-black text-xl">{t.safetyMap}</h3>
            </div>
            <div className="flex-1 bg-[#E3F2FD] relative overflow-hidden">
               {/* Karnataka flag colors as grid dots */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D32F2F 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
               <div className="absolute inset-0 opacity-[0.03] translate-x-3 translate-y-3" style={{ backgroundImage: 'radial-gradient(#FFD600 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
               
               {/* Map Markers */}
               <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                 <div className="w-12 h-12 bg-[#D32F2F] rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white text-lg font-black animate-bounce">✚</div>
                 <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-xl shadow-lg border border-red-50 text-[10px] font-black whitespace-nowrap">MEDICAL CAMP</div>
               </div>
               
               <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
                 <div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white text-lg font-black scale-90">P</div>
                 <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-xl shadow-lg border border-blue-50 text-[10px] font-black whitespace-nowrap">PARKING A1</div>
               </div>

               <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold">ℹ️</div>
               
               <div className="absolute bottom-8 left-6 right-6 bg-white p-8 rounded-[40px] shadow-2xl border border-blue-50 text-left">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-4xl">🚑</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-[#2D2D2D] mb-1">{t.medicalCamp}</h4>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">{t.mainArchway}</p>
                      <button className="w-full py-4 text-xs font-black text-white bg-red-500 rounded-2xl shadow-lg shadow-red-100 flex items-center justify-center gap-2">
                        {t.getDirections} <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );

      case 'stories':
        return (
          <div className="motion-content text-left bg-white overflow-y-auto h-full">
             <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600] to-[#E64A19] flex items-center justify-center text-9xl">🛕</div>
                <button onClick={() => setActiveScreen('home')} className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-[#E64A19] shadow-lg"><ArrowLeft size={20}/></button>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
             </div>
            <div className="px-8 pb-12 relative z-10 -mt-10">
              <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-orange-50 mb-8">
                <h4 className="text-[10px] font-black text-[#E64A19] uppercase tracking-[0.4em] mb-4">{t.legendTitle}</h4>
                <h2 className="text-4xl font-black text-[#2D2D2D] mb-6 tracking-tight leading-none">{t.guardianTitle}</h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-500 leading-relaxed font-serif italic">
                    Centuries ago, a wandering saint arrived in our village during a severe drought. With his divine staff, he struck the earth, and an eternal spring gushed forth, saving the crops and the people. 
                  </p>
                  <p className="text-base text-gray-400 font-medium leading-relaxed">
                    Every year since, we celebrate this 'Jatre' to honor the guardian who protected our ancestors. The chariot procession symbolizes the journey of the spirit across the physical world, bringing prosperity and unity to all who witness its path.
                  </p>
                </div>
              </div>

              <div className="bg-[#FFF9F0] p-10 rounded-[48px] border border-orange-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/50 rounded-full -translate-y-12 translate-x-12"></div>
                <h4 className="text-xs font-black text-[#E64A19] uppercase tracking-widest mb-4 flex items-center gap-2">
                   <AlertCircle size={16} /> {t.didYouKnow}
                </h4>
                <p className="text-base text-[#2D2D2D] font-black italic opacity-80 leading-relaxed">
                  "The main chariot used today was carved by hand over 150 years ago using teak from the sacred groves."
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-sans flex justify-center selection:bg-orange-100">
      <div className="w-full max-w-md flex flex-col min-h-screen bg-white relative shadow-2xl shadow-[#E64A19]/10">
        <div className="flex-1 overflow-hidden relative bg-[#FFF9F0]">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeScreen + onboardingStep + (selectedItem?.id || '')}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               transition={{ duration: 0.3 }}
               className="h-full overflow-y-auto scrollbar-hide pb-24"
             >
               {renderScreen()}
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Bottom Navigation - Only for main screens */}
        {['home', 'events', 'lost-found', 'map', 'stories'].includes(activeScreen) && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 w-full max-w-md h-20 bg-white/90 backdrop-blur-xl border-t border-orange-50 flex justify-around items-center px-6 pb-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
          >
            {[
              { id: 'home', icon: <Calendar size={20} />, label: t.schedule },
              { id: 'map', icon: <MapIcon size={20} />, label: t.safetyMap },
              { id: 'lost-found', icon: <Search size={20} />, label: t.lostFound },
              { id: 'stories', icon: <BookOpen size={20} />, label: t.culture },
            ].map((nav) => (
              <button 
                key={nav.id}
                onClick={() => {
                  setActiveScreen(nav.id as Screen);
                  if (nav.id === 'lost-found') setSelectedItem(null);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 transition-all duration-300 ${activeScreen === nav.id ? 'text-[#E64A19] scale-110' : 'text-gray-300 hover:text-gray-400'}`}
              >
                <div className={`p-2.5 rounded-2xl transition-colors ${activeScreen === nav.id ? 'bg-orange-50' : 'bg-transparent'}`}>
                  {nav.icon}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Decorative text for Desktop */}
      <div className="hidden lg:flex fixed left-12 top-0 h-full flex-col justify-center gap-4 max-w-xs pointer-events-none">
        <h1 className="text-7xl font-black text-[#D32F2F]/10 tracking-tighter leading-none">{t.appName}</h1>
        <p className="text-xs font-black text-[#E64A19]/20 uppercase tracking-[0.5em]">{t.tagline}</p>
      </div>
    </div>
  );
}

