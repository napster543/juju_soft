import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { CrudsService } from 'src/app/servicios/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public InUsuario:string = "";
  public InPassword:string = "";
  routerRedirect = "";

  constructor(private Httpdata: CrudsService, private router:Router) { }

  ngOnInit(): void {
  }

  LogearUsuario():void{

    if(this.InUsuario === undefined || this.InUsuario.trim().length === 0 ){
      this.MensajesAlert("cancel", "Ingresa tu usuario por favor");
      return;
    }
    if(this.InPassword === undefined || this.InPassword.trim().length === 0){
      this.MensajesAlert("cancel", "Ingresa tu contraseña por favor");
      
      return;
    }

    let usuario:any = {
      usuario: this.InUsuario.toUpperCase().trim(),
      clave: this.InPassword.trim()
    }

    this.Httpdata.GetUsuarioLogin(usuario)
    .subscribe( 
        (datas : any)=> {      
            console.log(datas);
            if(datas.Estatus){
              
              
              
              
              localStorage.setItem("VerUsuario", this.InUsuario);
              
              this.routerRedirect = this.Httpdata.urlUsuarioIntentaAcceder;
              this.Httpdata.urlUsuarioIntentaAcceder = "";
              this.router.navigate(["/cliente"]);  
            }
            else{
              
              this.MensajesAlert('cancel', datas.Message); 
            }
            
            
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

  MensajesAlert(tipo:string, msg:string):void{
    switch (tipo) {
      case 'ok':
        Swal.fire({
          title: "Mensaje",
          text: msg,
          icon:'success',
          confirmButtonText: "Aceptar",
        });    
        break;
      case 'cancel':
        Swal.fire({
          title: "Error!",
          text: msg,
          icon: 'error',
          confirmButtonText: "Aceptar",
        });    
        break;
    
      default:
        break;
    }
    
  }


}
