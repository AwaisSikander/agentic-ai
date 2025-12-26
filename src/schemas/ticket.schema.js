import { z } from "zod";

export const TicketSchema = z.object({
  category: z.enum(["Technical", "Billing", "Sales", "General"]),
  priority: z.enum(["High", "Medium", "Low"]),
  sentiment: z.enum(["Positive", "Neutral", "Negative"]),
  suggested_action: z.string().min(3),
});
