# 🌱 AgriTech E-Commerce Platform

A comprehensive web-based e-commerce platform built for the AgriTech Hackathon, connecting farmers directly with customers across Nigeria. The platform enables farmers to sell their produce online while customers can browse, order, and receive fresh farm products.

## 🎯 Project Overview

This platform addresses the gap between farmers and end consumers by providing a digital marketplace where farmers can list their products and customers can place orders directly. The system supports three main user types: Farmers, Customers, and Administrators.

### 🏪 E-Commerce Features

- **🛒 Product Marketplace** - 10 farm products with real-time pricing in Naira
- **👨‍🌾 Farmer Dashboard** - Product management and order processing
- **👥 Customer Portal** - Browse, order, and track purchases  
- **📋 Order Management** - Complete order lifecycle management
- **💰 Nigerian Pricing** - All prices displayed in Naira (₦)
- **📱 Mobile-First Design** - Optimized for rural smartphone usage

### Key Focus Areas

- **🚜 Farming Efficiency** - Smart tools and IoT sensors for optimized operations
- **📈 Market Access & Information** - Direct buyer connections and real-time pricing
- **🌿 Sustainable Agriculture** - Eco-friendly farming practices and techniques
- **🌡️ Climate Resilience** - Weather forecasting and adaptation strategies
- **📊 Agri-Data Analytics** - Data-driven insights for informed decisions
- **📡 Connectivity & Rural Access** - Internet and mobile connectivity solutions
- **🐄 Crop & Livestock Management** - Monitoring and management tools
- **🍽️ Food Security & Nutrition** - Systems ensuring food availability and quality
- **📚 Agri-Education & Extension Services** - Knowledge sharing platforms

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **UI Framework**: Bootstrap 5 with React Bootstrap components
- **Styling**: Custom CSS with Bootstrap utilities
- **Language**: Modern JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AgriTech
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Platform Features

### 🛒 Marketplace
- **Product Catalog** - 10 diverse farm products (tomatoes, rice, maize, etc.)
- **Real-time Pricing** - All prices in Nigerian Naira (₦)
- **Stock Management** - Live inventory tracking
- **Product Details** - Farmer info, location, quality ratings
- **Order Placement** - Simple ordering with quantity selection

### 📋 Order Management
- **Order Dashboard** - View all orders by status (pending, processing, delivered, cancelled)
- **Customer Details** - Complete customer information and delivery addresses
- **Status Updates** - Real-time order status management
- **Sales Tracking** - Revenue and performance metrics

### 👥 User Profiles
- **Customer Profiles** - Purchase history, preferences, and contact info
- **Farmer Profiles** - Farm details, products, certifications, and ratings
- **Admin Profiles** - System management and user oversight

### 📊 Dashboard & Analytics
- **Farm Metrics** - Crop health, soil moisture, weather conditions
- **Market Insights** - Price trends and demand analytics
- **Performance Tracking** - Sales, orders, and growth metrics

### 📚 Education Hub
- **Agricultural Courses** - Learning modules for farmers
- **Best Practices** - Sustainable farming techniques
- **Extension Services** - Direct access to agricultural experts

## 🎨 Design Principles

- **Mobile-First Design** - Optimized for smartphone usage in rural areas
- **Offline Capability** - Core features work without internet connection
- **High Contrast UI** - Readable in bright outdoor conditions
- **Large Touch Targets** - Easy interaction on mobile devices
- **Semantic HTML** - Accessible to users with disabilities

## � Target Users

### 👨‍🌾 Farmers
- List and manage farm products
- Process customer orders
- Track sales and revenue
- Update inventory and pricing
- Manage delivery schedules

### 👥 Customers  
- Browse fresh farm products
- Place orders with specified quantities
- Track order status and delivery
- View farmer profiles and ratings
- Access purchase history

### 👨‍💻 Administrators
- Oversee platform operations
- Manage user accounts and verification
- Monitor order processing
- Generate analytics and reports
- Handle customer support

## 📂 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── AgriNavbar.jsx   # Navigation component
│   ├── DashboardCards.jsx # Feature overview cards
│   ├── FarmMetrics.jsx  # Farm monitoring dashboard
│   ├── FarmProducts.jsx # Product marketplace
│   ├── OrderManagement.jsx # Order processing system
│   ├── UserProfiles.jsx # User profile management
│   ├── MarketConnect.jsx # Market access features
│   └── LearningHub.jsx  # Educational content
├── App.jsx              # Main application component
├── App.css              # Custom styling
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 💰 Product Catalog (Sample)

The platform features 10 farm products with Nigerian pricing:

1. **Fresh Tomatoes** - ₦2,500/kg (Lagos State)
2. **White Rice** - ₦1,200/kg (Plateau State)  
3. **Yellow Maize** - ₦800/kg (Kano State)
4. **Sweet Potatoes** - ₦1,800/kg (Plateau State)
5. **Fresh Pepper** - ₦3,500/kg (Ogun State)
6. **Plantains** - ₦1,500/kg (Cross River State)
7. **Garden Eggs** - ₦2,200/kg (Enugu State)
8. **Groundnuts** - ₦2,800/kg (Kaduna State)
9. **Fresh Okra** - ₦1,800/kg (Kwara State)
10. **Coconuts** - ₦500/piece (Lagos State)

## 🤝 Contributing

This project was built for the Africa's Talking AgriTech Hackathon. Contributions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 Hackathon Information

Learn more about the AgriTech Hackathon: [Africa's Talking Open Hackathon](https://community.africastalking.com/events/details/africas-talking-africas-talking-community-presents-africas-talking-open-hackathon-agritech-solutions-lagos-nigeria/)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for African agriculture by developers passionate about transforming farming through technology.
