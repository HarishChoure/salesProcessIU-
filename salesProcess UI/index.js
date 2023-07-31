// This function are used to show or hide chatbot
var div = document.getElementById('bot-container');
var display = 0 
function showchatbot(){
    if(display == 1)
    {
        div.style.display = 'none';
        display = 0;
    }
    else{
        {
            div.style.display = 'flex';
            display=1;
        }
    }
}
const userInput = document.querySelector("#user-input");
const responseContainer = document.querySelector("#response-container");
const responseOutContainer = document.querySelector("#response-out-container");

const chatHistory = (message, isUser) => {
  const chatData = document.createElement("div");
  chatData.classList.add(isUser ? "user-chat" : "bot-chat");
  const chatContent = `<p>${message}</p>`;
  chatData.innerHTML = chatContent;
  return chatData;
};

const sendMessage = () => {
  const userInput = document.querySelector("#user-input");
  const userMessage = userInput.value.trim();
  if (userMessage === "") return; // Ignore empty messages

  const userChat = chatHistory(userMessage, true);
  responseContainer.appendChild(userChat);
  responseContainer.scrollTop = responseContainer.scrollHeight;
  userInput.value = ""; // Clear the input field
  botResponse(userMessage)

  // Simulate bot response after a delay
  
};

const showChatbot = () => {
  const botContainer = document.querySelector("#bot-container");
  botContainer.style.display = "block";
};


async function botResponse(query) {
    
	await fetch(`http://localhost:8000/ask?query=${query}`, {method: "POST"})
		.then((response) => response.json())
		.then((data) => {
			
            const botMessage = data; // Replace with your own logic for generating bot responses
            const botChat = chatHistory(botMessage, false);
            responseContainer.appendChild(botChat);

    // Scroll to the bottom of the chat container
            responseContainer.scrollTop = responseContainer.scrollHeight;
		});
} 