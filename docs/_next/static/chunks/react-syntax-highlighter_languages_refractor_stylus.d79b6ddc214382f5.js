"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1621],{9515:function(n){function t(n){var t,e;t=n,(e={url:/url\((["']?).*?\1\)/i,string:{pattern:/("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,greedy:!0},interpolation:null,func:null,important:/\B!(?:important|optional)\b/i,keyword:{pattern:/(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,lookbehind:!0},hexcode:/#[\da-f]{3,6}/i,number:/\b\d+(?:\.\d+)?%?/,boolean:/\b(?:true|false)\b/,operator:[/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],punctuation:/[{}()\[\];:,]/}).interpolation={pattern:/\{[^\r\n}:]+\}/,alias:"variable",inside:{delimiter:{pattern:/^{|}$/,alias:"punctuation"},rest:e}},e.func={pattern:/[\w-]+\([^)]*\).*/,inside:{function:/^[^(]+/,rest:e}},t.languages.stylus={comment:{pattern:/(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0},"atrule-declaration":{pattern:/(^\s*)@.+/m,lookbehind:!0,inside:{atrule:/^@[\w-]+/,rest:e}},"variable-declaration":{pattern:/(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,lookbehind:!0,inside:{variable:/^\S+/,rest:e}},statement:{pattern:/(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,lookbehind:!0,inside:{keyword:/^\S+/,rest:e}},"property-declaration":{pattern:/((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,lookbehind:!0,inside:{property:{pattern:/^[^\s:]+/,inside:{interpolation:e.interpolation}},rest:e}},selector:{pattern:/(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,lookbehind:!0,inside:{interpolation:e.interpolation,punctuation:/[{},]/}},func:e.func,string:e.string,interpolation:e.interpolation,punctuation:/[{}()\[\];:.]/}}n.exports=t,t.displayName="stylus",t.aliases=[]}}]);