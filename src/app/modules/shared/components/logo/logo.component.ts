import { Component, Input } from '@angular/core';
import { LogoSizeType } from '../../types/logo-size.type';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  /**
   * Using the size property, you can define the size of the logo on the website.
   * The default is auto, so the image will adjust to the parent container in which it was placed.
   * To adjust the size of the logo on the page use the size modifier which are: small, normal or big.
   */
  @Input() public size: LogoSizeType = 'auto';

  constructor() { }
}
