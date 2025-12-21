import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { ArrowLeft, ArrowRight, MessageCircle, MapPin, Tag } from 'lucide-react';
import Button from './Button';
import Footer from './Footer';

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const user = useSelector((state) => state.auth.userData);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState('');

  const productExistInCart = cartItems.some((p) => p._id === productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`http://localhost:5000/api/products/getproduct/${productId}`, {
          headers: {
            'auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      showMessage('Added to Cart');
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productId));
    showMessage('Removed from Cart');
  };

  const nextImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#efe6de] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#efe6de] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            className="bg-[#dd3a44] text-white hover:bg-[#E85C64]"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#efe6de] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Button
            className="bg-[#dd3a44] text-white hover:bg-[#E85C64]"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efe6de]">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#dd3a44] hover:text-[#E85C64] mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <img
                src={
                  product.images?.length
                    ? product.images[currentImageIndex]
                    : 'https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg'
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <ArrowLeft className="text-[#dd3a44]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <ArrowRight className="text-[#dd3a44]" />
                  </button>
                </>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-[#dd3a44]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <Tag className="mr-2" size={16} />
                <span className="capitalize">{product.category}</span>
              </div>
              {product.brand && (
                <p className="text-gray-600 mb-2">
                  <strong>Brand:</strong> {product.brand}
                </p>
              )}
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="mr-2" size={16} />
                <span>{product.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-2xl font-bold text-[#dd3a44] mb-4">
                &#8377;{product.price}
              </p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {productExistInCart ? (
                <Button
                  onClick={handleRemoveFromCart}
                  className="w-full bg-[#dd3a44] hover:bg-[#E85C64] text-white"
                >
                  Remove from Cart
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#dd3a44] hover:bg-[#E85C64] text-white"
                >
                  Add to Cart
                </Button>
              )}

              {user && product.sellerId !== user.id && (
                <Link to={`/chat/${product.sellerId}`}>
                  <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300">
                    <MessageCircle className="mr-2" size={16} />
                    Chat with Seller
                  </Button>
                </Link>
              )}
            </div>

            {message && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;