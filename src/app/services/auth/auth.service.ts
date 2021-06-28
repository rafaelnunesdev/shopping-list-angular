import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: firebase.User | null | undefined;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(authState => {
            this.user = authState;
        });
    }

    loginViaGoogle(): Observable<firebase.auth.UserCredential> {
        return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
            .pipe(map((userCredential: firebase.auth.UserCredential) => {
                this.user = userCredential.user;
                return userCredential;
            }));
    }

    logout(): Observable<void> {
        return from(this.afAuth.signOut());
    }
}
