var y=Object.defineProperty;var m=(r,t,e)=>t in r?y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var s=(r,t,e)=>m(r,typeof t!="symbol"?t+"":t,e);import"./modulepreload-polyfill-B5Qt9EMX.js";class u{constructor(){s(this,"subscribers");this.subscribers=new Set}subscribe(t){this.subscribers.add(t)}unsubscribe(t){this.subscribers.delete(t)}notify(t){this.subscribers.forEach(e=>e.update(t))}}class f extends u{constructor(t,e){super(),this.playersCount=t,this.currentPlayerIndex=e}next(){this.notify(this.currentPlayerIndex%this.playersCount),this.currentPlayerIndex+=1}}class b extends u{constructor(e=6){super();s(this,"currentPlayerIndex",0);s(this,"turnGenerator",new f(2,this.currentPlayerIndex));this.sidesCount=e,this.turnGenerator.subscribe(this)}update(e){this.currentPlayerIndex=e}roll(){this.turnGenerator.next();const e={playerIndex:this.currentPlayerIndex,diceResult:this.getDiceResult()};this.notify(e)}getDiceResult(){const e=new Uint8Array(1),n=window.crypto.getRandomValues(e);return Math.floor(n[0]/256*this.sidesCount)+1}}class x extends u{constructor(){super(...arguments);s(this,"players",[]);s(this,"winner",null);s(this,"rolls",[]);s(this,"diceGenerator",new b)}addPlayer(e){this.players.includes(e)||this.players.push(e),this.diceGenerator.subscribe(e)}start(){this.players.forEach(e=>e.subscribe(this))}makeMove(){this.winner||this.diceGenerator.roll()}update(e){const{playerIndex:n,diceResult:i,isWinner:o}=e;this.rolls.push(i),o&&(this.winner=this.players.at(n)??null);const l={winner:this.winner,rolls:this.rolls,players:this.players};this.notify(l)}}class d extends u{constructor(e){super();s(this,"diceResults",[]);s(this,"isWinner",!1);s(this,"sumToWin",21);this.playerIndex=e}update(e){const{playerIndex:n,diceResult:i}=e;if(this.playerIndex!==n)return;this.diceResults.push(i);const o=this.diceResults.reduce((h,p)=>h+p,0);this.isWinner=o>=this.sumToWin;const l=this.makeResultInfo(i);this.notify(l)}getDiceResults(){return[...this.diceResults]}makeResultInfo(e){return{playerIndex:this.playerIndex,diceResult:e,isWinner:this.isWinner}}}class C{constructor(){s(this,"diceCapContainer",document.querySelector(".dice-cap-container"));s(this,"generalSumContainer",document.querySelector(".general-sum"));s(this,"firstContainer",document.querySelector(".container1"));s(this,"firstSumContainer",document.querySelector(".sum1"));s(this,"secondContainer",document.querySelector(".container2"));s(this,"secondSumContainer",document.querySelector(".sum2"))}update(t){const{winner:e,rolls:n,players:i}=t;e&&this.colorWinnerField(e.playerIndex),this.updateField(n,this.diceCapContainer),i.forEach(o=>this.updateField(o.getDiceResults(),o.playerIndex===0?this.firstContainer:this.secondContainer))}updateField(t,e){if(e==null)return;e.innerText=t.join(" ");const n=t.reduce((i,o)=>i+o,0);e===this.diceCapContainer?this.updateSum(n,this.generalSumContainer):e===this.firstContainer?this.updateSum(n,this.firstSumContainer):this.updateSum(n,this.secondSumContainer)}updateSum(t,e){e&&(e.innerText=String(t))}colorWinnerField(t){const e=t===0?this.firstContainer:this.secondContainer,n=e==null?void 0:e.parentElement;n&&n.classList.add("winner")}}const a=new x,I=new d(0),S=new d(1),R=new C;a.addPlayer(I);a.addPlayer(S);a.start();a.subscribe(R);function w(){a.makeMove()}const c=document.querySelector(".roll-button");c==null||c.addEventListener("click",w);
