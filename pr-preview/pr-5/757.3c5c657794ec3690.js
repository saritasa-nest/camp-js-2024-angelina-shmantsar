"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[757],{3757:(E,g,o)=>{o.r(g),o.d(g,{LoginPageComponent:()=>w});var l=o(6610),t=o(7788),s=o(2073),d=o(4587),f=o(2221),e=o(7222),v=o(6914),m=o(7212),p=o(4549),u=o(5981),b=o(7236),y=o(4526),F=o(8823),h=o(6182),C=o(840),M=o(5192);let P=(()=>{class n{constructor(){this.authService=(0,t.WQX)(v.u),this.navigationService=(0,t.WQX)(C.o),this.destroyRef=(0,t.WQX)(t.abz),this.validationService=(0,t.WQX)(p.B),this.formBuilder=(0,t.WQX)(e.ok),this.hasLoginError$=new u.t(!1),this.isPasswordVisible$=new u.t(!1),this.loginForm=this.formBuilder.nonNullable.group({email:this.formBuilder.nonNullable.control("",[e.k0.required,e.k0.email]),password:this.formBuilder.nonNullable.control("",[e.k0.required])}),this.loginError="No active account found with given credentials"}get controls(){return this.loginForm.controls}get isPasswordVisible(){let a=!1;return this.isPasswordVisible$.pipe((0,m.pQ)(this.destroyRef)).subscribe(r=>{a=r}),a}changePasswordVisibility(){this.isPasswordVisible$.next(!this.isPasswordVisible)}onSubmit(){if(this.loginForm.valid){const a=this.loginForm.getRawValue();this.authService.login(a).pipe((0,b.M)(()=>this.navigationService.navigate("")),(0,m.pQ)(this.destroyRef),(0,y.W)(r=>(this.validationService.isLoginError(r)&&this.hasLoginError$.next(!0),(0,F.$)(r)))).subscribe()}}onFormChange(){this.navigationService.navigate("register")}ngOnInit(){this.loginForm.valueChanges.pipe((0,m.pQ)(this.destroyRef)).subscribe(()=>{this.hasLoginError$.next(!1)})}static#t=this.\u0275fac=function(r){return new(r||n)};static#i=this.\u0275cmp=t.VBU({type:n,selectors:[["camp-login-form"]],standalone:!0,features:[t.aNF],decls:24,vars:13,consts:[[1,"auth-form",3,"ngSubmit","formGroup"],[1,"title"],[3,"errorMessage"],["appearance","outline",1,"field"],[1,"field-title"],["matInput","","placeholder","example@example.com","type","email","formControlName","email"],["matInput","","placeholder","er123456","formControlName","password",3,"type"],["matSuffix","",1,"password-visibility",3,"click","onKeyDown"],["mat-flat-button","","type","submit",1,"submit-button"],["mat-stroked-button","","type","button",1,"form-change-button",3,"click"]],template:function(r,i){1&r&&(t.j41(0,"form",0),t.bIt("ngSubmit",function(){return i.onSubmit()}),t.j41(1,"h2",1),t.EFF(2,"Login"),t.k0s(),t.nrm(3,"camp-error",2),t.nI1(4,"async"),t.nrm(5,"camp-error",2)(6,"camp-error",2),t.j41(7,"mat-form-field",3)(8,"mat-label",4),t.EFF(9,"Email"),t.k0s(),t.nrm(10,"input",5),t.k0s(),t.nrm(11,"camp-error",2),t.j41(12,"mat-form-field",3)(13,"mat-label",4),t.EFF(14,"Password"),t.k0s(),t.nrm(15,"input",6),t.nI1(16,"async"),t.j41(17,"mat-icon",7),t.bIt("click",function(){return i.changePasswordVisibility()})("onKeyDown",function(){return i.changePasswordVisibility()}),t.EFF(18),t.nI1(19,"async"),t.k0s()(),t.j41(20,"button",8),t.EFF(21," Login "),t.k0s(),t.j41(22,"button",9),t.bIt("click",function(){return i.onFormChange()}),t.EFF(23," Not registered yet? Register "),t.k0s()()),2&r&&(t.Y8G("formGroup",i.loginForm),t.R7$(3),t.Y8G("errorMessage",t.bMT(4,7,i.hasLoginError$)?i.loginError:""),t.R7$(2),t.Y8G("errorMessage",i.validationService.hasError(i.controls.email,"required")?i.validationService.getErrorMessage("required"):""),t.R7$(),t.Y8G("errorMessage",i.validationService.hasError(i.controls.email,"email")?i.validationService.getErrorMessage("email"):""),t.R7$(5),t.Y8G("errorMessage",i.validationService.hasError(i.controls.password,"required")?i.validationService.getErrorMessage("required"):""),t.R7$(4),t.Y8G("type",t.bMT(16,9,i.isPasswordVisible$)?"text":"password"),t.R7$(3),t.SpI(" ",t.bMT(19,11,i.isPasswordVisible$)?"visibility_off":"visibility"," "))},dependencies:[l.MD,l.Jj,s.RG,s.rl,s.nJ,s.yw,d.fS,d.fg,f.Hl,f.$z,e.X1,e.qT,e.me,e.BC,e.cb,e.j4,e.JD,M.A,h.m_,h.An],styles:["[_nghost-%COMP%]{--auth-form-width: 480px;--auth-buttons-width: 80%;display:flex;justify-content:center}.auth-form[_ngcontent-%COMP%]{width:var(--auth-form-width);height:-moz-fit-content;height:fit-content;padding:var(--size-8) var(--size-10);background-color:var(--anime-accent-light-color);display:flex;flex-direction:column;align-items:center;position:fixed;top:15%;border-radius:var(--size-3)}.title[_ngcontent-%COMP%]{font-size:var(--font-size-lg);color:var(--anime-primary-dark-color);margin-bottom:var(--size-5)}.field[_ngcontent-%COMP%]{width:100%}.error[_ngcontent-%COMP%]{color:var(--error-color);width:100%;text-align:left;margin-bottom:var(--size-3)}.password-visibility[_ngcontent-%COMP%]{color:var(--anime-primary-dark-color-disabled);cursor:pointer}.submit-button[_ngcontent-%COMP%]{width:var(--auth-buttons-width);border-radius:var(--size-2);margin-bottom:var(--size-5);font-family:var(--main-anime-font-family)}.form-change-button[_ngcontent-%COMP%]{width:var(--auth-buttons-width);border-radius:var(--size-2);background-color:var(--anime-primary-light-color);font-family:var(--main-anime-font-family)}.field-title[_ngcontent-%COMP%]{font-family:var(--main-anime-font-family)}[_ngcontent-%COMP%]::placeholder{font-family:var(--main-anime-font-family)}"],changeDetection:0})}return n})(),w=(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#i=this.\u0275cmp=t.VBU({type:n,selectors:[["camp-login-page"]],standalone:!0,features:[t.aNF],decls:1,vars:0,template:function(r,i){1&r&&t.nrm(0,"camp-login-form")},dependencies:[l.MD,P],encapsulation:2,changeDetection:0})}return n})()}}]);