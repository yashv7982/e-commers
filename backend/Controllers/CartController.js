import userModel from "../Models/userModel.js";

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    
    // Ensure userId exists from the token
    if (!req.userId) {
      return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    // Find the user by userId from the token
    const userData = await userModel.findById(req.userId);
    
    // Check if the user exists
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Initialize cartData if it's undefined
    let cartData = userData.cartData || {};

    // Add item to cart
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update the user's cartData in the database
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: 'Added to Cart' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Cart
const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    // Ensure userId exists from the token
    if (!req.userId) {
      return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const userData = await userModel.findById(req.userId);

    // Check if the user exists
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};

    // Check if the item exists in the cart
    if (cartData[itemId] && cartData[itemId][size]) {
      if (quantity > 0) {
        // Update the quantity
        cartData[itemId][size] = quantity;
      } else {
        // Remove the item if quantity is 0
        delete cartData[itemId][size];

        // Remove the item if no sizes are left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      await userModel.findByIdAndUpdate(req.userId, { cartData });
      res.json({ success: true, message: 'Cart updated' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in cart' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Cart
const getUserCart = async (req, res) => {
    try {
      const userId = req.userId;  // Extract the user ID from the request (set by auth middleware)
      const user = await userModel.findById(userId);
      if (user && user.cartData) {
        res.json({ success: true, cart: user.cartData });
      } else {
        res.json({ success: false, message: "No cart data found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export { addToCart, UpdateCart, getUserCart };
