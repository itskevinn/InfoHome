import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-publicacion',
  templateUrl: './header-publicacion.component.html',
  styleUrls: ['./header-publicacion.component.scss'],
})
export class HeaderPublicacionComponent implements OnInit {
  @Input() titulo: string
  constructor(private router: Router) { }

  ngOnInit() { }
  redirigir() {
    this.router.navigate(['/Publicacion'])
  }
}
