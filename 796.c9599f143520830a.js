"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[796],{6796:(j,h,s)=>{s.r(h),s.d(h,{HomeModule:()=>I});var p=s(6895),f=s(6327),i=s(7340),u=s(7579),y=s(5243),e=s(1571);class r{constructor(){}observeElement(o,n=0){const a=new u.x;return new IntersectionObserver((D,M)=>{D.forEach(T=>{a.next({entry:T,observer:M})})}).observe(o),a.asObservable().pipe((0,y.b)(n))}isIntersecting(o){return o.isIntersecting||o.intersectionRatio>0}}r.fadeInOut=(0,i.X$)("fadeInOut",[(0,i.SB)("show",(0,i.oB)({opacity:1})),(0,i.SB)("hide",(0,i.oB)({opacity:0})),(0,i.eR)("show => hide",(0,i.jt)("500ms ease-out")),(0,i.eR)("hide => show",(0,i.jt)("500ms ease-in"))]),r.flyInOutLeft=(0,i.X$)("flyInOutLeft",[(0,i.SB)("show",(0,i.oB)({opacity:1,transform:"translateX(0)"})),(0,i.SB)("hide",(0,i.oB)({opacity:0,transform:"translateX(-100%)"})),(0,i.eR)("show => hide",(0,i.jt)("500ms ease-out")),(0,i.eR)("hide => show",(0,i.jt)("500ms ease-in"))]),r.flyInOutRight=(0,i.X$)("flyInOutRight",[(0,i.SB)("show",(0,i.oB)({opacity:1,transform:"translateX(0)"})),(0,i.SB)("hide",(0,i.oB)({opacity:0,transform:"translateX(100%)"})),(0,i.eR)("show => hide",(0,i.jt)("500ms ease-out")),(0,i.eR)("hide => show",(0,i.jt)("500ms ease-in"))]),r.growShrinkVertical=(0,i.X$)("growShrinkVertical",[(0,i.SB)("show",(0,i.oB)({opacity:1,transform:"scale(1)"})),(0,i.SB)("hide",(0,i.oB)({opacity:0,transform:"scale(0)"})),(0,i.eR)("show => hide",(0,i.jt)("500ms ease-out")),(0,i.eR)("hide => show",(0,i.jt)("500ms ease-in"))]),r.\u0275fac=function(o){return new(o||r)},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"});const x=[{title:"Google Cloud Platform",description:"James has experience using Google Cloud Platform to develop and deploy full stack micro-service architecture web applications for customers"},{title:"Full Stack Development",description:"James has experience working as a full stack developer in the Angular/NestJS frameworks within Javascript and NodeJS."},{title:"Material Design",description:"Design rules and approach follow the Material Design specification, but are extended or modified where appropriate."},{title:"Browser Extensions",description:"James has developed, deployed, debugged, and maintained a large-scale browser extension product integration."},{title:"Redis",description:"James has architected applications that implement a Redis caching layer to improve performance and reduce server load."}],w=[{title:"Responsive Design",description:"Applications are built to work across all devices and view ports"},{title:"Scalability",description:"James writes code to be performant, both for at-keyboard interactions, and performing mass operations at scale."},{title:"Communication",description:"As a former educator, James is a skilled communicator and facilitator of communication, both synchronous and asynchronous."}],k=[{title:"Self hosting",description:"Within the dark reaches of James' basement lies a 2011 HP desktop computer running Docker, hosting a revolving door of images he finds interesting"},{title:"Home Automation",description:"James runs his own home automation server, and has built several devices to power his own smart home"},{title:"Electronics",description:"James designs and builds devices to augment his smart home. He has also retrofit existing consumer devices such as window air conditioners to connect to his home automation server."}];var l=s(1576);let b=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-general-description"]],decls:3,vars:0,consts:[["fxLayout","column","fxLayoutAlign","start center",1,"general-description"]],template:function(n,a){1&n&&(e.TgZ(0,"div",0)(1,"p"),e._uU(2,' James is full stack web developer, working in the Google Cloud Platform space. He brings an unbridled enthusiasm for learning, a creative approach to problem solving, and a collaborative, positive attitude to every challenge he faces. With his experience as an educator, he is a quick learning, and brings that same "coach on the side" mentality to every team with whom he works. He is also keen to grow and develop, and is never afraid of discovering there\'s a better way to solve a problem. '),e.qZA()())},dependencies:[l.xw,l.Wh],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:0 0 60%;align-items:center;justify-content:center}"]}),t})();var C=s(1135),g=s(2722),v=s(9300),m=s(3546);const S=["triggerVisible"],O=["triggerHidden"];let H=(()=>{class t{constructor(n){this.animation=n,this.animate$=new C.X("hide"),this.OnDestroy$=new u.x}ngAfterViewInit(){this.animation.observeElement(this.triggerVisible.nativeElement,500).pipe((0,g.R)(this.OnDestroy$),(0,v.h)(n=>this.animation.isIntersecting(n.entry))).subscribe(n=>{console.log(`${this.skill.title} show`),this.animate$.next("show")}),this.animation.observeElement(this.triggerHidden.nativeElement,500).pipe((0,g.R)(this.OnDestroy$),(0,v.h)(n=>!this.animation.isIntersecting(n.entry))).subscribe(n=>{console.log(`${this.skill.title} hide`),this.animate$.next("hide")})}ngOnDestroy(){}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-skill"]],viewQuery:function(n,a){if(1&n&&(e.Gf(S,5,e.SBq),e.Gf(O,5,e.SBq)),2&n){let d;e.iGM(d=e.CRH())&&(a.triggerVisible=d.first),e.iGM(d=e.CRH())&&(a.triggerHidden=d.first)}},inputs:{skill:"skill"},decls:12,vars:5,consts:[["fxLayout","column","fxFlex","1 0 100",1,"skill-container"],["triggerHidden",""],["triggerVisible",""]],template:function(n,a){1&n&&(e.TgZ(0,"div",0),e._UZ(1,"div",null,1),e.TgZ(3,"mat-card"),e.ALo(4,"async"),e.TgZ(5,"mat-card-header")(6,"mat-card-title"),e._uU(7),e.qZA()(),e.TgZ(8,"mat-card-content"),e._uU(9),e.qZA()(),e._UZ(10,"div",null,2),e.qZA()),2&n&&(e.xp6(3),e.Q6J("@fadeInOut",e.lcZ(4,3,a.animate$)),e.xp6(4),e.hij(" ",a.skill.title," "),e.xp6(2),e.Oqu(a.skill.description))},dependencies:[m.a8,m.dn,m.dk,m.n5,l.xw,l.yH,p.Ov],styles:[".skill-container[_ngcontent-%COMP%]{padding:15% 0}.skill-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{color:#ccc}"],data:{animation:[r.fadeInOut]}}),t})();function $(t,o){1&t&&e._UZ(0,"app-skill",5),2&t&&e.Q6J("skill",o.$implicit)}function B(t,o){1&t&&e._UZ(0,"app-skill",5),2&t&&e.Q6J("skill",o.$implicit)}function J(t,o){1&t&&e._UZ(0,"app-skill",5),2&t&&e.Q6J("skill",o.$implicit)}const Z=[{path:"",component:(()=>{class t{constructor(){this.skills=x,this.interests=k,this.principles=w,this.onDestroy$=new u.x}ngOnInit(){}ngAfterViewInit(){}ngOnDestroy(){this.onDestroy$.next()}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-home"]],decls:8,vars:3,consts:[["fxLayout","row","fxFlexFill","",1,"scroll-container","padded"],["fxFlex",""],["fxLayout","column","fxLayoutAlign","start stretch","fxLayoutGap","24px","fxFlex","552px","fxFlex.lt-sm","100"],["fxFlexOffset","24px"],[3,"skill",4,"ngFor","ngForOf"],[3,"skill"]],template:function(n,a){1&n&&(e.TgZ(0,"div",0),e._UZ(1,"div",1),e.TgZ(2,"div",2),e._UZ(3,"app-general-description",3),e.YNc(4,$,1,1,"app-skill",4),e.YNc(5,B,1,1,"app-skill",4),e.YNc(6,J,1,1,"app-skill",4),e.qZA(),e._UZ(7,"div",1),e.qZA()),2&n&&(e.xp6(4),e.Q6J("ngForOf",a.skills),e.xp6(1),e.Q6J("ngForOf",a.principles),e.xp6(1),e.Q6J("ngForOf",a.interests))},dependencies:[p.sg,l.xw,l.SQ,l.Wh,l.UT,l.s9,l.yH,b,H],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1 1 100%;overflow-y:hidden}"],data:{animation:[r.fadeInOut]}}),t})()}];let R=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[f.Bz.forChild(Z),f.Bz]}),t})();var A=s(5823),F=s(7453);let I=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.ez,R,F.q,A.o9]}),t})()}}]);