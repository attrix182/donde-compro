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






interface Promocion {
  descripcion: string;
  precio_unitario_sin_iva: string;
  precio_unitario_con_iva: string;
  precio: string;
}

interface PreciosProducto {
  promo1: Promocion;
  precio_unitario_con_iva: string;
  precioLista: number;
  precio_unitario_sin_iva: string;
  promo2: Promocion;
  precio_bulto_sin_iva: string;
  precio_bulto_con_iva: string;
}

interface Sucursal {
  distanciaNumero: number;
  distanciaDescripcion: string;
  banderaId: number;
  unidad_venta: string;
  lat: string;
  lng: string;
  sucursalNombre: string;
  id: string;
  sucursalTipo: string;
  provincia: string;
  preciosProducto: PreciosProducto;
  actualizadoHoy: boolean;
  direccion: string;
  banderaDescripcion: string;
  localidad: string;
  comercioRazonSocial: string;
  comercioId: number;
}

export interface DetailProductResponse {
  status: number;
  total: number;
  producto: {
    presentacion: string;
    nombre: string;
    id: string;
    marca: string;
  };
  maxLimitPermitido: number;
  totalPagina: number;
  sucursales: Sucursal[];
}
