var createLocalLink = function(label, referenceId) {
	let localLink         = document.createElement('a');
	let reference         = '#' + referenceId;
	localLink.textContent = label;
	localLink.setAttribute('href', reference);
	
	return localLink;
}
var createContainer = function(name, contents) {
	let container = document.createElement('div');
	let label     = document.createElement('h2');
	
	container.id       = name + '_container';
	label.className    = name + '_title';
	contents.className = name + '_list';
	label.textContent  = 'Contents';
	
	container.appendChild(label);
	container.appendChild(contents);
	return container;
}

var appendLinksToWrapper = function(headers, wrapper) {
	let currentLinkGroup = null;
    
	headers.forEach(function (header) {
		let tagName   = header.tagName;
		let label     = header.textContent;
		let id        = header.id;
		let localLink = createLocalLink(label, id);
		
		if (tagName == 'H2') {
			let h3 = document.createElement('h3');
			let ol = document.createElement('ol');
			
			h3.appendChild(localLink);
			wrapper.appendChild(h3);
			wrapper.appendChild(ol);
			
			currentLinkGroup = ol;
		}
		else if (tagName == 'H3') {
			let li = document.createElement('li');
			
			li.appendChild(localLink);
			currentLinkGroup.appendChild(li);
		}
	});
}

var subheaders       = document.querySelectorAll('h2, h3');
var root             = document.querySelector('[role=main]');
var wrapper          = document.createElement('div');
var skipLink         = createLocalLink('Skip the Table of Contents', subheaders[0].id);
var tableOfContents  = createContainer('toc', wrapper);

appendLinksToWrapper(subheaders, wrapper);
root.insertBefore(skipLink, subheaders[0]);
root.insertBefore(tableOfContents, subheaders[0]);
