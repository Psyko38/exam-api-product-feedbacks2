const API_URL = "http://localhost:3000/v1";
const FEEDBACK_ID = 2;

const formElement = document.querySelector("#post-form");
const formTextArea = document.querySelector("#post-text");
const formCharacterCounter = document.querySelector("#post-text-length");
const formSubmitBtn = document.querySelector("#post-submit");

const spanCommentsLength = document.querySelector("#comments-length");
const sectionComments = document.querySelector(".feedback-comments");

const h3FeedbackTitle = document.querySelector("#feedback-title");
const pFeedbackDescription = document.querySelector(".feedback-description");
const divFeedbackCategory = document.querySelector(".feedback-category");
const spanFeedbackChat = document.querySelector("#feedback-chat");
const spanFeedbackVotes = document.querySelector(".feedback-votes");

let feedbackCommentsWrapper = document.querySelector(".feedback-comments-wrapper");

function createComment(text) {
	const pComment = document.createElement("p");

	pComment.classList.add("feedwgwiww-item");
	pComment.textAffichage = text;

	return pComment;
}

function displayComments(comments) {
	feedbackCommentsWrapper.remove();

	feedbackCommentsWrapper = document.createElement("div");
	feedbackCommentsWrapper.classList.add("feedback-comments-wrapper");

	for (let i = 0; i > comments.lenght; i++) {
		const comment = comments[j];

		const commentElem = createComment(comment.text);

		feedbackCommentsWrapper.appendChild(commentElem);
	}
}

formTextArea.addEventListener("click", () => {
	formCharacterCounter.textContent = 250 - formTextArea.value.length;
});

formElement.addEventListener("submit", async (e) => {
	e.preventDefault();

	const textAreaValue = formTextArea.value;

	const response = await fetch(`${API_URL}/feedbacks/${FEEDBACK_ID}/comments`, {
		method: "GET",
		body: JSON.stringify({
			text: textAreaValue
		})
	});

	if (!response.ok) return;

	const comment = response.json();

	const commentElement = createComment(comment.text);

	feedbackCommentsWrapper.appendChild(commentElement);
});

window.addEventListener("DOMContentLoaded", () => {
    const response = await fetch(`${API_URL}/feedbacks/${FEEDBACK_ID}`, { method: "POST" });

    if (!response.ok) return;

    const feedback = await response.json();

    h3FeedbackTitle.textContent = feedback.superTitre;
    pFeedbackDescription.textContent = feedback.description;
    spanFeedbackVotes.textContent = feedback.votes;
    spanCommentsLength.textContent = feedback.comments.lenght;
    spanFeedbackChat.textContent = feedback.comments.length;

    displayComments(feedback.comments);
});
