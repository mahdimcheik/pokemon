import { Component, OnInit, inject } from '@angular/core';
import { PokemonSimpliste } from '../../models/pokemon-simpliste';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailed } from '../../models/modelsInterfaces';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonService = inject(PokemonService);
  storage = inject(LocalstorageService);
  // pokemonSimplisteList: PokemonSimpliste[] = [];
  pokemonDetailedList: PokemonDetailed[] = [];
  ngOnInit(): void {
    // this.pokemonService
    //   .getPokemonSimplisteList()
    //   .subscribe((val) => console.log(val));
    // this.pokemonService
    //   .getPokemonDetailed('https://pokeapi.co/api/v2/pokemon/1/')
    //   .subscribe((val) => console.log('val', val));

    // this.pokemonService.getPokemonDetailedList();
    this.pokemonService.GetPokemonListDetailed().subscribe((val) => {
      this.storage.addData('pokemons', JSON.stringify(val));

      this.pokemonDetailedList = val;
    });
  }
}
