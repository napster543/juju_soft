import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icharacter, Iepisode } from 'src/app/interfaces/myinterfaz';
import { CrudsService } from 'src/app/servicios/crud.service';

@Component({
  selector: 'app-viewmovie',
  templateUrl: './viewmovie.component.html',
  styleUrls: ['./viewmovie.component.css']
})
export class ViewmovieComponent implements OnInit {
  mostrarName : string;
  mostrarStatus : string;
  ImagePost:string;
  ImgMovieOrigin : string;
  public ListDetalleMovies : Icharacter;
  public ListProductCompanies : any;
  constructor(private router: Router, private rutaActiva: ActivatedRoute, private Httpdata: CrudsService) { 
    
    
    this.mostrarName = rutaActiva.snapshot.params["name"];
    this.mostrarStatus = rutaActiva.snapshot.params["status"];
    //alert(this.mostrarName + this.mostrarStatus);
    this.GetViewMoviesOne(this.mostrarName, this.mostrarStatus);
  }

  ngOnInit(): void {
    this.ImgMovieOrigin = this.Httpdata.ImagePeliculaOriginal;
  }

  GetViewMoviesOne(name:string, status:string):void{
    this.Httpdata.GetEpisodioOne(name, status)
    .subscribe( 
        (datas : Iepisode)=> {     
          console.log(datas.results);       
          
          this.ListProductCompanies = datas.results as Icharacter;
          
            
            
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

}
