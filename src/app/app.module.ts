import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './presentation/loading/loading.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { WidgetsModule } from "./theme/_metronic/partials";

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ClipboardModule,
        AppRoutingModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        ReactiveFormsModule,
        WidgetsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
        LoadingComponent
    ]
})
export class AppModule {}
