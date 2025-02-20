import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  private isUserLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();
  
  constructor(private http: HttpClient) {
    // Vérifier si un user_id est présent dans le localStorage pour savoir si l'utilisateur est connecté
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.isUserLoggedIn.next(true);
    }
  }


  signup(email: string, password: string) {

    console.log('Signup USERSERVICE LIB',);
    
    const url = `http://localhost:3000/users/signup`;

    return this.http.post<any>(url, { "email": email, "password": password })
      .pipe( 
        tap((response) => {
          console.log('Signup successful:', response);

          if (response && response.user_id) {
            localStorage.removeItem("user_id");
            localStorage.setItem("user_id", response.user_id);  // Enregistrer user_id
          }

          this.authentificationAPI(email, password).subscribe((response: any) => {
            console.log('Login successful:', response);
            localStorage.removeItem("token_api");
            localStorage.setItem("token_api", response.access_token);  
          });


          this.isUserLoggedIn.next(true);
          // Action à exécuter en cas de succès, ex: rediriger ou afficher un message
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Cas où l'authentification a échoué
            console.error('Register Failed :', error);
          } else {
            // Autres erreurs HTTP
            console.error('Fail while register:', error);
          }

          // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
          return throwError(error);
        })
      )
  }

  login(email: string, password: string) {
    const url = `http://localhost:3000/users/login`

    return this.http.post<any>(url, { email, password })
      .pipe(
        tap((response) => {
          console.log('Login successful:', response);

          if (response && response.user_id) {
            localStorage.removeItem("user_id");
            localStorage.setItem("user_id", response.user_id);  // Enregistrer user_id
          }

          this.authentificationAPI(email, password).subscribe((response: any) => {
            console.log('Login successful:', response);
            localStorage.removeItem("token_api");
            localStorage.setItem("token_api", response.access_token);  
          });

          this.isUserLoggedIn.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Gérer le cas où l'authentification a échoué
            console.error('Authentification échouée :', error);
          } else {
            // Gérer d'autres erreurs HTTP
            console.error('Erreur lors de la connexion :', error);
          }

          // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
          return throwError(error);
        })
      );
  }

  // checkCredentials(username: string, password: string) {
  //   if (username === 'demo' && password === 'demo') {
  //     this.isUserLoggedIn.next(true);
  //   }
  // }

  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token_api");
    this.isUserLoggedIn.next(false);
  }

  authentificationAPI(username: string, password: string) {
    const url = `http://localhost:3000/auth/login`;

    return this.http.post(url, { username, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Gérer le cas où l'authentification a échoué
            console.error('Authentification échouée :', error);
          } else {
            // Gérer d'autres erreurs HTTP
            console.error('Erreur lors de la connexion :', error);
          }

          // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
          return throwError(error);
        })
      );
  }

  getUserById(userId: string) {
    const url = `http://localhost:3000/users/${userId}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        // Créer une instance de User à partir de la réponse
        const user = new User(
          userId,
          response.email,
          response.password
        );
        return user;
      }),
      tap((user) => {
        console.log('User fetched:', user);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('User not found:', error);
        } else {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
        return throwError(error);  // Propager l'erreur
      })
    );
  }

  getAllUsers(token: string) {
    const url = `http://localhost:3000/users/all`;

    // Création des en-têtes avec le token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ajout du token dans l'en-tête Authorization
    });

    return this.http.get<any[]>(url, { headers }).pipe(
      tap((users) => {
        console.log('Users fetched:', users);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return throwError(error);  // Propager l'erreur
      })
    );
  }

}

