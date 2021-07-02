import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUser } from './user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<firebase.User | null | undefined>(null);
    user$?: firebase.User | null;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase
    ) {
        this.afAuth.authState.subscribe(authState => {
            if (authState) {
                this.user$ = authState;
            }
        });
    }

    emitUserInfo(userFirebase: firebase.User | null): Observable<void> {
        return new Observable<void>(obs => {
            this.db.database.ref(`users/${userFirebase?.uid}`).get().then(user => {
                if (!user.exists()) {
                    this.db.object<IUser>(`users/${userFirebase?.uid}`).set({
                        accessibleLists: { 'empty': false },
                        ownedLists: { 'empty': false },
                    }).then(() => {
                        console.log('23');
                        this.user$ = userFirebase;
                        this.user.next(userFirebase);
                        obs.next();
                        obs.complete();
                    });
                }
            });
        })
        
    }

    loginViaGoogle(): Observable<void> {
        return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
            concatMap((userCredentials: firebase.auth.UserCredential) => this.emitUserInfo(userCredentials.user))
        );
    }

    logout(): Observable<void> {
        this.user$ = null;
        return from(this.afAuth.signOut());
    }
}
