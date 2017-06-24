import { Component } from '@angular/core';
import { AppConfig} from '../app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})

export class FooterComponent {
     refreshTime = `Refresh Time: ${AppConfig.REFRESH_TIME / 1000} seconds`;
}
