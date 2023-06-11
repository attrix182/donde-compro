export interface Product {
  marca: string;
  id: string;
  precioMax: number;
  precioMin: number;
  nombre: string;
  presentacion: string;
  cantSucursalesDisponible: number;
}

export interface searchProductResponse {
  status: number;
  total: number;
  maxLimitPermitido: number;
  maxCantSucursalesPermitido: number;
  productos: Product[];
  totalPagina: number;
  agrupables: any[];
}
