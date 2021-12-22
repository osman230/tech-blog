async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const info = document.querySelector('input[name="post-info"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            info
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post').addEventListener('submit', newFormHandler);