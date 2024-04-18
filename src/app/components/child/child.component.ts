import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent implements OnInit {
  @Input()
  callback: any;
  variable: string = '';

  ngOnInit(): void {
    this.callback(this.variable);
  }
}
