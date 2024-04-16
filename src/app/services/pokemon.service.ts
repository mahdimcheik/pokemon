import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { PokemonSimpliste } from '../models/pokemon-simpliste';
import { PokemonDetailed } from '../models/modelsInterfaces';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  httpclient = inject(HttpClient);
  storage = inject(LocalstorageService);

  pokemonShowedDetails!: PokemonDetailed;

  constructor() {}

  getPokemonSimplisteList(): Observable<PokemonSimpliste[]> {
    const pokemonListBrut$ = this.httpclient.get<any>(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    );
    return pokemonListBrut$.pipe(map((val) => val.results));
  }

  getPokemonDetailed(url: string): Observable<PokemonDetailed> {
    const pokemondetailed = this.httpclient.get<any>(url).pipe(
      map((val) => {
        return {
          abilities: val.abilities,
          id: val.id,
          cries: val.cries,
          imgUrl: val.sprites.other.dream_world.front_default,
          types: val.types,
          name: val.forms[0].name,
        };
      })
    );
    return pokemondetailed;
    // const pokemondetailed$ = this.httpclient.get<any>(url);
    // return pokemondetailed$.pipe(map((val) => val.results));
  }

  getPokemonDetailedList() {
    let listDetailed = [];
    this.getPokemonSimplisteList().subscribe((val) => {
      const results$ = val.map((ele) => {
        return this.getPokemonDetailed(ele.url);
      });
      const res = forkJoin(results$);
      console.log('fork ', res);
      return res.subscribe((val) => {
        listDetailed = val;
        console.log('list detailed', val);
      });
    });
  }

  GetPokemonListDetailed(): Observable<any> {
    // if (this.storage.getData('pokemons')) {
    //   console.log(this.storage.getData('pokemons'));

    //   return of(...JSON.parse(this.storage.getData('pokemons')));
    // }
    return this.httpclient
      .get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .pipe(
        map((val) => val.results),
        switchMap((response) => {
          const detailedpokemonList = response.map((item: PokemonSimpliste) =>
            this.httpclient.get<any>(item.url).pipe(
              map((val) => {
                return {
                  abilities: val.abilities,
                  id: val.id,
                  cries: val.cries,
                  imgUrl: val.sprites.other.dream_world.front_default,
                  types: val.types,
                  name: val.forms[0].name,
                };
              })
            )
          );
          return forkJoin(detailedpokemonList);
        })
      );
  }
}
