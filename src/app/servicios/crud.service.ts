import { Injectable } from '@angular/core';
import { HttpClient,   HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Cliente, Iresponse, Producto, Comprar, UserLogin, Iepisode, Icharacter } from '../interfaces/myinterfaz'; 

@Injectable({
  providedIn: 'root'
})
export class CrudsService {
  isAuthenticate = false;

  private apiURL:  string = "https://rickandmortyapi.com/api/";
  public ImagePeliculaOriginal: string = "https://image.tmdb.org/t/p/original";
  public ImagePeliculaMod: string = "https://image.tmdb.org/t/p/w500";
  
//--proxy-config proxy.conf.json
  constructor(private http : HttpClient) {
    
   }
   
  readonly ISLOGGEDKEY = 'islogged';
  readonly TOKENVALIDO = 'TOKEN';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();
  public IdEmp:number = 3;


  PostCliente(registro:Cliente): Observable<Iresponse> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.post<Iresponse>(this.apiURL + 'crudcliente/GuardarCLientes', registro, { 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  }; 
  DelCliente(id:number): Observable<Iresponse> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.delete<Iresponse>(this.apiURL + `crudcliente/DeleteCLientes/${id}`, { 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  }; 


  public async ListarCliente(idcliente:number): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer vacio" );

    
    
    return await this.http.get<any>(this.apiURL + `crudcliente/ListarCLientes/${idcliente}`,  {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  public async ListarProducto(idproducto:number): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer vacio" );

    return await this.http.get<any>(this.apiURL + `crudproducto/ListarProductos/${idproducto}`,  {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  DelProducto(id:number): Observable<Iresponse> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.delete<Iresponse>(this.apiURL + `crudproducto/DeleteProducto/${id}`, { 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  };
  
  PostProducto(registro:Producto): Observable<Iresponse> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.post<Iresponse>(this.apiURL + 'crudproducto/GuardarProducto', registro, { 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  }; 

  PostComprar(registro:Comprar): Observable<Iresponse> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.post<Iresponse>(this.apiURL + 'crudcompra/GuardarCompra', registro, { 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  }; 

  public async ListarCompras(id:number): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer vacio" );

    return await this.http.get<any>(this.apiURL + `crudcompra/ListarComprar/${id}`,  {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  GetUsuarioLogin(registro:UserLogin): Observable<any> {
    return this.http.post<any>(this.apiURL + 'loginserver/Login', registro, {
                      headers:  new HttpHeaders()                                    
                                    .set("Content-Type", "application/json") 
            }).pipe(
              tap((dt: any) =>{
                if(dt.Status){
                  console.log("inicio", dt.Data.tipo);
                  
                  localStorage.setItem(this.ISLOGGEDKEY, 'true');
                  localStorage.setItem(this.TOKENVALIDO, dt.Data.token);
                  this.changeLoginStatusSubject.next(true);
                }else{
                  localStorage.setItem(this.ISLOGGEDKEY, 'false');
                  localStorage.removeItem(this.TOKENVALIDO);
                }
              })
            )   
  }  

  GetCharacterPopular(): Observable<Iepisode> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.get<Iepisode>(this.apiURL + 'character',{ 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  }; 

  GetEpisodioOne(name:string, status:string): Observable<Iepisode> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer vacio" ) 

    return this.http.get<Iepisode>(this.apiURL + `character/?name=${name}&status=${status}`,{ 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
            )
           
  }; 

 
  isLoggedIn(url:string):boolean{
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    
    //debugger;
    if(!isLogged){
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    localStorage.removeItem(this.TOKENVALIDO);
    localStorage.removeItem("VerUsuario");
    localStorage.removeItem("DBodega");
    localStorage.removeItem("DTipo");
    this.changeLoginStatusSubject.next(false);  
  }

  handleError(error:any) {
    let errorMessage = ''; 
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      if(error.status === 404){
        errorMessage = "Error 404 Se presento un problema con el consumo de la información \n POR FAVOR REPORTAR AL ADMINISTRADOR";
      }
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(`Error Code: ${error.status}\nMessage: ${error.message}`)
        
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
