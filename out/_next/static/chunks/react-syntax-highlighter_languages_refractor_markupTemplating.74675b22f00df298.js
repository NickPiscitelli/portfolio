"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3047],{3770:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,o){if(t.language===a){var u=t.tokenStack=[];t.code=t.code.replace(r,function(e){if("function"==typeof o&&!o(e))return e;for(var r,c=u.length;-1!==t.code.indexOf(r=n(a,c));)++c;return u[c]=e,r}),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,o=Object.keys(t.tokenStack);!function u(c){for(var i=0;i<c.length&&!(r>=o.length);i++){var s=c[i];if("string"==typeof s||s.content&&"string"==typeof s.content){var l=o[r],p=t.tokenStack[l],g="string"==typeof s?s:s.content,f=n(a,l),k=g.indexOf(f);if(k>-1){++r;var h=g.substring(0,k),m=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),d=g.substring(k+f.length),y=[];h&&y.push.apply(y,u([h])),y.push(m),d&&y.push.apply(y,u([d])),"string"==typeof s?c.splice.apply(c,[i,1].concat(y)):s.content=y}}else s.content&&u(s.content)}return c}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);