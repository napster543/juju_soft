import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iresponse, Producto } from 'src/app/interfaces/myinterfaz';
import { CrudsService } from 'src/app/servicios/crud.service';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {
  productos:any;
  listproductos:any;
  isAddMode:boolean=false;
  constructor(private Httpdata: CrudsService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.isAddMode = false;

    this.productos = new FormGroup({
      id: new FormControl(''),
      producto: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
      
    });    
    this.ListarTodos();

  }

  async ListarTodos(){
    let producto = await this.Httpdata.ListarProducto(0);
    this.listproductos = producto.Data.productos;
    console.log(this.listproductos);
  }

  async UpProducto(id:number){

    let producto = await this.Httpdata.ListarProducto(id);
    let filaproducto = producto.Data.productos;
    console.log(filaproducto);
    
    this.isAddMode = true;
    
    this.productos.get("id").setValue(id);
    this.productos.get("producto").setValue(filaproducto[0].nom_producto);
    this.productos.get("stock").setValue(filaproducto[0].stock);
    this.productos.get("cantidad").setValue(filaproducto[0].cantidad);
    this.productos.get("precio").setValue(filaproducto[0].precio);
    

    this.cd.markForCheck();     
    console.log(this.listproductos);
  }

  LimpiarForms():void{
    this.productos.get("id").setValue("");
    this.productos.get("producto").setValue("");
    this.productos.get("stock").setValue("");
    this.productos.get("cantidad").setValue("");
    this.productos.get("precio").setValue("");
    
    this.isAddMode = false;
  }
  
  EliminarProducto(id:number):void{
    
    this.Httpdata.DelProducto(id)
        .subscribe( 
        (datas : Iresponse)=> {                  
          console.log(datas);
          console.log("Se elimino correctamente");
          this.ListarTodos();
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

  onSubmit():void{
    
    let jproducto:Producto = this.productos.value;
    this.Httpdata.PostProducto(jproducto)
        .subscribe( 
        (datas : Iresponse)=> {                  
          console.log(datas);
          console.log("se guardo correctamente la informacion");
          this.ListarTodos();
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );

  }
  

}
