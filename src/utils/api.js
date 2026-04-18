export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Return fallback data if API fails
    return [
      { id: 1, title: "Premium Savings Plus", category: "electronics", price: 99.99, description: "High-yield savings account with competitive interest rates", image: "https://via.placeholder.com/200" },
      { id: 2, title: "Growth Mutual Fund", category: "jewelery", price: 499.99, description: "Diversified equity fund for long-term growth", image: "https://via.placeholder.com/200" },
      { id: 3, title: "Crypto Investment Fund", category: "women's clothing", price: 49.99, description: "Digital asset investment with high growth potential", image: "https://via.placeholder.com/200" },
      { id: 4, title: "Life Insurance Plus", category: "men's clothing", price: 199.99, description: "Comprehensive life coverage with investment component", image: "https://via.placeholder.com/200" }
    ];
  }
};