
$(document).on('click', '#search-button', async function() {
    var movieName = document.getElementById('search-box').value;
    const resp = await fetch(`/searchMovie/${movieName}`);
    const json = await resp.json();
    const url = json.url
    window.location.href = url 
});
