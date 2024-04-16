import { Component, Input, OnInit, inject } from '@angular/core';
import { PokemonDetailed } from '../../models/modelsInterfaces';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit {
  pokemonService = inject(PokemonService);
  className: string = 'default';
  @Input()
  pokemon!: PokemonDetailed;

  ngOnInit(): void {
    if (this.pokemon?.types.length > 1) {
      this.className = 'default';
    } else {
      this.className = this.pokemon.types[0].type.name;
    }
  }

  setPokemonData() {
    this.pokemonService.pokemonShowedDetails = this.pokemon;
  }
}
