let videoDisplay = document.getElementById("video-display");
let videoSource = document.getElementById("src");
let videoTitleDisplay = document.getElementById("video-title");
let nextBtn = document.getElementById("next-btn");
let videos = ["vid", "game-capture"]; // Video ids
let currentVideo = 0; //Current video that is playing

// Switch to next video
nextBtn.addEventListener("click", ()=> {
	if(currentVideo < videos.length-1) {
		currentVideo += 1;
		init(currentVideo);
	} else {
		currentVideo = 0;
		init(currentVideo);
	}
});

// INIT
function init(id) {
	videoTitleDisplay.innerText = `${videos[id]}`;
	videoSource.src = `/video/${videos[id]}`;
	videoDisplay.load();
}

window.onload = () => {
	init(currentVideo);
};
