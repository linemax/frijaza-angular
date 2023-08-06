import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalVisibilityService {

  constructor() { }

  modalShownKey = 'isModalShown';

  isModalShown(): boolean {
    const isShown = localStorage.getItem(this.modalShownKey);
    return isShown ? JSON.parse(isShown) : false;
  }

  setModalShown() {
    localStorage.setItem(this.modalShownKey, JSON.stringify(true));
  }
}
