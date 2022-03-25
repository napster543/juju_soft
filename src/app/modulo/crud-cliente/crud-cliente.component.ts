import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente, Iresponse } from 'src/app/interfaces/myinterfaz';
import { CrudsService } from 'src/app/servicios/crud.service';


@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {
  
  clientes:any;
  listclientes:any;
  isAddMode:boolean=false;
  constructor( private Httpdata: CrudsService,  private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    
    

    this.isAddMode = false;

    this.clientes = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required)
    });    
    this.ListarTodos();
  }


  get f() { return this.clientes.controls; }

  async ListarTodos(){
    let cliente = await this.Httpdata.ListarCliente(0);
    this.listclientes = cliente.Data.clientes;
    console.log(this.listclientes);
  }

  async UpCliente(id:number){

    let cliente = await this.Httpdata.ListarCliente(id);
    let filacliente = cliente.Data.clientes;
    console.log(filacliente);
    
    this.isAddMode = true;
    
    this.clientes.get("id").setValue(id);
    this.clientes.get("nombre").setValue(filacliente[0].nombre);
    this.clientes.get("apellido").setValue(filacliente[0].apellido);
    this.clientes.get("edad").setValue(filacliente[0].edad);
    this.clientes.get("direccion").setValue(filacliente[0].direccion);
    this.clientes.get("correo").setValue(filacliente[0].correo);
    this.clientes.get("telefono").setValue(filacliente[0].telefono);
    this.clientes.get("celular").setValue(filacliente[0].celular);

    this.cd.markForCheck();     
    console.log(this.listclientes);
  }

  LimpiarForms():void{
    this.clientes.get("id").setValue("");
    this.clientes.get("nombre").setValue("");
    this.clientes.get("apellido").setValue("");
    this.clientes.get("edad").setValue("");
    this.clientes.get("direccion").setValue("");
    this.clientes.get("correo").setValue("");
    this.clientes.get("telefono").setValue("");
    this.clientes.get("celular").setValue("");
    this.isAddMode = false;
  }
  
  EliminarCliente(id:number):void{
    
    this.Httpdata.DelCliente(id)
        .subscribe( 
        (datas : Iresponse)=> {                  
          console.log(datas);
          console.log("Se elimino correctamente");
          this.LimpiarForms();
          this.ListarTodos();
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }
  

  onSubmit():void{
    
    let jcliente:Cliente = this.clientes.value;
    this.Httpdata.PostCliente(jcliente)
        .subscribe( 
        (datas : Iresponse)=> {                  
          console.log(datas);
          console.log("se guardo correctamente la informacion");
          this.LimpiarForms();
          this.ListarTodos();
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );

  }

}
