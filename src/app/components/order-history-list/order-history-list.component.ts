import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lead } from '../../models/lead.model';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.scss'],
})
export class OrderHistoryListComponent implements OnInit {
  lead!: Lead;
  activeIndex: number | null = null;

  constructor(private dialogRef: MatDialogRef<OrderHistoryListComponent>, @Inject(MAT_DIALOG_DATA) public data: Lead) {}

  ngOnInit(): void {
    if (this.data && 'orderHistory' in this.data) {
      this.lead = this.data;
    } else {
      console.error('Invalid data passed to OrderHistoryListComponent');
      this.dialogRef.close();
    }
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
