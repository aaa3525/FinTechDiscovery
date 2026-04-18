# 💰 FinTech Discovery Platform

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=61dafb)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.20.0-ca4245?logo=react-router&logoColor=ca4245)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 Live Demo

**[View Live Application](https://fintech-app.vercel.app)**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Financial Logic Explained](#financial-logic-explained)
- [Component Architecture](#component-architecture)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Future Improvements](#future-improvements)

---

## 📖 Project Overview

The **FinTech Discovery Platform** is a sophisticated React-based financial technology application that helps users discover, compare, and manage financial products based on their personal investment profile and risk tolerance.

Unlike generic e-commerce platforms, this system treats products as **genuine financial instruments** with real-world attributes including expected returns, risk levels, liquidity constraints, time horizons, and minimum investment requirements.

### The Problem This Solves

Traditional investment platforms overwhelm users with complex terminology. This platform simplifies financial discovery by:
1. **Categorizing products** into Savings, Investment, Insurance, and Crypto
2. **Providing decision insights** dynamically for each product
3. **Enabling portfolio tracking** with real calculations
4. **Offering return projections** using compound interest formulas

---

## ✨ Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Home Page** | Platform overview, dynamic featured products, category navigation, quick stats | ✅ |
| **Product Listing** | Multi-filter system (category, risk, return, budget) with AND logic | ✅ |
| **Product Detail** | Complete product info, return calculator, decision insights | ✅ |
| **Portfolio Management** | Track investments, view risk distribution, remove products | ✅ |
| **Local Storage** | Portfolio persists after page refresh | ✅ |
| **Responsive Design** | Works on desktop, tablet, and mobile devices | ✅ |

### Filtering Capabilities (AND Logic)

| Filter | Type | Options |
|--------|------|---------|
| Category | Dropdown | All, Savings, Investment, Insurance, Crypto |
| Risk Level | Dropdown | All, Low, Medium, High |
| Return Range | Slider | 0% - 30% |
| Investment Budget | Slider | PKR 10,000 - 100,000 |

### Financial Calculations

- **Return Projection**: `Future Value = Principal × (1 + Rate)^Years`
- **Portfolio Average Return**: `Sum of all product returns / Number of products`
- **Risk Distribution**: Percentage breakdown by risk level

---

## 💡 Financial Logic Explained

### Data Model (8 Mandatory Attributes)

Every financial product in the system has these attributes:
{
  id: 1,                          // Unique identifier
  name: "High-Yield Savings",     // Product name
  category: "Savings",            // Savings | Investment | Insurance | Crypto
  expectedReturn: 4.5,            // Annual return percentage
  riskLevel: "Low",               // Low | Medium | High
  liquidity: "Easy",              // Easy | Moderate | Locked
  timeHorizon: "Short",           // Short | Medium | Long
  minInvestment: 5000,            // Minimum PKR amount
  description: "Secure savings..." // Product description
}

### Risk-Return Relationship (Consistent & Realistic)

| Risk Level | Return Range | Liquidity | Time Horizon | Example Products |
|------------|--------------|-----------|--------------|------------------|
| **Low** | 3% - 7% | Easy/Moderate | Short/Medium | Savings, Bonds |
| **Medium** | 7% - 12% | Moderate | Medium/Long | Mutual Funds, REITs |
| **High** | 12% - 27% | Easy | Long | Crypto, Growth Stocks |

**Data Consistency Rules Enforced:**
- ✅ Low risk products NEVER have high returns (max 7%)
- ✅ Locked liquidity products have long time horizons
- ✅ High risk products have high return potential

### Featured Products Logic

Featured products are **dynamically selected** - NOT hardcoded:

// Algorithm: Select highest return product from each category
const getFeaturedProducts = () => {
  const categories = ['Savings', 'Investment', 'Insurance', 'Crypto'];
  return categories.map(category => 
    products.filter(p => p.category === category)
      .reduce((best, current) => 
        current.expectedReturn > best.expectedReturn ? current : best
      )
  );
};

### Decision Insights Generation

Insights are **dynamically generated** based on product attributes:
function generateDecisionInsights(product) {
  const insights = [];
  
  if (product.riskLevel === 'Low') {
    insights.push("✓ Suitable for conservative investors prioritizing capital preservation");
  } else if (product.riskLevel === 'High') {
    insights.push("✓ Best for aggressive investors comfortable with significant volatility");
  }
  
  if (product.liquidity === 'Locked') {
    insights.push("✓ Requires long-term commitment; early withdrawal may incur penalties");
  }
  
  if (product.timeHorizon === 'Long') {
    insights.push("✓ Optimal when held for 5+ years to maximize returns");
  }
  
  return insights;
}

### Return Projection Calculator

Uses compound interest formula:


Future Value = Principal × (1 + Annual Return Rate)^Years

Example:
- Investment: PKR 50,000
- Return Rate: 10% per year
- Period: 5 years
- Future Value = 50,000 × (1 + 0.10)^5 = PKR 80,525
- Total Profit = PKR 30,525 (61% return)


---

## 🏗️ Component Architecture

### Hierarchy Diagram
![alt text](Diagrams/ComponentDiagram.png)

### Component Descriptions

| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **Navbar** | `components/Navbar.js` | Navigation with portfolio count | `portfolioCount` |
| **ProductCard** | `components/ProductCard.js` | Display product summary | `product`, `addToPortfolio` |
| **Home** | `pages/Home.js` | Landing page with overview | `products` |
| **Products** | `pages/Products.js` | Filterable product listing | `products`, `addToPortfolio` |
| **ProductDetail** | `pages/ProductDetail.js` | Single product view | `products`, `addToPortfolio` |
| **Portfolio** | `pages/Portfolio.js` | Portfolio management | `portfolio`, `removeFromPortfolio` |

### State Management

| State | Location | Purpose |
|-------|----------|---------|
| `products` | App.js | Product data from sample dataset |
| `portfolio` | App.js | User's selected products (persisted to localStorage) |
| `filters` | Products.js | Current filter selections |
| `investmentAmount` | ProductDetail.js | Calculator input value |

### Data Flow
![alt text](Diagrams/FlowDiagram.png)



Example - Adding to Portfolio:
1. User clicks "Add" on ProductCard
2. addToPortfolio() called in App.js
3. portfolio state updated
4. localStorage saved
5. Navbar portfolio count updates
6. Portfolio page shows new item

---

## 🛠️ Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Step-by-Step Setup

# 1. Clone the repository
git clone https://github.com/aaa3525/FinTechDiscovery

# 2. Navigate to project directory
cd fintech-discovery

# 3. Install dependencies
npm install

# 4. Install React Router
npm install react-router-dom

# 5. Start development server
npm start

The application will open at `http://localhost:3000`

### Building for Production


npm run build


The `build` folder will contain optimized production files.

### Troubleshooting

| Issue | Solution |
|-------|----------|
| `react-scripts not found` | Run `npm install` again |
| `module not found` | Run `npm install react-router-dom` |
| Port 3000 in use | Run `npm start -- --port 3001` |

---

## 📸 Screenshots

### Home Page
![Home Page]![alt text](</ScreenshotsOfPages/Screenshot 2026-04-18 183227.png>)


### Product Listing with Filters
![Product Listing](</ScreenshotsOfPages/Screenshot 2026-04-18 183252.png>)


### Product Detail Page
![Product Detail](</ScreenshotsOfPages/Screenshot 2026-04-18 183335.png>)


### Profile
![Profile](</ScreenshotsOfPages/Screenshot 2026-04-18 183404.png>)

### Portfoli
![Portfolio](</ScreenshotsOfPages/Screenshot 2026-04-18 183504.png>)


### Recommendations
![Recommendations](</ScreenshotsOfPages/Screenshot 2026-04-18 183430.png>)


---

## 💻 Technologies Used

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | React | 18.2.0 | UI Framework |
| **Routing** | React Router | 6.20.0 | Navigation |
| **Styling** | Plain CSS | - | Custom styling (no libraries) |
| **State** | useState | Built-in | Local state management |
| **Persistence** | localStorage | Built-in | Save portfolio data |
| **Icons** | Emoji/Unicode | - | Visual indicators |

### No UI Libraries Used

✅ This project uses **100% custom CSS** - no Bootstrap, Material-UI, Tailwind, or any pre-built component libraries.

---

fintech-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── ProductCard.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   └── Portfolio.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
---

## 🧪 Testing the Application

### Test Scenarios

1. **Browse Products**
   - Navigate to Products page
   - Apply different filters
   - Verify AND logic (products must satisfy ALL filters)

2. **View Product Details**
   - Click "Details" on any product
   - Use the return calculator (adjust amount and years)
   - Read decision insights

3. **Build Portfolio**
   - Add products from listing or detail page
   - Check portfolio count in navbar
   - View portfolio summary and risk distribution
   - Remove products from portfolio

4. **Refresh Page**
   - Portfolio should persist after refresh (localStorage)

---

## 🔮 Future Improvements

- [ ] **User Profile** - Save risk tolerance and investment preferences
- [ ] **Recommendation Engine** - Personalized product suggestions
- [ ] **Comparison Feature** - Compare multiple products side by side
- [ ] **Dark Mode** - Theme toggle with localStorage persistence
- [ ] **Charts** - Visual portfolio performance graphs
- [ ] **Export Portfolio** - PDF/CSV download functionality
- [ ] **Real API Data** - Connect to live financial APIs
- [ ] **Authentication** - User accounts and multiple portfolios

---

## 📄 License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2026 Amnah

---

## 👤 Author

**Amnah**
- GitHub: [@aaa3525](https://github.com/aaa3525)
- Project: [FinTech Discovery Platform](https://github.com/aaa3525/fintech-app)
vercel: https://fin-tech-discovery.vercel.app/

---








