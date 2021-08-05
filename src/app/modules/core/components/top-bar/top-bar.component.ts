import { Component, OnInit } from '@angular/core';
import { IPersonalData } from '../../interceptors/personal-data.interface';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public personalData: IPersonalData;

  constructor() { }

  ngOnInit(): void {
    this.initPersonalData();
  }

  private initPersonalData(): void {
    this.personalData = {
      firstName: 'Kamil',
      lastName: 'Matuszewski',
      role: 'Programista'
    }
  }

}
