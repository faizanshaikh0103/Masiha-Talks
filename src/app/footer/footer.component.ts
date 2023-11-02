import { Component, OnInit } from '@angular/core';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit(): void {
  }

}
