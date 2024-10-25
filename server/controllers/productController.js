import Product from '../models/Product.js';

// 1. Create a new product
export const createProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    // Add other product fields as needed
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      status: "success",
      success: true,
      message: "Product Successfully Created",
      data: savedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Product Cannot be Created. Try again",
      error: err.message,
    });
  }
};

// 2. Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Error retrieving products",
      error: err.message,
    });
  }
};

// 3. Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      status: "success",
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Error retrieving product",
      error: err.message,
    });
  }
};

// 4. Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      status: "success",
      success: true,
      message: "Product Successfully Updated",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Product Cannot be Updated. Try again",
      error: err.message,
    });
  }
};

// 5. Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      status: "success",
      success: true,
      message: "Product Successfully Deleted",
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      success: false,
      message: "Product Cannot be Deleted. Try again",
      error: err.message,
    });
  }
};
