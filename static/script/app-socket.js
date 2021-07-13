const app = {
    init() {
        const socket = io();

        const form = document.querySelector('#form');
        const input = document.querySelector('#input');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        })
    }
};


document.addEventListener('DOMContentLoaded', app.init);
