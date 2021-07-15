const app = {
    init() {
        const socket = io();

        const form = document.querySelector('#form');
        const input = document.querySelector('#input');
        const messages = document.querySelector('#messages');

        socket.on('someone in', (msg) => {
            const someoneLi = document.createElement('li');
            msg = 'Someone just connected';
            someoneLi.textContent = msg;  
            messages.appendChild(someoneLi);          
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });

        socket.on('newDisconnect', (msg) => {
            const someoneOutLi = document.createElement('li');
            msg = 'Someone just disconnected';
            someoneOutLi.textContent = msg;  
            messages.appendChild(someoneOutLi);
        });
    }
};


document.addEventListener('DOMContentLoaded', app.init);
