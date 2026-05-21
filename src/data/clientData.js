export const clientData = {
  currency: "Rs.",
  heroBackgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  restaurantInfo: {
    name: "FIGARO",
    tagline: "Delicious Food, Fast Service",
    logo: "/logo.png",
    phone: "0768638725",
    whatsapp: "+94768638725",
    address: "123 Culinary Ave, Food District",
    openingHours: "Mon-Sun: 10:00 AM - 11:00 PM",
    serviceCharge: 5,
    mapEmbedUrl: "https://www.google.com/maps?q=-37.8172,144.9537&z=15&output=embed",
  },

  socialMedia: {
    facebook: { enabled: true, url: "https://facebook.com/yourpage" },
    instagram: { enabled: true, url: "https://instagram.com/yourpage" },
    tiktok: { enabled: true, url: "https://tiktok.com/yourpage" }
  },

  offers: [
    {
      id: "o1",
      title: "Weekend Special",
      description: "2 Burgers + 2 Drinks for Rs. 1,490.00",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
    },
    {
      id: "o2",
      title: "Happy Hour",
      description: "50% off on all Drinks from 4 PM - 6 PM",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
    }
  ],

  gallery: [
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=60",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=60",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=60",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=60"
  ],

  categories: [
    {
        "id": "burger",
        "name": "Burger",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60"
    },
    {
        "id": "rice",
        "name": "Rice",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60"
    },
    {
        "id": "kottu",
        "name": "Kottu",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60"
    },
    {
        "id": "drinks",
        "name": "Drinks",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60"
    },
    {
        "id": "desserts",
        "name": "Desserts",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60"
    },
    {
        "id": "soup",
        "name": "Soup",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60"
    },
    {
        "id": "noodles",
        "name": "Noodles",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60"
    },
    {
        "id": "salads",
        "name": "Salads",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60"
    },
    {
        "id": "pizza",
        "name": "Pizza",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60"
    },
    {
        "id": "pasta",
        "name": "Pasta",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60"
    }
],

  items: [
    {
        "id": "burger1",
        "categoryId": "burger",
        "name": "Chicken Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "burger2",
        "categoryId": "burger",
        "name": "Beef Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1600
                },
                {
                    "label": "Medium",
                    "price": 2000
                },
                {
                    "label": "Large",
                    "price": 2400
                }
            ]
        }
    },
    {
        "id": "burger3",
        "categoryId": "burger",
        "name": "Zinger Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "burger4",
        "categoryId": "burger",
        "name": "Double Cheese Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "burger5",
        "categoryId": "burger",
        "name": "Crispy Chicken Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "burger6",
        "categoryId": "burger",
        "name": "Mushroom Swiss Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1200
                },
                {
                    "label": "Medium",
                    "price": 1600
                },
                {
                    "label": "Large",
                    "price": 2000
                }
            ]
        }
    },
    {
        "id": "burger7",
        "categoryId": "burger",
        "name": "BBQ Bacon Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "burger8",
        "categoryId": "burger",
        "name": "Spicy Fish Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1600
                },
                {
                    "label": "Medium",
                    "price": 2000
                },
                {
                    "label": "Large",
                    "price": 2400
                }
            ]
        }
    },
    {
        "id": "burger9",
        "categoryId": "burger",
        "name": "Veggie Patty Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "burger10",
        "categoryId": "burger",
        "name": "Tower Burger Classic",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "burger11",
        "categoryId": "burger",
        "name": "Chicken Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "burger12",
        "categoryId": "burger",
        "name": "Beef Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "burger13",
        "categoryId": "burger",
        "name": "Zinger Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "burger14",
        "categoryId": "burger",
        "name": "Double Cheese Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "burger15",
        "categoryId": "burger",
        "name": "Crispy Chicken Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "burger16",
        "categoryId": "burger",
        "name": "Mushroom Swiss Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "burger17",
        "categoryId": "burger",
        "name": "BBQ Bacon Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "burger18",
        "categoryId": "burger",
        "name": "Spicy Fish Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "burger19",
        "categoryId": "burger",
        "name": "Veggie Patty Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "burger20",
        "categoryId": "burger",
        "name": "Tower Burger Deluxe",
        "description": "Deliciously prepared burger with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "rice1",
        "categoryId": "rice",
        "name": "Chicken Fried Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "rice2",
        "categoryId": "rice",
        "name": "Egg Fried Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1600
                },
                {
                    "label": "Medium",
                    "price": 2000
                },
                {
                    "label": "Large",
                    "price": 2400
                }
            ]
        }
    },
    {
        "id": "rice3",
        "categoryId": "rice",
        "name": "Seafood Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "rice4",
        "categoryId": "rice",
        "name": "Vegetable Fried Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1000
                },
                {
                    "label": "Medium",
                    "price": 1400
                },
                {
                    "label": "Large",
                    "price": 1800
                }
            ]
        }
    },
    {
        "id": "rice5",
        "categoryId": "rice",
        "name": "Mixed Fried Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "rice6",
        "categoryId": "rice",
        "name": "Nasi Goreng",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "rice7",
        "categoryId": "rice",
        "name": "Garlic Butter Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 500
                },
                {
                    "label": "Medium",
                    "price": 900
                },
                {
                    "label": "Large",
                    "price": 1300
                }
            ]
        }
    },
    {
        "id": "rice8",
        "categoryId": "rice",
        "name": "Schezwan Rice",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "rice9",
        "categoryId": "rice",
        "name": "Mutton Biryani",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "rice10",
        "categoryId": "rice",
        "name": "Chicken Biryani",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1600
                },
                {
                    "label": "Medium",
                    "price": 2000
                },
                {
                    "label": "Large",
                    "price": 2400
                }
            ]
        }
    },
    {
        "id": "rice11",
        "categoryId": "rice",
        "name": "Chicken Fried Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "rice12",
        "categoryId": "rice",
        "name": "Egg Fried Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "rice13",
        "categoryId": "rice",
        "name": "Seafood Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "rice14",
        "categoryId": "rice",
        "name": "Vegetable Fried Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "rice15",
        "categoryId": "rice",
        "name": "Mixed Fried Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1600
                },
                {
                    "label": "Medium",
                    "price": 2000
                },
                {
                    "label": "Large",
                    "price": 2400
                }
            ]
        }
    },
    {
        "id": "rice16",
        "categoryId": "rice",
        "name": "Nasi Goreng Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "rice17",
        "categoryId": "rice",
        "name": "Garlic Butter Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1300
                },
                {
                    "label": "Medium",
                    "price": 1700
                },
                {
                    "label": "Large",
                    "price": 2100
                }
            ]
        }
    },
    {
        "id": "rice18",
        "categoryId": "rice",
        "name": "Schezwan Rice Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1200
                },
                {
                    "label": "Medium",
                    "price": 1600
                },
                {
                    "label": "Large",
                    "price": 2000
                }
            ]
        }
    },
    {
        "id": "rice19",
        "categoryId": "rice",
        "name": "Mutton Biryani Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 500
                },
                {
                    "label": "Medium",
                    "price": 900
                },
                {
                    "label": "Large",
                    "price": 1300
                }
            ]
        }
    },
    {
        "id": "rice20",
        "categoryId": "rice",
        "name": "Chicken Biryani Special",
        "description": "Deliciously prepared rice with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1300
                },
                {
                    "label": "Medium",
                    "price": 1700
                },
                {
                    "label": "Large",
                    "price": 2100
                }
            ]
        }
    },
    {
        "id": "kottu1",
        "categoryId": "kottu",
        "name": "Chicken Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1000
                },
                {
                    "label": "Medium",
                    "price": 1400
                },
                {
                    "label": "Large",
                    "price": 1800
                }
            ]
        }
    },
    {
        "id": "kottu2",
        "categoryId": "kottu",
        "name": "Cheese Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "kottu3",
        "categoryId": "kottu",
        "name": "Mix Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "kottu4",
        "categoryId": "kottu",
        "name": "Seafood Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "kottu5",
        "categoryId": "kottu",
        "name": "Egg Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "kottu6",
        "categoryId": "kottu",
        "name": "Beef Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "kottu7",
        "categoryId": "kottu",
        "name": "Mutton Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 500
                },
                {
                    "label": "Medium",
                    "price": 900
                },
                {
                    "label": "Large",
                    "price": 1300
                }
            ]
        }
    },
    {
        "id": "kottu8",
        "categoryId": "kottu",
        "name": "Vegetable Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "kottu9",
        "categoryId": "kottu",
        "name": "Roast Chicken Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    },
    {
        "id": "kottu10",
        "categoryId": "kottu",
        "name": "Dolphin Kottu",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1300
                },
                {
                    "label": "Medium",
                    "price": 1700
                },
                {
                    "label": "Large",
                    "price": 2100
                }
            ]
        }
    },
    {
        "id": "kottu11",
        "categoryId": "kottu",
        "name": "Chicken Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "kottu12",
        "categoryId": "kottu",
        "name": "Cheese Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "kottu13",
        "categoryId": "kottu",
        "name": "Mix Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "kottu14",
        "categoryId": "kottu",
        "name": "Seafood Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "kottu15",
        "categoryId": "kottu",
        "name": "Egg Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "kottu16",
        "categoryId": "kottu",
        "name": "Beef Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "kottu17",
        "categoryId": "kottu",
        "name": "Mutton Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1200
                },
                {
                    "label": "Medium",
                    "price": 1600
                },
                {
                    "label": "Large",
                    "price": 2000
                }
            ]
        }
    },
    {
        "id": "kottu18",
        "categoryId": "kottu",
        "name": "Vegetable Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "kottu19",
        "categoryId": "kottu",
        "name": "Roast Chicken Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "kottu20",
        "categoryId": "kottu",
        "name": "Dolphin Kottu Spicy",
        "description": "Deliciously prepared kottu with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "drinks1",
        "categoryId": "drinks",
        "name": "Coca Cola",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "drinks2",
        "categoryId": "drinks",
        "name": "Pepsi",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1700
        }
    },
    {
        "id": "drinks3",
        "categoryId": "drinks",
        "name": "Sprite",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 900
        }
    },
    {
        "id": "drinks4",
        "categoryId": "drinks",
        "name": "Fanta",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "drinks5",
        "categoryId": "drinks",
        "name": "Mango Juice",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1600
        }
    },
    {
        "id": "drinks6",
        "categoryId": "drinks",
        "name": "Apple Juice",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "drinks7",
        "categoryId": "drinks",
        "name": "Iced Tea",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "drinks8",
        "categoryId": "drinks",
        "name": "Iced Coffee",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 800
        }
    },
    {
        "id": "drinks9",
        "categoryId": "drinks",
        "name": "Milkshake",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 600
        }
    },
    {
        "id": "drinks10",
        "categoryId": "drinks",
        "name": "Lemonade",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 900
        }
    },
    {
        "id": "drinks11",
        "categoryId": "drinks",
        "name": "Coca Cola Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1400
        }
    },
    {
        "id": "drinks12",
        "categoryId": "drinks",
        "name": "Pepsi Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "drinks13",
        "categoryId": "drinks",
        "name": "Sprite Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1700
        }
    },
    {
        "id": "drinks14",
        "categoryId": "drinks",
        "name": "Fanta Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "drinks15",
        "categoryId": "drinks",
        "name": "Mango Juice Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "drinks16",
        "categoryId": "drinks",
        "name": "Apple Juice Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1400
        }
    },
    {
        "id": "drinks17",
        "categoryId": "drinks",
        "name": "Iced Tea Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1600
        }
    },
    {
        "id": "drinks18",
        "categoryId": "drinks",
        "name": "Iced Coffee Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1300
        }
    },
    {
        "id": "drinks19",
        "categoryId": "drinks",
        "name": "Milkshake Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 700
        }
    },
    {
        "id": "drinks20",
        "categoryId": "drinks",
        "name": "Lemonade Large",
        "description": "Deliciously prepared drinks with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 800
        }
    },
    {
        "id": "desserts1",
        "categoryId": "desserts",
        "name": "Chocolate Cake",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "desserts2",
        "categoryId": "desserts",
        "name": "Vanilla Ice Cream",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1600
        }
    },
    {
        "id": "desserts3",
        "categoryId": "desserts",
        "name": "Brownie",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "desserts4",
        "categoryId": "desserts",
        "name": "Cheesecake",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1700
        }
    },
    {
        "id": "desserts5",
        "categoryId": "desserts",
        "name": "Fruit Salad",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1000
        }
    },
    {
        "id": "desserts6",
        "categoryId": "desserts",
        "name": "Watalappan",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "desserts7",
        "categoryId": "desserts",
        "name": "Caramel Pudding",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "desserts8",
        "categoryId": "desserts",
        "name": "Tiramisu",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "desserts9",
        "categoryId": "desserts",
        "name": "Panna Cotta",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "desserts10",
        "categoryId": "desserts",
        "name": "Sundae",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "desserts11",
        "categoryId": "desserts",
        "name": "Chocolate Cake Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1700
        }
    },
    {
        "id": "desserts12",
        "categoryId": "desserts",
        "name": "Vanilla Ice Cream Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1900
        }
    },
    {
        "id": "desserts13",
        "categoryId": "desserts",
        "name": "Brownie Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "desserts14",
        "categoryId": "desserts",
        "name": "Cheesecake Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1900
        }
    },
    {
        "id": "desserts15",
        "categoryId": "desserts",
        "name": "Fruit Salad Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1000
        }
    },
    {
        "id": "desserts16",
        "categoryId": "desserts",
        "name": "Watalappan Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "desserts17",
        "categoryId": "desserts",
        "name": "Caramel Pudding Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "desserts18",
        "categoryId": "desserts",
        "name": "Tiramisu Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "desserts19",
        "categoryId": "desserts",
        "name": "Panna Cotta Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1400
        }
    },
    {
        "id": "desserts20",
        "categoryId": "desserts",
        "name": "Sundae Extra",
        "description": "Deliciously prepared desserts with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 700
        }
    },
    {
        "id": "soup1",
        "categoryId": "soup",
        "name": "Chicken Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "soup2",
        "categoryId": "soup",
        "name": "Tomato Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "soup3",
        "categoryId": "soup",
        "name": "Mushroom Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 600
        }
    },
    {
        "id": "soup4",
        "categoryId": "soup",
        "name": "Sweet Corn Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 900
        }
    },
    {
        "id": "soup5",
        "categoryId": "soup",
        "name": "Hot and Sour Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "soup6",
        "categoryId": "soup",
        "name": "Seafood Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 700
        }
    },
    {
        "id": "soup7",
        "categoryId": "soup",
        "name": "Vegetable Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "soup8",
        "categoryId": "soup",
        "name": "Mutton Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "soup9",
        "categoryId": "soup",
        "name": "Noodle Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "soup10",
        "categoryId": "soup",
        "name": "Pumpkin Soup",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "soup11",
        "categoryId": "soup",
        "name": "Chicken Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "soup12",
        "categoryId": "soup",
        "name": "Tomato Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "soup13",
        "categoryId": "soup",
        "name": "Mushroom Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 900
        }
    },
    {
        "id": "soup14",
        "categoryId": "soup",
        "name": "Sweet Corn Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 900
        }
    },
    {
        "id": "soup15",
        "categoryId": "soup",
        "name": "Hot and Sour Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1000
        }
    },
    {
        "id": "soup16",
        "categoryId": "soup",
        "name": "Seafood Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "soup17",
        "categoryId": "soup",
        "name": "Vegetable Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 800
        }
    },
    {
        "id": "soup18",
        "categoryId": "soup",
        "name": "Mutton Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "soup19",
        "categoryId": "soup",
        "name": "Noodle Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 800
        }
    },
    {
        "id": "soup20",
        "categoryId": "soup",
        "name": "Pumpkin Soup Thick",
        "description": "Deliciously prepared soup with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "noodles1",
        "categoryId": "noodles",
        "name": "Chicken Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "noodles2",
        "categoryId": "noodles",
        "name": "Egg Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "noodles3",
        "categoryId": "noodles",
        "name": "Seafood Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "noodles4",
        "categoryId": "noodles",
        "name": "Veggie Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1000
                },
                {
                    "label": "Medium",
                    "price": 1400
                },
                {
                    "label": "Large",
                    "price": 1800
                }
            ]
        }
    },
    {
        "id": "noodles5",
        "categoryId": "noodles",
        "name": "Mixed Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "noodles6",
        "categoryId": "noodles",
        "name": "Hakka Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "noodles7",
        "categoryId": "noodles",
        "name": "Singapore Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "noodles8",
        "categoryId": "noodles",
        "name": "Schezwan Noodles",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "noodles9",
        "categoryId": "noodles",
        "name": "Chow Mein",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "noodles10",
        "categoryId": "noodles",
        "name": "Pad Thai",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "noodles11",
        "categoryId": "noodles",
        "name": "Chicken Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "noodles12",
        "categoryId": "noodles",
        "name": "Egg Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1300
                },
                {
                    "label": "Medium",
                    "price": 1700
                },
                {
                    "label": "Large",
                    "price": 2100
                }
            ]
        }
    },
    {
        "id": "noodles13",
        "categoryId": "noodles",
        "name": "Seafood Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "noodles14",
        "categoryId": "noodles",
        "name": "Veggie Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "noodles15",
        "categoryId": "noodles",
        "name": "Mixed Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "noodles16",
        "categoryId": "noodles",
        "name": "Hakka Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "noodles17",
        "categoryId": "noodles",
        "name": "Singapore Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "noodles18",
        "categoryId": "noodles",
        "name": "Schezwan Noodles Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "noodles19",
        "categoryId": "noodles",
        "name": "Chow Mein Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    },
    {
        "id": "noodles20",
        "categoryId": "noodles",
        "name": "Pad Thai Special",
        "description": "Deliciously prepared noodles with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "salads1",
        "categoryId": "salads",
        "name": "Greek Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "salads2",
        "categoryId": "salads",
        "name": "Caesar Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "salads3",
        "categoryId": "salads",
        "name": "Chicken Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1900
        }
    },
    {
        "id": "salads4",
        "categoryId": "salads",
        "name": "Fruit Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1700
        }
    },
    {
        "id": "salads5",
        "categoryId": "salads",
        "name": "Green Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "salads6",
        "categoryId": "salads",
        "name": "Russian Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1200
        }
    },
    {
        "id": "salads7",
        "categoryId": "salads",
        "name": "Tuna Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 900
        }
    },
    {
        "id": "salads8",
        "categoryId": "salads",
        "name": "Pasta Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "salads9",
        "categoryId": "salads",
        "name": "Macaroni Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 600
        }
    },
    {
        "id": "salads10",
        "categoryId": "salads",
        "name": "Potato Salad",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1900
        }
    },
    {
        "id": "salads11",
        "categoryId": "salads",
        "name": "Greek Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1800
        }
    },
    {
        "id": "salads12",
        "categoryId": "salads",
        "name": "Caesar Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1100
        }
    },
    {
        "id": "salads13",
        "categoryId": "salads",
        "name": "Chicken Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1300
        }
    },
    {
        "id": "salads14",
        "categoryId": "salads",
        "name": "Fruit Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 500
        }
    },
    {
        "id": "salads15",
        "categoryId": "salads",
        "name": "Green Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 700
        }
    },
    {
        "id": "salads16",
        "categoryId": "salads",
        "name": "Russian Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1500
        }
    },
    {
        "id": "salads17",
        "categoryId": "salads",
        "name": "Tuna Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1600
        }
    },
    {
        "id": "salads18",
        "categoryId": "salads",
        "name": "Pasta Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 700
        }
    },
    {
        "id": "salads19",
        "categoryId": "salads",
        "name": "Macaroni Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1600
        }
    },
    {
        "id": "salads20",
        "categoryId": "salads",
        "name": "Potato Salad Fresh",
        "description": "Deliciously prepared salads with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "single",
            "price": 1900
        }
    },
    {
        "id": "pizza1",
        "categoryId": "pizza",
        "name": "Margherita Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "pizza2",
        "categoryId": "pizza",
        "name": "Pepperoni Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 500
                },
                {
                    "label": "Medium",
                    "price": 900
                },
                {
                    "label": "Large",
                    "price": 1300
                }
            ]
        }
    },
    {
        "id": "pizza3",
        "categoryId": "pizza",
        "name": "BBQ Chicken Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "pizza4",
        "categoryId": "pizza",
        "name": "Veggie Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "pizza5",
        "categoryId": "pizza",
        "name": "Hawaiian Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "pizza6",
        "categoryId": "pizza",
        "name": "Seafood Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1200
                },
                {
                    "label": "Medium",
                    "price": 1600
                },
                {
                    "label": "Large",
                    "price": 2000
                }
            ]
        }
    },
    {
        "id": "pizza7",
        "categoryId": "pizza",
        "name": "Meat Lovers Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "pizza8",
        "categoryId": "pizza",
        "name": "Cheese Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "pizza9",
        "categoryId": "pizza",
        "name": "Spicy Chicken Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "pizza10",
        "categoryId": "pizza",
        "name": "Mushroom Pizza",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1500
                },
                {
                    "label": "Medium",
                    "price": 1900
                },
                {
                    "label": "Large",
                    "price": 2300
                }
            ]
        }
    },
    {
        "id": "pizza11",
        "categoryId": "pizza",
        "name": "Margherita Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "pizza12",
        "categoryId": "pizza",
        "name": "Pepperoni Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 600
                },
                {
                    "label": "Medium",
                    "price": 1000
                },
                {
                    "label": "Large",
                    "price": 1400
                }
            ]
        }
    },
    {
        "id": "pizza13",
        "categoryId": "pizza",
        "name": "BBQ Chicken Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1000
                },
                {
                    "label": "Medium",
                    "price": 1400
                },
                {
                    "label": "Large",
                    "price": 1800
                }
            ]
        }
    },
    {
        "id": "pizza14",
        "categoryId": "pizza",
        "name": "Veggie Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    },
    {
        "id": "pizza15",
        "categoryId": "pizza",
        "name": "Hawaiian Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1000
                },
                {
                    "label": "Medium",
                    "price": 1400
                },
                {
                    "label": "Large",
                    "price": 1800
                }
            ]
        }
    },
    {
        "id": "pizza16",
        "categoryId": "pizza",
        "name": "Seafood Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "pizza17",
        "categoryId": "pizza",
        "name": "Meat Lovers Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 800
                },
                {
                    "label": "Medium",
                    "price": 1200
                },
                {
                    "label": "Large",
                    "price": 1600
                }
            ]
        }
    },
    {
        "id": "pizza18",
        "categoryId": "pizza",
        "name": "Cheese Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "pizza19",
        "categoryId": "pizza",
        "name": "Spicy Chicken Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "pizza20",
        "categoryId": "pizza",
        "name": "Mushroom Pizza Supreme",
        "description": "Deliciously prepared pizza with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1500
                },
                {
                    "label": "Medium",
                    "price": 1900
                },
                {
                    "label": "Large",
                    "price": 2300
                }
            ]
        }
    },
    {
        "id": "pasta1",
        "categoryId": "pasta",
        "name": "Chicken Pasta",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=60",
        "featured": true,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "pasta2",
        "categoryId": "pasta",
        "name": "Cheese Pasta",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "pasta3",
        "categoryId": "pasta",
        "name": "Seafood Pasta",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 700
                },
                {
                    "label": "Medium",
                    "price": 1100
                },
                {
                    "label": "Large",
                    "price": 1500
                }
            ]
        }
    },
    {
        "id": "pasta4",
        "categoryId": "pasta",
        "name": "Veggie Pasta",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1200
                },
                {
                    "label": "Medium",
                    "price": 1600
                },
                {
                    "label": "Large",
                    "price": 2000
                }
            ]
        }
    },
    {
        "id": "pasta5",
        "categoryId": "pasta",
        "name": "Spicy Pasta",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1300
                },
                {
                    "label": "Medium",
                    "price": 1700
                },
                {
                    "label": "Large",
                    "price": 2100
                }
            ]
        }
    },
    {
        "id": "pasta6",
        "categoryId": "pasta",
        "name": "Carbonara",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1300
                },
                {
                    "label": "Medium",
                    "price": 1700
                },
                {
                    "label": "Large",
                    "price": 2100
                }
            ]
        }
    },
    {
        "id": "pasta7",
        "categoryId": "pasta",
        "name": "Bolognese",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1000
                },
                {
                    "label": "Medium",
                    "price": 1400
                },
                {
                    "label": "Large",
                    "price": 1800
                }
            ]
        }
    },
    {
        "id": "pasta8",
        "categoryId": "pasta",
        "name": "Mac and Cheese",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    },
    {
        "id": "pasta9",
        "categoryId": "pasta",
        "name": "Penne Arrabbiata",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1500
                },
                {
                    "label": "Medium",
                    "price": 1900
                },
                {
                    "label": "Large",
                    "price": 2300
                }
            ]
        }
    },
    {
        "id": "pasta10",
        "categoryId": "pasta",
        "name": "Fettuccine Alfredo",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1400
                },
                {
                    "label": "Medium",
                    "price": 1800
                },
                {
                    "label": "Large",
                    "price": 2200
                }
            ]
        }
    },
    {
        "id": "pasta11",
        "categoryId": "pasta",
        "name": "Chicken Pasta Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "pasta12",
        "categoryId": "pasta",
        "name": "Cheese Pasta Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1900
                },
                {
                    "label": "Medium",
                    "price": 2300
                },
                {
                    "label": "Large",
                    "price": 2700
                }
            ]
        }
    },
    {
        "id": "pasta13",
        "categoryId": "pasta",
        "name": "Seafood Pasta Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "pasta14",
        "categoryId": "pasta",
        "name": "Veggie Pasta Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    },
    {
        "id": "pasta15",
        "categoryId": "pasta",
        "name": "Spicy Pasta Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1100
                },
                {
                    "label": "Medium",
                    "price": 1500
                },
                {
                    "label": "Large",
                    "price": 1900
                }
            ]
        }
    },
    {
        "id": "pasta16",
        "categoryId": "pasta",
        "name": "Carbonara Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1600
                },
                {
                    "label": "Medium",
                    "price": 2000
                },
                {
                    "label": "Large",
                    "price": 2400
                }
            ]
        }
    },
    {
        "id": "pasta17",
        "categoryId": "pasta",
        "name": "Bolognese Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    },
    {
        "id": "pasta18",
        "categoryId": "pasta",
        "name": "Mac and Cheese Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 900
                },
                {
                    "label": "Medium",
                    "price": 1300
                },
                {
                    "label": "Large",
                    "price": 1700
                }
            ]
        }
    },
    {
        "id": "pasta19",
        "categoryId": "pasta",
        "name": "Penne Arrabbiata Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1800
                },
                {
                    "label": "Medium",
                    "price": 2200
                },
                {
                    "label": "Large",
                    "price": 2600
                }
            ]
        }
    },
    {
        "id": "pasta20",
        "categoryId": "pasta",
        "name": "Fettuccine Alfredo Delight",
        "description": "Deliciously prepared pasta with fresh ingredients.",
        "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=60",
        "featured": false,
        "pricing": {
            "type": "multi",
            "options": [
                {
                    "label": "Small",
                    "price": 1700
                },
                {
                    "label": "Medium",
                    "price": 2100
                },
                {
                    "label": "Large",
                    "price": 2500
                }
            ]
        }
    }
]
};
