import { Component } from '@angular/core';
import { faPhoneVolume, faEnvelopeOpenText, faLocationDot, faUserTie, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ FontAwesomeModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  faPhone = faPhoneVolume;
  faEnvelope = faEnvelopeOpenText;
  faLocation = faLocationDot; 
  faManager = faUserTie; 
  faChef = faUserNurse;
  faWhatsapp = faWhatsapp;


}
