import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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
    private location: Location) { }

  ngOnInit() {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.summitted = true;

    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');

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

  onCancel() {
    this.summitted = false;
    this.form.reset();

  }

}
