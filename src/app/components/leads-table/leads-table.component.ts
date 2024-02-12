import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Lead, LeadStatus } from '../../models/lead.model';
import { PaginationService } from '../../services/pagination.service';
import { Observable } from 'rxjs';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryListComponent } from '../order-history-list/order-history-list.component';

@Component({
  selector: 'app-leads-table',
  templateUrl: './leads-table.component.html',
  styleUrls: ['./leads-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LeadsTableComponent {
  @Input() set leads(value: Lead[]) {
    this.paginationService.init(value, 10);
  }
  @Input() selectedLeads: Lead[] = [];
  @Output() selectLead = new EventEmitter<{ leadId: string }>();
  @Output() editLead = new EventEmitter<{ lead: Lead; field: string; value: any }>();

  paginatedLeads$: Observable<Lead[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;

  editingLeadId: string | null = null;
  editingField: string | null = null;
  editableFields: (keyof Lead)[] = ['name', 'email', 'phone', 'address', 'status'];
  statusOptions: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost', 'order_placed'];
  // sourceOptions: LeadSource[] = ['website', 'phone', 'email', 'in-person', 'other'];

  transformStatusTitle(title: string): string {
    return TitleCasePipe.prototype.transform(title.replace(/_/g, ' '));
  }

  constructor(public paginationService: PaginationService<Lead>, public dialog: MatDialog) {
    this.paginatedLeads$ = this.paginationService.getPaginatedItems();
    this.currentPage$ = this.paginationService.currentPage$;
    this.totalPages$ = this.paginationService.totalPages$;
  }

  openOrderHistoryModal(lead: Lead): void {
    this.dialog.open(OrderHistoryListComponent, {
      width: '600px',
      data: lead,
    });
  }

  trackByLeadId(_: number, lead: Lead): string {
    return lead.id;
  }

  trackByOption(_: number, option: string): string {
    return option;
  }

  trackByStatus(_: number, status: LeadStatus): LeadStatus {
    return status;
  }

  toggleSelectLead(leadId: string): void {
    this.selectLead.emit({ leadId });
  }

  startEditing(leadId: string, field: keyof Lead): void {
    this.editingLeadId = leadId;
    this.editingField = field;
  }

  saveEdit(lead: Lead, field: keyof Lead, event: Event): void {
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    let newValue;

    if (tagName === 'select') {
      newValue = (event.target as HTMLSelectElement).value;
    } else if (tagName === 'td') {
      newValue = target.textContent;
    }

    this.editLead.emit({ lead, field, value: newValue });
    this.editingLeadId = null; // Reset editing state
    this.editingField = null;
  }

  handleKeydown(event: KeyboardEvent, lead: Lead, field: keyof Lead): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default to avoid newline in contenteditable
      this.startEditing(lead.id, field);
      setTimeout(() => {
        // Ensure the element is in editing mode before focusing
        const editingElement = event.target as HTMLElement;
        editingElement.focus();
      });
    }
  }
}
