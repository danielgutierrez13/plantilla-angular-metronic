import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './theme/modules/i18n';
import { locale as enLang } from './theme/modules/i18n/vocabs/en';
import { locale as chLang } from './theme/modules/i18n/vocabs/ch';
import { locale as esLang } from './theme/modules/i18n/vocabs/es';
import { locale as jpLang } from './theme/modules/i18n/vocabs/jp';
import { locale as deLang } from './theme/modules/i18n/vocabs/de';
import { locale as frLang } from './theme/modules/i18n/vocabs/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService) {
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {}
}
