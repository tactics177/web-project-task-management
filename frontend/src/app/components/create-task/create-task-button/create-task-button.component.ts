import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-button',
  templateUrl: './create-task-button.component.html',
  styleUrls: ['./create-task-button.component.scss']
})
export class CreateTaskButtonComponent {
  @Output() emitF = new EventEmitter<boolean>()

  emitFormular(){
    //console.log("Emit Formular working")
    return this.emitF.emit(true)
  }
}
