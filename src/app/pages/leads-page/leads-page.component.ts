import { Component } from '@angular/core';
import { RootLayoutComponent } from '../../components/root-layout/root-layout.component';
import { NgFor, NgIf } from '@angular/common';
import { Lead } from '../../models/lead.model';
import { LeadService } from '../../services/lead.service';
import { MatDialog } from '@angular/material/dialog';
import { LeadsFormComponent } from '../../components/leads-form/leads-form.component';
import { LeadsTableComponent } from '../../components/leads-table/leads-table.component';

@Component({
  selector: 'app-leads-page',
  standalone: true,
  imports: [RootLayoutComponent, NgFor, NgIf, LeadsTableComponent],
  templateUrl: './leads-page.component.html',
  styleUrl: './leads-page.component.scss',
})
export class LeadsPageComponent {
  selectedLeads: Lead[] = [];
  leads: Lead[] = [];
  constructor(private leadService: LeadService, private dialog: MatDialog) {
    this.leadService.getLeads().subscribe((leads) => {
      this.leads = leads;
    });
  }

  openLeadModal(): void {
    this.dialog.open(LeadsFormComponent, {
      width: '500px',
    });
  }

  selectLead({ leadId }: { leadId: string }): void {
    const leadIndex = this.selectedLeads.findIndex((l) => l.id === leadId);
    if (leadIndex > -1) {
      this.selectedLeads = this.selectedLeads.filter((l) => l.id !== leadId);
    } else {
      const lead = this.leads.find((l) => l.id === leadId);
      if (lead) {
        this.selectedLeads.push(lead);
      }
    }
  }

  editLead({ lead, field, value }: { lead: Lead; field: string; value: any }): void {
    const updatedLead = { ...lead, [field]: value };
    this.leadService.updateLead(updatedLead).subscribe(() => {
      this.leads = this.leads.map((l) => {
        if (l.id === lead.id) {
          return updatedLead;
        }
        return l;
      });
    });
  }

  deleteSelectedLeads(): void {
    this.selectedLeads.forEach((lead) => {
      this.leadService.deleteLead(lead.id).subscribe();
    });

    this.selectedLeads = [];
  }
}
