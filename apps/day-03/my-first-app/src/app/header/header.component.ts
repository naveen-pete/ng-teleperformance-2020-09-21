import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  // External template
  templateUrl: './header.component.html',

  // Inline template
  // ES5 - string concatenation
  // template: '<h2>Inline template</h2>' +
  //   '<p>Inline paragraph</p>',

  // ES6 - template string syntax
  // template: `
  //   <h2>Inline template</h2>
  //   <p>Inline paragraph</p>
  //   <div>Division element</div>
  // `,

  styleUrls: ['./header.component.css']
  // styles: [
  //   `h2 {
  //     color: red 
  //   }`
  // ]
})
export class HeaderComponent { }