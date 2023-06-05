import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-global-error-bar',
  templateUrl: './global-error-bar.component.html',
  styleUrls: ['./global-error-bar.component.css']
})
export class GlobalErrorBarComponent implements OnInit, OnDestroy {
  protected errorMessage: string | null;
  private errorSub: Subscription;


  constructor(private readonly errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.errorSub = this.errorService.error.subscribe(message => this.errorMessage = message);
  }

  ngOnDestroy(): void {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

  closeAlert(): void {
    this.errorMessage = null;
  }
}
