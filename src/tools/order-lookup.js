export async function getOrderDetails(orderId) {
  console.log(`🔎 LOOKING UP ORDER: ${orderId} in database...`);

  // Fake Database Logic
  const mockDB = {
    "ORD-123": {
      status: "Shipped",
      delivery_date: "2025-12-20",
      items: ["Laptop", "Mouse"],
    },
    "ORD-456": {
      status: "Processing",
      delivery_date: "TBD",
      items: ["Monitor"],
    },
    "ORD-999": {
      status: "Cancelled",
      reason: "Payment Failed",
      items: ["HDMI Cable"],
    },
  };

  const order = mockDB[orderId];

  if (!order) {
    return { error: "Order ID not found." };
  }

  return order;
}

export const orderLookupToolDefinition = {
  type: "function",
  function: {
    name: "get_order_details",
    description: "Get the status and delivery date of a customer order.",
    parameters: {
      type: "object",
      properties: {
        orderId: {
          type: "string",
          description: "The unique order identifier (e.g., ORD-123).",
        },
      },
      required: ["orderId"],
      additionalProperties: false,
    },
    strict: true,
  },
};
