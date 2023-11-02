import { Component, OnInit , EventEmitter, Output} from '@angular/core';



@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor() { }

  @Output() confirmed = new EventEmitter<boolean>();

  // onHide:boolean=false;
  ngOnInit(): void {
  }

  confirm(){
    // this.onHide = !this.onHide;
    this.confirmed.emit(true);
  }

  cancel(){
    // this.onHide = ! this.onHide;
    this.confirmed.emit(false);
  }
}
