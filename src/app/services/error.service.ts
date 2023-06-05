import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = new Subject<string>();


  get error(): Subject<string> {
    return this._error;
  }

  setErrorMessage(message: string): void {
    this._error.next(message);
  }
}
