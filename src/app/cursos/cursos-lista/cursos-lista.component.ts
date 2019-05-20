import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from './../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.sass'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // bsModalRef: BsModalRef;
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursoService: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
    // private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.cursoService.list()
      .pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {

    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde!');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde!';
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });

  }

}
