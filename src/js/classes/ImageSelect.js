class ImageSelect {
    constructor(elementClass) {
        this.elementClass = elementClass;

        this.selectElement = this._findSelectElement();
        
        if (this.selectElement) {
            this.inputElement = this._findInputElement();
        }
    }

    addEvents() {
        if (this.selectElement && this.inputElement) {

            this.selectElement.addEventListener('click', () => {
                this.inputElement.click();
            })

            this.inputElement.addEventListener('change', () => {
                this._readImageSrc();
            })

        }
    }

    _renderSelectedImage(src) {
        const placeholder = this.selectElement.querySelector('i');

        if (placeholder) {
            placeholder.classList.add('d-none');
        }

        this._renderImage(src);
        this._renderRemoveButton();
    }

    _findSelectElement() {
        return document.querySelector(`${this.elementClass}`);
    }

    _findInputElement() {
        const inputId = this.selectElement.getAttribute('data-target');
        return document.getElementById(inputId);
    }

    _readImageSrc() {
        const fr = new FileReader();

        fr.readAsDataURL(this.inputElement.files[0]);

        fr.onload = (e) => {
            this._renderSelectedImage(e.target.result);
        }
    }

    _renderRemoveButton() {
        const btn = document.createElement('button');

        btn.classList.add('btn');
        btn.classList.add('btn-danger');
        btn.setAttribute('type', 'button');
        btn.innerText = 'Remove';

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._resetInput();
        });

        this.selectElement.appendChild(btn);

    }

    _renderImage(src) {
        const img = document.createElement('img');

        img.src = src;
        img.classList.add('img-fluid');

        this.selectElement.appendChild(img);
    }

    _resetInput() {
        const img = this.selectElement.querySelector('img');
        const btn = this.selectElement.querySelector('button');
        const placeholder = this.selectElement.querySelector('i');

        img.remove();
        btn.remove();

        placeholder.classList.remove('d-none');

        this.inputElement.value = '';
    }
}

module.exports = ImageSelect;