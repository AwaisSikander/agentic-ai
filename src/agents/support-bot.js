import { AIClient } from "../core/llm.js";
import {
  getOrderDetails,
  orderLookupToolDefinition,
} from "../tools/order-lookup.js";

export class SupportBot {
  constructor() {
    this.ai = new AIClient();
  }

  async handleRequest(userMessage) {
    const tools = [orderLookupToolDefinition];

    const response = await this.ai.generate(
      [
        {
          role: "system",
          content:
            "You are a helpful support assistant. Use tools to look up data. Do not offer help you cannot provide. Only use the tools available.",
        },
        { role: "user", content: userMessage },
      ],
      {
        tools: tools,
        tool_choice: "auto",
      }
    );

    if (response.tool_calls) {
      console.log(`🤖 AI Response`, response);

      const toolCall = response.tool_calls[0];
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);

      console.log(`🤖 AI wants to run: ${functionName} with args:`, args);

      if (functionName === "get_order_details") {
        const orderData = await getOrderDetails(args.orderId);

        const secondResponse = await this.ai.generate([
          {
            role: "system",
            content:
              "You are a helpful support assistant. Do not offer help you cannot provide. Only use the tools available.",
          },
          { role: "user", content: userMessage },
          response,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(orderData),
          },
        ]);

        console.log(`🤖 AI Second Response`, secondResponse);

        return secondResponse.content;
      }
    }

    return response.content;
  }
}
