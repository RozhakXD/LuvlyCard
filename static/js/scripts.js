const colors = [
	"linear-gradient(135deg, #ff758c, #ff7eb3)",
	"linear-gradient(135deg, #ff9a9e, #fad0c4)",
	"linear-gradient(135deg, #fbc2eb, #a6c1ee)",
	"linear-gradient(135deg, #ffecd2, #fcb69f)",
	"linear-gradient(135deg, #ff8177, #ff867a)"
];

function downloadCard() {
	html2canvas(document.getElementById('cardContainer')).then(canvas => {
		let link = document.createElement('a');
		link.href = canvas.toDataURL('image/png');
		link.download = 'valentine_card.png';
		link.click();
	});
}

function shareCard() {
	html2canvas(document.getElementById('cardContainer')).then(canvas => {
		canvas.toBlob(blob => {
			const file = new File([blob], 'valentine_card.png', {
				type: 'image/png'
			});
			if (navigator.canShare && navigator.canShare({
					files: [file]
				})) {
				navigator.share({
					title: "Valentine's Card",
					text: "Check out this cute Valentine's card!",
					files: [file]
				}).catch(err => console.error(err));
			} else {
				alert("Sharing is not supported on this browser.");
			}
		}, 'image/png');
	});
}

async function fetchQuote() {
	let url = `/api/quote`;
	try {
		let response = await fetch(url);
		let data = await response.json();
		if (data.quote) {
			document.getElementById("quote").innerText = data.quote;
		} else {
			document.getElementById("quote").innerText = "Failed to load quote.";
		}
	} catch (error) {
		console.error("Error fetching quote:", error);
		document.getElementById("quote").innerText = "Failed to load quote.";
	}
}

function generateRandomEffects() {
	fetchQuote();
	document.querySelector(".card").style.background = colors[Math.floor(Math.random() * colors.length)];
}

function generateFallingElements() {
	const container = document.getElementById("cardContainer");
	for (let i = 0; i < 15; i++) {
		let heart = document.createElement("div");
		heart.classList.add("falling-element");
		heart.innerHTML = Math.random() > 0.5 ? "💖" : "🌸";
		heart.style.left = Math.random() * 100 + "%";
		heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
		container.appendChild(heart);
		setTimeout(() => heart.remove(), 5000);
	}
}

setInterval(generateFallingElements, 1000);
document.addEventListener("DOMContentLoaded", () => fetchQuote());

function changeBgColor(color) {
	document.querySelector('.card').style.background = color;
}

document.getElementById("customText").addEventListener("input", function() {
	document.getElementById("quote").innerText = this.value || "You make my heart smile every single day.";
});