import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.sass']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  summitted = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   const curso$ = this.cursoService.loadById(id);
    //   curso$.subscribe(curso => {
    //     this.updateForm(curso);
    //   });
    // });


    // this.route.params
    //   .pipe(
    //     map((params: any) => params[' id ']),
    //     switchMap(id => this.cursoService.loadById(id))
    //   ).subscribe(curso => this.updateForm(curso));
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.summitted = true;

    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');
      if (this.form.value.id) {

        this.cursoService.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso atualizado com sucesso');
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente');
          },
          () => console.log('update completo!')
        );

      } else {

        this.cursoService.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso criado com sucesso');
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger('Erro ao criar curso, tente novamente');
          },
          () => console.log('request completo!'));
      }
    }

  }

  onCancel() {
    this.summitted = false;
    this.form.reset();

  }

}
