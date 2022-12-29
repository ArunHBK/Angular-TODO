import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup

  tasks: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];
  updateIndex:number=0;
  isEditEnabled :boolean=false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  addTasks(){
     this.tasks.push(this.todoForm.value.item)
     this.todoForm.reset();
  }
deleteTasks(i:number){
  this.tasks.splice(i,1)
}
deleteInProgressTasks(i:number){
  this.inProgress.splice(i,1)
}
deleteDoneTasks(i:number){
  this.done.splice(i,1)
}
onEdit(item:any,i:number){
   this.todoForm.controls['item'].setValue(item);
   this.updateIndex=i;
   this.isEditEnabled=true;
}
updateTasks(){
  this.tasks[this.updateIndex] =this.todoForm.value.item;
  this.isEditEnabled=false;
  this.todoForm.reset();
}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}