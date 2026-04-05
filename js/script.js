const invitationLink = document.getElementById('openInvitation');
const screen = document.getElementById('screen');

if (invitationLink && screen) {
    let isOpening = false;

    invitationLink.addEventListener('click', (event) => {
        if (isOpening) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        isOpening = true;
        screen.classList.add('fade-out');

        window.setTimeout(() => {
            window.location.href = invitationLink.href;
        }, 800);
    });
}
