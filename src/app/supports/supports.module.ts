import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { SupportsRoutingModule } from './supports-routing.module';
import { TermConditionComponent } from './term-condition/term-condition.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    RefundPolicyComponent,
    TermConditionComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SupportsRoutingModule
    ],
})
export class SupportsModule {}
