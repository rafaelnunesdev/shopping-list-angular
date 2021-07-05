import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, forkJoin, from, merge, Observable, of } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Md5 } from 'ts-md5';

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
        this.afAuth.authState.pipe(
            concatMap(authState => {
                this.user$ = authState;
                this.user.next(this.user$);
                return this.checkPendingSharedLists();
            })
        ).subscribe();
    }

    checkPendingSharedLists(): Observable<void> {
        const hash = Md5.hashStr(this.user$?.email ?? '');
        return this.db.object<{ [ key: string]: boolean }>(`pendingSharing/${hash}`).valueChanges().pipe(
            concatMap(pendingLists => 
                merge(...Object.keys(pendingLists ?? {}).map(key => from(this.db.object(`users/${this.user$?.uid}/accessibleLists/${key}`).set(true))))
            ),
            concatMap(() => from(this.db.object(`pendingSharing/${hash}`).remove()))
        );
    }

    loginViaGoogle(): Observable<void> {
        return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
            concatMap((userCredentials: firebase.auth.UserCredential) => {
                this.user$ = userCredentials.user;
                return this.checkPendingSharedLists();
            }),
            map(() => this.user.next(this.user$))
        );
    }

    logout(): Observable<void> {
        this.user$ = null;
        this.user.next(null);
        return from(this.afAuth.signOut());
    }
}
