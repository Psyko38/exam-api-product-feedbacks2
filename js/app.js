const API_URL = "http://51.38.232.174:3002/v1";
const FEEDBACK_ID = 2;

const formElement = document.querySelector("#post-form");
const formTextArea = document.querySelector("#post-text");
const formCharacterCounter = document.querySelector("#post-text-length");
const formSubmitBtn = document.querySelector("#post-submit");

const spanCommentsLength = document.querySelector("#comments-length");
const sectionComments = document.querySelector(".feedback-comments");

const h3FeedbackTitle = document.querySelector("#feedback-title");
const pFeedbackDescription = document.querySelector("#feedback-description");
const divFeedbackCategory = document.querySelector("#feedback-category");
const spanFeedbackChat = document.querySelector("#feedback-chat");
const spanFeedbackVotes = document.querySelector("#feedback-votes");

let feedbackCommentsWrapper = document.querySelector(
	".feedback-comments-wrapper"
);

function createComment(text) {
	const pComment = document.createElement("p");

	pComment.classList.add("feedwgwiww-item");
	pComment.innerText = text;

	return pComment;
}

function displayComments(comments) {
	feedbackCommentsWrapper.remove();

	feedbackCommentsWrapper = document.createElement("div");
	feedbackCommentsWrapper.classList.add("feedback-comments-wrapper");

	for (let i = 0; i < comments.length; i++) {
		const comment = comments[i];

		const commentElem = createComment(comment.text);

		feedbackCommentsWrapper.appendChild(commentElem);
	}

	sectionComments.appendChild(feedbackCommentsWrapper);
}

formTextArea.addEventListener("input", () => {
	formCharacterCounter.textContent = 250 - formTextArea.value.length;
});

formElement.addEventListener("submit", async (e) => {
	e.preventDefault();

	const textAreaValue = formTextArea.value;

	const response = await fetch(
		`${API_URL}/feedbacks/${FEEDBACK_ID}/comments`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: textAreaValue,
			}),
		}
	);

	if (!response.ok) return;

	const comment = await response.json();

	const commentElement = createComment(comment.text);

	feedbackCommentsWrapper.appendChild(commentElement);

	spanCommentsLength.textContent =
		parseInt(spanCommentsLength.textContent) + 1;
	spanFeedbackChat.textContent = parseInt(spanFeedbackChat.textContent) + 1;
});

window.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch(`${API_URL}/feedbacks/${FEEDBACK_ID}`, {
		method: "GET",
	});

	if (!response.ok) return;

	const feedback = await response.json();
	h3FeedbackTitle.textContent = feedback.title;
	pFeedbackDescription.textContent = feedback.description;
	spanFeedbackVotes.textContent = feedback.votes;
	console.log(feedback.comments.length);
	spanCommentsLength.textContent = feedback.comments.length;
	spanFeedbackChat.textContent = feedback.comments.length;
	divFeedbackCategory.textContent =
		String(feedback.category[0]).toUpperCase() +
		String(feedback.category).slice(1);

	displayComments(feedback.comments);
});
