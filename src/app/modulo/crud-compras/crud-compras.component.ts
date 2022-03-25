import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comprar, Iresponse } from 'src/app/interfaces/myinterfaz';
import { CrudsService } from 'src/app/servicios/crud.service';

@Component({
  selector: 'app-crud-compras',
  templateUrl: './crud-compras.component.html',
  styleUrls: ['./crud-compras.component.css']
})
export class CrudComprasComponent implements OnInit {
  compras:any;
  listcompras:any;
  listclientes:any;
  listproductos:any = [];

  constructor(private Httpdata: CrudsService, private cd: ChangeDetectorRef) { 

    

  }

  ngOnInit(): void {
    

    this.ListarCliente(0);
    this.ListarProducto(0);
    this.ListarCompras(0);

    this.compras = new FormGroup({
      
      cliente: new FormControl('', Validators.required),
      producto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      
    });  
    

    this.compras.get("cantidad").valueChanges
    .subscribe((f:any)=> {
      console.log(f);
      if(f === '') 
      {
        this.compras.get("precio").setValue('');
        this.compras.get("producto").setValue('');
        return;
      };
      let cantidad:number = parseInt(f);
      let precioFinal = cantidad * parseFloat(this.compras.get("precio").value);
      this.compras.get("precio").setValue(precioFinal);
    })

  }

  async ListarProducto(id:number){

    let producto = await this.Httpdata.ListarProducto(0);
     this.listproductos = producto.Data.productos;
    console.log(this.listproductos);
    
    
  }

  async ListarCliente(id:number){

    let jclientes = await this.Httpdata.ListarCliente(0);
    this.listclientes = jclientes.Data.clientes;
    console.log(this.listclientes);
    
    
  }

  VerPrecioProducto():void{

    let index = ((document.getElementById("cboproducto") as HTMLSelectElement).selectedIndex);
    let valor = ((document.getElementById("cboproducto") as HTMLInputElement).value);
    let Texto = ((document.getElementById("cboproducto") as HTMLSelectElement).options[index].innerText);

    if (valor === '') return;

    let productoFilter = this.listproductos.filter((item:any) =>{ 
      return item.id == valor ;
    });

    this.compras.get("precio").setValue(productoFilter[0].precio);

  }

  async ListarCompras(id:number){
    let compra = await this.Httpdata.ListarCompras(id);
     this.listcompras = compra.Data.compras;
    console.log(this.listcompras);
  }

  onSubmit():void{
    let jcomprar:Comprar = this.compras.value;
    this.Httpdata.PostComprar(jcomprar)
        .subscribe( 
        (datas : Iresponse)=> {                  
          console.log(datas);
          console.log("se guardo correctamente la informacion");          
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

}
