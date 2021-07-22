import { Component } from '@angular/core';
import { CoreService } from '../../core.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  public isLoading$ = this.coreService.isLoading();

  constructor(private coreService: CoreService) { }
}
