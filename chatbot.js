/* ============================================================
   MOBIWEB — AI Business Assistant Chatbot
   Menu-driven advisor: business type → goal → recommendation
   ============================================================ */

(function () {
  'use strict';

  /* ── Stage constants ───────────────────────────────────────── */
  var STAGE = { PICK_BUSINESS: 'PICK_BUSINESS', PICK_GOAL: 'PICK_GOAL', DONE: 'DONE' };

  /* ── 20 Business types ─────────────────────────────────────── */
  var BUSINESSES = [
    { id: 1,  emoji: '🍽️',  label: 'Restaurant / Café' },
    { id: 2,  emoji: '🛍️',  label: 'Retail Store' },
    { id: 3,  emoji: '💇',  label: 'Salon / Spa' },
    { id: 4,  emoji: '🏥',  label: 'Healthcare Clinic' },
    { id: 5,  emoji: '🏠',  label: 'Real Estate Agency' },
    { id: 6,  emoji: '⚖️',  label: 'Law Firm' },
    { id: 7,  emoji: '🎓',  label: 'Educational Institution' },
    { id: 8,  emoji: '🏨',  label: 'Hotel / Hospitality' },
    { id: 9,  emoji: '🛒',  label: 'E-commerce Store' },
    { id: 10, emoji: '💪',  label: 'Fitness / Gym' },
    { id: 11, emoji: '📊',  label: 'Consulting Business' },
    { id: 12, emoji: '🏗️',  label: 'Construction / Contracting' },
    { id: 13, emoji: '🚗',  label: 'Automotive Business' },
    { id: 14, emoji: '🌱',  label: 'Non-Profit Organization' },
    { id: 15, emoji: '👗',  label: 'Fashion Brand' },
    { id: 16, emoji: '📸',  label: 'Photography / Creative Studio' },
    { id: 17, emoji: '🚚',  label: 'Food Delivery / Catering' },
    { id: 18, emoji: '🚀',  label: 'Tech Startup' },
    { id: 19, emoji: '✈️',  label: 'Travel Agency' },
    { id: 20, emoji: '💼',  label: 'Other Business' }
  ];

  /* ── Goals per business ────────────────────────────────────── */
  var GOALS = {
    1: [
      'Show your menu online',
      'Accept online food orders',
      'Create a basic website',
      'Create a complete restaurant website'
    ],

    2: [
      'Show your products online',
      'Create an online store',
      'Manage your store with a system',
      'Create a complete retail website'
    ],

    3: [
      'Show your services online',
      'Accept bookings online',
      'Show your work and gallery',
      'Create a complete salon website'
    ],

    4: [
      'Show your clinic services online',
      'Accept appointments online',
      'Show doctors and information',
      'Create a complete clinic website'
    ],

    5: [
      'Show your properties online',
      'Show property details',
      'Let clients contact you',
      'Create a complete real estate website'
    ],

    6: [
      'Show your services online',
      'Show your team online',
      'Create a client portal',
      'Create a complete law firm website'
    ],

    7: [
      'Show your courses online',
      'Accept registrations online',
      'Create a student portal',
      'Create a complete education website'
    ],

    8: [
      'Show your rooms online',
      'Accept bookings online',
      'Show hotel details and images',
      'Create a complete hotel website'
    ],

    9: [
      'Show your products online',
      'Create an online store',
      'Improve your store design',
      'Manage products and orders'
    ],

    10: [
      'Show your services online',
      'Accept memberships online',
      'Accept bookings online',
      'Create a complete gym website'
    ],

    11: [
      'Show your services online',
      'Present your business',
      'Manage clients with a system',
      'Create a complete consulting website'
    ],

    12: [
      'Show your projects online',
      'Show your services',
      'Manage projects with a system',
      'Create a complete construction website'
    ],

    13: [
      'Show your cars online',
      'Show your services online',
      'Let customers contact you',
      'Create a complete automotive website'
    ],

    14: [
      'Show your organization online',
      'Accept form submissions',
      'Manage your activities',
      'Create a complete website'
    ],

    15: [
      'Show your collections online',
      'Create an online store',
      'Create a system to manage products',
      'Create a complete fashion website'
    ],

    16: [
      'Show your portfolio online',
      'Accept booking requests',
      'Show your gallery',
      'Create a complete website'
    ],

    17: [
      'Show your menu online',
      'Accept orders online',
      'Accept requests online',
      'Create a complete website'
    ],

    18: [
      'Show your idea online',
      'Create a landing page',
      'Build a web application',
      'Build a mobile app'
    ],

    19: [
      'Show your packages online',
      'Accept booking requests',
      'Show destinations and details',
      'Create a complete website'
    ],

    20: [
      'Show your business online',
      'Create an online store',
      'Manage your business with a system',
      'Create a complete website'
    ]
  };

  /* ── Recommendations [businessId][goalIndex] ───────────────── */
  var REC = {
    /* 1 — Restaurant / Café */
    1: [
      '🍽️ *Restaurant — Show Your Menu Online*\n\nWe create a website where customers can view your menu.\n\n✅ What\'s included:\n• Menu pages\n• Categories and items\n• Mobile-friendly design\n• Clean layout\n• Easy navigation\n\n💡 Result: Customers can see your menu online.',

      '🍽️ *Restaurant — Accept Online Food Orders*\n\nWe build an online ordering system for your restaurant.\n\n✅ What\'s included:\n• Ordering pages\n• Cart and checkout\n• Payment integration\n• Mobile-friendly design\n• Simple admin panel\n\n💡 Result: Customers can order food online.',

      '🍽️ *Restaurant — Basic Website*\n\nWe create a simple website for your restaurant.\n\n✅ What\'s included:\n• About page\n• Menu preview\n• Contact and location\n• Opening hours\n• Responsive design\n\n💡 Result: A simple online presence for your restaurant.',

      '🍽️ *Restaurant — Complete Restaurant Website*\n\nWe build a complete website for your restaurant.\n\n✅ What\'s included:\n• Home page\n• Full menu pages\n• About and contact pages\n• Modern UI/UX\n• Responsive design\n\n💡 Result: A complete online presence for your restaurant.'
    ],

    /* 2 — Retail Store */
    2: [
      '🛍️ *Retail — Show Your Products Online*\n\nWe create a website to display your products clearly.\n\n✅ What\'s included:\n• Product listing pages\n• Product details\n• Images and prices\n• Categories\n• Responsive design\n\n💡 Result: Customers can browse your products online.',

      '🛍️ *Retail — Create an Online Store*\n\nWe build an online store for your products.\n\n✅ What\'s included:\n• Product pages\n• Cart and checkout\n• Payment integration\n• Mobile-friendly design\n• Admin panel\n\n💡 Result: You can sell your products online.',

      '🛍️ *Retail — Store Management System*\n\nWe build a simple system to manage your store.\n\n✅ What\'s included:\n• Product management\n• Orders management\n• Dashboard\n• Inventory section\n• Basic reports\n\n💡 Result: Easier management of your store.',

      '🛍️ *Retail — Complete Retail Website*\n\nWe create a complete website for your retail business.\n\n✅ What\'s included:\n• Home page\n• Products pages\n• About and contact pages\n• Responsive design\n• Clean UI/UX\n\n💡 Result: A complete website for your store.'
    ],

    /* 3 — Salon / Spa */
    3: [
      '💇 *Salon — Show Your Services Online*\n\nWe create a website to present your salon services online.\n\n✅ What\'s included:\n• Services pages\n• Prices or details\n• Images if needed\n• Contact section\n• Responsive design\n\n💡 Result: Customers can see your services clearly online.',

      '💇 *Salon — Accept Bookings Online*\n\nWe build a booking system for your salon.\n\n✅ What\'s included:\n• Booking form\n• Appointment requests\n• Time selection\n• Mobile-friendly design\n• Simple dashboard\n\n💡 Result: Easier appointment booking.',

      '💇 *Salon — Show Your Work and Gallery*\n\nWe create a gallery website to display your work.\n\n✅ What\'s included:\n• Gallery pages\n• Service images\n• Clean layout\n• Mobile-friendly design\n• Easy navigation\n\n💡 Result: Customers can see your work before booking.',

      '💇 *Salon — Complete Salon Website*\n\nWe build a complete website for your salon.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• Gallery\n• Contact and booking section\n• Responsive design\n\n💡 Result: A complete online presence for your salon.'
    ],

    /* 4 — Healthcare Clinic */
    4: [
      '🏥 *Clinic — Show Your Clinic Services Online*\n\nWe create a website to present your clinic services.\n\n✅ What\'s included:\n• Services pages\n• Departments or specialties\n• Contact section\n• Mobile-friendly design\n• Clean layout\n\n💡 Result: Patients can clearly see your clinic services online.',

      '🏥 *Clinic — Accept Appointments Online*\n\nWe build an appointment booking system for your clinic.\n\n✅ What\'s included:\n• Appointment form\n• Date and time request\n• Patient information form\n• Simple admin view\n• Responsive design\n\n💡 Result: Easier appointment booking for patients.',

      '🏥 *Clinic — Show Doctors and Information*\n\nWe create pages for doctors and clinic information.\n\n✅ What\'s included:\n• Doctors profiles\n• Departments pages\n• Contact and location\n• Working hours\n• Responsive design\n\n💡 Result: A clear clinic information website.',

      '🏥 *Clinic — Complete Clinic Website*\n\nWe build a complete website for your clinic.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• Doctors section\n• Contact and appointment section\n• Responsive design\n\n💡 Result: A complete online presence for your clinic.'
    ],

    /* 5 — Real Estate Agency */
    5: [
      '🏠 *Real Estate — Show Your Properties Online*\n\nWe create a website to display your properties online.\n\n✅ What\'s included:\n• Listings pages\n• Property categories\n• Images\n• Basic property info\n• Responsive design\n\n💡 Result: Clients can browse your properties online.',

      '🏠 *Real Estate — Show Property Details*\n\nWe build detailed pages for each property.\n\n✅ What\'s included:\n• Property details page\n• Images gallery\n• Price and information\n• Location details\n• Clean layout\n\n💡 Result: Clients can clearly understand each property.',

      '🏠 *Real Estate — Let Clients Contact You*\n\nWe make it easy for clients to contact you.\n\n✅ What\'s included:\n• Contact form\n• WhatsApp button\n• Call button\n• Inquiry section\n• Mobile-friendly design\n\n💡 Result: Clients can reach you easily.',

      '🏠 *Real Estate — Complete Real Estate Website*\n\nWe build a complete website for your real estate business.\n\n✅ What\'s included:\n• Home page\n• Listings pages\n• About section\n• Contact section\n• Responsive design\n\n💡 Result: A complete real estate website.'
    ],

    /* 6 — Law Firm */
    6: [
      '⚖️ *Law Firm — Show Your Services Online*\n\nWe create a website to present your legal services.\n\n✅ What\'s included:\n• Services pages\n• Practice areas\n• Contact page\n• Mobile-friendly design\n• Clean layout\n\n💡 Result: Clients can clearly see your services online.',

      '⚖️ *Law Firm — Show Your Team Online*\n\nWe build pages to present your team and firm.\n\n✅ What\'s included:\n• Team profiles\n• Lawyer information\n• About section\n• Contact section\n• Responsive design\n\n💡 Result: A professional presentation of your firm.',

      '⚖️ *Law Firm — Client Portal*\n\nWe build a secure client portal for your firm.\n\n✅ What\'s included:\n• Login page\n• Document upload\n• Client access area\n• Simple dashboard\n• Secure structure\n\n💡 Result: Easier file sharing and communication with clients.',

      '⚖️ *Law Firm — Complete Law Firm Website*\n\nWe build a complete website for your law firm.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• Team section\n• Contact page\n• Responsive design\n\n💡 Result: A complete online presence for your firm.'
    ],

    /* 7 — Educational Institution */
    7: [
      '🎓 *Education — Show Your Courses Online*\n\nWe create a website to display your courses online.\n\n✅ What\'s included:\n• Courses pages\n• Course details\n• Categories\n• Contact section\n• Responsive design\n\n💡 Result: Students can easily view your courses online.',

      '🎓 *Education — Accept Registrations Online*\n\nWe build an online registration system.\n\n✅ What\'s included:\n• Registration form\n• Student information form\n• Course selection\n• Simple dashboard\n• Mobile-friendly design\n\n💡 Result: Easier registration for students.',

      '🎓 *Education — Student Portal*\n\nWe build a simple student portal for your institution.\n\n✅ What\'s included:\n• Login area\n• Student pages\n• Information access\n• Dashboard\n• Responsive design\n\n💡 Result: Students can access their information online.',

      '🎓 *Education — Complete Education Website*\n\nWe build a complete website for your institution.\n\n✅ What\'s included:\n• Home page\n• Courses pages\n• Information pages\n• Contact section\n• Responsive design\n\n💡 Result: A complete website for your institution.'
    ],

    /* 8 — Hotel / Hospitality */
    8: [
      '🏨 *Hotel — Show Your Rooms Online*\n\nWe create a website to display your rooms online.\n\n✅ What\'s included:\n• Rooms pages\n• Images\n• Basic room details\n• Contact section\n• Responsive design\n\n💡 Result: Guests can view your rooms online.',

      '🏨 *Hotel — Accept Bookings Online*\n\nWe build a booking system for your hotel.\n\n✅ What\'s included:\n• Booking form\n• Date request\n• Guest information\n• Simple admin view\n• Mobile-friendly design\n\n💡 Result: Easier room booking for guests.',

      '🏨 *Hotel — Show Hotel Details and Images*\n\nWe create pages to present your hotel clearly.\n\n✅ What\'s included:\n• Images gallery\n• Rooms details\n• Hotel information\n• Contact and location\n• Responsive design\n\n💡 Result: Guests can clearly see your hotel details.',

      '🏨 *Hotel — Complete Hotel Website*\n\nWe build a complete website for your hotel.\n\n✅ What\'s included:\n• Home page\n• Rooms pages\n• Gallery\n• Contact and booking section\n• Responsive design\n\n💡 Result: A complete hotel website.'
    ],

    /* 9 — E-commerce Store */
    9: [
      '🛒 *E-commerce — Show Your Products Online*\n\nWe create pages to display your products clearly.\n\n✅ What\'s included:\n• Product listing pages\n• Categories\n• Images and prices\n• Product details\n• Responsive design\n\n💡 Result: Customers can browse your products online.',

      '🛒 *E-commerce — Create an Online Store*\n\nWe build a complete online store for your products.\n\n✅ What\'s included:\n• Product pages\n• Cart and checkout\n• Payment integration\n• Mobile-friendly design\n• Admin panel\n\n💡 Result: You can sell your products online.',

      '🛒 *E-commerce — Improve Your Store Design*\n\nWe redesign your store interface to make it cleaner and easier to use.\n\n✅ What\'s included:\n• Better layout\n• Better navigation\n• Mobile-friendly design\n• Product page design\n• Clean UI/UX\n\n💡 Result: A better shopping experience for customers.',

      '🛒 *E-commerce — Manage Products and Orders*\n\nWe build a simple system to manage products and orders.\n\n✅ What\'s included:\n• Products management\n• Orders management\n• Dashboard\n• Inventory section\n• Basic reports\n\n💡 Result: Easier daily management of your store.'
    ],

    /* 10 — Fitness / Gym */
    10: [
      '💪 *Fitness — Show Your Services Online*\n\nWe create a website to present your gym services online.\n\n✅ What\'s included:\n• Services pages\n• Classes section\n• Contact page\n• Mobile-friendly design\n• Clean layout\n\n💡 Result: Members can clearly see your services online.',

      '💪 *Fitness — Accept Memberships Online*\n\nWe build a membership signup system.\n\n✅ What\'s included:\n• Signup form\n• Membership plans\n• User information form\n• Simple dashboard\n• Responsive design\n\n💡 Result: Easier membership registration.',

      '💪 *Fitness — Accept Bookings Online*\n\nWe create a booking system for classes or sessions.\n\n✅ What\'s included:\n• Booking form\n• Class or session request\n• Schedule section\n• Admin view\n• Mobile-friendly design\n\n💡 Result: Easier booking for members.',

      '💪 *Fitness — Complete Gym Website*\n\nWe build a complete website for your gym.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• Classes section\n• Contact and booking section\n• Responsive design\n\n💡 Result: A complete website for your gym.'
    ],

    /* 11 — Consulting Business */
    11: [
      '📊 *Consulting — Show Your Services Online*\n\nWe create a website to present your consulting services.\n\n✅ What\'s included:\n• Services pages\n• Contact page\n• About section\n• Responsive design\n• Clean layout\n\n💡 Result: Clients can clearly see your services online.',

      '📊 *Consulting — Present Your Business*\n\nWe build a website to present your business professionally.\n\n✅ What\'s included:\n• About page\n• Services overview\n• Team or profile section\n• Contact page\n• Responsive design\n\n💡 Result: A clear and professional business presentation.',

      '📊 *Consulting — Manage Clients with a System*\n\nWe build a simple client management system.\n\n✅ What\'s included:\n• Client records\n• Dashboard\n• Request tracking\n• Basic reports\n• Simple interface\n\n💡 Result: Easier client management.',

      '📊 *Consulting — Complete Consulting Website*\n\nWe build a complete website for your consulting business.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• About section\n• Contact page\n• Responsive design\n\n💡 Result: A complete online presence for your business.'
    ],

    /* 12 — Construction / Contracting */
    12: [
      '🏗️ *Construction — Show Your Projects Online*\n\nWe create a website to display your projects online.\n\n✅ What\'s included:\n• Projects pages\n• Images gallery\n• Project details\n• Contact section\n• Responsive design\n\n💡 Result: Clients can view your projects online.',

      '🏗️ *Construction — Show Your Services*\n\nWe build a website to present your construction services.\n\n✅ What\'s included:\n• Services pages\n• About section\n• Contact page\n• Mobile-friendly design\n• Clean layout\n\n💡 Result: Clients can clearly see your services.',

      '🏗️ *Construction — Manage Projects with a System*\n\nWe build a simple project management system.\n\n✅ What\'s included:\n• Projects management\n• Dashboard\n• Client records\n• Task tracking\n• Basic reports\n\n💡 Result: Easier project management.',

      '🏗️ *Construction — Complete Construction Website*\n\nWe build a complete website for your construction business.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• Projects section\n• Contact page\n• Responsive design\n\n💡 Result: A complete construction website.'
    ],

    /* 13 — Automotive Business */
    13: [
      '🚗 *Automotive — Show Your Cars Online*\n\nWe create a website to display your cars online.\n\n✅ What\'s included:\n• Car listing pages\n• Images for each car\n• Basic car details\n• Mobile-friendly design\n• Clean layout\n\n💡 Result: Customers can browse your cars online.',

      '🚗 *Automotive — Show Your Services Online*\n\nWe build a website to present your automotive services.\n\n✅ What\'s included:\n• Services pages\n• Details section\n• Contact page\n• Responsive design\n• Clean UI/UX\n\n💡 Result: Customers can clearly see your services online.',

      '🚗 *Automotive — Let Customers Contact You*\n\nWe make it easy for customers to contact you.\n\n✅ What\'s included:\n• Contact form\n• WhatsApp button\n• Call button\n• Inquiry section\n• Mobile-friendly design\n\n💡 Result: Customers can reach you easily.',

      '🚗 *Automotive — Complete Automotive Website*\n\nWe build a complete website for your automotive business.\n\n✅ What\'s included:\n• Home page\n• Cars pages\n• Services pages\n• Contact section\n• Responsive design\n\n💡 Result: A complete website for your automotive business.'
    ],

    /* 14 — Non-Profit Organization */
    14: [
      '🌱 *Non-Profit — Show Your Organization Online*\n\nWe create a website to present your organization online.\n\n✅ What\'s included:\n• About page\n• Activities pages\n• Contact section\n• Responsive design\n• Clean layout\n\n💡 Result: People can clearly see your organization online.',

      '🌱 *Non-Profit — Accept Form Submissions*\n\nWe build online forms for your organization.\n\n✅ What\'s included:\n• Submission forms\n• User information fields\n• Simple admin view\n• Responsive design\n• Clean structure\n\n💡 Result: Easier collection of submissions online.',

      '🌱 *Non-Profit — Manage Your Activities*\n\nWe build a simple system to manage your activities.\n\n✅ What\'s included:\n• Dashboard\n• Records section\n• Basic management tools\n• Reports\n• Simple interface\n\n💡 Result: Easier internal organization.',

      '🌱 *Non-Profit — Complete Website*\n\nWe build a complete website for your organization.\n\n✅ What\'s included:\n• Home page\n• About section\n• Activities pages\n• Contact page\n• Responsive design\n\n💡 Result: A complete website for your organization.'
    ],

    /* 15 — Fashion Brand */
    15: [
      '👗 *Fashion — Show Your Collections Online*\n\nWe create pages to display your collections online.\n\n✅ What\'s included:\n• Collections pages\n• Product images\n• Details and categories\n• Responsive design\n• Clean layout\n\n💡 Result: Customers can browse your collections online.',

      '👗 *Fashion — Create an Online Store*\n\nWe build an online store for your fashion brand.\n\n✅ What\'s included:\n• Product pages\n• Cart and checkout\n• Payment integration\n• Mobile-friendly design\n• Admin panel\n\n💡 Result: You can sell your fashion products online.',

      '👗 *Fashion — Create a System to Manage Products*\n\nWe build a simple system to manage your fashion products.\n\n✅ What\'s included:\n• Product management\n• Orders section\n• Dashboard\n• Inventory section\n• Basic reports\n\n💡 Result: Easier management of your products.',

      '👗 *Fashion — Complete Fashion Website*\n\nWe build a complete website for your fashion brand.\n\n✅ What\'s included:\n• Home page\n• Collections pages\n• About section\n• Contact page\n• Responsive design\n\n💡 Result: A complete website for your brand.'
    ],

    /* 16 — Photography / Creative Studio */
    16: [
      '📸 *Photography — Show Your Portfolio Online*\n\nWe create a portfolio website to display your work online.\n\n✅ What\'s included:\n• Portfolio pages\n• Project categories\n• Images gallery\n• Contact section\n• Responsive design\n\n💡 Result: Clients can view your portfolio online.',

      '📸 *Photography — Accept Booking Requests*\n\nWe build a booking request system for your studio.\n\n✅ What\'s included:\n• Booking form\n• Request details form\n• Contact section\n• Simple admin view\n• Mobile-friendly design\n\n💡 Result: Easier booking requests from clients.',

      '📸 *Photography — Show Your Gallery*\n\nWe create a gallery website to display your images.\n\n✅ What\'s included:\n• Gallery pages\n• Categories\n• Clean layout\n• Mobile-friendly design\n• Easy navigation\n\n💡 Result: Better presentation of your work.',

      '📸 *Photography — Complete Website*\n\nWe build a complete website for your studio.\n\n✅ What\'s included:\n• Home page\n• Portfolio pages\n• Gallery\n• Contact page\n• Responsive design\n\n💡 Result: A complete website for your studio.'
    ],

    /* 17 — Food Delivery / Catering */
    17: [
      '🚚 *Catering — Show Your Menu Online*\n\nWe create a website where customers can view your menu online.\n\n✅ What\'s included:\n• Menu pages\n• Categories and items\n• Images if needed\n• Mobile-friendly design\n• Clean layout\n\n💡 Result: Customers can easily see your menu online.',

      '🚚 *Catering — Accept Orders Online*\n\nWe build an online ordering system for your business.\n\n✅ What\'s included:\n• Ordering pages\n• Cart and checkout\n• Payment integration\n• Mobile-friendly design\n• Simple admin panel\n\n💡 Result: Customers can order online easily.',

      '🚚 *Catering — Accept Requests Online*\n\nWe create an online request form for catering requests.\n\n✅ What\'s included:\n• Request form\n• Event details form\n• Contact section\n• Simple admin view\n• Responsive design\n\n💡 Result: Easier request collection online.',

      '🚚 *Catering — Complete Website*\n\nWe build a complete website for your catering business.\n\n✅ What\'s included:\n• Home page\n• Menu pages\n• Services pages\n• Contact page\n• Responsive design\n\n💡 Result: A complete website for your business.'
    ],

    /* 18 — Tech Startup */
    18: [
      '🚀 *Startup — Show Your Idea Online*\n\nWe create a website to present your startup idea online.\n\n✅ What\'s included:\n• Idea presentation page\n• Product information\n• Contact form\n• Responsive design\n• Clean layout\n\n💡 Result: People can clearly understand your idea online.',

      '🚀 *Startup — Create a Landing Page*\n\nWe build a landing page for your product or startup.\n\n✅ What\'s included:\n• Landing page design\n• Product sections\n• Contact or signup form\n• Mobile-friendly design\n• Clean UI/UX\n\n💡 Result: A clear landing page for your startup.',

      '🚀 *Startup — Build a Web Application*\n\nWe develop a web application based on your idea.\n\n✅ What\'s included:\n• Main features\n• User system\n• Dashboard\n• Database integration\n• Admin panel\n\n💡 Result: A functional web application.',

      '🚀 *Startup — Build a Mobile App*\n\nWe build a mobile app for your startup idea.\n\n✅ What\'s included:\n• Mobile app screens\n• Core features\n• Backend integration\n• User-friendly design\n• Maintenance & support\n\n💡 Result: A mobile app for your startup.'
    ],

    /* 19 — Travel Agency */
    19: [
      '✈️ *Travel — Show Your Packages Online*\n\nWe create a website to display your travel packages online.\n\n✅ What\'s included:\n• Packages pages\n• Categories\n• Images and details\n• Contact section\n• Responsive design\n\n💡 Result: Clients can browse your packages online.',

      '✈️ *Travel — Accept Booking Requests*\n\nWe build a booking request system for your travel agency.\n\n✅ What\'s included:\n• Booking request form\n• Travel details form\n• Contact section\n• Simple admin view\n• Mobile-friendly design\n\n💡 Result: Easier booking requests from clients.',

      '✈️ *Travel — Show Destinations and Details*\n\nWe create pages to display destinations and travel details.\n\n✅ What\'s included:\n• Destinations pages\n• Images gallery\n• Details section\n• Responsive design\n• Clean layout\n\n💡 Result: Clients can clearly view destinations and details.',

      '✈️ *Travel — Complete Website*\n\nWe build a complete website for your travel business.\n\n✅ What\'s included:\n• Home page\n• Packages pages\n• Destinations pages\n• Contact page\n• Responsive design\n\n💡 Result: A complete website for your travel agency.'
    ],

    /* 20 — Other Business */
    20: [
      '💼 *Business — Show Your Business Online*\n\nWe create a website to present your business online.\n\n✅ What\'s included:\n• Business information pages\n• Services section\n• Contact page\n• Responsive design\n• Clean layout\n\n💡 Result: People can clearly see your business online.',

      '💼 *Business — Create an Online Store*\n\nWe build an online store for your products or services.\n\n✅ What\'s included:\n• Product or service pages\n• Cart and checkout\n• Payment integration\n• Mobile-friendly design\n• Admin panel\n\n💡 Result: You can sell online easily.',

      '💼 *Business — Manage Your Business with a System*\n\nWe build a simple system to manage your business.\n\n✅ What\'s included:\n• Dashboard\n• Records management\n• Tracking tools\n• Basic reports\n• Simple interface\n\n💡 Result: Easier management of your business.',

      '💼 *Business — Complete Website*\n\nWe build a complete website for your business.\n\n✅ What\'s included:\n• Home page\n• Services pages\n• About and contact pages\n• Responsive design\n• Clean UI/UX\n\n💡 Result: A complete website for your business.'
    ]
  };

  /* Contact footer appended to every recommendation */
  var CONTACT_FOOTER = '\n\n---\n📩 **Ready to get started?**\nContact the Mobiweb team and we\'ll build a custom plan for your business:\n\n• 💬 WhatsApp: [+961 76 326 003](https://wa.me/96176326003)\n• 📧 Email: info@mobiweb.dev\n• 📸 Instagram: [@mobiweb.dev](https://www.instagram.com/mobiweb.dev?igsh=MTlpNDk3N3h0a2Myeg==)';

  /* ── Chatbot State ──────────────────────────────────────────── */
  var state = { stage: STAGE.PICK_BUSINESS, businessId: null };

  /* ── Build DOM widget ──────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.cb-toggle{position:fixed;bottom:90px;right:28px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#38B6FF 0%,#114CBF 100%);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(56,182,255,.45);z-index:1100;transition:transform .25s ease,box-shadow .25s ease;}',
    '.cb-toggle:hover{transform:scale(1.08);box-shadow:0 8px 32px rgba(56,182,255,.55);}',
    '.cb-toggle svg{transition:transform .25s ease;}',
    '.cb-toggle.open svg.icon-chat{display:none;}',
    '.cb-toggle:not(.open) svg.icon-close{display:none;}',
    '.cb-badge{position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#e53e3e;border-radius:50%;font-size:10px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0);transition:opacity .2s,transform .2s;}',
    '.cb-badge.show{opacity:1;transform:scale(1);}',
    '.cb-backdrop{position:fixed;inset:0;background:rgba(8,15,46,.45);z-index:1099;opacity:0;transition:opacity .3s ease;pointer-events:none;}',
    '.cb-backdrop.open{opacity:1;pointer-events:auto;}',
    '.cb-window{position:fixed;top:50%;left:50%;transform:translate(-50%,-46%) scale(.97);width:400px;max-width:calc(100vw - 24px);height:560px;max-height:calc(100vh - 100px);background:#fff;border-radius:20px;box-shadow:0 24px 80px rgba(11,31,94,.25);display:flex;flex-direction:column;overflow:hidden;z-index:1100;opacity:0;transition:opacity .3s ease,transform .3s ease;pointer-events:none;}',
    '.cb-window.open{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:auto;}',
    '.cb-header{padding:18px 20px;background:linear-gradient(135deg,#0B1F5E 0%,#114CBF 100%);color:#fff;display:flex;align-items:center;gap:12px;flex-shrink:0;}',
    '.cb-avatar{width:40px;height:40px;border-radius:50%;background:rgba(56,182,255,.25);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}',
    '.cb-header-info{flex:1;min-width:0;}',
    '.cb-header-name{font-size:.95rem;font-weight:700;letter-spacing:.01em;}',
    '.cb-header-status{font-size:.75rem;opacity:.75;display:flex;align-items:center;gap:5px;}',
    '.cb-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;flex-shrink:0;}',
    '.cb-close-btn{background:rgba(255,255,255,.12);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;}',
    '.cb-close-btn:hover{background:rgba(255,255,255,.22);}',
    '.cb-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}',
    '.cb-messages::-webkit-scrollbar{width:4px;}',
    '.cb-messages::-webkit-scrollbar-thumb{background:rgba(17,76,191,.18);border-radius:4px;}',
    '.cb-msg{max-width:88%;line-height:1.5;font-size:.875rem;animation:cbFadeUp .25s ease forwards;}',
    '@keyframes cbFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '.cb-msg.bot{align-self:flex-start;}',
    '.cb-msg.user{align-self:flex-end;}',
    '.cb-bubble{padding:10px 14px;border-radius:16px;white-space:pre-wrap;word-break:break-word;}',
    '.cb-msg.bot .cb-bubble{background:#F5F9FF;color:#0B1F5E;border-bottom-left-radius:4px;}',
    '.cb-msg.user .cb-bubble{background:linear-gradient(135deg,#38B6FF,#114CBF);color:#fff;border-bottom-right-radius:4px;}',
    '.cb-options{display:flex;flex-direction:column;gap:6px;margin-top:4px;}',
    '.cb-option{background:#fff;border:1.5px solid rgba(17,76,191,.2);color:#0B1F5E;border-radius:10px;padding:9px 14px;font-size:.84rem;font-weight:500;text-align:left;cursor:pointer;transition:border-color .2s,background .2s;line-height:1.4;}',
    '.cb-option:hover,.cb-option:active{border-color:#38B6FF;background:rgba(56,182,255,.06);}',
    '.cb-typing{display:flex;align-items:center;gap:4px;padding:12px 14px;background:#F5F9FF;border-radius:16px;border-bottom-left-radius:4px;width:fit-content;}',
    '.cb-typing span{width:7px;height:7px;background:#38B6FF;border-radius:50%;animation:cbBounce 1s infinite;}',
    '.cb-typing span:nth-child(2){animation-delay:.16s;}',
    '.cb-typing span:nth-child(3){animation-delay:.32s;}',
    '@keyframes cbBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}',
    '.cb-input-row{padding:12px 16px;border-top:1px solid rgba(17,76,191,.08);display:flex;gap:8px;flex-shrink:0;background:#fff;}',
    '.cb-text-input{flex:1;padding:9px 13px;border:1.5px solid rgba(17,76,191,.18);border-radius:10px;font-size:.875rem;color:#0B1F5E;outline:none;background:#F5F9FF;transition:border-color .2s;}',
    '.cb-text-input:focus{border-color:#38B6FF;}',
    '.cb-text-input::placeholder{color:#a0aec0;}',
    '.cb-send-btn{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#38B6FF,#114CBF);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s;}',
    '.cb-send-btn:hover{opacity:.88;}',
    '.cb-bubble a{color:#38B6FF;text-decoration:underline;}'
  ].join('');
  document.head.appendChild(style);

  /* Toggle button */
  var toggle = document.createElement('button');
  toggle.className = 'cb-toggle';
  toggle.setAttribute('aria-label', 'Open Business Assistant');
  toggle.innerHTML = [
    '<svg class="icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">',
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    '</svg>',
    '<svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    '</svg>',
    '<div class="cb-badge" id="cb-badge">1</div>'
  ].join('');
  document.body.appendChild(toggle);

  /* Backdrop */
  var backdrop = document.createElement('div');
  backdrop.className = 'cb-backdrop';
  document.body.appendChild(backdrop);

  /* Chat window */
  var win = document.createElement('div');
  win.className = 'cb-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'AI Business Assistant');
  win.innerHTML = [
    '<div class="cb-header">',
    '  <div class="cb-avatar">🤖</div>',
    '  <div class="cb-header-info">',
    '    <div class="cb-header-name">Mobiweb Assistant</div>',
    '    <div class="cb-header-status"><div class="cb-dot"></div>Online now</div>',
    '  </div>',
    '  <button class="cb-close-btn" aria-label="Close chat">',
    '    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    '    </svg>',
    '  </button>',
    '</div>',
    '<div class="cb-messages" id="cb-messages"></div>',
    '<div class="cb-input-row">',
    '  <input class="cb-text-input" id="cb-input" type="text" placeholder="Type a number or message…" autocomplete="off" />',
    '  <button class="cb-send-btn" id="cb-send" aria-label="Send">',
    '    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    '    </svg>',
    '  </button>',
    '</div>'
  ].join('');
  document.body.appendChild(win);

  var msgContainer = win.querySelector('#cb-messages');
  var textInput    = win.querySelector('#cb-input');
  var sendBtn      = win.querySelector('#cb-send');
  var badge        = toggle.querySelector('#cb-badge');
  var closeBtn     = win.querySelector('.cb-close-btn');

  var isOpen = false;
  var hasOpened = false;

  /* ── Open / Close ──────────────────────────────────────────── */
  function openChat() {
    isOpen = true;
    toggle.classList.add('open');
    win.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-label', 'Close Business Assistant');
    badge.classList.remove('show');
    if (!hasOpened) {
      hasOpened = true;
      setTimeout(function () { greetUser(); }, 200);
    }
    setTimeout(function () { textInput.focus(); }, 350);
  }

  function closeChat() {
    isOpen = false;
    toggle.classList.remove('open');
    win.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-label', 'Open Business Assistant');
  }

  toggle.addEventListener('click', function () {
    isOpen ? closeChat() : openChat();
  });
  closeBtn.addEventListener('click', closeChat);
  backdrop.addEventListener('click', closeChat);

  /* Show badge after 3s to nudge first-time visitors */
  setTimeout(function () {
    if (!hasOpened) badge.classList.add('show');
  }, 3000);

  /* ── Render helpers ────────────────────────────────────────── */
  function appendBotMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'cb-msg bot';
    var bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.innerHTML = formatText(text);
    msg.appendChild(bubble);
    msgContainer.appendChild(msg);
    scrollBottom();
    return msg;
  }

  function appendUserMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'cb-msg user';
    var bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.textContent = text;
    msg.appendChild(bubble);
    msgContainer.appendChild(msg);
    scrollBottom();
  }

  function appendOptions(opts) {
    var row = document.createElement('div');
    row.className = 'cb-msg bot';
    var inner = document.createElement('div');
    inner.className = 'cb-options';
    opts.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'cb-option';
      btn.textContent = (i + 1) + '. ' + opt;
      btn.addEventListener('click', function () {
        handleOptionClick(i + 1, opt, row);
      });
      inner.appendChild(btn);
    });
    row.appendChild(inner);
    msgContainer.appendChild(row);
    scrollBottom();
    return row;
  }

  function showTyping(callback, delay) {
    var msg = document.createElement('div');
    msg.className = 'cb-msg bot';
    msg.innerHTML = '<div class="cb-typing"><span></span><span></span><span></span></div>';
    msgContainer.appendChild(msg);
    scrollBottom();
    setTimeout(function () {
      msg.remove();
      callback();
    }, delay || 800);
  }

  function scrollBottom() {
    requestAnimationFrame(function () {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    });
  }

  /* Simple markdown → HTML (bold, links, horizontal rule) */
  function formatText(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(17,76,191,.12);margin:8px 0;">')
      .replace(/\n/g, '<br>');
  }

  /* ── Conversation logic ────────────────────────────────────── */
  function greetUser() {
    showTyping(function () {
      appendBotMessage('👋 Hi! I\'m the **Mobiweb Business Assistant**.\n\nI can help you figure out the best digital solution for your business in just 2 quick steps!');
      showTyping(function () {
        appendBotMessage('First, **what type of business do you run?** Select a number below:');
        appendOptions(BUSINESSES.map(function (b) { return b.emoji + ' ' + b.label; }));
      }, 700);
    }, 900);
  }

  function handleOptionClick(num, label, optionRow) {
    optionRow.querySelectorAll('.cb-option').forEach(function (b) {
      b.disabled = true;
      b.style.opacity = '.5';
      b.style.cursor = 'default';
    });

    appendUserMessage(num + '. ' + label);

    if (state.stage === STAGE.PICK_BUSINESS) {
      state.businessId = num;
      state.stage = STAGE.PICK_GOAL;
      var biz = BUSINESSES[num - 1];
      showTyping(function () {
        appendBotMessage('Great choice! 🎯 Now, **what\'s your main goal for ' + biz.label + '?**');
        var goals = GOALS[num] || GOALS[20];
        appendOptions(goals);
      }, 800);

    } else if (state.stage === STAGE.PICK_GOAL) {
      var goalIdx = num - 1;
      var bizRecs = REC[state.businessId] || REC[20];
      var rec = bizRecs[goalIdx] || bizRecs[0];
      state.stage = STAGE.DONE;
      showTyping(function () {
        appendBotMessage('Perfect! Here\'s what we recommend for you 👇');
        showTyping(function () {
          appendBotMessage(rec + CONTACT_FOOTER);
          showTyping(function () {
            appendBotMessage('Would you like to explore another option, or start fresh?');
            var restartRow = appendOptions(['🔄 Start over', '📩 Contact us now']);
            restartRow.querySelectorAll('.cb-option').forEach(function (b, i) {
              b.onclick = null;
              b.addEventListener('click', function () {
                if (i === 0) {
                  restartRow.querySelectorAll('.cb-option').forEach(function (bb) {
                    bb.disabled = true;
                    bb.style.opacity = '.5';
                    bb.style.cursor = 'default';
                  });
                  appendUserMessage('Start over');
                  state = { stage: STAGE.PICK_BUSINESS, businessId: null };
                  showTyping(function () {
                    appendBotMessage('No problem! Let\'s find the right solution for you. 👇\n**What type of business do you run?**');
                    appendOptions(BUSINESSES.map(function (bb) { return bb.emoji + ' ' + bb.label; }));
                  }, 700);
                } else {
                  restartRow.querySelectorAll('.cb-option').forEach(function (bb) {
                    bb.disabled = true;
                    bb.style.opacity = '.5';
                    bb.style.cursor = 'default';
                  });
                  appendUserMessage('Contact us now');
                  showTyping(function () {
                    appendBotMessage('Awesome! Reach out and we\'ll get back to you quickly:\n\n💬 **WhatsApp:** [+961 76 326 003](https://wa.me/96176326003)\n📧 **Email:** info@mobiweb.dev\n📸 **Instagram:** [@mobiweb.dev](https://www.instagram.com/mobiweb.dev?igsh=MTlpNDk3N3h0a2Myeg==)');
                  }, 600);
                }
              });
            });
          }, 600);
        }, 1200);
      }, 900);
    }
  }

  /* ── Text input handler ────────────────────────────────────── */
  function handleTextInput() {
    var val = textInput.value.trim();
    if (!val) return;
    textInput.value = '';

    var num = parseInt(val, 10);

    if (state.stage === STAGE.PICK_BUSINESS) {
      if (num >= 1 && num <= 20) {
        var biz = BUSINESSES[num - 1];
        appendUserMessage(num + '. ' + biz.emoji + ' ' + biz.label);
        state.businessId = num;
        state.stage = STAGE.PICK_GOAL;
        showTyping(function () {
          appendBotMessage('Great choice! 🎯 Now, **what\'s your main goal for ' + biz.label + '?**');
          appendOptions(GOALS[num] || GOALS[20]);
        }, 800);
      } else {
        appendUserMessage(val);
        showTyping(function () {
          appendBotMessage('Please type a number between 1 and 20 to pick your business type, or click one of the options above. 😊');
        }, 600);
      }
    } else if (state.stage === STAGE.PICK_GOAL) {
      if (num >= 1 && num <= 4) {
        var goalIdx = num - 1;
        var goals = GOALS[state.businessId] || GOALS[20];
        appendUserMessage(num + '. ' + goals[goalIdx]);
        var bizRecs = REC[state.businessId] || REC[20];
        var rec = bizRecs[goalIdx] || bizRecs[0];
        state.stage = STAGE.DONE;
        showTyping(function () {
          appendBotMessage('Perfect! Here\'s what we recommend for you 👇');
          showTyping(function () {
            appendBotMessage(rec + CONTACT_FOOTER);
            showTyping(function () {
              appendBotMessage('Would you like to explore another option, or start fresh?');
              var restartRow = appendOptions(['🔄 Start over', '📩 Contact us now']);
              restartRow.querySelectorAll('.cb-option').forEach(function (b, i) {
                b.onclick = null;
                b.addEventListener('click', function () {
                  if (i === 0) {
                    restartRow.querySelectorAll('.cb-option').forEach(function (bb) {
                      bb.disabled = true;
                      bb.style.opacity = '.5';
                      bb.style.cursor = 'default';
                    });
                    appendUserMessage('Start over');
                    state = { stage: STAGE.PICK_BUSINESS, businessId: null };
                    showTyping(function () {
                      appendBotMessage('No problem! Let\'s find the right solution for you. 👇\n**What type of business do you run?**');
                      appendOptions(BUSINESSES.map(function (bb) { return bb.emoji + ' ' + bb.label; }));
                    }, 700);
                  } else {
                    restartRow.querySelectorAll('.cb-option').forEach(function (bb) {
                      bb.disabled = true;
                      bb.style.opacity = '.5';
                      bb.style.cursor = 'default';
                    });
                    appendUserMessage('Contact us now');
                    showTyping(function () {
                      appendBotMessage('Awesome! Reach out and we\'ll get back to you quickly:\n\n💬 **WhatsApp:** [+961 76 326 003](https://wa.me/96176326003)\n📧 **Email:** info@mobiweb.dev\n📸 **Instagram:** [@mobiweb.dev](https://www.instagram.com/mobiweb.dev?igsh=MTlpNDk3N3h0a2Myeg==)');
                    }, 600);
                  }
                });
              });
            }, 600);
          }, 1200);
        }, 900);
      } else {
        appendUserMessage(val);
        showTyping(function () {
          appendBotMessage('Please type a number between 1 and 4 to select your goal, or click one of the options above. 😊');
        }, 600);
      }
    } else {
      appendUserMessage(val);
      showTyping(function () {
        appendBotMessage('For more specific questions, reach us directly:\n\n💬 **WhatsApp:** [+961 76 326 003](https://wa.me/96176326003)\n📧 **Email:** info@mobiweb.dev\n\nWant to **start over**? Type "restart" below.');
        if (val.toLowerCase().indexOf('restart') !== -1 || val === '1') {
          state = { stage: STAGE.PICK_BUSINESS, businessId: null };
        }
      }, 700);
    }
  }

  sendBtn.addEventListener('click', handleTextInput);
  textInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleTextInput();
  });

  /* Handle "restart" keyword at any stage */
  textInput.addEventListener('input', function () {
    if (textInput.value.toLowerCase() === 'restart') {
      textInput.value = '';
      appendUserMessage('Restart');
      state = { stage: STAGE.PICK_BUSINESS, businessId: null };
      showTyping(function () {
        appendBotMessage('Starting fresh! 🔄\n**What type of business do you run?**');
        appendOptions(BUSINESSES.map(function (b) { return b.emoji + ' ' + b.label; }));
      }, 700);
    }
  });

})();