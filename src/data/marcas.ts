export interface RedesSociales {
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
}

export interface Marca {
  slug: string;
  nombre: string;
  ruc: string;
  logo: string;
  descripcion: string;
  categoria: string;
  envio: string;
  redes: RedesSociales;
  celular: string;
  correo: string;
}

export const empresa = {
  nombre: 'PROGRAMA NACIONAL TU EMPRESA',
  logo: '/logos/tu-empresa.png',
  slogan: 'Encuentra tu tienda en línea',
  direccion: 'Av. Los Héroes 123, Chiclayo, Perú',
};

export const marcas: Marca[] = [];
