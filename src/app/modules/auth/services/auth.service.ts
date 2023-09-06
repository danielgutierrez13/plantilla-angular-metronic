import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';
import {AuthHTTPService} from './auth-http';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';

export type UserType = UserModel | undefined;

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    // public fields
    currentUser$: Observable<UserType>;
    isLoading$: Observable<boolean>;
    currentUserSubject: BehaviorSubject<UserType>;
    isLoadingSubject: BehaviorSubject<boolean>;

    get currentUserValue(): UserType {
        return this.currentUserSubject.value;
    }

    set currentUserValue(user: UserType) {
        this.currentUserSubject.next(user);
    }

    constructor(
        private authHttpService: AuthHTTPService,
        private router: Router
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
        const subscr = this.getUserByToken().subscribe();
        this.unsubscribe.push(subscr);
    }

    login(email: string, password: string): Observable<UserType> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(email, password).pipe(
            map((auth: AuthModel) => {
                return this.setAuthFromLocalStorage(auth);
            }),
            switchMap(() => this.getUserByToken()),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    logout() {
        localStorage.removeItem(this.authLocalStorageToken);
        this.router.navigate(['/auth/login'], {
            queryParams: {},
        });
    }

    getUserByToken(): Observable<UserType> {
        const auth = this.getAuthFromLocalStorage();
        if (!auth || !auth.authToken) {
            return of(undefined);
        }

        this.isLoadingSubject.next(true);
        return this.authHttpService.getUserByToken(auth.authToken).pipe(
            map((user: UserType) => {
                if (user) {
                    this.currentUserSubject.next(user);
                } else {
                    this.logout();
                }
                return user;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    registration(user: UserModel): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.createUser(user).pipe(
            map(() => {
                this.isLoadingSubject.next(false);
            }),
            switchMap(() => this.login(user.email, user.password)),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    forgotPassword(email: string): Observable<boolean> {
        this.isLoadingSubject.next(true);
        return this.authHttpService
            .forgotPassword(email)
            .pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    private setAuthFromLocalStorage(auth: AuthModel): boolean {
        if (auth && auth.authToken) {
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            return true;
        }
        return false;
    }

    private getAuthFromLocalStorage(): AuthModel | undefined {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return undefined;
            }

            return JSON.parse(lsValue);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
