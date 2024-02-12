import { z } from 'zod';
import { OrderSchema } from './order.model';
import { createSurrealId, surrealId } from '../utils/surrealId';

// Define Zod schemas for enums
const LeadStatusSchema = z.enum(['new', 'contacted', 'qualified', 'lost', 'order_placed']);
// const LeadSourceSchema = z.enum(['website', 'phone', 'email', 'in-person', 'other', 'webshop']);
const DeliveryPreferenceSchema = z.enum(['standard', 'express']);

const LeadSchema = z.object({
  id: surrealId('lead'),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  status: LeadStatusSchema,
  // source: LeadSourceSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  address: z.string().optional(),
  productsOfInterest: z.array(z.string()).optional(),
  lastInteraction: z.date().optional(),
  deliveryPreference: DeliveryPreferenceSchema.optional(),
  trackingNumber: z.string().optional(),
  orderHistory: z.array(OrderSchema).optional(),
});

type Lead = z.infer<typeof LeadSchema>;
type LeadStatus = z.infer<typeof LeadStatusSchema>;
// type LeadSource = z.infer<typeof LeadSourceSchema>;
type DeliveryPreference = z.infer<typeof DeliveryPreferenceSchema>;
const generateLeadId = createSurrealId('lead');

export {
  Lead,
  LeadStatus,
  // LeadSource,
  DeliveryPreference,
  generateLeadId,
  LeadSchema,
  LeadStatusSchema,
  // LeadSourceSchema,
  DeliveryPreferenceSchema,
};
