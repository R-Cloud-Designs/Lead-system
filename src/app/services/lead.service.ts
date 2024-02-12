import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { Lead } from '../models/lead.model';
import { SurrealDBService } from './surrealdb.service';
import { generateRandomLead } from '../utils/generateRandomLead';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private leadsSubject: BehaviorSubject<Lead[]> = new BehaviorSubject<Lead[]>([]);
  leads$: Observable<Lead[]> = this.leadsSubject.asObservable();

  constructor(private dbService: SurrealDBService) {
    // If you want to seed the database with random leads, uncomment the line below
    // this.seedDatabaseWithLeads();
    this.loadInitialLeads();
  }

  seedDatabaseWithLeads() {
    const leads = Array.from({ length: 50 }, (_, i) => generateRandomLead(i + 1));
    this.dbService.seedDatabase('lead', 50, leads);
  }

  private async loadInitialLeads(): Promise<void> {
    const leads = await this.dbService.query('SELECT * FROM lead');
    this.leadsSubject.next(leads as Lead[]);
  }

  getLeads(): Observable<Lead[]> {
    return this.leads$;
  }

  createLead(lead: Lead): Observable<Lead> {
    return from(
      this.dbService.create('lead', lead).then((createdLead) => {
        this.leadsSubject.next([...this.leadsSubject.getValue(), createdLead]);
        return createdLead;
      })
    );
  }

  updateLead(lead: Lead): Observable<Lead> {
    return from(
      this.dbService.update<Lead, Partial<Lead>>(lead.id, lead).then((updatedLead) => {
        const leads = this.leadsSubject.getValue().map((l) => (l.id === updatedLead['id'] ? updatedLead : l));
        this.leadsSubject.next(leads);
        return updatedLead;
      })
    );
  }

  deleteLead(leadId: Lead['id']): Observable<string> {
    return from(this.dbService.delete(leadId)).pipe(
      tap(() => {
        const updatedLeads = this.leadsSubject.getValue().filter((lead) => lead.id !== leadId);
        this.leadsSubject.next(updatedLeads);
      }),
      map(() => leadId)
    );
  }
}
