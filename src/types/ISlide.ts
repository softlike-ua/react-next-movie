export interface ISlide {
  id: number
  genres: IGenres[]
  vote_average: number
  original_title: string
  homepage: string
  overview: string
  poster_path: string
  original_name: string
  backdrop_path: string
}

export interface IGenres {
  id: number
  name: string
}