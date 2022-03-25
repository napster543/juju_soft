
export interface Iepisode{
    info: Iinfo,
    results: Icharacter
}

export interface Iinfo{
    count: number,
    pages: number,
    next: string,
    prev: any
}


export interface Icharacter 
{
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: Iorigin,
    location: Ilocation,
    image: string,
    episodio: any,
    url: string,
    created: string
}

export interface Iorigin 
{
    name : string,
    url : string,   
}

export interface Ilocation 
{
    name : string,
    url : string,   
}


/** ****************************************************************** */

export interface Iresponse 
{
    Estatus : boolean;
    Message : string;
    Data : any;    
}


export interface UserLogin 
{
    usuario : string;
    clave : string;    
}

export interface Cliente {
    id:string;
    nombre: string;
    apellido: string;
    direccion: string;
    edad: string;
    telefono: string;
    celular: string;
    correo: string;
}

export interface Producto {
    id:number;
    producto: string;
    stock: string;
    cantidad: number;
    precio: number;
    
}

export interface Comprar {    
    cliente: string;
    producto: string;
    cantidad: number;
    precio: number;
    
}
