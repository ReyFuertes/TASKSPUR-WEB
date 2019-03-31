import { Injectable } from "@angular/core";
import * as en from "../../i18n/en";

/**
 * In Progress..
 */
@Injectable()
export class I18nService {
  private locales: { [key: string]: { [key: string]: string } };
  private language: string = 'en';

  constructor() {
    this.locales = { en: en.default };
  }

  public translate(key) {
    return this.locales[this.language][key];
  }

  public getLanguage() {}
}
