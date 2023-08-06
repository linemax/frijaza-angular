import { Component } from '@angular/core';
import { ModalVisibilityService } from 'src/app/services/modal-visibility.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {


  // constructor(private modalService: ModalVisibilityService, private modalVisibilityService: ModalVisibilityService) {}

  // ngOnInit() {
  //   if (!this.modalVisibilityService.isModalShown()) {
  //     // Show the modal when the component initializes and the user hasn't seen it yet
  //     this.openModal();
  //   }
  // }

  // openModal() {
  //   const modalRef = this.modalService.open(this.content, {
  //     backdrop: 'static',
  //     keyboard: false,
  //   });
  // }

  // closeModal() {
  //   // Close the modal
  //   this.modalService.dismissAll();
  //   // Set the flag to indicate that the user has seen the modal
  //   this.modalVisibilityService.setModalShown();
  // }

}
