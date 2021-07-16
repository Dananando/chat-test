const app = {
    init() {
        const socket = io();

        const form = document.querySelector('#form');
        const input = document.querySelector('#input');
        const messages = document.querySelector('#messages');

        // Who are you?
        const pseudo = app.whoAreYou();

        // Alert that someone just got in
        socket.on('someone in', (msg) => {
            const someoneLi = document.createElement('li');
            msg = `${pseudo} jumped in the chat`;
            someoneLi.style.fontStyle = 'italic';
            someoneLi.textContent = msg;  
            messages.appendChild(someoneLi);          
        });

        // Poster un message sur le chat (envoi vers le back)
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        // Poster un message sur le chat - réception du message provenant du back
        socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
        
        // Notification de déconnection
        socket.on('newDisconnect', (msg) => {
            const someoneOutLi = document.createElement('li');
            msg = `${pseudo} just disconnected`;
            someoneOutLi.textContent = msg;  
            messages.appendChild(someoneOutLi);
        });
    },

    // Choose you pseudo via a prompt()
    whoAreYou() {
        let pseudo;
        while(!pseudo) {
            pseudo = prompt('Choose a pseudo');
        }

        return pseudo;
    }
};


document.addEventListener('DOMContentLoaded', app.init);
