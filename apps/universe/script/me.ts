import Typed from "typed.js";


function renderTyped() {
    const typedElement = document.createElement('div');
    typedElement.id = 'typedElement';
    typedElement.className = 'typed-container';
    document.body.appendChild(typedElement);

    new Typed('#typedElement', {
        strings: [
            'Hello, I am a fontEnd developer. my stack is React, Vue, Angular, Node.js, MongoDB, MySQL, Redis, Docker, Kubernetes, etc. '
        ],
        typeSpeed: 50,
    });
}

export default renderTyped;