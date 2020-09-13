import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface User {
  userid: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private userCollection: AngularFirestoreCollection<User>;

  private users: Observable<User[]>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<User>('users');

    this.users = this.userCollection.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

   getUsers(){
     return this.users;
   }
   getUserById(id){
     return this.userCollection.doc(id).valueChanges();
   }
   updateUserById(user: User, id){
     return this.userCollection.doc(id).update(user);
   }
   addUser(user: User){
     return this.userCollection.add(user);
   }
   removeUserById(id){
     return this.userCollection.doc(id).delete();
   }


}
