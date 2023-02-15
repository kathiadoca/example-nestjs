/**
 *  @description Data interna correspondiente al objeto results.
 *
 *  @author Fabrica Digital
 *
 */
export class Data {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: [];
  films: [];
  created: string;
  edited: string;
  url: string;
}

/**
 *  @description El objeto de respuesta para mapear la data que responde la API.
 *
 *  @author Fabrica Digital
 *
 */
export class GetPlanetsResponse {
  count: number;
  next: string;
  previous: string;
  results: Data[];
}
