let videoDisplay = document.getElementById("video-display");

function init() {
	let sourceTag = `<source src="/video/vid" type="video/mp4"/>`;
	videoDisplay.insertAdjacentHTML("beforeend", sourceTag);
}

window.onload = () => {
	init();
};
