import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router   // 👈 inyectamos Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;

    if (email === 'test@correo.com' && password === '123456') {
      const toast = await this.toastCtrl.create({
        message: 'Login exitoso 🚀',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      // 👇 Redirigir al Home después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);

    } else {
      const toast = await this.toastCtrl.create({
        message: 'Credenciales incorrectas ❌',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
