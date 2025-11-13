import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Chip } from "@mui/material";

const OrderStatus = ({ status }) => {
  let color = "default";
  let icon = null;

  switch (status) {
    case "PENDING":
      color = "warning";
      icon = <HourglassEmptyIcon />;
      break;
    case "SHIPPED":
      color = "info";
      icon = <LocalShippingIcon />;
      break;
    case "COMPLETED":
      color = "success";
      icon = <CheckCircleIcon />;
      break;
    case "CANCELLED":
      color = "error";
      icon = <CancelIcon />;
      break;
    default:
      break;
  }

  return (
    <Chip
      icon={icon}
      label={status}
      color={color}
      variant="outlined"
      size="small"
      sx={{
        fontWeight: "bold",
        textTransform: "capitalize",
        letterSpacing: 0.3,
      }}
    />
  );
};

export default OrderStatus;