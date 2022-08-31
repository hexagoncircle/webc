import test from "ava";
import { CssPrefixer } from "../src/css.js";

test("Selector tests", t => {
	let c = new CssPrefixer("my-prefix");
	
	t.is(c.process(""), "");
	t.is(c.process("div {}"), ".my-prefix div{}");
	t.is(c.process("* {}"), ".my-prefix *{}"); /* huh? */
	t.is(c.process("*.warning {}"), ".my-prefix *.warning{}");
	t.is(c.process("* [lang^=en] {}"), ".my-prefix * [lang^=en]{}");
	t.is(c.process(":before {}"), ".my-prefix :before{}");
});

test("Class, sibling selectors", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process(".class1 {}"), ".my-prefix .class1{}");
	t.is(c.process(".class1 + .class2 {}"), ".my-prefix .class1+.class2{}");
	t.is(c.process(".class1 ~ .class2 {}"), ".my-prefix .class1~.class2{}");
});

test("ID selectors", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process("#test {}"), ".my-prefix #test{}");
});

test("Attribute selectors", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process("[class~=class_name] {}"), ".my-prefix [class~=class_name]{}");
	t.is(c.process("a[title] {}"), ".my-prefix a[title]{}");
	t.is(c.process(`a[href$=".org"] {}`), `.my-prefix a[href$=".org"]{}`);
	t.is(c.process(`a[href^="https"][href$=".org"] {}`), `.my-prefix a[href^="https"][href$=".org"]{}`);
	t.is(c.process(`div[lang|="zh"] {}`), `.my-prefix div[lang|="zh"]{}`);
});

test("List selectors", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process(`span, div {}`), `.my-prefix span,.my-prefix div{}`);
	t.is(c.process(`h1,h2, h3, h4 ,h5, h6 {}`), `.my-prefix h1,.my-prefix h2,.my-prefix h3,.my-prefix h4,.my-prefix h5,.my-prefix h6{}`);
	t.is(c.process(`h1, h2:maybe-unsupported, h3 { font-family: sans-serif }`), `.my-prefix h1,.my-prefix h2:maybe-unsupported,.my-prefix h3{font-family:sans-serif}`);
	t.is(c.process(`:is(h1, h2:maybe-unsupported, h3) { font-family: sans-serif }`), `.my-prefix :is(h1,h2:maybe-unsupported,h3){font-family:sans-serif}`);
	t.is(c.process(`:is(h1, :not(h2), h3) { font-family: sans-serif }`), `.my-prefix :is(h1,:not(h2),h3){font-family:sans-serif}`);
});

test("Descendent selectors", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process(`li li {}`), `.my-prefix li li{}`);
	t.is(c.process(`li > li {}`), `.my-prefix li>li{}`);
});

test("Pseudo classes", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process(`:not(p) {}`), `.my-prefix :not(p){}`);
	t.is(c.process(`div:not([lang]) {}`), `.my-prefix div:not([lang]){}`);

	t.is(c.process(`li:first-of-type li {}`), `.my-prefix li:first-of-type li{}`);
	t.is(c.process(`:hover {}`), `.my-prefix :hover{}`);
	t.is(c.process(`:lang(en-US) {}`), `.my-prefix :lang(en-US){}`);
	t.is(c.process(`:empty {}`), `.my-prefix :empty{}`);
	t.is(c.process(`:root {}`), `.my-prefix{}`);
	t.is(c.process(`:root:not(p) div {}`), `.my-prefix:not(p) div{}`);
});

test("Pseudo elements", t => {
	let c = new CssPrefixer("my-prefix");

	t.is(c.process(`:before {}`), `.my-prefix :before{}`);
	t.is(c.process(`::before {}`), `.my-prefix ::before{}`);
});