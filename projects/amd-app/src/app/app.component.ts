import { Component, HostListener, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { AngularMaterialDatatransferComponent } from 'projects/amd-lib/src/public-api';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'angular-material-datatransfer-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(AngularMaterialDatatransferComponent) amdComponent: AngularMaterialDatatransferComponent;

  constructor(@Inject('ConfigCustomEvent') private configCustomEvent: any) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.configCustomEvent && this.configCustomEvent.detail) {
        this.amdComponent.create(this.configCustomEvent.detail);
      }
    }, 0);
  }

  @HostListener('document:github:niklr/angular-material-datatransfer.update-config', ['$event'])
  public onUpdateConfig(event): void {
    if (!!event && !!event.detail) {
      const config = event.detail;
      this.amdComponent.setConfig(config);
    }
  }

  @HostListener('document:github:niklr/angular-material-datatransfer.download-item', ['$event'])
  public downloadItem(event): void {
    if (!!event && !!event.detail) {
      const item = event.detail;
      this.amdComponent.download(item.filename, item.url, item.size);
    }
  }

}
