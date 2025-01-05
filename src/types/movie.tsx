import { ITvEpisodes, ITvSeasons } from "./tv";

export interface IMediaDetails {
    // Common properties
    adult: boolean;
    backdrop_path: string;
    genres?: Genre[];
    homepage?: string;
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    spoken_languages?: SpokenLanguage[];
    status?: string;
    tagline?: string;
    vote_average: number;
    vote_count: number;
  
    // Movie-specific properties
    belongs_to_collection?: Collection | null;
    budget?: number;
    imdb_id?: string;
    origin_country?: string[];
    original_title?: string;
    release_date?: string;
    revenue?: number;
    runtime?: number;
    title?: string;
    video?: boolean;
  
    // TV show-specific properties
    created_by?: any[]; // Replace with specific type if available
    episode_run_time?: number[];
    first_air_date?: string;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: ITvEpisodes | null;
    name?: string;
    next_episode_to_air?: ITvEpisodes | null;
    networks?: Network[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    original_name?: string;
    seasons?: ITvSeasons[];
    media_type?: string;
  }
  
  interface Genre {
    id: number;
    name: string;
  }
  
  interface Collection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  }
  
  interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
  
  interface Network {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }
  