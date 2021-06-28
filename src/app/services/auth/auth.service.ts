import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject<Observable<firebase.User>>(of());
    
    user$ = this.user
        .asObservable()
        .pipe(switchMap((user: Observable<firebase.User>) => user));

    constructor(private afAuth: AngularFireAuth) {
        this.user.next(this.afAuth.authState as Observable<firebase.User>);
    }

    loginViaGoogle(): Observable<firebase.auth.UserCredential> {
        return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
    }

    logout(): Observable<void> {
        return from(this.afAuth.signOut());
    }
}
