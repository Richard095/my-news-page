import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: contact;
  processing: boolean = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private contactService: ContactService, private router: Router) {
    this.contact = { name: '', email: '', matter: '' }
  }

  ngOnInit() { }

  send() {
    console.log(this.contact)
    this.processing = true;
    this.contactService.sendEmail(this.contact).subscribe((res: any) => {
      this.contact = { name: '', email: '', matter: '' };
      this.processing = false;
    }, error => {
      console.log(error); this.processing = false;
    })
  }

}
