import { z } from 'zod';
import { createSurrealId, surrealId } from '../utils/surrealId';
import { ProductSchema } from './product.model';

const OrderStatusSchema = z.enum(['pending', 'shipped', 'delivered', 'canceled']);
const TrackingStatusSchema = z.enum(['pending', 'shipped', 'delivered', 'canceled']);
const TrackingStepSchema = z.object({
  active: z.boolean(),
  canceled: z.boolean(),
  status: TrackingStatusSchema,
  timestamp: z.date(),
});

const OrderSchema = z.object({
  storeName: z.string(),
  storeUrl: z.string(),
  orderId: surrealId('order'),
  products: z.array(ProductSchema),
  totalPrice: z.number(),
  status: OrderStatusSchema,
  courierName: z.string(),
  trackingNumber: z.string(),
  deliveryAddress: z.string(),
  estimatedDeliveryDate: z.date(),
  trackingSteps: z.array(TrackingStepSchema),
});

type Order = z.infer<typeof OrderSchema>;
type OrderStatus = z.infer<typeof OrderStatusSchema>;
type TrackingStep = z.infer<typeof TrackingStepSchema>;
type TrackingStatus = z.infer<typeof TrackingStatusSchema>;
const generateOrderId = createSurrealId('order');

export { Order, OrderStatus, TrackingStep, TrackingStatus, generateOrderId, OrderSchema, OrderStatusSchema };
