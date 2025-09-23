import Typed from "typed.js";


function renderTyped() {
    const typedElement = document.createElement('div');
    typedElement.id = 'typedElement';
    document.body.appendChild(typedElement);

    new Typed('#typedElement', {
        strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
        typeSpeed: 50,
    });
}

export default renderTyped;