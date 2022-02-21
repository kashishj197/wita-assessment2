import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { countryList } from './countryList';
import { Data } from './datasource.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource: Data[] = [];
  options: FormGroup;
  name = new FormControl('');
  gender = new FormControl('Male');
  country = new FormControl('');
  dob = new FormControl(new Date());
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  displayedColumns: string[] = ['name', 'gender', 'country', 'dob'];
  @ViewChild(MatTable) table!: MatTable<Data>;
  countryList = countryList;

  constructor(fb: FormBuilder, private readonly http: HttpClient) {
    this.options = fb.group({
      name: this.name,
      gender: this.gender,
      country: this.country,
      dob: this.dob,
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  submitData() {
    const name = this.options.get('name')?.value;
    const gender = this.options.get('gender')?.value;
    const country = this.options.get('country')?.value;
    const dob = this.options.get('dob')?.value.toString();

    this.dataSource.push({ name, gender, country, dob });
    this.table.renderRows();
    this.options.reset();
  }
}
