import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  declare feedbackForm: FormGroup;
  modalRef?: BsModalRef;
  isSubmit = false;
  isSuccess = false;

  constructor(
    private aS: AuthService,
    private router: Router,
    private modalService: BsModalService,
    private fB: FormBuilder
  ) {
    this.feedbackForm = this.fB.group({
      email: [null, [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      message: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  getRegister() {
    if (this.aS.isLogedin) {
      this.router.navigate(['/profile'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  get formError() {
    return this.feedbackForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;

    if (this.feedbackForm.invalid) {
      return;
    }
    const value = this.feedbackForm.value;
    this.aS.sendFeedback(value).subscribe((res: any) => {
      if (res.status_code == 201) {
        this.isSuccess = true;
      }
    });

  }

  openModal(content: any) {
    this.isSuccess = false;
    this.isSubmit = false;
    this.feedbackForm.reset();
    this.modalRef = this.modalService.show(content,
      Object.assign({}, { class: 'modal-lg' }));
  }

}
