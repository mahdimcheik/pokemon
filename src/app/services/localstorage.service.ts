import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  addData(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      reportError({ message });
    }
  }

  removeData(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      reportError({ message });
    }
  }

  getData(key: string): any {
    try {
      console.log(localStorage.getItem(key));

      return JSON.parse(localStorage.getItem(key) ?? '');
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      reportError({ message });
    }
  }
}
