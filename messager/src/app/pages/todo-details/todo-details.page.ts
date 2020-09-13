import { Todo, TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: Todo = {
    task: 'Test 123',
    createdAt: new Date().getTime(),
    priority: 2
  };

  todoId = null;

  constructor(private todoService: TodoService, private route: ActivatedRoute,
              private loadingController: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get('id');
    if (this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
      console.log(this.todo);
    });
  }

  async saveTodo(){
    const loading = await this.loadingController.create({
      message: 'Saving Todo...',
      spinner: 'bubbles'
    });
    await loading.present();

    if (this.todoId){

      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.back();
      });

    }else{
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    }
  }

}