import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Loader from "./Loader";
import { fetchProductDetails } from "../redux/actions/productActions";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlistActions";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetails, isLoading, error } = useSelector(
    (state) => state.product
  );

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isCartItemAvailable = cartItems.some(
    (item) => item.id === productDetails?.id
  );
  const isWishlisted = wishlistItems.some(
    (item) => item.id === productDetails?.id
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (isLoading)
    return (
      <Box className="center-loader" sx={{ textAlign: "center", mt: 10 }}>
        <Loader />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );

  if (!productDetails || !productDetails.id) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "80vh", p: 3, backgroundColor: "#fafafa" }}
    >
      <Card
        sx={{
          maxWidth: 900,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={productDetails.image}
          alt={productDetails.title}
          sx={{
            width: { xs: "100%", md: 400 },
            objectFit: "contain",
            backgroundColor: "#fff",
            p: 3,
          }}
        />

        <CardContent sx={{ flex: 1, p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {productDetails.title}
            </Typography>

            <Tooltip title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}>
              <IconButton
                onClick={() =>
                  isWishlisted
                    ? dispatch(removeFromWishlist(productDetails.id))
                    : dispatch(addToWishlist(productDetails))
                }
                color={isWishlisted ? "error" : "default"}
              >
                {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Chip
            icon={<CategoryIcon />}
            label={productDetails.category}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {productDetails.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <Rating
              value={productDetails.rating?.rate || 0}
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              ({productDetails.rating?.count || 0} reviews)
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            ${productDetails.price}
          </Typography>

          {isCartItemAvailable ? (
            <Button
              onClick={() => dispatch(removeFromCart(productDetails.id))}
              variant="outlined"
              color="error"
              startIcon={<ShoppingCartIcon />}
              sx={{
                mt: 3,
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "1rem",
                boxShadow: 3,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: 5,
                  backgroundColor: "#ffe5e5",
                },
              }}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(addToCart(productDetails))}
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                mt: 3,
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "1rem",
                boxShadow: 3,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: 5,
                },
              }}
            >
              Add to Cart
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
