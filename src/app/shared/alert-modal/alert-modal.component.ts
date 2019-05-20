import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.sass']
})
export class AlertModalComponent implements OnInit {

  @Input() message: string;
  @Input() type = 'primary';

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() { }

  onClose() {
    this.bsModalRef.hide();

  }

}
