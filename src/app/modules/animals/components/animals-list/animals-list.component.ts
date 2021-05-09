import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {

  constructor() { }

  public goToAddNewAnimal(): void {
    console.log('go to add new');
  }

  public ngOnInit(): void {
  }

  public openFilter(): void {
    console.log('open filter');
  }
}
