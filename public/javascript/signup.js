async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').val.trim();
    const password = document.querySelector('#password-signup').val.trim();

    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.ok) {
            console.log('success');
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);