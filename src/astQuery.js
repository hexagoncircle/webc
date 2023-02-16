import { AstSerializer } from "./ast.js";

class AstQuery {
	// List from the parse5 serializer
	// https://github.com/inikulin/parse5/blob/3955dcc158031cc773a18517d2eabe8b17107aa3/packages/parse5/lib/serializer/index.ts
	static voidElements = {
		area: true,
		base: true,
		basefont: true,
		bgsound: true,
		br: true,
		col: true,
		embed: true,
		frame: true,
		hr: true,
		img: true,
		input: true,
		keygen: true,
		link: true,
		meta: true,
		param: true,
		source: true,
		track: true,
		wbr: true,
	};

	/* Tag Names */
	static getTagName(node) {
		let is = AstQuery.getAttributeValue(node, AstSerializer.attrs.IS);
		if(is) {
			return is;
		}

		return node.tagName;
	}

	static isVoidElement(tagName) {
		return AstQuery.voidElements[tagName] || false;
	}

	/* Attributes */
	static hasAttribute(node, attributeName) {
		return (node.attrs || []).find(({name}) => name === attributeName) !== undefined;
	}

	static getAttributeValue(node, attributeName) {
		let nameAttr = (node.attrs || []).find(({name}) => name === attributeName);

		if(!nameAttr) {
			// Same as Element.getAttribute
			// https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
			return null;
		}

		return nameAttr?.value;
	}

	/* Content */
	static getTextContent(node) { // used for style hashes
		let content = [];
		for(let child of node.childNodes || []) {
			if(child.nodeName === "#text") {
				content.push(child.value);
			}
		}
		return content;
	}

	static hasTextContent(node) {
		return AstQuery.getTextContent(node).find(entry => entry.trim().length > 0) !== undefined;
	}


	/* Surface element finds */
	static getImplicitRootNodes(node) {
		return [
			AstQuery.findElement(node, "body"),
			AstQuery.findElement(node, "head")
		].filter(node => !!node);
	}

	static getTopLevelNodes(node, tagNames = [], webcAttrs = []) {
		let roots = AstQuery.getImplicitRootNodes(node);
		if(roots.length === 0) {
			throw new Error("Unable to find component root, expected an implicit <head> or <body>");
		}

		let children = [];
		for(let root of roots) {
			for(let child of AstQuery.findAllChildren(root, tagNames, webcAttrs)) {
				children.push(child);
			}
		}
		return children;
	}

	/* Deep element finds */
	static findAllElements(root, tagName) {
		let results = [];
		let rootTagName = AstQuery.getTagName(root);
		if(rootTagName === tagName) {
			results.push(root);
		}
		for(let child of root.childNodes || []) {
			for(let node of AstQuery.findAllElements(child, tagName)) {
				results.push(node);
			}
		}

		return results;
	}

	static findElement(root, tagName, attrCheck = []) {
		let rootTagName = AstQuery.getTagName(root);
		if(rootTagName === tagName) {
			if(attrCheck.length === 0 || attrCheck.find(attr => AstQuery.hasAttribute(root, attr))) {
				return root;
			}
		}
		for(let child of root.childNodes || []) {
			let node = AstQuery.findElement(child, tagName, attrCheck);
			if(node) {
				return node;
			}
		}
	}

	static findAllChildren(parentNode, tagNames = [], attrCheck = []) {
		if(!parentNode) {
			return [];
		}
		if(typeof tagNames === "string") {
			tagNames = [tagNames];
		}
		if(!tagNames || Array.isArray(tagNames)) {
			tagNames = new Set(tagNames);
		}

		let results = [];
		for(let child of parentNode.childNodes || []) {
			let tagName = AstQuery.getTagName(child);
			if(tagNames.size === 0 || tagNames.has(tagName)) {
				if(attrCheck.length === 0 || attrCheck.find(attr => AstQuery.hasAttribute(child, attr))) {
					results.push(child);
				}
			}
		}
		return results;
	}
}

export { AstQuery };