import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { v4 as uuidV4 } from 'uuid';

import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeadService } from '../../services/lead.service';
import { Lead, generateLeadId } from '../../models/lead.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leads-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './leads-form.component.html',
  styleUrls: ['./leads-form.component.scss'],
})
export class LeadsFormComponent {
  constructor(private leadService: LeadService, private dialog: MatDialog) {}

  leadFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]), // Example pattern
    status: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.leadFormGroup.valid) {
      const lead = {
        ...this.leadFormGroup.value,
        id: generateLeadId(uuidV4().split('-').join('')),
        orderHistory: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Lead;

      this.leadService.createLead(lead);
      this.leadFormGroup.reset();
    }

    this.dialog.closeAll();
  }

  get formControls() {
    return this.leadFormGroup.controls;
  }
}
