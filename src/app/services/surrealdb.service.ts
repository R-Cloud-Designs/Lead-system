import { Injectable } from '@angular/core';
import { Surreal } from 'surrealdb.js';
import { SurrealId } from '../utils/surrealId';
import { environment } from '../../environments/environment';

interface DBConfig {
  url: string;
  namespace: string;
  database: string;
  auth: { username: string; password: string };
}

@Injectable({
  providedIn: 'root',
})
export class SurrealDBService {
  private db = new Surreal();
  private config?: DBConfig = environment.database;

  constructor() {
    this.initialize();
  }

  public async seedDatabase(
    table: string,
    count: number,
    items: Record<string, unknown>[] | Record<string, unknown>
  ): Promise<void> {
    try {
      await this.db.insert(table, items);
    } catch (error) {
      console.error('Failed to seed leads:', error);
    }
  }

  private async initialize(): Promise<void> {
    try {
      if (!this.config) {
        throw new Error('SurrealDB configuration not found.');
      }

      await this.db.connect(this.config.url, {
        namespace: this.config.namespace,
        database: this.config.database,
        auth: this.config.auth,
      });
    } catch (error) {
      console.error('SurrealDB Initialization Error:', error);
    }
  }

  public async create<T extends Record<string, any>>(table: string, data: T): Promise<T> {
    try {
      const [result] = await this.db.create<T>(table, data);
      return result;
    } catch (error) {
      throw new Error(`Failed to create in ${table}: ${error}`);
    }
  }

  public async update<T extends Record<string, any>, U extends Partial<T>>(surrealId: SurrealId, data: U): Promise<T> {
    try {
      const [result] = await this.db.merge<T, U>(surrealId, data);
      return result;
    } catch (error) {
      throw new Error(`Failed to update ${surrealId}: ${error}`);
    }
  }
  public async delete(surrealId?: SurrealId, table?: string): Promise<string> {
    try {
      if (surrealId) {
        await this.db.delete(surrealId);
      } else if (table) {
        await this.db.delete(table);
      }

      return surrealId || table || '';
    } catch (error) {
      console.error('Failed to delete:', error);
      throw new Error(`Failed to delete ${surrealId || table}: ${error}`);
    }
  }

  public async query<T extends Record<string, any>>(query: string, params?: Record<string, any>): Promise<T[]> {
    try {
      const results = await this.db.query<T[][]>(query, params);
      return results[0];
    } catch (error) {
      throw new Error(`Query failed: ${error}`);
    }
  }

  public async select<T extends Record<string, any>>(table: string, id?: string): Promise<T | T[]> {
    try {
      if (id) {
        return await this.db.select<T>(`${table}:${id}`);
      } else {
        return await this.db.select<T>(table);
      }
    } catch (error) {
      throw new Error(`Failed to select from ${table}: ${error}`);
    }
  }
}
