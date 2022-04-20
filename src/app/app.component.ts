import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { abstractSubscribeHandler } from "./utils/abstract-subscribe-handler";
import { isNil, forEach, parseInt } from "lodash";
import { lcdNumber } from "./utils/lcd-number";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends abstractSubscribeHandler implements OnInit {

  public formControlWithNumberValidator = new FormControl('', Validators.pattern('^[0-9]*$'));
  public lcdsChar = [ lcdNumber.ZERO, lcdNumber.ONE, lcdNumber.TWO, lcdNumber.THREE, lcdNumber.FOUR, lcdNumber.FIVE, lcdNumber.SIX, lcdNumber.SEVEN, lcdNumber.EIGHT, lcdNumber.NINE ];

  public displayLcdError = 'La saisie n\'est pas valide';

  /** Part 1 **/
  public displayLcdTextPart1: string[] = [];
  public form: FormGroup = new FormGroup({
    lcdText: this.formControlWithNumberValidator
  });

  /** Part 2 **/
  public displayLcdTextPart2: string[] = [];
  public formPart2: FormGroup = new FormGroup({
    lcdTextPart2: this.formControlWithNumberValidator,
    height: this.formControlWithNumberValidator,
    width: this.formControlWithNumberValidator
  });

  public ngOnInit(): void {
    let formValue = this.form.get('lcdText');

    if (!isNil(formValue)) {
      this.registerSubscription = formValue.valueChanges.subscribe((input): void => {
        if (formValue?.valid) {
          this.displayLcdTextAccordingToInput(input);
        } else {
          this.displayLcdTextPart1 = [];
        }
      });
    }

    // this.handleFormPart2();$
  }

  public displayLcdTextAccordingToInput(input: string): void {
    this.displayLcdTextPart1 = [];
    let inputs = input.split('');

    forEach(inputs, (char): void => {
      let index = parseInt(char);
      this.displayLcdTextPart1.push(this.lcdsChar[index]);
    });
  }

  // Part 2

  public handleFormPart2() {
    // Part 2
    let formValuePart2LcdText = this.formPart2.get('lcdTextPart2');
    let formValuePart2Height = this.formPart2.get('height');
    let formValuePart2Width = this.formPart2.get('width');

    if (!isNil(formValuePart2LcdText)) {
      this.registerSubscription = formValuePart2LcdText.valueChanges.subscribe((input): void => {
        if (formValuePart2LcdText?.valid) {
          let height = formValuePart2Height?.value ?? 1;
          let width = formValuePart2Width?.value ?? 1;
          this.displayLcdTextAccordingToInputAndDimensions(input, {height, width});
        } else {
          this.displayLcdTextPart2 = [];
        }
      });
    }
  }

  public displayLcdTextAccordingToInputAndDimensions(input: string, dimensions = {height: 1, width: 1}): void {
    this.displayLcdTextPart2 = [];
    let inputs = input.split('');

    forEach(inputs, (char): void => {
      let index = parseInt(char);
      this.resizeLcdDimensions(this.lcdsChar[index], dimensions);
    });
  }

  public resizeHeight(lcdValue: string, height: number): void {
    // Usual height, doesn't require to be modified
    if (height <= 1) {
      console.log('return lcdValue');
    }
    const lcdSeparatedByLine = lcdValue.split('\n')

    const topLine = lcdSeparatedByLine[0];
    const bottomLine = lcdSeparatedByLine[2];
    const lineWidth = lcdSeparatedByLine[1]

    console.log(`topLine : ${ topLine }`);
    console.log(`bottomLine : ${ bottomLine }`);
    console.log(`lineWidth : ${ lineWidth }`);

    // Then resize and put topLine and bottomLine at the start and the end.
  }

  public resizeWidth(lcdValue: string, width: number): void {
    // Usual width, doesn't require to be modified
    if (width <= 1) {
      console.log('return lcdValue');
    }
    const lcdSeparatedByLine = lcdValue.split('\n')

    for (let i = 1; i < lcdSeparatedByLine.length - 1; i++) {
      // Line between top and bottom
      console.log(lcdSeparatedByLine[i]);
    }

    // Expand the lines width (including top and bottom)
  }

  public resizeLcdDimensions(lcdValue: string, options = {height: 1, width: 1}): void {
    this.resizeHeight(lcdValue, options.height);
    this.resizeWidth(lcdValue, options.width);
  }
}
