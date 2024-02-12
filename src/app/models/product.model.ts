import { z } from 'zod';
import { createSurrealId, surrealId } from '../utils/surrealId';

const ProductSchema = z.object({
  id: surrealId('product'),
  name: z.string(),
  url: z.string(),
});

type Product = z.infer<typeof ProductSchema>;
const generateProductId = createSurrealId('product');

export { Product, ProductSchema, generateProductId };
