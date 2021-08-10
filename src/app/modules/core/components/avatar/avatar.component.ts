import { Component, Input, OnInit } from '@angular/core';
import { IPersonalData } from '../../interfaces/personal-data.interface';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() public data: IPersonalData;
  public initial: string;

  constructor() { }

  ngOnInit(): void {
    this.initInitial();
  }

  private initInitial(): void {
    const firstName = this.data.firstName.charAt(0);
    const lastName = this.data.lastName.charAt(0);

    this.initial = `${firstName}${lastName}`;
  }

}
