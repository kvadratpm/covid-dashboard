import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country, HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  currentField!: string;
  form!: FormGroup;

  constructor(public httpService: HttpRequestsService) { }

  async ngOnInit(): Promise<void> {
    await this.httpService.pullRequest();
    this.form = new FormGroup({
      country: new FormControl('')
    });
  }

  submit(): void {
    console.log(this.form);
  }

}
