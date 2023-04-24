function getUserName() {
    fetch('https://mazerun-4jiw.onrender.com/profile')
        .then(response => response.json())
        .then(data => {
            const userName = data.name;
            const userNameElement = document.getElementById('userName');
            userNameElement.innerHTML = `Welcome, ${userName} 🎮`;
        });
}

window.onload = function() {
    getUserName();
    getSuccessAttempts()
};

function getSuccessAttempts() {
    fetch('https://mazerun-4jiw.onrender.com//success')
        .then(response => response.json())
        .then(data => {
            const obj = data.length > 0 ? data[0] : {};
            const easy = obj.score_easy;
            const medium = obj.score_med;
            const hard = obj.score_hard;
            const extreme = obj.score_ext;
            const userNameElement1 = document.getElementById('easy');
            const userNameElement2 = document.getElementById('med');
            const userNameElement3 = document.getElementById('hard');
            const userNameElement4 = document.getElementById('ext');
            userNameElement1.innerHTML = easy !== undefined ? `${easy}` : 'yet to attempt';
            userNameElement2.innerHTML = medium !== undefined ? `${medium}` : 'yet to attempt';
            userNameElement3.innerHTML = hard !== undefined ? `${hard}` : 'yet to attempt';
            userNameElement4.innerHTML = hard !== undefined ? `${extreme}` : 'yet to attempt';
        })
        .catch(error => {
            console.log('Error fetching success attempts:', error);
            const userNameElement1 = document.getElementById('easy');
            const userNameElement2 = document.getElementById('med');
            const userNameElement3 = document.getElementById('hard');
            const userNameElement4 = document.getElementById('ext');
            userNameElement1.innerHTML = 'yet to attempt';
            userNameElement2.innerHTML = 'yet to attempt';
            userNameElement3.innerHTML = 'yet to attempt';
            userNameElement4.innerHTML = 'yet to attempt';
        });
}
function togglePopup() {
    fetch('https://mazerun-4jiw.onrender.com//score')
    .then(response => response.json())  
    .then(data => {
        console.log(data)
    })
    document.getElementById("popup-1").classList.toggle("active");
}
